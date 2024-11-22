import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LandingPage from "./components/LandingPage";
import ChatPage from "./components/ChatPage";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("landing");

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        {currentPage === "landing" ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LandingPage onStartChat={() => setCurrentPage("chat")} />
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ChatPage onBackToHome={() => setCurrentPage("landing")} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
