import { useNavigate } from 'react-router-dom'

const features = [
  {
    icon: '📋',
    title: 'Describe Your Symptoms',
    description: 'Tell us what you are feeling and for how long. Our AI will help make sense of it.',
    path: '/patient/symptoms',
    color: 'purple',
  },
  {
    icon: '💬',
    title: 'AI Consultation',
    description: 'Chat with our medical AI assistant. Ask questions and get clear, simple answers.',
    path: '/patient/consultation',
    color: 'blue',
  },
]

const colorMap: Record<string, { card: string; btn: string; icon: string }> = {
  purple: {
    card: 'hover:border-purple-300',
    btn: 'bg-purple-600 hover:bg-purple-700',
    icon: 'bg-purple-50',
  },
  blue: {
    card: 'hover:border-blue-300',
    btn: 'bg-blue-600 hover:bg-blue-700',
    icon: 'bg-blue-50',
  },
}

export default function PatientHome() {
  const navigate = useNavigate()

  return (
    <div className="min-h-[90vh] bg-gray-50 px-6 py-12">
      <div className="max-w-3xl mx-auto flex flex-col gap-12">

        {/* Header */}
        <div className="text-center flex flex-col gap-3">
          <span className="text-5xl">🏥</span>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome to Patient Care
          </h1>
          <p className="text-gray-500 text-base max-w-lg mx-auto">
            This space is designed for you — no medical knowledge needed.
            Describe how you feel and let our AI guide you.
          </p>
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium px-4 py-2 rounded-full mx-auto mt-1">
            ⚠️ This app does not replace a real doctor. Always consult a medical professional.
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {features.map(f => {
            const c = colorMap[f.color]
            return (
              <div
                key={f.path}
                onClick={() => navigate(f.path)}
                className={`bg-white rounded-2xl border border-gray-200 ${c.card} p-6 flex flex-col gap-4 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-200`}
              >
                <div className={`w-12 h-12 rounded-xl ${c.icon} flex items-center justify-center text-2xl`}>
                  {f.icon}
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900 text-lg">{f.title}</h2>
                  <p className="text-gray-500 text-sm mt-1">{f.description}</p>
                </div>
                <button className={`mt-auto w-full py-2 rounded-lg text-white text-sm font-medium ${c.btn} transition-colors`}>
                  Get Started →
                </button>
              </div>
            )
          })}
        </div>

        {/* Reassurance section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-4">
          <h3 className="font-semibold text-gray-900">How it works</h3>
          <div className="flex flex-col gap-3">
            {[
              { step: '1', text: 'Describe your symptoms in plain language — no medical terms needed' },
              { step: '2', text: 'Our AI analyzes what you shared and asks follow-up questions' },
              { step: '3', text: 'You receive a clear summary and guidance on what to do next' },
            ].map(item => (
              <div key={item.step} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                  {item.step}
                </div>
                <p className="text-gray-600 text-sm pt-1">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}