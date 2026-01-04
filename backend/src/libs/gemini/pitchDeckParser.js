import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { PITCH_NORMALIZE_SCHEMA } from "../system_prompts/pitch_normalize_schema.js";
import { insertPitch } from "../../database/insertFunctions.js";

const apiKey = process.env.GOOGLE_API_KEY;
if (!apiKey) throw new Error("GOOGLE_API_KEY not found");

const genAI = new GoogleGenerativeAI(apiKey);
const fileManager = new GoogleAIFileManager(apiKey);

const waitFor = (ms) => new Promise((res) => setTimeout(res, ms));

const cleanAndParseJSON = (text) => {
  const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
  return JSON.parse(cleaned);
};

async function uploadAndPoll(filePath, mimeType) {
  console.log(`[Gemini] Uploading ${filePath}`);

  const uploadResponse = await fileManager.uploadFile(filePath, {
    mimeType,
    displayName: filePath.split(/[\\/]/).pop(),
  });
  const fileName = uploadResponse.file.name;

  let file = await fileManager.getFile(fileName);

  while (file.state === "PROCESSING") {
    await waitFor(2000);
    file = await fileManager.getFile(fileName);
  }

  if (file.state === "FAILED") {
    throw new Error("Gemini file processing failed");
  }

  return file;
}


const SYSTEM_PROMPT = `
ABOUT YOU:
You are a startup pitch deck analyzer named Pitch_Dekh.

TASK:
Extract all information from the uploaded pitch deck and return JSON only.

RULES:
1. Defaults → number: 0 | string: "0" | array: []
2. Never return null
3. problem, solution, vision must be single strings
`;

const USER_PROMPT = `
Analyze the uploaded pitch deck.

EXTRACT **everything** provided in the pitch deck in a structured format.

IMPORTANT:
- If data is missing, use defaults
- STRICT JSON ONLY
`;

export const parsePitchDeck = async (localFilePath, mimeType, userId) => {
  let file;
  try {
    file = await uploadAndPoll(localFilePath, mimeType);

    const model = genAI.getGenerativeModel({
      model: "gemini-3-pro-preview",
      systemInstruction: SYSTEM_PROMPT,
      generationConfig: {
        maxOutputTokens: 10000,
        responseMimeType: "application/json",
      },
    });

    console.log("[Gemini] Generating analysis...");

    const result = await model.generateContent([
      {
        fileData: {
          mimeType: file.mimeType,
          fileUri: file.uri,
        },
      },
      { text: USER_PROMPT },
    ]);

    console.log("[Gemini] Analysis Stage 1 complete");

    // 1. Get the object { id, data }
    const resultObject = await normalizePitch(result.response.text(), userId);

    console.log("[Gemini] Analysis Stage 2 complete");

    // 2. No need to JSON.parse() anymore, it is already a JS object
    console.log("[Gemini] Normalized Data:", resultObject.data);

    // 3. Return the data to your controller/frontend
    return resultObject.data;

  } catch (error) {
    console.error("Analysis Failed:", error);
    return null;
  } finally {
    if (file) {
      try {
        await fileManager.deleteFile(file.name);
        console.log("[Gemini] Deleted file:", file.name);
      } catch (error) {
        console.error("Failed to delete file:", error);
      }
    }
  }
}

const NORMALIZE_SYSTEM_PROMPT = `
You are a Pitch Normalization Engine.

Your role is to STRUCTURE extracted pitch deck content.
You must ONLY reformat and consolidate information explicitly present.

STRICT RULES:
1. Do NOT add market research
2. Do NOT infer market size, trends, or competitors
3. If data is missing, use defaults:
   - number → 0
   - string → "0"
   - array → []
4. Never hallucinate or speculate
5. problem, solution, vision MUST be single strings

Output ONLY valid JSON following the schema exactly.
Strictly follow the following SCHEMA and the Data Types each.
SCHEMA:
${JSON.stringify(PITCH_NORMALIZE_SCHEMA, null, 2)}
`;

const USER_PROMPT_TO_NORMALIZE = `
Normalize the extracted pitch deck content.

IMPORTANT:
- If data is missing, use defaults
- STRICT JSON ONLY
`;

const normalizePitch = async (pitchData, userId) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-3-pro-preview",
    systemInstruction: NORMALIZE_SYSTEM_PROMPT,
    generationConfig: {
      maxOutputTokens: 15000,
      responseMimeType: "application/json",
    },
  });

  const result = await model.generateContent([
    { text: USER_PROMPT_TO_NORMALIZE },
    { text: pitchData },
  ]);

  console.log("[Gemini] Normalization Stage 1 complete");

  // 1. Parse ONLY once here
  const parsedData = cleanAndParseJSON(result.response.text());
  // 2. Pass the OBJECT to your insert function (not the string)
  const insertPitchId = await insertPitch(parsedData, userId);

  console.log("[Gemini] Inserted Pitch:", insertPitchId);

  // 3. Return BOTH so the parent function can use them
  return { id: insertPitchId, data: parsedData };
}