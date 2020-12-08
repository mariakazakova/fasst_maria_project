import turtleRouter from './handlers/tortues';
import { Router } from 'express';

// Init router and path
const router = Router();

router.use('/turtles', turtleRouter);

export default router;
