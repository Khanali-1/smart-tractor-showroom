import express from 'express';
import Sales from '../controllers/salesController.js';

const router = express.Router();

router.get('/',Sales);


export default router


