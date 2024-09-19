import mongoose, { Schema } from "mongoose";
import currentDate from "../constants/constant.js";

const hostelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  totalReviews: {
    type: Number,
    defaultValue: 0,
  },
  avgHygiene: {
    type: Number,
    min: 0,
    max: 10,
    defaultValue: 0,
    required: true,
  },
  avgFoodQuality: {
    type: Number,
    min: 0,
    max: 10,
    defaultValue: 0,
    required: true,
  },
  avgFoodQuantity: {
    type: Number,
    min: 0,
    max: 10,
    defaultValue: 0,
    required: true,
  },
  avgFoodTiming: {
    type: Number,
    min: 0,
    max: 10,
    defaultValue: 0,
    required: true,
  },
  avgMenuAdherence: {
    type: Number,
    min: 0,
    max: 10,
    defaultValue: 0,
    required: true,
  },
  avgStaffHygiene: {
    type: Number,
    min: 0,
    max: 10,
    defaultValue: 0,
    required: true,
  },
  avgTableCleanliness: {
    type: Number,
    min: 0,
    max: 10,
    defaultValue: 0,
    required: true,
  },
  avgStaffBehavior: {
    type: Number,
    min: 0,
    max: 10,
    defaultValue: 0,
    required: true,
  },
  avgPlateCleanliness: {
    type: Number,
    min: 0,
    max: 10,
    defaultValue: 0,
    required: true,
  },
  avgWaitingTime: {
    type: Number,
    min: 0,
    max: 10,
    defaultValue: 0,
    required: true,
  },
  createdAt: {
    type: String,
    default: currentDate,
  },
  totalMark: {
    type: Number,
    min: 0,
    max: 100,
    defaultValue: 0,
  },
});

const Hostel = mongoose.model("Hostel", hostelSchema);
export default Hostel;
