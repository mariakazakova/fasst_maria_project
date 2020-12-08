<<<<<<< Updated upstream
import turtleRouter from './handlers/tortues';
=======
import TortueRouter from './handlers/tortues';
>>>>>>> Stashed changes
import { Router } from 'express';

// Init router and path
const router = Router();

<<<<<<< Updated upstream
router.use('/turtles', turtleRouter);

export default router;
=======
router.use("/tortues", TortueRouter)

export default router;
>>>>>>> Stashed changes
