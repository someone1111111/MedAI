import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center gap-12 px-6 bg-gray-50">
      
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          Welcome to MediApp
        </h1>
        <p className="text-gray-500 mt-3 text-lg">
          Choose how you want to use the app
        </p>
      </div>

      <div className="flex gap-8 flex-wrap justify-center">

        {/* Student card */}
        <div
          onClick={() => navigate('/student')}
          className="w-72 p-8 rounded-2xl border border-gray-200 bg-white cursor-pointer hover:-translate-y-1 hover:shadow-xl transition-all duration-200 text-center group"
        >
          <div className="text-5xl mb-4">🎓</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            I am a Student
          </h2>
          <p className="text-gray-500 text-sm">
            Access medical resources, AI assistance, exercises and surgery simulations
          </p>
          <div className="mt-6 py-2 px-4 rounded-lg bg-teal-50 text-teal-700 text-sm font-medium group-hover:bg-teal-100 transition-colors">
            Enter Student Space →
          </div>
        </div>

        {/* Patient card */}
        <div
          onClick={() => navigate('/patient')}
          className="w-72 p-8 rounded-2xl border border-gray-200 bg-white cursor-pointer hover:-translate-y-1 hover:shadow-xl transition-all duration-200 text-center group"
        >
          <div className="text-5xl mb-4">🏥</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            I am a Patient
          </h2>
          <p className="text-gray-500 text-sm">
            Describe your symptoms and get AI-assisted medical guidance
          </p>
          <div className="mt-6 py-2 px-4 rounded-lg bg-purple-50 text-purple-700 text-sm font-medium group-hover:bg-purple-100 transition-colors">
            Enter Patient Space →
          </div>
        </div>

      </div>
    </div>
  )
}