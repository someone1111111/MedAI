import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const conditionLabels: Record<string, { label: string; icon: string; color: string }> = {
  diabetes:     { label: 'Diabetes',            icon: '🩸', color: 'purple' },
  hypertension: { label: 'Hypertension',        icon: '❤️', color: 'rose' },
  asthma:       { label: 'Asthma',              icon: '🫁', color: 'blue' },
  obesity:      { label: 'Obesity',             icon: '⚖️', color: 'amber' },
  anxiety:      { label: 'Anxiety/Depression',  icon: '🧠', color: 'teal' },
  arthritis:    { label: 'Arthritis',           icon: '🦴', color: 'orange' },
  heart_disease:{ label: 'Heart Disease',       icon: '💓', color: 'red' },
  other:        { label: 'Other',               icon: '➕', color: 'gray' },
}

const tools = [
  {
    icon: '📝',
    title: 'Log How I Feel',
    description: 'Track your mood, energy and symptoms whenever you want.',
    path: '/patient/log',
    color: 'bg-purple-50 text-purple-700 border-purple-200'
  },
  {
    icon: '💬',
    title: 'AI Companion',
    description: 'Chat with your personal AI about your condition, habits and feelings.',
    path: '/patient/consultation',
    color: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  {
    icon: '🥗',
    title: 'Lifestyle Tips',
    description: 'Eating habits, exercise and daily tips tailored to your condition.',
    path: '/patient/lifestyle',
    color: 'bg-green-50 text-green-700 border-green-200'
  },
  {
    icon: '🧠',
    title: 'Mental Wellness',
    description: 'Psychological support and tips for living with your condition.',
    path: '/patient/mental',
    color: 'bg-teal-50 text-teal-700 border-teal-200'
  },
  {
    icon: '📚',
    title: 'My Articles',
    description: 'Curated articles and resources about your condition.',
    path: '/patient/articles',
    color: 'bg-amber-50 text-amber-700 border-amber-200'
  },
  {
    icon: '🩺',
    title: 'Quick Consultation',
    description: 'Describe new symptoms and get instant AI guidance.',
    path: '/patient/symptoms',
    color: 'bg-rose-50 text-rose-700 border-rose-200'
  },
]

export default function HealthSpace() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const savedProfile = localStorage.getItem('health_profile')
  const profile = savedProfile ? JSON.parse(savedProfile) : null

  if (!profile) {
    return (
      <div className="min-h-[90vh] bg-gray-50 flex items-center justify-center px-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 max-w-md w-full text-center flex flex-col gap-5">
          <span className="text-5xl">🏥</span>
          <h2 className="text-xl font-bold text-gray-900">Set up your Health Space</h2>
          <p className="text-gray-500 text-sm">
            Tell us about your condition and we'll personalize everything for you.
          </p>
          <button
            onClick={() => navigate('/patient/setup')}
            className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium text-sm transition-colors"
          >
            Get Started →
          </button>
          <button
            onClick={() => navigate('/patient/symptoms')}
            className="text-sm text-gray-400 hover:text-gray-600"
          >
            Skip — just use quick consultation
          </button>
        </div>
      </div>
    )
  }

  const conditionInfo = conditionLabels[profile.condition] || conditionLabels['other']

  return (
    <div className="min-h-[90vh] bg-gray-50 px-6 py-10">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">

        {/* Header */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 flex items-center gap-4">
          <span className="text-4xl">{conditionInfo.icon}</span>
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Welcome{user ? `, ${user.name}` : ''}!
            </h1>
            <p className="text-gray-500 text-sm mt-0.5">
              Your Health Space · {conditionInfo.label}
            </p>
            {profile.medications && (
              <p className="text-xs text-gray-400 mt-1">
                💊 {profile.medications}
              </p>
            )}
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('health_profile')
              navigate('/patient/setup')
            }}
            className="ml-auto text-xs text-gray-400 hover:text-gray-600 border border-gray-200 px-3 py-1 rounded-lg"
          >
            Edit profile
          </button>
        </div>

        {/* Tools grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tools.map(tool => (
            <div
              key={tool.path}
              onClick={() => navigate(tool.path)}
              className={`rounded-2xl border p-5 cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-200 ${tool.color}`}
            >
              <span className="text-3xl">{tool.icon}</span>
              <h3 className="font-semibold text-base mt-3">{tool.title}</h3>
              <p className="text-sm mt-1 opacity-80">{tool.description}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}