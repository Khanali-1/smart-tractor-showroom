
import express from "express";

import {
    getOperations,
    recommendTractors
} from "../controllers/agricultureController.js";


const router = express.Router();


// Get all farming operations
router.get("/", getOperations);


// Recommend tractors
router.get("/", recommendTractors);


export default router;
