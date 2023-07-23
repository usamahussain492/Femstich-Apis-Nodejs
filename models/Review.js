const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    stars: Number,
    description: String,

  },
  {
    timestamps: true,
    collection: "Review",
  }
);

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;