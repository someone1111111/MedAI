import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function VerifyEmail() {
  const { token } = useParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')

  useEffect(() => {
    // EMAIL VERIFICATION — works now, email sending commented until SMTP configured
    fetch(`http://localhost:8000/auth/verify/${token}`)
      .then(r => r.json())
      .then(data => {
        if (data.message) setStatus('success')
        else setStatus('error')
      })
      .catch(() => setStatus('error'))
  }, [token])

  return (
    <div className="min-h-[90vh] bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl border border-gray-200 p-8 max-w-md w-full text-center flex flex-col gap-5">

        {status === 'loading' && (
          <>
            <span className="text-5xl">⏳</span>
            <h2 className="text-xl font-bold text-gray-900">Verifying your email...</h2>
          </>
        )}

        {status === 'success' && (
          <>
            <span className="text-5xl">✅</span>
            <h2 className="text-xl font-bold text-gray-900">Email verified!</h2>
            <p className="text-gray-500 text-sm">
              Your account is now fully activated. You can now log in.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-medium text-sm transition-colors"
            >
              Go to Login →
            </button>
          </>
        )}

        {status === 'error' && (
          <>
            <span className="text-5xl">❌</span>
            <h2 className="text-xl font-bold text-gray-900">Invalid or expired link</h2>
            <p className="text-gray-500 text-sm">
              Please register again or contact support.
            </p>
            <button
              onClick={() => navigate('/register')}
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-medium text-sm transition-colors"
            >
              Back to Register →
            </button>
          </>
        )}

      </div>
    </div>
  )
}