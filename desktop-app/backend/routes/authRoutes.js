//  we r makimg a route here
import express from "express";
import login from '../controllers/authController.js';
const router = express.Router();

router.post('/login',login);// /login here and other is on app.js /api/auth/login 

export default router