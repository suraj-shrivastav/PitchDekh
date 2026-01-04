import express from "express";
const router = express.Router();

import { getEfficientMatches } from "../controller/vcMatch.controller.js";


router.post("/vcs", getEfficientMatches);

export default router;