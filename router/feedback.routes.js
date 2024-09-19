import express from 'express';
import { addReview, getHostelReviews, createHostel,getHostelReviewsByDate } from '../controller/hostel.controller.js';

const router = express.Router();

router.post('/add', addReview);

router.get('/get', getHostelReviews);

router.post('/create', createHostel);
router.get('/getByDate', getHostelReviewsByDate);

export default router
