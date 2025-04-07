import Navbar from "../../components/Navbar";
import { Metadata } from "next";
import "./page.css";

export const metadata: Metadata = {
  title: "Privacy Policy | Food Delvo",
  description: "Food Delvo privacy policy and data protection information",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="privacy-page">
        <div className="privacy-container">
          <header className="privacy-header">
            <h1 className="privacy-title">Privacy Policy</h1>
            <p className="privacy-subtitle">
              Your privacy is important to us. Learn how we collect, use, and
              protect your data.
            </p>
          </header>

          <div className="privacy-content">
            <section className="privacy-section">
              <h2 className="section-title">Introduction</h2>
              <p className="section-content">
                At Food Delvo, we take your privacy seriously. This Privacy
                Policy explains how we collect, use, disclose, and safeguard
                your information when you visit our website and use our
                services.
              </p>
            </section>

            <section className="privacy-section">
              <h2 className="section-title">Information We Collect</h2>
              <p className="section-content">
                We collect information that you provide directly to us,
                including:
              </p>
              <ul className="section-content">
                <li>Name and contact information</li>
                <li>Delivery address</li>
                <li>Payment information</li>
                <li>Order history</li>
                <li>Communication preferences</li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2 className="section-title">How We Use Your Information</h2>
              <p className="section-content">
                We use the information we collect to:
              </p>
              <ul className="section-content">
                <li>Process and deliver your orders</li>
                <li>Send you order confirmations and updates</li>
                <li>Respond to your comments and questions</li>
                <li>Send you marketing communications (with your consent)</li>
                <li>Improve our services and user experience</li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2 className="section-title">Information Sharing</h2>
              <p className="section-content">
                We do not sell or rent your personal information to third
                parties. We may share your information with:
              </p>
              <ul className="section-content">
                <li>Delivery partners to fulfill your orders</li>
                <li>Payment processors to handle transactions</li>
                <li>Service providers who assist our operations</li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2 className="section-title">Data Security</h2>
              <p className="section-content">
                We implement appropriate technical and organizational measures
                to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section className="privacy-section">
              <h2 className="section-title">Your Rights</h2>
              <p className="section-content">You have the right to:</p>
              <ul className="section-content">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent where applicable</li>
              </ul>
            </section>

            <section className="privacy-section">
              <h2 className="section-title">Contact Us</h2>
              <p className="section-content">
                If you have any questions about this Privacy Policy, please
                contact us at:
              </p>
              <p className="contact-info">
                Email:{" "}
                <a href="mailto:foodie@fooddelvo.com" className="contact-email">
                  foodie@fooddelvo.com
                </a>
                <br />
                Address: 123 Food Street, Foodie City, New Delhi, 110001
                <br />
                Phone: (123) 456-7890
              </p>
            </section>
            <p className="last-updated">Last Updated: March 2025</p>
          </div>
        </div>
      </main>
    </>
  );
}
