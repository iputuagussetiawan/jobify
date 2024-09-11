import { Router } from 'express';
import { validateJobInput, validateIdParam } from '../middleware/validationMiddleware.js';
const router = Router();

import {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
} from '../controllers/jobController.js';
import { checkForTestUser } from '../middleware/authMiddleware.js';

// router.get('/', getAllJobs);
// router.post('/', createJob);

router.route('/').get(getAllJobs).post(checkForTestUser,validateJobInput, createJob);
router
    .route('/:id')
    .get(validateIdParam, getJob)
    .patch(checkForTestUser, validateJobInput,validateIdParam, updateJob)
    .delete(checkForTestUser, validateIdParam,deleteJob);

export default router;