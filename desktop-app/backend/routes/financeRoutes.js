import getFinanceReport from "../controllers/financereportController.js";

import express from 'express';

const router = express.Router();

router.get('/',getFinanceReport);

export default router;