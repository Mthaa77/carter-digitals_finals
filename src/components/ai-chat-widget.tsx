'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-3 py-2">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full bg-cd-gold/60"
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hi! 👋 I'm Carter AI. Ask me about our services, pricing, or how we can help your business.",
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const sendMessage = async () => {
    const trimmed = input.trim()
    if (!trimmed || isLoading) return

    const userMessage: Message = { role: 'user', content: trimmed }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const chatMessages = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }))

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: chatMessages }),
      })

      const data = await res.json()

      if (data.success && data.message) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: data.message },
        ])
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content:
              data.error || "Sorry, I couldn't process that. Please try again.",
          },
        ])
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "Sorry, something went wrong. Please try again later.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="fixed bottom-40 sm:bottom-44 right-5 sm:right-6 z-[45] flex flex-col-reverse items-end gap-3">
      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-[320px] h-[450px] sm:w-[340px] sm:h-[470px] rounded-2xl overflow-hidden flex flex-col shadow-2xl shadow-black/40 border border-[#242424]/60"
            style={{
              background:
                'linear-gradient(135deg, rgba(20,20,20,0.95) 0%, rgba(13,13,13,0.98) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#242424]/60 bg-[#111111]/80">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cd-gold animate-pulse" />
                <span className="font-display font-semibold text-sm text-cd-gold">
                  Carter AI Assistant
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md text-[#C8C8C0] hover:text-[#F0EFE8] hover:bg-[#242424] transition-colors duration-200"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 custom-scrollbar">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-xl text-sm leading-relaxed font-sans ${
                      msg.role === 'user'
                        ? 'bg-cd-gold text-[#080808] rounded-br-sm'
                        : 'bg-[#1A1A1A] text-[#D0D0C8] border border-[#242424]/50 rounded-bl-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-[#1A1A1A] border border-[#242424]/50 rounded-xl rounded-bl-sm px-3 py-2">
                    <TypingIndicator />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="px-3 py-3 border-t border-[#242424]/60 bg-[#111111]/60">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about our services..."
                  disabled={isLoading}
                  className="flex-1 bg-[#1A1A1A] border border-[#242424] rounded-lg px-3 py-2.5 text-sm text-[#F0EFE8] placeholder:text-[#666] focus:outline-none focus:border-cd-gold/50 transition-colors duration-200 disabled:opacity-50 font-sans"
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
                  className="p-2.5 rounded-lg bg-cd-gold text-[#080808] hover:bg-cd-gold-light transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button + Tooltip */}
      <div className="relative flex items-center">
        <AnimatePresence>
          {!isOpen && (
            <motion.span
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.2 }}
              className="absolute right-full mr-3 whitespace-nowrap text-xs font-medium text-cd-text-muted bg-cd-surface/90 border border-cd-border rounded-lg px-3 py-1.5 pointer-events-none"
            >
              Chat with Carter AI
            </motion.span>
          )}
        </AnimatePresence>
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-[#1A1A1A] border border-[#242424] flex items-center justify-center shadow-lg shadow-black/30 hover:border-cd-gold/60 hover:scale-110 transition-all duration-300"
          whileTap={{ scale: 0.95 }}
          aria-label={isOpen ? 'Close chat assistant' : 'Open chat assistant'}
        >
          {isOpen ? (
            <X className="w-5 h-5 text-cd-gold" />
          ) : (
            <MessageCircle className="w-5 h-5 text-cd-gold" />
          )}
        </motion.button>
      </div>
    </div>
  )
}
