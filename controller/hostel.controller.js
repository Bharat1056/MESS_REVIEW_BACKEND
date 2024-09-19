import Hostel from "../model/hostel.model.js";
import Review from "../model/review.model.js";

const date = new Date();
export const currentDate = date.toISOString().split("T")[0];

export const addReview = async (req, res) => {
  try {
    // get data from frontend
    const reviewData = req.body;
    // check that hostel exist or not
    let isHostelExist = await Hostel.findOne({ name: reviewData.name }); // name means hostel name
    // if not then do this
    if (!isHostelExist) {
      isHostelExist = await Hostel.create({
        name: reviewData.name,
        avgHygiene: 0,
        avgFoodQuality: 0,
        avgFoodQuantity: 0,
        avgFoodTiming: 0,
        avgMenuAdherence: 0,
        avgStaffHygiene: 0,
        avgTableCleanliness: 0,
        avgStaffBehavior: 0,
        avgPlateCleanliness: 0,
        avgWaitingTime: 0,
        createdAt: currentDate,
      });
      if (!isHostelExist) {
        return res.status(500).json({ message: "Failed to create Hostel" });
      }
    }

    // check that review exist or not on that current date
    const isExistReviewToday = await Review.findOne({
      email: reviewData.email, // user email
      createdAt: currentDate,
    });

    // if exist then do this
    if (isExistReviewToday) {
      return res
        .status(404)
        .json({ message: "Feedback already submitted today" });
    }

    const newReview = await Review.create({
      hostel: isHostelExist._id,
      ...reviewData,
      createdAt: currentDate,
    });

    if (!newReview) {
      return res.status(500).json({ message: "Failed to add review" });
    }

    // here we get all the reviews in that particular hostel
    const reviews = await Review.find({ hostel: isHostelExist._id });

    const totalReviews = reviews.length;

    const newAverages = {
      avgHygiene: reviews.reduce((sum, r) => sum + r.hygiene, 0) / totalReviews,
      avgFoodQuality:
        reviews.reduce((sum, r) => sum + r.foodQuality, 0) / totalReviews,
      avgFoodQuantity:
        reviews.reduce((sum, r) => sum + r.foodQuantity, 0) / totalReviews,
      avgFoodTiming:
        reviews.reduce((sum, r) => sum + r.foodTiming, 0) / totalReviews,
      avgMenuAdherence:
        reviews.reduce((sum, r) => sum + r.menuAdherence, 0) / totalReviews,
      avgStaffHygiene:
        reviews.reduce((sum, r) => sum + r.staffHygiene, 0) / totalReviews,
      avgTableCleanliness:
        reviews.reduce((sum, r) => sum + r.tableCleanliness, 0) / totalReviews,
      avgStaffBehavior:
        reviews.reduce((sum, r) => sum + r.staffBehavior, 0) / totalReviews,
      avgPlateCleanliness:
        reviews.reduce((sum, r) => sum + r.plateCleanliness, 0) / totalReviews,
      avgWaitingTime:
        reviews.reduce((sum, r) => sum + r.waitingTime, 0) / totalReviews,
      totalReviews,
      createdAt: currentDate,
    };

    const hostelUpdate = await Hostel.findByIdAndUpdate(
      isHostelExist._id,
      newAverages
    );
    if (!hostelUpdate) {
      return res.status(500).json({ message: "Failed to update averages" });
    }

    return res.status(201).json({
      message: "Review added successfully and averages updated",
      review: newReview,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getHostelReviewsByDate = async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ message: "Date parameter is required" });
    }

    const totalHostelReview = await Hostel.find({
      createdAt: date,
    });

    if (!totalHostelReview || totalHostelReview.length === 0) {
      return res
        .status(404)
        .json({ message: "No reviews found for the specified date" });
    }

    return res.status(200).json({ data: totalHostelReview });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
