import { useState, useRef, useEffect } from 'react'

type Message = {
  id: number
  role: 'user' | 'ai'
  text: string
  time: string
}

const suggestions = [
  'Explain how the heart pumps blood',
  'What are the symptoms of appendicitis?',
  'Summarize the stages of wound healing',
  'What is the difference between arteries and veins?',
]

function getTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: 'ai',
      text: 'Hi! I am your medical AI assistant 🩺 Ask me anything about medicine, anatomy, pharmacology or your studies. I am here to help!',
      time: getTime()
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

const sendMessage = async (text: string) => {
    if (!text.trim()) return

    const userMsg: Message = {
      id: messages.length,
      role: 'user',
      text: text.trim(),
      time: getTime()
    }

    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('http://localhost:8000/chat/student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          history: messages.map(m => ({ role: m.role, text: m.text }))
        })
      })
      const data = await res.json()
      const aiMsg: Message = {
        id: messages.length + 1,
        role: 'ai',
        text: data.response,
        time: getTime()
      }
      setMessages(prev => [...prev, aiMsg])
    } catch (err) {
      const aiMsg: Message = {
        id: messages.length + 1,
        role: 'ai',
        text: 'Could not reach the AI. Make sure Ollama is running with Mistral installed.',
        time: getTime()
      }
      setMessages(prev => [...prev, aiMsg])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg">
          🤖
        </div>
        <div>
          <h1 className="font-semibold text-gray-900 text-sm">Medical AI Assistant</h1>
          <p className="text-xs text-green-500 font-medium">● Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-4">

        {/* Suggestions — only show at start */}
        {messages.length === 1 && (
          <div className="max-w-2xl mx-auto w-full">
            <p className="text-xs text-gray-400 mb-3 text-center">Try asking one of these</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {suggestions.map(s => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="text-left px-4 py-3 rounded-xl border border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm text-sm text-gray-600 transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Message bubbles */}
        <div className="max-w-2xl mx-auto w-full flex flex-col gap-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 ${
                msg.role === 'ai' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {msg.role === 'ai' ? '🤖' : '👤'}
              </div>

              {/* Bubble */}
              <div className={`max-w-[75%] flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-sm'
                    : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm'
                }`}>
                  {msg.text}
                </div>
                <span className="text-xs text-gray-400">{msg.time}</span>
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm">🤖</div>
              <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input bar */}
      <div className="bg-white border-t border-gray-100 px-4 py-4">
        <div className="max-w-2xl mx-auto flex gap-3 items-center">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask a medical question..."
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium transition-colors"
          >
            Send →
          </button>
        </div>
        <p className="text-center text-xs text-gray-300 mt-2">
          AI responses are for educational purposes only
        </p>
      </div>

    </div>
  )
}