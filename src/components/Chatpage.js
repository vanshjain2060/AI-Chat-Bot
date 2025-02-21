import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { User, MessageCircle, ArrowLeft, Send, Mic, Trash2 } from "react-feather";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Card from "./ui/Card";
import Select from "./ui/Select";
import { sendMessageToMonster } from "../services/monsterApi";
import "./ChatPage.css";

function ChatPage({ onBackToHome }) {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot", timestamp: new Date() },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedModel, setSelectedModel] = useState("Meta-Llama");
  const [language, setLanguage] = useState("en-US");
  const scrollAreaRef = useRef(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      const userMessage = input.trim();
      setInput("");
      setIsLoading(true);
      setMessages((prev) => [
        ...prev,
        { text: userMessage, sender: "user", timestamp: new Date() },
      ]);
      setIsTyping(true);
      try {
        const botResponse = await sendMessageToMonster(
          [{ text: userMessage, sender: "user" }],
          selectedModel
        );
        setMessages((prev) => [
          ...prev,
          { text: botResponse, sender: "bot", timestamp: new Date() },
        ]);
      } catch (error) {
        console.error("Error sending message:", error);
      } finally {
        setIsLoading(false);
        setIsTyping(false);
      }
    }
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  const handleSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = language;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setInput(speechResult);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };

    recognition.start();
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="chat-container">
      <Card className="chat-card">
        <div className="chat-header">
          <Button onClick={onBackToHome}>
            <ArrowLeft />
          </Button>
          <Select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="model-selector"
          >
            <option value="Meta-Llama">Meta-Llama</option>
            <option value="Mistral">Mistral</option>
            <option value="Microsoft-Phi">Microsoft-Phi</option>
            <option value="Google-Gemma">Google-Gemma</option>
          </Select>
          <Button onClick={handleClearChat}>
            <Trash2 />
          </Button>
        </div>
        <div className="chat-messages" ref={scrollAreaRef}>
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`message ${message.sender} ${message.isError ? "error" : ""}`}
              >
                <div className="message-content">
                  {message.sender === "bot" ? (
                    <MessageCircle className="message-icon bot-icon" />
                  ) : (
                    <User className="message-icon user-icon" />
                  )}
                  <ReactMarkdown>{message.text}</ReactMarkdown>
                  <span className="timestamp">{message.timestamp.toLocaleTimeString()}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isTyping && (
            <div className="message bot typing-indicator">
              <div className="message-content">Bot is typing...</div>
            </div>
          )}
        </div>
        <div className="chat-input-container">
          <form onSubmit={handleSendMessage} className="chat-input">
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isLoading ? "Please wait..." : "Type your message..."}
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              <Send />
            </Button>
            <Button type="button" onClick={handleSpeechRecognition} disabled={isLoading}>
              <Mic />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}

export default ChatPage;