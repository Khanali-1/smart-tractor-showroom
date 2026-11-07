import express from 'express';
import getAlltractors  from "../controllers/tractorController.js";
const router = express.Router();

router.get('/',getAlltractors)

export default router;

