"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingBagIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import "./Navbar.css";
import { useAuth } from "../context/AuthContext";

interface cartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(() => {
    return 0;
  });
  const { isLoading, user } = useAuth();
  const pathname = usePathname();

  const getCartItemsCount = () => {
    const storedCart = localStorage.getItem("cart");
    if (!storedCart) return;

    const cartData = JSON.parse(storedCart) as cartItem[];
    if (!Array.isArray(cartData)) return;

    const count = cartData.reduce(
      (acc, item) => acc + (item?.quantity ?? 0),
      0
    );
    setCartItemsCount(count);
  };
  useEffect(() => {
    getCartItemsCount();
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo */}
          <div className="navbar-logo">
            <Link href="/">
              <span className="logo-text">Food Delvo</span>
            </Link>
          </div>

          <div className="navbar-desktop-menu">
            <Link
              href="/"
              className={`nav-link ${pathname === "/" ? "active" : ""}`}
            >
              Home
            </Link>
            <Link
              href="/menu"
              className={`nav-link ${pathname === "/menu" ? "active" : ""}`}
            >
              Menu
            </Link>
            <Link
              href="/about"
              className={`nav-link ${pathname === "/about" ? "active" : ""}`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`nav-link ${pathname === "/contact" ? "active" : ""}`}
            >
              Contact
            </Link>
          </div>

          <div className="navbar-actions">
            <Link href="/cart" className="action-button">
              <ShoppingBagIcon className="icon" />
              <span className="cart-count">{cartItemsCount}</span>
            </Link>
            {!isLoading && user && (
              <Link href="/profile" className="action-button">
                <UserIcon className="icon" />
              </Link>
            )}
          </div>

          <div className="mobile-menu-button">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="menu-toggle"
            >
              {isMenuOpen ? (
                <XMarkIcon className="icon" />
              ) : (
                <Bars3Icon className="icon" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-items">
          <Link
            href="/"
            className={`mobile-nav-link ${pathname === "/" ? "active" : ""}`}
          >
            Home
          </Link>
          <Link
            href="/menu"
            className={`mobile-nav-link ${
              pathname === "/menu" ? "active" : ""
            }`}
          >
            Menu
          </Link>
          <Link
            href="/about"
            className={`mobile-nav-link ${
              pathname === "/about" ? "active" : ""
            }`}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`mobile-nav-link ${
              pathname === "/contact" ? "active" : ""
            }`}
          >
            Contact
          </Link>
          <div className="mobile-actions">
            <Link href="/cart" className="action-button">
              <ShoppingBagIcon className="icon" />
              <span className="cart-count">{cartItemsCount}</span>
            </Link>
            {!isLoading && user && (
              <Link href="/profile" className="action-button">
                <UserIcon className="icon" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
