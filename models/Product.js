const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: String,
    images: [{ type: String }],
    color: [{ type: String }],
    sizes: [{ type: String }],
    price: Number,
    stock: Number,
    sales: Number,
    featured: {
      type: Boolean,
      default: false,
    },
    averageRating: Number,
    storeId: { type: mongoose.Schema.Types.ObjectId, ref: "Store" },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "Subcategory" },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    customizationPrice:{
      type: Number,
    },
    customization: [
      {
        title: String,
        range: {
          start: Number,
          end: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
    collection: "Product",
  }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
