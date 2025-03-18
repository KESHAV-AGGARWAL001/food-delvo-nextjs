"use client";

import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import "./page.css";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, calculateTotal } =
    useCart();
  const { user, isLoading } = useAuth();

  const deliveryFee = 5.99;
  const subtotal = calculateTotal();
  const total = subtotal + deliveryFee;

  // useEffect(() => {
  //   console.log("Cart page user data :) ", user);
  // });

  if (isLoading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <>
        <Navbar />
        <div className="empty-cart-page">
          <div className="empty-cart">
            <h1 className="empty-cart-title">Your cart is empty</h1>
            <p className="empty-cart-text">
              Add some delicious items to your cart!
            </p>
            <Link href="/menu" className="continue-shopping">
              Browse Menu
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="cart-page">
      <Navbar />
      <main className="cart-container">
        <h1 className="cart-title">Shopping Cart</h1>
        <div className="cart-content">
          {/* Cart Items */}
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                {/* Item Image */}
                <div className="item-image">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="object-cover rounded-lg"
                  />
                </div>

                {/* Item Name */}
                <h3 className="item-name">{item.name}</h3>

                {/* Item Price */}
                <p className="item-price">${item.price.toFixed(2)}</p>

                {/* Quantity Controls */}
                <div className="quantity-controls">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                    className="quantity-button"
                  >
                    -
                  </button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="quantity-button"
                  >
                    +
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="remove-button"
                >
                  X
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="cart-summary">
            <h2 className="summary-title">Order Summary</h2>
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            {user ? (
              <Link href="/place-order" className="checkout-button">
                Proceed to Checkout
              </Link>
            ) : (
              <Link href="/login" className="checkout-button">
                Login to Checkout
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
