import getAttandnace from '../controllers/attandanceControllers.js';
import express from 'express';

const router = express.Router();

router.get('/',getAttandnace);

export default router