"use client"; // Mark this as a Client Component because of Framer Motion

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { motion } from "framer-motion";
import "./About.css";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};

const slideUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.5 },
  },
};

const stats = [
  { number: "10K+", label: "Happy Customers" },
  { number: "500+", label: "Restaurants" },
  { number: "50+", label: "Cities" },
  { number: "24/7", label: "Support" },
];

const values = [
  {
    icon: "🍽️",
    title: "Quality First",
    description:
      "We partner with only the best restaurants to ensure top-quality food delivery.",
  },
  {
    icon: "⚡",
    title: "Lightning Fast",
    description:
      "Our efficient delivery network ensures your food arrives hot and fresh.",
  },
  {
    icon: "💝",
    title: "Customer Focus",
    description:
      "Your satisfaction is our priority. We're here to serve you better.",
  },
  {
    icon: "🌱",
    title: "Sustainability",
    description:
      "We're committed to eco-friendly practices and sustainable packaging.",
  },
];

const team = [
  {
    name: "Keshav Aggarwal",
    role: "Founder & CEO",
    image: "/team/ceo.png",
  },
  {
    name: "Chiranji Lal Mittal",
    role: "Head of Operations",
    image: "/team/operations.png",
  },
  {
    name: "Yuvan Mittal",
    role: "Tech Lead",
    image: "/team/tech.png",
  },
];

export default function About() {
  return (
    <>
      <Navbar />
      <main className="about-page">
        {/* Hero Section */}
        <motion.div
          className="about-hero"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <h1>Our Story</h1>
          <p>
            Delivering happiness through delicious food and exceptional service
            since 2025.
          </p>
        </motion.div>

        <section className="about-content">
          {/* Mission Section */}
          <motion.div
            className="mission-section"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="mission-content" variants={slideUp}>
              <h2>Our Mission</h2>
              <p>
                At Food Delvo, we are on a mission to transform the way people
                experience food delivery. We believe that great food should be
                accessible to everyone, anywhere, anytime.
              </p>
              <p>
                Through innovative technology and partnerships with the finest
                restaurants, we are creating a seamless connection between food
                lovers and exceptional cuisine.
              </p>
            </motion.div>
            <motion.div className="mission-image" variants={slideUp}>
              <Image
                src="/images/mission-image.png"
                alt="Food Delvo Mission"
                width={500}
                height={400}
                className="rounded-image"
              />
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            className="stats-section"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div key={index} className="stat-card" variants={slideUp}>
                <h3>{stat.number}</h3>
                <p>{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Values Section */}
          <motion.div
            className="values-section"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2>Our Values</h2>
            <div className="values-grid">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="value-card"
                  variants={slideUp}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="value-icon">{value.icon}</div>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Team Section */}
          <motion.div
            className="team-section"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2>Meet Our Team</h2>
            <div className="team-grid">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  className="team-card"
                  variants={slideUp}
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="team-image-container">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={200}
                      height={200}
                      className="team-image"
                    />
                  </div>
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
