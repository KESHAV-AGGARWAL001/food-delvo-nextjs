import mongoose, { Document, Model } from "mongoose";
import { IUser } from "./User";

interface OrderItem {
  name: string;
  quantity: number;
  image: string;
  price: number;
}

export interface IOrder extends Document {
  user: IUser["_id"];
  orderItems: OrderItem[];
  address: string;
  isDelivered: boolean;
  phone: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new mongoose.Schema<IOrder>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
    address: {
      type: String,
      required: true,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", orderSchema);
