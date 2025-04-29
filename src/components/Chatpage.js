// src/components/ChatPage.js
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { User, MessageCircle, ArrowLeft, Send, Mic, Trash2 } from 'react-feather';
import Button from './ui/Button';
import Input from './ui/Input';
import Card from './ui/Card';
import { sendMessageToGemini } from '../services/geminiApi';
import './ChatPage.css';

function ChatPage({ onBackToHome }) {
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I assist you today?', sender: 'bot', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const language = 'en-US';
  const scrollAreaRef = useRef(null);

  useEffect(() => {
    if (scrollAreaRef.current) scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSendMessage = async e => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);
    setMessages(prev => [...prev, { text: userMessage, sender: 'user', timestamp: new Date() }]);
    setIsTyping(true);

    try {
      const history = [...messages, { text: userMessage, sender: 'user' }];
      const botResponse = await sendMessageToGemini(history);
      setMessages(prev => [...prev, { text: botResponse, sender: 'bot', timestamp: new Date() }]);
    } catch (err) {
      console.error('Error sending message:', err);
      setMessages(prev => [...prev, { text: 'Error: failed to get response.', sender: 'bot', isError: true, timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleClearChat = () => setMessages([]);

  const handleSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition is not supported.');
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = language;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = e => setInput(e.results[0][0].transcript);
    recognition.onerror = e => console.error('Speech recognition error:', e.error);
    recognition.start();
  };

  return (
    <div className="chat-container">
      <Card className="chat-card">
        <div className="chat-header">
          <Button onClick={onBackToHome}><ArrowLeft /></Button>
          <Button onClick={handleClearChat}><Trash2 /></Button>
        </div>
        <div className="chat-messages" ref={scrollAreaRef}>
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`message ${msg.sender} ${msg.isError ? 'error' : ''}`}>
                <div className="message-content">
                  {msg.sender === 'bot' ? <MessageCircle className="message-icon bot-icon" /> : <User className="message-icon user-icon" />}
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                  <span className="timestamp">{msg.timestamp.toLocaleTimeString()}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isTyping && <div className="message bot typing-indicator"><div className="message-content">Bot is typing...</div></div>}
        </div>
        <div className="chat-input-container">
          <form onSubmit={handleSendMessage} className="chat-input">
            <Input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder={isLoading ? 'Please wait...' : 'Type your message...'} disabled={isLoading} />
            <Button type="submit" disabled={isLoading || !input.trim()}><Send /></Button>
            <Button type="button" onClick={handleSpeechRecognition} disabled={isLoading}><Mic /></Button>
          </form>
        </div>
      </Card>
    </div>
  );
}

export default ChatPage;
