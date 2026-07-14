import { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

type Message = {
  id: number
  role: 'user' | 'ai'
  text: string
  time: string
}

function getTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export default function Consultation() {
  const location = useLocation()
  const form = location.state?.form
  const bottomRef = useRef<HTMLDivElement>(null)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const initialMessage = form
    ? `Hello ${form.name}! I have reviewed your symptoms. You reported: "${form.mainSymptom}" for ${form.duration}, with a severity of ${form.severity}/10.${form.otherSymptoms.length > 0 ? ` You also mentioned: ${form.otherSymptoms.join(', ')}.` : ''} I am here to help you understand your situation better. What would you like to know?`
    : 'Hello! I am your medical AI assistant. Please describe your symptoms and I will do my best to help you understand your situation.'

  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: 'ai', text: initialMessage, time: getTime() }
  ])

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

    setTimeout(() => {
      const aiMsg: Message = {
        id: messages.length + 1,
        role: 'ai',
        text: `Thank you for sharing that. This is a placeholder response to: "${text.trim()}". Once connected to your local AI model, I will provide real medical guidance here. Remember this is for educational purposes only — always consult a real doctor.`,
        time: getTime()
      }
      setMessages(prev => [...prev, aiMsg])
      setLoading(false)
    }, 1200)
  }

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      sendMessage(input)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center text-white text-lg">
          🏥
        </div>
        <div>
          <h1 className="font-semibold text-gray-900 text-sm">Medical AI Consultation</h1>
          <p className="text-xs text-green-500 font-medium">● Online</p>
        </div>
        <div className="ml-auto bg-amber-50 border border-amber-200 text-amber-700 text-xs px-3 py-1 rounded-full">
          ⚠️ Not a substitute for a real doctor
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-2xl mx-auto flex flex-col gap-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 ${
                msg.role === 'ai' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {msg.role === 'ai' ? '🏥' : '👤'}
              </div>
              <div className={`max-w-[75%] flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-purple-600 text-white rounded-tr-sm'
                    : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm'
                }`}>
                  {msg.text}
                </div>
                <span className="text-xs text-gray-400">{msg.time}</span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-sm">🏥</div>
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

      {/* Input */}
      <div className="bg-white border-t border-gray-100 px-4 py-4">
        <div className="max-w-2xl mx-auto flex gap-3 items-center">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask a question about your symptoms..."
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium transition-colors"
          >
            Send →
          </button>
        </div>
        <p className="text-center text-xs text-gray-300 mt-2">
          For educational purposes only — always consult a real doctor
        </p>
      </div>

    </div>
  )
}