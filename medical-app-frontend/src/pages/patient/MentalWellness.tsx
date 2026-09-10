export default function Lifestyle() {
  return (
    <div className="min-h-[90vh] bg-gray-50 px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">🥗 Lifestyle Tips</h1>
        <p className="text-gray-500 mb-8">Eating habits, exercise and daily tips tailored to your condition.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            { icon: '🥦', title: 'Nutrition', desc: 'Food choices that support your condition and overall health.' },
            { icon: '🏃', title: 'Exercise', desc: 'Safe and effective physical activity recommendations.' },
            { icon: '😴', title: 'Sleep', desc: 'How sleep affects your condition and tips to improve it.' },
            { icon: '💧', title: 'Hydration', desc: 'Daily water intake and what to avoid.' },
          ].map(card => (
            <div key={card.title} className="bg-white rounded-2xl border border-gray-200 p-5 flex flex-col gap-2">
              <span className="text-3xl">{card.icon}</span>
              <h3 className="font-semibold text-gray-900">{card.title}</h3>
              <p className="text-gray-500 text-sm">{card.desc}</p>
              <div className="mt-2 text-xs text-purple-600 font-medium">
                AI-powered tips coming soon
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}