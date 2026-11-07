import express from "express";

import gethrReport from "../controllers/hrreportController.js";

const router = express.Router();

router.get("/", gethrReport);

export default router;
