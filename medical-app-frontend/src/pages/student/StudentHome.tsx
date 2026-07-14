import { useNavigate } from 'react-router-dom'

const tools = [
  {
    icon: '📚',
    title: 'Library',
    description: 'Browse medical books, articles and resources. Ask the AI to summarize anything.',
    path: '/student/library',
    color: 'teal',
    tag: 'Resources'
  },
  {
    icon: '🤖',
    title: 'AI Assistant',
    description: 'Ask medical questions, get explanations, solve exercises with AI guidance.',
    path: '/student/chatbot',
    color: 'blue',
    tag: 'AI Powered'
  },
  {
    icon: '🔬',
    title: 'Surgery Simulation',
    description: 'Practice surgical procedures step by step. Get scored and learn from mistakes.',
    path: '/student/surgery',
    color: 'rose',
    tag: 'Interactive'
  },
]

const colorMap: Record<string, { card: string; tag: string; btn: string }> = {
  teal:  { card: 'hover:border-teal-300',  tag: 'bg-teal-50 text-teal-700',  btn: 'bg-teal-600 hover:bg-teal-700' },
  blue:  { card: 'hover:border-blue-300',  tag: 'bg-blue-50 text-blue-700',  btn: 'bg-blue-600 hover:bg-blue-700' },
  rose:  { card: 'hover:border-rose-300',  tag: 'bg-rose-50 text-rose-700',  btn: 'bg-rose-500 hover:bg-rose-600' },
}

export default function StudentHome() {
  const navigate = useNavigate()

  return (
    <div className="min-h-[90vh] bg-gray-50 px-6 py-12">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <span className="text-4xl">🎓</span>
        <h1 className="text-3xl font-bold text-gray-900 mt-3">
          Student Dashboard
        </h1>
        <p className="text-gray-500 mt-2 text-base">
          Everything you need to learn, practice and grow as a medical professional
        </p>
      </div>

      {/* Tool cards */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {tools.map(tool => {
          const c = colorMap[tool.color]
          return (
            <div
              key={tool.path}
              className={`bg-white rounded-2xl border border-gray-200 ${c.card} p-6 flex flex-col gap-4 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer`}
              onClick={() => navigate(tool.path)}
            >
              <div className="flex items-start justify-between">
                <span className="text-4xl">{tool.icon}</span>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${c.tag}`}>
                  {tool.tag}
                </span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{tool.title}</h2>
                <p className="text-gray-500 text-sm mt-1">{tool.description}</p>
              </div>
              <button
                className={`mt-auto w-full py-2 rounded-lg text-white text-sm font-medium ${c.btn} transition-colors`}
              >
                Open {tool.title} →
              </button>
            </div>
          )
        })}
      </div>

      {/* Quick stats bar */}
      <div className="max-w-4xl mx-auto mt-12 bg-white border border-gray-200 rounded-2xl p-6 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold text-teal-600">0</p>
          <p className="text-gray-500 text-sm mt-1">Resources read</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-blue-600">0</p>
          <p className="text-gray-500 text-sm mt-1">AI questions asked</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-rose-500">0</p>
          <p className="text-gray-500 text-sm mt-1">Surgeries practiced</p>
        </div>
      </div>

    </div>
  )
}