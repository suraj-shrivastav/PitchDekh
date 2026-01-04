import express from "express";
import firecrawlApp from "../libs/firecrawl/firecrawl.js";
import { GoogleGenAI } from "@google/genai";
import firecrawl_prompt from "../libs/system_prompts/model_prompts.js";
import addInvestor from "../database/investor.js";
import { authMiddleware } from "../middleware/supabaseAuth.middleware.js";

const router = express.Router();
const apiKey = process.env.GOOGLE_API_KEY;

router.post("/", authMiddleware, async (req, res) => {
    try {
        const { url } = req.body;

        // Validate input
        if (!url) {
            return res.status(400).json({ error: "URL is required" });
        }

        console.log(`[Firecrawl] Starting crawl for: ${url}`);

        // Crawl website
        const crawlResponse = await firecrawlApp.crawlUrl(url, {
            limit: 1,
            maxDepth: 6,
            includePaths: ["/", "/about", "/team", "/contact"],
            scrapeOptions: {
                formats: ["markdown"],
                onlyMainContent: false,
            },
        });

        if (!crawlResponse.success) {
            throw new Error(`Crawl job failed: ${crawlResponse.error}`);
        }

        console.log("Data from Firecrawl:", crawlResponse.data);

        console.log(
            "............................. Data is passed to Gemini ................................"
        );

        // Prepare Gemini prompt
        const msg = `
        Follow below schema to extract information from the given content:
        You must Return data in JSON format Strictly.
        Follow the prompts carefully.

        ${JSON.stringify(firecrawl_prompt, null, 2)}

        Refer the following content for above schema:

        ${JSON.stringify(crawlResponse.data, null, 2)}
        `;

        console.log("-------------------------- Gemini Prompt --------------------------");
        // console.log(msg);

        // ===============================
        // Gemini Integration (commented)
        // ===============================

        const ai = new GoogleGenAI(apiKey);

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [
                {
                    role: "user",
                    parts: [{ text: msg }],
                },
            ],
            response_mime_type: "application/json",
        });

        console.log(response.text);

        const formattedData = await addInvestor(response.text);

        return res.json({
            success: true,
            jobId: crawlResponse.id,
            data: formattedData,
        });

    } catch (error) {
        console.error("[Firecrawl Error]:", error.message);
        return res.status(500).json({
            error: error.message || "Failed to crawl the URL",
        });
    }
});

export default router;
