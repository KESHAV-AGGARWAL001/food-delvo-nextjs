"use client";
import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { toast } from "react-hot-toast";
import "./FoodDisplay.css";

interface IFood {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
}

interface FoodDisplayProps {
  foods: IFood[];
  selectedCategory: string;
}

export default function FoodDisplay({
  foods,
  selectedCategory,
}: FoodDisplayProps) {
  const { addToCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const filteredFoods =
    selectedCategory === "all"
      ? foods
      : foods.filter((food) => food.category === selectedCategory);

  const handleAddToCart = async (food: IFood) => {
    setIsLoading(true);
    try {
      addToCart({
        id: food.id,
        name: food.name,
        price: food.price,
        quantity: 1,
        image: food.image,
      });
      toast.success("Added to cart!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to add to cart"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="food-display">
      <div className="food-display-list">
        {filteredFoods &&
          filteredFoods.map((food) => (
            <div key={food.id} className="food-item">
              <div className="food-item-image-container">
                <Image
                  src={food.image}
                  alt={food.name}
                  fill
                  className="food-item-image"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />
              </div>
              <div className="food-item-info">
                <div className="food-item-header">
                  <div>
                    <h3 className="food-item-title">{food.name}</h3>
                    <p className="food-item-description">{food.description}</p>
                  </div>
                  <div className="food-item-rating">
                    <svg
                      className="rating-star"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="rating-value">
                      {food.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
                <div className="food-item-footer">
                  <span className="food-item-price">
                    ${food.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleAddToCart(food)}
                    disabled={isLoading}
                    className="add-to-cart-button"
                  >
                    {isLoading ? (
                      <svg
                        className="loading-spinner"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                    ) : (
                      "Add to Cart"
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}

        {!filteredFoods && <div>No food found</div>}
      </div>
    </div>
  );
}
