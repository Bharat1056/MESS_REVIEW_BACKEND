import express from 'express';
import { addReview, getHostelReviews, createHostel } from '../controller/hostel.controller.js';

const router = express.Router();

router.post('/add', addReview);

router.get('/get', getHostelReviews);

router.post('/create', createHostel);

export default router
