import mongoose, { Document, Model } from "mongoose";

export interface IFood extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  numReviews: number;
  countInStock: number;
  createdAt: Date;
  updatedAt: Date;
}

const foodSchema = new mongoose.Schema<IFood>(
  {
    name: {
      type: String,
      required: [true, "Please provide food name"],
    },
    description: {
      type: String,
      required: [true, "Please provide food description"],
    },
    price: {
      type: Number,
      required: [true, "Please provide food price"],
    },
    category: {
      type: String,
      required: [true, "Please provide food category"],
    },
    image: {
      type: String,
      required: [true, "Please provide food image"],
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: [true, "Please provide count in stock"],
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Food: Model<IFood> =
  mongoose.models.Food || mongoose.model<IFood>("Food", foodSchema);
