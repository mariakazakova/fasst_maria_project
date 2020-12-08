import { getTortues } from './getTortues';
import { getTortue } from './getTortue';
import { deleteTortue } from './deleteTortue';
import { updateTortue } from './updateTortue';
import { postTortue } from './postTortue';
import { Router } from 'express';

// Init router and path
const router = Router();

router.get('/', getTortues);

router.get('/:id', getTortue);

router.put('/:id', updateTortue);

router.post('/', postTortue);

router.delete('/:id', deleteTortue);


export default router;
