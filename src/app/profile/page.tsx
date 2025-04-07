"use client";

import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import "./page.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

interface OrderItem {
  _id: string;
  orderItems: Array<{
    name: string;
    quantity: number;
    price: number;
    _id: string;
  }>;
  isDelivered: boolean;
}

export default function ProfilePage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/order/userOrder", {
          method: "GET",
        });
        const data = await response.json();
        // console.log(data);
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [isLoading, user, router]);

  const handleLogout = () => {
    try {
      logout();
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Navbar />
      <main className="profile-page">
        <div className="profile-container">
          <div className="profile-header">
            <div className="profile-avatar">
              <div className="avatar-with-name">
                <Image
                  src={"/icons/profile_icon.png"}
                  alt={user?.name}
                  width={20}
                  height={20}
                />
                <h1 className="profile-title">{user?.name}</h1>
              </div>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </div>
          </div>

          <div className="profile-section">
            <div className="section-header">
              <h2 className="section-title">Order History</h2>
            </div>
            <div className="section-content">
              {loading ? (
                <p className="loading-text">Loading orders...</p>
              ) : orders?.length === 0 ? (
                <p className="no-orders-text">No orders found</p>
              ) : (
                <div className="order-list">
                  {orders?.map((order, index) => (
                    <div key={order._id} className="order-item">
                      <div className="order-header">
                        <p className="order-id">Order {index + 1}</p>
                      </div>
                      <span
                        className={`order-status ${
                          order.isDelivered ? "delivered" : "not-delivered"
                        }`}
                      >
                        {order?.isDelivered ? "Delivered" : "Not Delivered yet"}
                      </span>
                      <div className="order-items">
                        {order.orderItems.map((item) => (
                          <div key={item._id} className="order-item-detail">
                            <span>
                              {item.quantity} x {item.name}
                            </span>
                            <span>
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="order-total">
                        <span>Total</span>
                        <span>
                          $
                          {order.orderItems
                            .reduce((total, item) => {
                              return total + item.price * item.quantity;
                            }, 5)
                            .toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
