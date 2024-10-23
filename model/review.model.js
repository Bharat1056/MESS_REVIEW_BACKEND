import mongoose, { Schema } from "mongoose";
import currentDate from "../constants/constant.js";
import jwt from "jsonwebtoken";

const reviewSchema = new Schema({
  hostel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hostel",
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  hygiene: {
    type: Number,
    min: 0,
    max: 10,
    required: true,
  },
  foodQuality: {
    type: Number,
    min: 0,
    max: 10,
    required: true,
  },
  foodQuantity: {
    type: Number,
    min: 0,
    max: 10,
    required: true,
  },
  foodTiming: {
    type: Number,
    min: 0,
    max: 10,
    required: true,
  },
  menuAdherence: {
    type: Number,
    min: 0,
    max: 10,
    required: true,
  },
  staffHygiene: {
    type: Number,
    min: 0,
    max: 10,
    required: true,
  },
  tableCleanliness: {
    type: Number,
    min: 0,
    max: 10,
    required: true,
  },
  staffBehavior: {
    type: Number,
    min: 0,
    max: 10,
    required: true,
  },
  plateCleanliness: {
    type: Number,
    min: 0,
    max: 10,
    required: true,
  },
  waitingTime: {
    type: Number,
    min: 0,
    max: 10,
    required: true,
  },
  remarks: {
    type: String,
  },
  createdAt: {
    type: String,
    default: currentDate,
  },
});

reviewSchema.pre("save", function () {
  this.populate({
    path: "hostel",
    select: "name",
  });
});

reviewSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      email: this.email,
      hostel: this.hostelName,
      createdAt: this.createdAt,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

const Review = mongoose.model("Review", reviewSchema);
export default Review;
