"use client";
import Image from "next/image";
import Link from "next/link";
import "./Footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Brand Section */}
        <div className="footer-brand-section">
          <Link href="/" className="footer-logo">
            <span className="logo-text">Food Delvo</span>
          </Link>
          <p className="brand-description">
            Delivering happiness with every order. Your favorite food, delivered
            fast and fresh.
          </p>
          <div className="social-links">
            {[
              { icon: "/icons/facebook_icon.png", name: "Facebook" },
              { icon: "/icons/twitter_icon.png", name: "Twitter" },
              { icon: "/icons/linkedin_icon.png", name: "LinkedIn" },
            ].map((social) => (
              <Link key={social.name} href="#" className="social-icon-link">
                <Image
                  src={social.icon}
                  alt={social.name}
                  width={24}
                  height={24}
                  className="social-icon"
                  sizes="24px"
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="footer-links-section">
          <h3 className="footer-heading">Quick Links</h3>
          <nav className="footer-nav">
            {[
              { href: "/menu", label: "Menu" },
              { href: "/about", label: "About Us" },
              { href: "/contact", label: "Contact" },
              { href: "/privacy", label: "Privacy Policy" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="footer-link">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact Section */}
        <div className="footer-contact-section">
          <h3 className="footer-heading">Contact Us</h3>
          <address className="contact-info">
            <p>123 Food Street</p>
            <p>Foodie City, New Delhi, 110001</p>
            <p>
              <a href="tel:+11234567890" className="contact-link">
                (123) 456-7890
              </a>
            </p>
            <p>
              <a href="mailto:info@fooddelvo.com" className="contact-link">
                foodie@fooddelvo.com
              </a>
            </p>
          </address>
        </div>

        {/* App Download Section */}
        <div className="footer-app-section">
          <h3 className="footer-heading">Get the Food Delvo App</h3>
          <p className="app-description">
            Download our mobile app for a seamless food ordering experience.
            Available on iOS and Android.
          </p>
          <div className="app-store-buttons">
            <Link href="#" className="app-store-link">
              <Image
                src="/images/app_store.png"
                alt="Download on App Store"
                width={140}
                height={42}
                className="store-button"
                sizes="140px"
              />
            </Link>
            <Link href="#" className="app-store-link">
              <Image
                src="/images/play_store.png"
                alt="Get it on Google Play"
                width={140}
                height={42}
                className="store-button"
                sizes="140px"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p className="copyright">
          © {currentYear} Food Delvo. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
