"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCart } from "../../context/CartContext";
import "./page.css";

export default function SuccessPage() {
  const { clearCart } = useCart();

  const createOrder = async () => {
    const dataSend = {
      orderItems: JSON.parse(localStorage.getItem("cartItems")!),
      address: localStorage.getItem("address"),
      phone: localStorage.getItem("phone"),
      user: localStorage.getItem("user"),
      email: localStorage.getItem("email"),
      isDelivered: false,
    };

    console.log("Data at success page : ", dataSend);
    const response = await fetch("/api/order/userOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataSend),
    });
    const data = response.json();
    console.log("Response data :) ", data);
  };

  useEffect(() => {
    createOrder();
    clearCart();
    localStorage.removeItem("address");
    localStorage.removeItem("phone");
    localStorage.removeItem("email");
    localStorage.removeItem("user");
    localStorage.removeItem("cartItems");
  }, []);

  const router = useRouter();
  return (
    <div className="success-page">
      <h1>Payment Successful!</h1>
      <p>Thank you for your purchase.</p>
      <button onClick={() => router.push("/")}>Continue Shopping</button>
    </div>
  );
}
