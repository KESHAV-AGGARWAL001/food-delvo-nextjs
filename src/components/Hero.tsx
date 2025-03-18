"use client";
import Image from "next/image";
import Link from "next/link";
import "./Hero.css";

export default function Hero() {
  return (
    <div className="hero">
      <Image
        src="/images/header.png"
        alt="Hero food image"
        className="hero-image"
        objectFit="cover"
        fill
      />
      <div className="hero-content">
        <main className="hero-main">
          <div className="hero-text">
            <h1 className="hero-title">
              <span>Delicious Food</span>
              <span className="hero-title-accent">Delivered To You</span>
            </h1>
            <div className="hero-buttons">
              <Link href="/menu" className="hero-button hero-button-primary">
                Order Now
              </Link>
              <Link href="/about" className="hero-button hero-button-secondary">
                Learn More
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
