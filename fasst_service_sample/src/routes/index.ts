import {getTortues} from './handlers/tortues/getTortues';
import {getTortue} from './handlers/tortues/getTortue';
import {deleteTortue} from './handlers/tortues/deleteTortue';
import {updateTortue} from './handlers/tortues/updateTortue';
import {postTortue} from './handlers/tortues/postTortue';
import { Router } from 'express';

// Init router and path
const router = Router();

router.get('/', getTortues);

router.get('/:id', getTortue);

router.put('/:id', updateTortue);

router.post('/', postTortue);

router.delete('/:id', deleteTortue);


export default router;