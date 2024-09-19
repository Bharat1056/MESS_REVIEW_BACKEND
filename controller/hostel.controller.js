import Hostel from "../model/hostel.model.js";
import Review from "../model/review.model.js";

export const addReview = async (req, res) => {
  try {
    const reviewData = req.body;
    const isHostelExist = await Hostel.findOne({ name: reviewData.name });
    if (!isHostelExist) {
      const newHostel = await Hostel.create({
        name: reviewData.name,
        avgHygiene: 1,
        avgFoodQuality: 1,
        avgFoodQuantity: 1,
        avgFoodTiming: 1,
        avgMenuAdherence: 1,
        avgStaffHygiene: 1,
        avgTableCleanliness: 1,
        avgStaffBehavior: 1,
        avgPlateCleanliness: 1,
        avgWaitingTime: 1,
      });
      if (!newHostel) {
        return res.status(500).json({ message: "Failed to create Hostel" });
      }
    }

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    const isExistReviewToday = await Review.findOne({
      email: reviewData.email,
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    if (isExistReviewToday) {
      return res.status(404).json({ message: "Feedback already submitted today" });
    }


    const hostel = await Hostel.findOne({ name: reviewData.name });
    if (!hostel) {
      return res.status(404).json({ message: "Hostel not found" });
    }

    Object.keys(reviewData).forEach((key) => {
      if (reviewData[key] <= 2 && (key !== "email" || key !== "hostel")) {
        reviewData[key] = 3;
      }
    });

    const ip = req.ip;
    console.log( "ipaddress: " +ip);

    const newReview = await Review.create({
      hostel: hostel._id,
      ipAddress: ip,
      ...reviewData,
    });

    if (!newReview) {
      return res.status(500).json({ message: "Failed to add review" });
    }

    const reviews = await Review.find({ hostel: hostel._id });

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
        totalReviews
    };

    const hostelUpdate = await Hostel.findByIdAndUpdate(hostel._id, newAverages);
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

export const getHostelReviews = async (req, res) => {
  try {
    const hostel = await Hostel.find({});

    if (!hostel) {
      return res.status(404).json({ message: "Hostel not found" });
    }


    return res.status(200).json({ data: hostel });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createHostel = async (req, res) => {
  try {
    const { name } = req.body;
    const isExistHostel = await Hostel.findOne({ name });
    if (isExistHostel) {
      return res.status(404).json({ message: "Hostel already exists" });
    }
    const newHostel = await Hostel.create({
      name,
      avgHygiene: 1,
      avgFoodQuality: 1,
      avgFoodQuantity: 1,
      avgFoodTiming: 1,
      avgMenuAdherence: 1,
      avgStaffHygiene: 1,
      avgTableCleanliness: 1,
      avgStaffBehavior: 1,
      avgPlateCleanliness: 1,
      avgWaitingTime: 1,
    });
    if (!newHostel) {
      return res.status(500).json({ message: "Failed to create Hostel" });
    }

    return res.status(201).json({ message: "Hostel created successfully", data: newHostel });
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
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0); 

    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999); 

    const reviews = await Review.find({
      createdAt: {
        $gte: startDate,
        $lte: endDate
      }
    }).populate('hostel', 'name');

    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ message: "No reviews found for the specified date" });
    }

    return res.status(200).json({ data: reviews });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
