"use client";
import Image from "next/image";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import "./FoodItem.css";

interface FoodItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating?: number;
  onAddToCart: (id: string) => void;
}

export default function FoodItem({
  id,
  name,
  description,
  price,
  image,
  rating = 4.5,
  onAddToCart,
}: FoodItemProps) {
  return (
    <div className="food-item">
      <div className="food-image-container">
        <Image
          src={image}
          alt={name}
          fill
          className="food-image"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
        />
      </div>
      <div className="food-content">
        <div className="food-header">
          <h3 className="food-title">{name}</h3>
          <div className="rating-container">
            <StarIcon className="rating-star" />
            <span className="rating-text">{rating}</span>
          </div>
        </div>
        <p className="food-description">{description}</p>
        <div className="food-footer">
          <span className="food-price">${price.toFixed(2)}</span>
          <button
            onClick={() => onAddToCart(id)}
            className="add-to-cart-button"
          >
            <ShoppingBagIcon className="cart-icon" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
