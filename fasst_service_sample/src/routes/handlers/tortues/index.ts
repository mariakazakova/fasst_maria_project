import { getTortues } from './getTortues';
import { getTortue } from './getTortue';
import { deleteTortue } from './deleteTortue';
import { updateTortue } from './updateTortue';
import { postTortue } from './postTortue';
import { Router } from 'express';

// Init router and path
const router = Router();

<<<<<<< Updated upstream
router.get('/', getTortues);
=======
router.get('', getTortues);
>>>>>>> Stashed changes

router.get('/:id', getTortue);

router.put('/:id', updateTortue);

<<<<<<< Updated upstream
router.post('/', postTortue);
=======
router.post('', postTortue);
>>>>>>> Stashed changes

router.delete('/:id', deleteTortue);


<<<<<<< Updated upstream
export default router;
=======
export default router;
>>>>>>> Stashed changes
