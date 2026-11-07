import getLeave from "../controllers/leaveController.js";
import express from "express";
const router= express.Router();

router.get('/',getLeave);

export default router