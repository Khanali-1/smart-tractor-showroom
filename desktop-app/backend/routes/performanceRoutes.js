import getPerformance from '../controllers/performanceController.js';
import express from "express";
const router= express.Router();

router.get('/',getPerformance);

export default router

