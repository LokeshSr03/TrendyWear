import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    total_amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    items: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1, // Ensure quantity is always at least 1
        },
        price: {
          type: Number,
          required: true,
          min: 0, // Ensure price cannot be negative
        },
      },
    ],
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Pre-save hook can be removed since Mongoose already handles `updatedAt` with `timestamps: true`.

const Order = mongoose.model("Order", orderSchema);

export default Order;
