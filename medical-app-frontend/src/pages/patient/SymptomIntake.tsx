import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type FormData = {
  name: string
  age: string
  gender: string
  mainSymptom: string
  duration: string
  severity: number
  otherSymptoms: string[]
  notes: string
}

const otherSymptomOptions = [
  'Fever', 'Fatigue', 'Nausea', 'Vomiting',
  'Headache', 'Dizziness', 'Chest pain', 'Shortness of breath',
  'Back pain', 'Loss of appetite', 'Sweating', 'Chills',
]

const steps = ['Personal Info', 'Main Symptom', 'Details', 'Review']

export default function SymptomIntake() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [form, setForm] = useState<FormData>({
    name: '',
    age: '',
    gender: '',
    mainSymptom: '',
    duration: '',
    severity: 5,
    otherSymptoms: [],
    notes: '',
  })

  const update = (field: keyof FormData, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const toggleSymptom = (symptom: string) => {
    setForm(prev => ({
      ...prev,
      otherSymptoms: prev.otherSymptoms.includes(symptom)
        ? prev.otherSymptoms.filter(s => s !== symptom)
        : [...prev.otherSymptoms, symptom]
    }))
  }

  const canNext = () => {
    if (currentStep === 0) return form.name && form.age && form.gender
    if (currentStep === 1) return form.mainSymptom && form.duration
    if (currentStep === 2) return true
    return true
  }

  const handleSubmit = () => {
    // Will send to backend later
    navigate('/patient/consultation', { state: { form } })
  }

  //const progress = ((currentStep) / (steps.length - 1)) * 100

  return (
    <div className="min-h-[90vh] bg-gray-50 px-6 py-10">
      <div className="max-w-xl mx-auto flex flex-col gap-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">📋 Symptom Intake</h1>
          <p className="text-gray-500 text-sm mt-1">
            Answer a few simple questions so we can help you better
          </p>
        </div>

        {/* Step indicators */}
        <div className="flex items-center gap-2">
          {steps.map((step, i) => (
            <div key={step} className="flex items-center gap-2 flex-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                i < currentStep
                  ? 'bg-purple-600 text-white'
                  : i === currentStep
                  ? 'bg-purple-600 text-white ring-4 ring-purple-100'
                  : 'bg-gray-200 text-gray-400'
              }`}>
                {i < currentStep ? '✓' : i + 1}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${
                i === currentStep ? 'text-purple-600' : 'text-gray-400'
              }`}>
                {step}
              </span>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-1 rounded-full transition-colors ${
                  i < currentStep ? 'bg-purple-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-5">

          {/* Step 0 — Personal Info */}
          {currentStep === 0 && (
            <>
              <h2 className="font-semibold text-gray-900">Tell us about yourself</h2>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Full name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={e => update('name', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Age</label>
                  <input
                    type="number"
                    placeholder="Your age"
                    value={form.age}
                    onChange={e => update('age', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Gender</label>
                  <div className="flex gap-3">
                    {['Male', 'Female', 'Other'].map(g => (
                      <button
                        key={g}
                        onClick={() => update('gender', g)}
                        className={`flex-1 py-2 rounded-xl border text-sm font-medium transition-colors ${
                          form.gender === g
                            ? 'bg-purple-600 text-white border-purple-600'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Step 1 — Main Symptom */}
          {currentStep === 1 && (
            <>
              <h2 className="font-semibold text-gray-900">What is your main symptom?</h2>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Describe your main symptom in your own words
                  </label>
                  <textarea
                    placeholder="e.g. I have a sharp pain in my lower right abdomen since this morning..."
                    value={form.mainSymptom}
                    onChange={e => update('mainSymptom', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    How long have you had this symptom?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Less than a day', '1–3 days', '4–7 days', 'More than a week'].map(d => (
                      <button
                        key={d}
                        onClick={() => update('duration', d)}
                        className={`py-2 px-3 rounded-xl border text-sm font-medium transition-colors ${
                          form.duration === d
                            ? 'bg-purple-600 text-white border-purple-600'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Step 2 — Details */}
          {currentStep === 2 && (
            <>
              <h2 className="font-semibold text-gray-900">Any other details?</h2>
              <div className="flex flex-col gap-5">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Pain / discomfort severity: <span className="text-purple-600 font-bold">{form.severity}/10</span>
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={form.severity}
                    onChange={e => update('severity', Number(e.target.value))}
                    className="w-full accent-purple-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Mild</span>
                    <span>Moderate</span>
                    <span>Severe</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Other symptoms you are experiencing
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {otherSymptomOptions.map(s => (
                      <button
                        key={s}
                        onClick={() => toggleSymptom(s)}
                        className={`px-3 py-1 rounded-full border text-xs font-medium transition-colors ${
                          form.otherSymptoms.includes(s)
                            ? 'bg-purple-600 text-white border-purple-600'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Anything else you want to add? (optional)
                  </label>
                  <textarea
                    placeholder="e.g. I have diabetes, I'm currently taking ibuprofen..."
                    value={form.notes}
                    onChange={e => update('notes', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                  />
                </div>
              </div>
            </>
          )}

          {/* Step 3 — Review */}
          {currentStep === 3 && (
            <>
              <h2 className="font-semibold text-gray-900">Review your information</h2>
              <div className="flex flex-col gap-3 text-sm">
                {[
                  { label: 'Name', value: form.name },
                  { label: 'Age', value: form.age },
                  { label: 'Gender', value: form.gender },
                  { label: 'Main symptom', value: form.mainSymptom },
                  { label: 'Duration', value: form.duration },
                  { label: 'Severity', value: `${form.severity}/10` },
                  { label: 'Other symptoms', value: form.otherSymptoms.join(', ') || 'None' },
                  { label: 'Notes', value: form.notes || 'None' },
                ].map(item => (
                  <div key={item.label} className="flex gap-3 py-2 border-b border-gray-100 last:border-0">
                    <span className="text-gray-400 w-32 shrink-0">{item.label}</span>
                    <span className="text-gray-800 font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-amber-700 text-xs">
                ⚠️ This information will be used by the AI for educational guidance only. It does not replace a medical consultation.
              </div>
            </>
          )}

        </div>

        {/* Navigation buttons */}
        <div className="flex gap-3">
          {currentStep > 0 && (
            <button
              onClick={() => setCurrentStep(s => s - 1)}
              className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:border-gray-400 transition-colors"
            >
              ← Back
            </button>
          )}
          {currentStep < steps.length - 1 ? (
            <button
              onClick={() => setCurrentStep(s => s + 1)}
              disabled={!canNext()}
              className="flex-1 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium transition-colors"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex-1 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium transition-colors"
            >
              Start AI Consultation →
            </button>
          )}
        </div>

      </div>
    </div>
  )
}