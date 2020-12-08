import TortueRouter from './handlers/tortues';
import { Router } from 'express';

// Init router and path
const router = Router();

router.use("/tortues", TortueRouter)

export default router;
