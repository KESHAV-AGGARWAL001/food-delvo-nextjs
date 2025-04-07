"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ExploreMenu from "./ExploreMenu";
import FoodDisplay from "./FoodDisplay";
import "./Menu.css";

interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
}

const sampleFoods = [
  {
    id: "1",
    name: "Classic Salad",
    description: "Juicy fresh cucumber , tomatoes, and our special sauce",
    price: 12.99,
    image: "/food/food_1.png",
    category: "salads",
    rating: 4.5,
  },
  {
    id: "2",
    name: "Margherita Pizza",
    description: "Fresh mozzarella, tomatoes, and basil on our homemade crust",
    price: 14.99,
    image: "/food/food_2.png",
    category: "pizza",
    rating: 4.8,
  },
  {
    id: "3",
    name: "California Roll",
    description: "Fresh crab, avocado, and cucumber wrapped in sushi rice",
    price: 16.99,
    image: "/food/food_3.png",
    category: "sushi",
    rating: 4.7,
  },
  {
    id: "4",
    name: "Fettuccine Alfredo",
    description: "Creamy Alfredo sauce with perfectly cooked fettuccine",
    price: 13.99,
    image: "/food/food_4.png",
    category: "pasta",
    rating: 4.6,
  },
  {
    id: "5",
    name: "Caesar Salad",
    description:
      "Crisp romaine lettuce, parmesan cheese, and homemade croutons",
    price: 9.99,
    image: "/food/food_5.png",
    category: "salads",
    rating: 4.4,
  },
  {
    id: "6",
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with a molten chocolate center",
    price: 7.99,
    image: "/food/food_6.png",
    category: "desserts",
    rating: 4.9,
  },
  {
    id: "7",
    name: "Mango Smoothie",
    description: "Fresh mango blended with yogurt and honey",
    price: 5.99,
    image: "/food/food_7.png",
    category: "drinks",
    rating: 4.5,
  },
  {
    id: "8",
    name: "Spicy Tuna Roll",
    description: "Fresh tuna with spicy mayo and cucumber",
    price: 18.99,
    image: "/food/food_8.png",
    category: "sushi",
    rating: 4.9,
  },
  {
    id: "9",
    name: "Dragon Roll",
    description: "Eel and cucumber topped with avocado and eel sauce",
    price: 19.99,
    image: "/food/food_9.png",
    category: "sushi",
    rating: 4.8,
  },
  {
    id: "10",
    name: "Iced Matcha Latte",
    description: "Premium matcha green tea with milk over ice",
    price: 4.99,
    image: "/food/food_10.png",
    category: "drinks",
    rating: 4.6,
  },
  {
    id: "11",
    name: "Fresh Berry Mojito",
    description: "Mixed berries with mint, lime, and sparkling water",
    price: 6.99,
    image: "/food/food_11.png",
    category: "drinks",
    rating: 4.7,
  },
  {
    id: "12",
    name: "Pad Thai",
    description: "Rice noodles with shrimp, tofu, peanuts, and tamarind sauce",
    price: 15.99,
    image: "/food/food_12.png",
    category: "asian",
    rating: 4.8,
  },
  {
    id: "13",
    name: "Chicken Teriyaki",
    description: "Grilled chicken with teriyaki sauce and steamed rice",
    price: 14.99,
    image: "/food/food_13.png",
    category: "asian",
    rating: 4.6,
  },
  {
    id: "14",
    name: "Beef Stir Fry",
    description: "Tender beef strips with mixed vegetables in savory sauce",
    price: 16.99,
    image: "/food/food_14.png",
    category: "asian",
    rating: 4.7,
  },
  {
    id: "15",
    name: "Dim Sum Platter",
    description:
      "Assorted steamed dumplings with various meat and vegetable fillings",
    price: 18.99,
    image: "/food/food_15.png",
    category: "asian",
    rating: 4.8,
  },
  {
    id: "16",
    name: "Korean BBQ Bowl",
    description: "Grilled marinated beef with kimchi and steamed rice",
    price: 17.99,
    image: "/food/food_16.png",
    category: "asian",
    rating: 4.9,
  },
  {
    id: "17",
    name: "Beef Tacos",
    description:
      "Three soft corn tortillas with seasoned beef, onions, and cilantro",
    price: 13.99,
    image: "/food/food_17.png",
    category: "mexican",
    rating: 4.7,
  },
  {
    id: "18",
    name: "Chicken Quesadilla",
    description:
      "Grilled flour tortilla filled with chicken, cheese, and peppers",
    price: 14.99,
    image: "/food/food_18.png",
    category: "mexican",
    rating: 4.6,
  },
  {
    id: "19",
    name: "Guacamole & Chips",
    description:
      "Fresh avocado dip with lime, tomatoes, and crispy tortilla chips",
    price: 8.99,
    image: "/food/food_19.png",
    category: "mexican",
    rating: 4.5,
  },
  {
    id: "20",
    name: "Club Sandwich",
    description: "Triple-decker with turkey, bacon, lettuce, and tomato",
    price: 11.99,
    image: "/food/food_20.png",
    category: "sandwiches",
    rating: 4.6,
  },
  {
    id: "21",
    name: "Grilled Chicken Panini",
    description: "Grilled chicken with pesto, mozzarella, and roasted peppers",
    price: 12.99,
    image: "/food/food_21.png",
    category: "sandwiches",
    rating: 4.7,
  },
  {
    id: "22",
    name: "Veggie Wrap",
    description:
      "Hummus, grilled vegetables, and feta cheese in a spinach wrap",
    price: 10.99,
    image: "/food/food_22.png",
    category: "sandwiches",
    rating: 4.5,
  },
  {
    id: "23",
    name: "New York Cheesecake",
    description: "Classic creamy cheesecake with berry compote",
    price: 8.99,
    image: "/food/food_23.png",
    category: "desserts",
    rating: 4.8,
  },
  {
    id: "24",
    name: "Tiramisu",
    description: "Italian coffee-flavored dessert with mascarpone cream",
    price: 8.99,
    image: "/food/food_24.png",
    category: "desserts",
    rating: 4.7,
  },
  {
    id: "25",
    name: "Spaghetti Bolognese",
    description: "Classic meat sauce with Italian herbs and parmesan",
    price: 14.99,
    image: "/food/food_25.png",
    category: "pasta",
    rating: 4.5,
  },
  {
    id: "26",
    name: "Penne Arrabbiata",
    description: "Spicy tomato sauce with garlic and fresh basil",
    price: 12.99,
    image: "/food/food_26.png",
    category: "pasta",
    rating: 4.4,
  },
  {
    id: "27",
    name: "Quinoa Bowl",
    description:
      "Mixed greens, quinoa, roasted vegetables, and tahini dressing",
    price: 11.99,
    image: "/food/food_27.png",
    category: "salads",
    rating: 4.6,
  },
  {
    id: "28",
    name: "Greek Salad",
    description:
      "Fresh vegetables, olives, and feta cheese with olive oil dressing",
    price: 10.99,
    image: "/food/food_28.png",
    category: "salads",
    rating: 4.5,
  },
  {
    id: "29",
    name: "Pepperoni Supreme",
    description:
      "Loaded with pepperoni, mozzarella, and our signature tomato sauce",
    price: 16.99,
    image: "/food/food_29.png",
    category: "pizza",
    rating: 4.6,
  },
  {
    id: "30",
    name: "BBQ Chicken Pizza",
    description:
      "Grilled chicken, red onions, and BBQ sauce with melted cheese blend",
    price: 17.99,
    image: "/food/food_30.png",
    category: "pizza",
    rating: 4.5,
  },
  {
    id: "31",
    name: "Cheese Deluxe Burger",
    description:
      "Double beef patties with melted cheddar, caramelized onions, and bacon",
    price: 15.99,
    image: "/food/food_31.png",
    category: "burgers",
    rating: 4.7,
  },
  {
    id: "32",
    name: "Veggie Supreme Burger",
    description:
      "Plant-based patty with grilled mushrooms, avocado, and vegan mayo",
    price: 13.99,
    image: "/food/food_32.png",
    category: "burgers",
    rating: 4.4,
  },
];

function filterFoodsByCategory(foods: FoodItem[], category: string) {
  if (category === "all") return foods;
  return foods.filter(
    (food) => food.category.toLowerCase() === category.toLowerCase()
  );
}

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFoods, setFilteredFoods] = useState(sampleFoods);

  useEffect(() => {
    const filtered = sampleFoods.filter((food) =>
      food.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const categoryFiltered = filterFoodsByCategory(filtered, selectedCategory);
    setFilteredFoods(categoryFiltered);
  }, [searchQuery, selectedCategory]);

  return (
    <>
      <Navbar />
      <main className="menu-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="menu-hero"
        >
          <h1>Our Menu</h1>
          <p>Discover our delicious selection of meals prepared with love</p>
        </motion.div>

        <section className="menu-filters-section">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="menu-container"
          >
            <ExploreMenu
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </motion.div>
        </section>

        <section className="menu-items-section">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="menu-grid-container"
          >
            <div className="search-input-container">
              <input
                type="text"
                placeholder="Search for food..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            <FoodDisplay
              foods={filteredFoods}
              selectedCategory={selectedCategory}
            />

            {filteredFoods.length === 0 && (
              <div className="no-food-found">No Such food found</div>
            )}
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
