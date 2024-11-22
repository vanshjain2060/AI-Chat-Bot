import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "./ui/Card";
import Avatar from "./ui/Avatar";
import { ChevronLeft, ChevronRight } from "react-feather";

const testimonials = [
  {
    name: "Sarah Johnson",
    avatar: "/avatar1.jpg",
    text: "HealthChat has been a game-changer for me. I can get quick answers to my health concerns without leaving home.",
  },
  {
    name: "Michael Lee",
    avatar: "/avatar2.jpg",
    text: "The appointment booking feature saved me so much time. Highly recommend this app!",
  },
  {
    name: "Emily Davis",
    avatar: "/avatar3.jpg",
    text: "I love the personalized health tips. It's like having a health coach in my pocket!",
  },
];

function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  return (
    <section className="testimonial-section">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="section-title"
        >
          What Our Users Say
        </motion.h2>
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="testimonial-card">
                <div className="text-center">
                  <Avatar
                    src={testimonials[currentIndex].avatar}
                    alt={testimonials[currentIndex].name}
                  />
                  <p className="testimonial-text">
                    {testimonials[currentIndex].text}
                  </p>
                  <p className="testimonial-name">
                    {testimonials[currentIndex].name}
                  </p>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
          <button
            onClick={handlePrev}
            className="testimonial-nav testimonial-nav-prev"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={handleNext}
            className="testimonial-nav testimonial-nav-next"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}

export default TestimonialSection;
