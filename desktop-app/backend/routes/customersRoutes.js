import express from 'express';
import  getAllCustomers from '../controllers/customersController.js';
const router = express.Router();

router.get('/',getAllCustomers)

export default router

