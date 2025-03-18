"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { CartItem } from "@/context/CartContext";
import "./page.css";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function PlaceOrder() {
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const { cartItems, cartTotal } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!user) {
      toast.error("Please login to place an order");
      router.push("/login");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Please add some items to the cart first");
      router.push("/menu");
      return;
    }

    if (!address || !phone) {
      toast.error("Please fill in all required fields");
      setIsLoading(false);
      return;
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderItems: cartItems,
          address,
          phone,
          userId: user.id,
          email: user.email,
          isDelivered: false,
        }),
      });
      // console.log("checkout session response :", response);

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { sessionId } = await response.json();
      console.log("Session ID", sessionId);

      const stripe = await stripePromise;

      if (!stripe) {
        throw new Error("Stripe failed to initialize");
      }

      localStorage.setItem("address", address);
      localStorage.setItem("phone", phone);
      localStorage.setItem("email", user.email);
      localStorage.setItem("user", user.id);

      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        console.log("Error place :)");
        throw error;
      }

      router.push(`/success`);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to place order"
      );
      router.push("/place-order");
    } finally {
      setIsLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <button onClick={() => router.push("/")}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="place-order-page">
      <div className="place-order-container">
        <h1 className="place-order-title">Place Order</h1>
        <div className="order-summary">
          <h3>Order Summary</h3>
          {cartItems.map((item: CartItem) => (
            <div key={item.id} className="order-item">
              <div>
                <p className="order-item-name">{item.name}</p>
                <p className="order-item-quantity">Quantity: {item.quantity}</p>
              </div>
              <p className="order-item-price">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
          <div className="order-total">
            <div className="order-total-row">
              <p>Subtotal</p>
              <p>${cartTotal.toFixed(2)}</p>
            </div>
            <div className="order-total-row">
              <p>Delivery Fee</p>
              <p>$5.00</p>
            </div>
            <div className="order-total-row total">
              <p>Total</p>
              <p>${(cartTotal + 5).toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="delivery-info">
          <h3>Delivery Information</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="address">Delivery Address</label>
              <textarea
                id="address"
                name="address"
                rows={3}
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="submit-button"
            >
              {isLoading ? "Processing..." : "Proceed to Payment"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
