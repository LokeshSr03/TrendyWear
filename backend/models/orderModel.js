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
      type: Boolean,
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now(),
    },
    updated_at: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

orderSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});
const Order = mongoose.model("order", orderSchema);

export default Order;
