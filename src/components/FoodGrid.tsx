"use client";
import { useState } from "react";
import FoodItem from "./FoodItem";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import "./FoodGrid.css";

interface Food {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
}

interface FoodGridProps {
  foods: Food[];
  onAddToCart: (id: string) => void;
}

export default function FoodGrid({ foods, onAddToCart }: FoodGridProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", ...new Set(foods.map((food) => food.category))];

  const filteredFoods = foods.filter((food) => {
    const matchesSearch =
      food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || food.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="food-grid-container">
      {/* Search and Filter */}
      <div className="search-filter-container">
        <div className="search-container">
          <MagnifyingGlassIcon className="search-icon" />
          <input
            type="text"
            placeholder="Search foods..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="food-grid">
        {filteredFoods.map((food) => (
          <FoodItem key={food.id} {...food} onAddToCart={onAddToCart} />
        ))}
      </div>

      {filteredFoods.length === 0 && (
        <div className="empty-state">
          <p className="empty-state-text">
            No foods found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}
