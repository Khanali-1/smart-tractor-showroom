import express from "express";
import getSalesReport from "../controllers/salesreportController.js";

const router = express.Router();

router.get("/", getSalesReport);

export default router;