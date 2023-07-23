const mongoose = require("mongoose");

const SellerOrderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        color: String,
        size: String,
        customization: [
          {
            title: String,
            range: Number,
          },
        ],
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    total: {
      type: Number,
    },
    buyerOrder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BuyerOrder",
    },
    buyer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    shippingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
    status:{
        type:String,
        default:"pending",
        enum:["pending", "inProgress", "completed", "dilevered", "cancelled"],
    },
    paymentMethod: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const SellerOrder = mongoose.model("SellerOrder", SellerOrderSchema);

module.exports = SellerOrder;
