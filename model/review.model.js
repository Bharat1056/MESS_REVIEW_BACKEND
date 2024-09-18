import mongoose, { Schema } from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    hostel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hostel",
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    ipAddress: {
      type: String,
      required: true,
    },
    hygiene: {
      type: Number,
      min: 1,
      max: 10,
      required: true,
    },
    foodQuality: {
      type: Number,
      min: 1,
      max: 10,
      required: true,
    },
    foodQuantity: {
      type: Number,
      min: 1,
      max: 10,
      required: true,
    },
    foodTiming: {
      type: Number,
      min: 1,
      max: 10,
      required: true,
    },
    menuAdherence: {
      type: Number,
      min: 1,
      max: 10,
      required: true,
    },
    staffHygiene: {
      type: Number,
      min: 1,
      max: 10,
      required: true,
    },
    tableCleanliness: {
      type: Number,
      min: 1,
      max: 10,
      required: true,
    },
    staffBehavior: {
      type: Number,
      min: 1,
      max: 10,
      required: true,
    },
    plateCleanliness: {
      type: Number,
      min: 1,
      max: 10,
      required: true,
    },
    waitingTime: {
      type: Number,
      min: 1,
      max: 10,
      required: true,
    },
  },
  { timestamps: true }
);

reviewSchema.pre("save", function () {
  this.populate({
    path: "hostel",
    select: "name",
  });
});

const Review = mongoose.model("Review", reviewSchema);
export default Review;
