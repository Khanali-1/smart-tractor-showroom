import express from 'express';
const router = express.Router();
import employees from '../controllers/empControllers.js';

router.get("/",employees);

export default router