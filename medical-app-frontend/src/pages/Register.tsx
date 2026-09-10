import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

const languages = [
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'French' },
  { value: 'ar', label: 'Arabic' },
  { value: 'es', label: 'Spanish' },
  { value: 'de', label: 'German' },
]

const studyLevels = [
  '1st year', '2nd year', '3rd year',
  '4th year', '5th year', '6th year',
  'Resident', 'Specialist'
]

const conditions = [
  { id: 'diabetes', label: 'Diabetes', icon: '🩸' },
  { id: 'hypertension', label: 'Hypertension', icon: '❤️' },
  { id: 'asthma', label: 'Asthma', icon: '🫁' },
  { id: 'obesity', label: 'Obesity', icon: '⚖️' },
  { id: 'anxiety', label: 'Anxiety / Depression', icon: '🧠' },
  { id: 'arthritis', label: 'Arthritis', icon: '🦴' },
  { id: 'heart_disease', label: 'Heart Disease', icon: '💓' },
  { id: 'other', label: 'Other', icon: '➕' },
]

type Step = 'basic' | 'role' | 'patient' | 'done'

export default function Register() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [step, setStep] = useState<Step>('basic')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    email: '',
    password: '',
    confirm_password: '',
    city: '',
    preferred_language: 'en',
    role: '',
    // Student/Doctor
    institution: '',
    professional_email: '',
    study_level: '',
    // Patient
    has_chronic_disease: false,
    condition: '',
    custom_condition: '',
    diagnosed_since: '',
    medications: '',
    condition_notes: '',
  })

  const update = (field: string, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setError('')
  }

  // Password strength checker
  const getPasswordStrength = () => {
    const p = form.password
    if (!p) return { score: 0, label: '', color: '' }
    let score = 0
    if (p.length >= 8) score++
    if (/[A-Z]/.test(p)) score++
    if (/[a-z]/.test(p)) score++
    if (/[!@#$%^&*(),.?":{}|<>]/.test(p)) score++
    if (p.length >= 12) score++
    if (score <= 2) return { score, label: 'Weak', color: 'bg-red-400' }
    if (score === 3) return { score, label: 'Fair', color: 'bg-amber-400' }
    if (score === 4) return { score, label: 'Good', color: 'bg-blue-400' }
    return { score, label: 'Strong', color: 'bg-green-500' }
  }

  const validateBasic = () => {
    if (!form.first_name || !form.last_name) return 'Please enter your full name'
    if (!form.date_of_birth) return 'Please enter your date of birth'
    if (!form.email) return 'Please enter your email'
    if (!form.password) return 'Please enter a password'
    if (form.password !== form.confirm_password) return 'Passwords do not match'
    if (form.password.length < 8) return 'Password must be at least 8 characters'
    if (!(/[A-Z]/.test(form.password))) return 'Password must contain an uppercase letter'
    if (!(/[a-z]/.test(form.password))) return 'Password must contain a lowercase letter'
    if (!(/[!@#$%^&*(),.?":{}|<>]/.test(form.password))) return 'Password must contain a special character'
    if (form.password.toLowerCase().includes(form.first_name.toLowerCase())) return 'Password cannot contain your first name'
    if (form.password.toLowerCase().includes(form.last_name.toLowerCase())) return 'Password cannot contain your last name'
    return null
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      const payload = {
        first_name: form.first_name,
        last_name: form.last_name,
        date_of_birth: form.date_of_birth,
        email: form.email,
        password: form.password,
        city: form.city,
        preferred_language: form.preferred_language,
        role: form.role,
        institution: form.institution || null,
        professional_email: form.professional_email || null,
        study_level: form.study_level || null,
        has_chronic_disease: form.has_chronic_disease,
      }
      const res = await axios.post('http://localhost:8000/auth/register', payload, {
        withCredentials: true
      })
      login({
        name: res.data.user_name,
        role: res.data.user_role,
        token: res.data.access_token
      })

      // Save condition profile if patient has chronic disease
      if (form.role === 'patient' && form.has_chronic_disease && form.condition) {
        const finalCondition = form.condition === 'other' ? form.custom_condition : form.condition
        const profiles = JSON.parse(localStorage.getItem('health_profiles') || '[]')
        profiles.push({
          profileName: `${form.first_name} ${form.last_name}`,
          condition: finalCondition,
          diagnosed_since: form.diagnosed_since,
          medications: form.medications,
          notes: form.condition_notes,
          isForMe: true
        })
        localStorage.setItem('health_profiles', JSON.stringify(profiles))
      }

      setStep('done')
      setTimeout(() => {
        navigate(res.data.user_role === 'student' || res.data.user_role === 'doctor'
          ? '/student'
          : '/patient'
        )
      }, 2000)
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const strength = getPasswordStrength()

  // ── DONE SCREEN ──
  if (step === 'done') {
    return (
      <div className="min-h-[90vh] bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 max-w-md w-full text-center flex flex-col gap-5">
          <span className="text-5xl">🎉</span>
          <h2 className="text-2xl font-bold text-gray-900">Welcome to MediApp!</h2>
          <p className="text-gray-500 text-sm">
            Your account has been created successfully.
            {/* Uncomment when email is configured:
            Please check your email to verify your account. */}
            Redirecting you now...
          </p>
          <div className="w-full bg-gray-100 rounded-full h-1">
            <div className="bg-teal-500 h-1 rounded-full animate-pulse w-full" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[90vh] bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-2xl border border-gray-200 p-8 w-full max-w-lg flex flex-col gap-6">

        {/* Header */}
        <div className="text-center">
          <span className="text-4xl">🩺</span>
          <h1 className="text-2xl font-bold text-gray-900 mt-3">Create your account</h1>
          <p className="text-gray-500 text-sm mt-1">Join MediApp today</p>
        </div>

        {/* Step indicators */}
        <div className="flex items-center gap-2">
          {['Basic Info', 'Your Role', 'Final Step'].map((s, i) => {
            const stepIndex = step === 'basic' ? 0 : step === 'role' ? 1 : 2
            return (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                  i < stepIndex ? 'bg-teal-600 text-white' :
                  i === stepIndex ? 'bg-teal-600 text-white ring-4 ring-teal-100' :
                  'bg-gray-200 text-gray-400'
                }`}>
                  {i < stepIndex ? '✓' : i + 1}
                </div>
                <span className={`text-xs font-medium hidden sm:block ${
                  i === stepIndex ? 'text-teal-600' : 'text-gray-400'
                }`}>{s}</span>
                {i < 2 && <div className={`flex-1 h-1 rounded-full ${i < stepIndex ? 'bg-teal-600' : 'bg-gray-200'}`} />}
              </div>
            )
          })}
        </div>

        {/* ── STEP 1 — Basic Info ── */}
        {step === 'basic' && (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">First name</label>
                <input
                  type="text"
                  placeholder="Manar"
                  value={form.first_name}
                  onChange={e => update('first_name', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Last name</label>
                <input
                  type="text"
                  placeholder="Ben Ghozzi"
                  value={form.last_name}
                  onChange={e => update('last_name', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Date of birth</label>
              <input
                type="date"
                value={form.date_of_birth}
                onChange={e => update('date_of_birth', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={e => update('email', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => update('password', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 text-sm"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {form.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className={`flex-1 h-1 rounded-full transition-colors ${
                        i <= strength.score ? strength.color : 'bg-gray-200'
                      }`} />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">
                    Strength: <span className="font-medium">{strength.label}</span>
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Confirm password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={form.confirm_password}
                onChange={e => update('confirm_password', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">City (optional)</label>
                <input
                  type="text"
                  placeholder="Tunis"
                  value={form.city}
                  onChange={e => update('city', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Preferred language</label>
                <select
                  value={form.preferred_language}
                  onChange={e => update('preferred_language', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white"
                >
                  {languages.map(l => (
                    <option key={l.value} value={l.value}>{l.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <button
              onClick={() => {
                const err = validateBasic()
                if (err) { setError(err); return }
                setStep('role')
              }}
              className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-medium text-sm transition-colors"
            >
              Next →
            </button>
          </div>
        )}

        {/* ── STEP 2 — Role ── */}
        {step === 'role' && (
          <div className="flex flex-col gap-5">
            <p className="text-sm font-medium text-gray-700">I am a</p>
            <div className="flex flex-col gap-3">
              {[
                { value: 'student', icon: '🎓', label: 'Medical Student', desc: 'Access educational content, AI assistant and surgery simulations' },
                { value: 'doctor', icon: '👨‍⚕️', label: 'Doctor / Professional', desc: 'Clinical resources, research tools and professional content' },
                { value: 'patient', icon: '🏥', label: 'Patient', desc: 'Health space, AI consultation and chronic disease companion' },
              ].map(r => (
                <button
                  key={r.value}
                  onClick={() => update('role', r.value)}
                  className={`p-4 rounded-xl border text-left transition-colors ${
                    form.role === r.value
                      ? 'border-teal-500 bg-teal-50'
                      : 'border-gray-200 hover:border-teal-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{r.icon}</span>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{r.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{r.desc}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Student/Doctor extra fields */}
            {(form.role === 'student' || form.role === 'doctor') && (
              <div className="flex flex-col gap-4 border-t border-gray-100 pt-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    {form.role === 'student' ? 'University / Institution' : 'Hospital / Clinic'}
                  </label>
                  <input
                    type="text"
                    placeholder={form.role === 'student' ? 'Faculty of Sciences of Tunis' : 'Charles Nicolle Hospital'}
                    value={form.institution}
                    onChange={e => update('institution', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>
                {form.role === 'student' && (
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Level of study</label>
                    <select
                      value={form.study_level}
                      onChange={e => update('study_level', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white"
                    >
                      <option value="">Select your level</option>
                      {studyLevels.map(l => (
                        <option key={l} value={l}>{l}</option>
                      ))}
                    </select>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Professional / Student email (optional)
                  </label>
                  <input
                    type="email"
                    placeholder="you@university.edu"
                    value={form.professional_email}
                    onChange={e => update('professional_email', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setStep('basic')}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:border-gray-400 transition-colors"
              >
                ← Back
              </button>
              <button
                onClick={() => {
                  if (!form.role) { setError('Please select a role'); return }
                  if (form.role === 'patient') setStep('patient')
                  else handleSubmit()
                }}
                disabled={loading}
                className="flex-1 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-40 text-white font-medium text-sm transition-colors"
              >
                {form.role === 'patient' ? 'Next →' : loading ? 'Creating...' : 'Create Account →'}
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3 — Patient specific ── */}
        {step === 'patient' && (
          <div className="flex flex-col gap-5">

            {/* Chronic disease question */}
            <div className="flex flex-col gap-3">
              <p className="text-sm font-medium text-gray-700">Do you have a chronic condition?</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => update('has_chronic_disease', true)}
                  className={`p-4 rounded-xl border text-center transition-colors ${
                    form.has_chronic_disease
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <p className="text-2xl mb-1">🏥</p>
                  <p className="text-sm font-medium text-gray-900">Yes I do</p>
                </button>
                <button
                  onClick={() => update('has_chronic_disease', false)}
                  className={`p-4 rounded-xl border text-center transition-colors ${
                    !form.has_chronic_disease
                      ? 'border-teal-500 bg-teal-50'
                      : 'border-gray-200 hover:border-teal-300'
                  }`}
                >
                  <p className="text-2xl mb-1">💬</p>
                  <p className="text-sm font-medium text-gray-900">Just check-ups</p>
                </button>
              </div>
            </div>

            {/* If no chronic disease — show notice */}
            {!form.has_chronic_disease && (
              <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 text-sm text-teal-800">
                <p className="font-semibold mb-1">👋 Welcome!</p>
                <p>Your account will let you save your chat history and get personalized AI guidance. Remember — our AI assistant is here to help you understand your health better, but it does not replace a real doctor consultation.</p>
              </div>
            )}

            {/* If chronic disease — show condition form */}
            {form.has_chronic_disease && (
              <div className="flex flex-col gap-4 border-t border-gray-100 pt-4">
                <p className="text-sm font-medium text-gray-700">What is your condition?</p>
                <div className="grid grid-cols-2 gap-2">
                  {conditions.map(c => (
                    <button
                      key={c.id}
                      onClick={() => update('condition', c.id)}
                      className={`p-3 rounded-xl border text-left transition-colors ${
                        form.condition === c.id
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <span className="text-xl">{c.icon}</span>
                      <p className="text-xs font-medium text-gray-900 mt-1">{c.label}</p>
                    </button>
                  ))}
                </div>

                {form.condition === 'other' && (
                  <input
                    type="text"
                    placeholder="Describe your condition..."
                    value={form.custom_condition}
                    onChange={e => update('custom_condition', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                )}

                <input
                  type="text"
                  placeholder="When were you diagnosed? (optional)"
                  value={form.diagnosed_since}
                  onChange={e => update('diagnosed_since', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                />

                <input
                  type="text"
                  placeholder="Current medications? (optional)"
                  value={form.medications}
                  onChange={e => update('medications', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setStep('role')}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:border-gray-400 transition-colors"
              >
                ← Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading || (form.has_chronic_disease && !form.condition) || (form.condition === 'other' && !form.custom_condition.trim())}
                className="flex-1 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-40 text-white font-medium text-sm transition-colors"
              >
                {loading ? 'Creating...' : 'Create Account →'}
              </button>
            </div>
          </div>
        )}

        <p className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-teal-600 font-medium hover:underline">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  )
}