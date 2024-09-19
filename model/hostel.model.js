import mongoose, { Schema } from "mongoose";
import { currentDate } from "../controller/hostel.controller";

const hostelSchema = new mongoose.Schema(
  {
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
      min: 1,
      max: 10,
      defaultValue: 1,
      required: true,
    },
    avgFoodQuality: {
      type: Number,
      min: 1,
      max: 10,
      defaultValue: 1,
      required: true,
    },
    avgFoodQuantity: {
      type: Number,
      min: 1,
      max: 10,
      defaultValue: 1,
      required: true,
    },
    avgFoodTiming: {
      type: Number,
      min: 1,
      max: 10,
      defaultValue: 1,
      required: true,
    },
    avgMenuAdherence: {
      type: Number,
      min: 1,
      max: 10,
      defaultValue: 1,
      required: true,
    },
    avgStaffHygiene: {
      type: Number,
      min: 1,
      max: 10,
      defaultValue: 1,
      required: true,
    },
    avgTableCleanliness: {
      type: Number,
      min: 1,
      max: 10,
      defaultValue: 1,
      required: true,
    },
    avgStaffBehavior: {
      type: Number,
      min: 1,
      max: 10,
      defaultValue: 1,
      required: true,
    },
    avgPlateCleanliness: {
      type: Number,
      min: 1,
      max: 10,
      defaultValue: 1,
      required: true,
    },
    avgWaitingTime: {
      type: Number,
      min: 1,
      max: 10,
      defaultValue: 1,
      required: true,
    },
    createdAt: {
      type: String,
      default: currentDate,
    }
  },
);

const Hostel = mongoose.model("Hostel", hostelSchema);
export default Hostel;
