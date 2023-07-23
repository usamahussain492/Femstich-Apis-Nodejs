const mongoose = require("mongoose");

const BuyerOrderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        color: String,
        size: String,
        status:{
          type:String,
          default:"pending",
          enum:["pending", "inProgress", "completed", "dilevered", "cancelled"],
        },
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
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    shippingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
    paymentMethod: {
      type: String,
      enum:["homeDilevery"]
    },
  },
  {
    timestamps: true,
  }
);

const BuyerOrder = mongoose.model("BuyerOrder", BuyerOrderSchema);

module.exports = BuyerOrder;
