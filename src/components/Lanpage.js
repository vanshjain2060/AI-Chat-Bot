import React from "react";
import { motion } from "framer-motion";
import Button from "./ui/Button";
import FeatureSection from "./FeatureSection";
import TestimonialSection from "./TestimonialSection";
import ContactSection from "./ContactSection";

function LandingPage({ onStartChat }) {
  return (
    <div className="landing-page">
      <header className="header">
        <nav className="container nav">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="logo"
          >
            HealthChat
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button onClick={onStartChat} variant="outline">
              Start Chat
            </Button>
          </motion.div>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="container">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="hero-title"
            >
              Welcome to HealthChat
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="hero-subtitle"
            >
              Your AI-powered healthcare assistant
            </motion.p>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.4,
                type: "spring",
                stiffness: 200,
                damping: 10,
              }}
            >
              <Button onClick={onStartChat} size="lg">
                Get Started
              </Button>
            </motion.div>
          </div>
        </section>

        <FeatureSection />
        <TestimonialSection />
        <ContactSection />
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2023 HealthChat. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
