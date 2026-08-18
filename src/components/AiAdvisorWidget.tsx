import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, Loader2, RotateCcw, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ChatMessage } from '../types';

// Simple helper to format basic Markdown bolding, bullets, and line breaks cleanly
const FormattedMessageText: React.FC<{ text: string }> = ({ text }) => {
  const lines = text.split('\n');

  return (
    <div className="space-y-1.5 leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="h-1" />;
        }

        // Bullet point detection
        if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
          const bulletContent = trimmed.substring(2);
          return (
            <div key={idx} className="flex items-start gap-1.5 pl-1 text-[11px] sm:text-xs">
              <span className="text-[#1A6B74] font-bold mt-0.5">•</span>
              <div>{renderInlineFormatting(bulletContent)}</div>
            </div>
          );
        }

        return (
          <div key={idx} className="text-xs sm:text-sm">
            {renderInlineFormatting(trimmed)}
          </div>
        );
      })}
    </div>
  );
};

// Helper for bold **text** and inline styling
function renderInlineFormatting(str: string) {
  const parts = str.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-[var(--text-main)]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export const AiAdvisorWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: "👋 Hi! I'm **Milo**, your strategic advisor at **Pimpliq Consultancy Ltd**. How can I assist you today with Brand Management, Executive Recruitment, Tax Compliance, or Corporate Events?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, loading]);

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'bot',
        text: "👋 Chat reset! I'm **Milo**. How can Pimpliq Consultancy assist your organization today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const currentHistory = [...messages, userMsg];
    setMessages(currentHistory);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: currentHistory.map(m => ({ sender: m.sender, text: m.text }))
        })
      });

      const data = await res.json();
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: data.reply || "Thank you for reaching out to Pimpliq Consultancy Ltd. How else may I assist you?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        model: data.model || 'gemini-3.1-flash-lite'
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: "Pimpliq Consultancy Ltd provides 5 pillars: Brand Management (8 modules), Executive Recruitment, Event Activation, Tax Advisory, and Strategic Consulting. How can we help?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const quickPills = [
    "Explain 8 Brand Modules",
    "Executive Recruitment Details",
    "Tax Compliance Support",
    "Corporate Event Planning",
    "Book a Strategy Call"
  ];

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-[#1A6B74] to-[#0F172A] text-white px-5 py-3.5 rounded-full shadow-2xl flex items-center gap-2.5 font-bold text-xs sm:text-sm border border-white/20 hover:scale-105 transition-transform"
      >
        <div className="w-7 h-7 rounded-full bg-[#D4AF37] text-[#0F172A] flex items-center justify-center">
          <Bot className="w-4 h-4" />
        </div>
        <span>Milo Advisor</span>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      </button>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-4 sm:right-6 z-40 w-[360px] sm:w-[420px] h-[540px] bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#0F172A] text-white p-4 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1A6B74] text-white flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white flex items-center gap-2">
                    Milo
                    <span className="text-[10px] font-normal px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Live AI
                    </span>
                  </h4>
                  <div className="text-[10px] text-gray-300 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                    <span>Pimpliq Virtual Strategic Advisor</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleResetChat}
                  title="Reset conversation"
                  className="text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[var(--bg-secondary)]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.sender === 'bot' && (
                    <div className="w-6 h-6 rounded-full bg-[#1A6B74] text-white flex items-center justify-center shrink-0 mt-1">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#1A6B74] text-white rounded-tr-none shadow-sm'
                        : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-main)] rounded-tl-none shadow-sm'
                    }`}
                  >
                    {msg.sender === 'user' ? (
                      <div>{msg.text}</div>
                    ) : (
                      <FormattedMessageText text={msg.text} />
                    )}
                    <div
                      className={`text-[9px] mt-1.5 text-right ${
                        msg.sender === 'user' ? 'text-white/70' : 'text-[var(--text-muted)]'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex gap-2.5 justify-start">
                  <div className="w-6 h-6 rounded-full bg-[#1A6B74] text-white flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="bg-[var(--bg-card)] border border-[var(--border-color)] p-3 rounded-2xl text-xs text-[var(--text-muted)] flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#1A6B74]" />
                    <span>Milo is formulating recommendations...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Pills */}
            <div className="px-3 py-2 bg-[var(--bg-card)] border-t border-[var(--border-color)] flex gap-2 overflow-x-auto no-scrollbar">
              {quickPills.map((pill, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(pill)}
                  className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[var(--bg-tertiary)] text-[var(--text-muted)] hover:bg-[#1A6B74]/10 hover:text-[#1A6B74] border border-[var(--border-color)] whitespace-nowrap transition-colors"
                >
                  {pill}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-[var(--bg-card)] border-t border-[var(--border-color)] flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !loading && handleSendMessage()}
                placeholder="Ask Milo a question..."
                className="flex-1 px-3.5 py-2 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs sm:text-sm text-[var(--text-main)] focus:outline-none focus:border-[#1A6B74]"
              />

              <button
                onClick={() => handleSendMessage()}
                disabled={loading || !input.trim()}
                className="w-8 h-8 rounded-full bg-[#1A6B74] text-white flex items-center justify-center hover:bg-[#10474D] disabled:opacity-40 transition-colors shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
