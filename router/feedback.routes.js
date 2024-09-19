import express from 'express';
import { addReview, getHostelReviewsByDate } from '../controller/hostel.controller.js';

const router = express.Router();

router.post('/add', addReview);

router.get('/getByDate/:date', getHostelReviewsByDate);

export default router
