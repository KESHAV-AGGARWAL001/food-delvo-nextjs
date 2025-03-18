"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaHamburger, FaPizzaSlice, FaFish, FaLeaf } from "react-icons/fa";
import { GiNoodles, GiCupcake, GiTacos } from "react-icons/gi";
import { BiDrink } from "react-icons/bi";
import { MdRamenDining } from "react-icons/md";
import { IoFastFood } from "react-icons/io5";
import "./ExploreMenu.css";

const categories = [
  { id: "all", name: "All", icon: IoFastFood },
  { id: "burgers", name: "Burgers", icon: FaHamburger },
  { id: "pizza", name: "Pizza", icon: FaPizzaSlice },
  { id: "sushi", name: "Sushi", icon: FaFish },
  { id: "pasta", name: "Pasta", icon: GiNoodles },
  { id: "salads", name: "Salads", icon: FaLeaf },
  { id: "desserts", name: "Desserts", icon: GiCupcake },
  { id: "drinks", name: "Drinks", icon: BiDrink },
  { id: "asian", name: "Asian", icon: MdRamenDining },
  { id: "mexican", name: "Mexican", icon: GiTacos },
  { id: "sandwiches", name: "Sandwiches", icon: IoFastFood },
];

interface ExploreMenuProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function ExploreMenu({
  selectedCategory,
  onCategoryChange,
}: ExploreMenuProps) {
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    const checkScrollable = () => {
      const container = document.getElementById("category-container");
      if (container) {
        setIsScrollable(container.scrollWidth > container.clientWidth);
      }
    };

    checkScrollable();
    window.addEventListener("resize", checkScrollable);
    return () => window.removeEventListener("resize", checkScrollable);
  }, []);

  return (
    <div className="explore-menu">
      <div className="categories-container">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              key={category.id}
              className={`category-item ${
                selectedCategory === category.id ? "active" : ""
              }`}
              onClick={() => onCategoryChange(category.id)}
            >
              <Icon className="category-icon" />
              <span>{category.name}</span>
            </motion.button>
          );
        })}
      </div>

      {isScrollable && (
        <>
          <div className="scroll-fade-left" />
          <div className="scroll-fade-right" />
        </>
      )}
    </div>
  );
}
