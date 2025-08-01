const mongoose = require("mongoose");
const User = require("./User");
const Product = require("./Product");
const Schema = mongoose.Schema;

const orderSchema = Schema(
  {
    userId: { type: mongoose.ObjectId, ref: "User", required: true },
    contact: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
    },
    shipTo: {
      address1: { type: String, required: true },
      address2: { type: String },
      postalCode: { type: String, required: true },
    },
    items: [
      {
        productId: { type: mongoose.ObjectId, ref: "Product", required: true },
        qty: { type: Number, required: true },
        size: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

orderSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.__v;
  delete obj.updatedAt;
  delete obj.createdAt;
  return obj;
};

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
