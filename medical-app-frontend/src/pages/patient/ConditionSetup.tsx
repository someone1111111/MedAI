import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

type Condition = {
  id: string
  label: string
  icon: string
}

export default function ConditionSetup() {
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()
  const [conditions, setConditions] = useState<Condition[]>([])
  const [selected, setSelected] = useState('')
  const [customCondition, setCustomCondition] = useState('')
  const [isForMe, setIsForMe] = useState(true)
  const [form, setForm] = useState({
    diagnosed_since: '',
    medications: '',
    notes: ''
  })
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('http://localhost:8000/health/conditions')
      .then(r => r.json())
      .then(data => {
        console.log('conditions:', data)
        setConditions(data.conditions)
      })
      .catch(err => console.error('fetch error:', err))
  }, [])

  const handleSave = async () => {
    setLoading(true)
    const finalCondition = selected === 'other' ? customCondition : selected
    try {
      await fetch('http://localhost:8000/health/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          condition: finalCondition,
          ...form
        })
      })
      localStorage.setItem('health_profile', JSON.stringify({
        condition: finalCondition,
        isForMe,
        ...form
      }))
      navigate('/patient/health')
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[90vh] bg-gray-50 px-6 py-10">
      <div className="max-w-xl mx-auto flex flex-col gap-8">

        <div>
          <h1 className="text-2xl font-bold text-gray-900">🏥 Set Up My Health Space</h1>
          <p className="text-gray-500 text-sm mt-1">
            Tell us about your condition so we can personalize your experience
          </p>
        </div>

        {/* Step 0 — Pick condition */}
        {step === 0 && (
          <>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">
                What is your main health condition?
              </p>
              <div className="grid grid-cols-2 gap-3">
                {conditions.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setSelected(c.id)}
                    className={`p-4 rounded-xl border text-left transition-colors ${
                      selected === c.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 bg-white hover:border-purple-300'
                    }`}
                  >
                    <span className="text-2xl">{c.icon}</span>
                    <p className="text-sm font-medium text-gray-900 mt-1">{c.label}</p>
                  </button>
                ))}
              </div>

              {/* Custom condition input for "Other" */}
              {selected === 'other' && (
                <div className="mt-4">
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Please describe your condition
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Lupus, Crohn's disease..."
                    value={customCondition}
                    onChange={e => setCustomCondition(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              )}
            </div>

            <button
              onClick={() => setStep(1)}
              disabled={!selected || (selected === 'other' && !customCondition.trim())}
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white font-medium text-sm transition-colors"
            >
              Next →
            </button>
          </>
        )}

        {/* Step 1 — Details */}
        {step === 1 && (
          <>
            <div className="flex flex-col gap-4">

              {/* Is this for you? checkbox */}
              {isAuthenticated && (
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isForMe"
                    checked={isForMe}
                    onChange={e => setIsForMe(e.target.checked)}
                    className="accent-purple-600 w-4 h-4"
                  />
                  <label htmlFor="isForMe" className="text-sm font-medium text-purple-800">
                    This health space is for me ({user?.name})
                  </label>
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  When were you diagnosed? (optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2 years ago, since 2019..."
                  value={form.diagnosed_since}
                  onChange={e => setForm(p => ({ ...p, diagnosed_since: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Current medications? (optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Metformin 500mg, Insulin..."
                  value={form.medications}
                  onChange={e => setForm(p => ({ ...p, medications: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Anything else we should know? (optional)
                </label>
                <textarea
                  placeholder="e.g. allergies, other conditions..."
                  value={form.notes}
                  onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(0)}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:border-gray-400 transition-colors"
              >
                ← Back
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex-1 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white font-medium text-sm transition-colors"
              >
                {loading ? 'Saving...' : 'Create My Space →'}
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  )
}