import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const moods = [
  { label: 'Great', icon: '😄', value: 'great' },
  { label: 'Good', icon: '🙂', value: 'good' },
  { label: 'Okay', icon: '😐', value: 'okay' },
  { label: 'Bad', icon: '😔', value: 'bad' },
  { label: 'Terrible', icon: '😣', value: 'terrible' },
]

const symptomOptions = [
  'Pain', 'Fatigue', 'Nausea', 'Headache',
  'Dizziness', 'Shortness of breath', 'Anxiety',
  'Poor sleep', 'Low appetite', 'Swelling',
]

export default function MoodLogger() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    mood: '',
    energy: 5,
    symptoms: [] as string[],
    notes: ''
  })
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)

  const toggleSymptom = (s: string) => {
    setForm(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(s)
        ? prev.symptoms.filter(x => x !== s)
        : [...prev.symptoms, s]
    }))
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      await fetch('http://localhost:8000/health/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      setSaved(true)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (saved) {
    return (
      <div className="min-h-[90vh] bg-gray-50 flex items-center justify-center px-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 max-w-md w-full text-center flex flex-col gap-5">
          <span className="text-5xl">✅</span>
          <h2 className="text-xl font-bold text-gray-900">Log saved!</h2>
          <p className="text-gray-500 text-sm">
            Your health log has been recorded. Keep tracking to help the AI understand your patterns better.
          </p>
          <button
            onClick={() => navigate('/patient/health')}
            className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium text-sm transition-colors"
          >
            Back to My Health Space
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[90vh] bg-gray-50 px-6 py-10">
      <div className="max-w-xl mx-auto flex flex-col gap-6">

        <div>
          <h1 className="text-2xl font-bold text-gray-900">📝 How are you feeling?</h1>
          <p className="text-gray-500 text-sm mt-1">Log your health whenever you feel like it</p>
        </div>

        {/* Mood */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 flex flex-col gap-3">
          <p className="text-sm font-medium text-gray-700">Overall mood</p>
          <div className="flex gap-3 justify-between">
            {moods.map(m => (
              <button
                key={m.value}
                onClick={() => setForm(p => ({ ...p, mood: m.value }))}
                className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition-colors flex-1 ${
                  form.mood === m.value
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <span className="text-2xl">{m.icon}</span>
                <span className="text-xs text-gray-600">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Energy */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 flex flex-col gap-3">
          <p className="text-sm font-medium text-gray-700">
            Energy level: <span className="text-purple-600 font-bold">{form.energy}/10</span>
          </p>
          <input
            type="range"
            min={1}
            max={10}
            value={form.energy}
            onChange={e => setForm(p => ({ ...p, energy: Number(e.target.value) }))}
            className="w-full accent-purple-600"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>Exhausted</span>
            <span>Full of energy</span>
          </div>
        </div>

        {/* Symptoms */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 flex flex-col gap-3">
          <p className="text-sm font-medium text-gray-700">Any symptoms today?</p>
          <div className="flex flex-wrap gap-2">
            {symptomOptions.map(s => (
              <button
                key={s}
                onClick={() => toggleSymptom(s)}
                className={`px-3 py-1 rounded-full border text-xs font-medium transition-colors ${
                  form.symptoms.includes(s)
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-purple-300'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 flex flex-col gap-3">
          <p className="text-sm font-medium text-gray-700">Anything to add? (optional)</p>
          <textarea
            placeholder="How was your day, what did you eat, how did you sleep..."
            value={form.notes}
            onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={!form.mood || loading}
          className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white font-medium text-sm transition-colors"
        >
          {loading ? 'Saving...' : 'Save Log →'}
        </button>

      </div>
    </div>
  )
}