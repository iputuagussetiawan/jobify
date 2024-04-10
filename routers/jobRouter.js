import { Router } from 'express';
import { validateJobInput } from '../middleware/validationMiddleware.js';
const router = Router();

import {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
} from '../controllers/jobController.js';

// router.get('/', getAllJobs);
// router.post('/', createJob);

router.route('/').get(getAllJobs).post(validateJobInput, createJob);
router
    .route('/:id')
    .get(getJob)
    .patch(validateJobInput, updateJob)
    .delete(deleteJob);

export default router;