const mongoose = require("mongoose");

const StoreSchema = new mongoose.Schema(
  {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    logo: String,
    title: String,
    description: String,
    phoneNumber: String,
    address: String,
    averageRating: String,
    links: [
        {
            title: String,
            link: String,
        }
    ],
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ],

  },
  {
    timestamps: true,
    collection: "Store",
  }
);

const Store = mongoose.model("Store", StoreSchema);

module.exports = Store;