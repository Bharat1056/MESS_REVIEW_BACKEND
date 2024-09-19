import express from 'express';
import { addReview, getHostelReviewsByDate } from '../controller/hostel.controller.js';

const router = express.Router();

router.post('/add', addReview);

router.get('/getByDate', getHostelReviewsByDate);

export default router
