import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, Calendar, Heart } from "react-feather";
import Card from "./ui/Card";

const features = [
  {
    icon: <MessageCircle className="feature-icon" />,
    title: "24/7 Chat Support",
    description:
      "Get instant answers to your health questions anytime, anywhere.",
  },
  {
    icon: <Calendar className="feature-icon" />,
    title: "Easy Appointment Booking",
    description:
      "Schedule appointments with healthcare professionals hassle-free.",
  },
  {
    icon: <Heart className="feature-icon" />,
    title: "Personalized Health Tips",
    description:
      "Receive tailored health advice based on your profile and concerns.",
  },
];

function FeatureSection() {
  return (
    <section className="feature-section">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="section-title"
        >
          Our Features
        </motion.h2>
        <div className="feature-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card>
                {feature.icon}
                <h3 className="feature-title">{feature.title}</h3>
                <p>{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeatureSection;
