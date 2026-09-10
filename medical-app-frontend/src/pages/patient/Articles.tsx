export default function Articles() {
  const articles = [
    { icon: '📰', title: 'Living Well With Your Condition', category: 'Lifestyle', time: '5 min read' },
    { icon: '🔬', title: 'Latest Research and Treatments', category: 'Medical', time: '8 min read' },
    { icon: '🥗', title: 'Diet and Nutrition Guide', category: 'Nutrition', time: '6 min read' },
    { icon: '🧠', title: 'Mental Health and Chronic Illness', category: 'Psychology', time: '7 min read' },
    { icon: '💊', title: 'Understanding Your Medications', category: 'Medical', time: '4 min read' },
    { icon: '🏃', title: 'Exercise Tips for Your Condition', category: 'Lifestyle', time: '5 min read' },
  ]

  return (
    <div className="min-h-[90vh] bg-gray-50 px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">📚 My Articles</h1>
        <p className="text-gray-500 mb-8">Curated resources about your condition.</p>
        <div className="flex flex-col gap-4">
          {articles.map(a => (
            <div key={a.title} className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center gap-4 hover:border-amber-300 hover:shadow-sm transition-all cursor-pointer">
              <span className="text-3xl">{a.icon}</span>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-sm">{a.title}</h3>
                <div className="flex gap-3 mt-1">
                  <span className="text-xs text-amber-600 font-medium">{a.category}</span>
                  <span className="text-xs text-gray-400">{a.time}</span>
                </div>
              </div>
              <span className="text-gray-300 text-lg">→</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}