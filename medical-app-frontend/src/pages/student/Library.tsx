import { useState } from 'react'

const resources = [
  {
    id: 1,
    title: 'Gray\'s Anatomy',
    type: 'book',
    category: 'Anatomy',
    description: 'The classic comprehensive reference for human anatomy used by medical students worldwide.',
    pages: 1562,
    icon: '📖'
  },
  {
    id: 2,
    title: 'Pathophysiology of Heart Disease',
    type: 'book',
    category: 'Cardiology',
    description: 'A collaborative project between medical students and faculty covering cardiovascular pathology.',
    pages: 480,
    icon: '❤️'
  },
  {
    id: 3,
    title: 'Understanding COVID-19 Variants',
    type: 'article',
    category: 'Infectious Disease',
    description: 'Recent research on the mutation patterns and clinical implications of COVID-19 variants.',
    pages: 12,
    icon: '🔬'
  },
  {
    id: 4,
    title: 'Surgical Techniques in Orthopedics',
    type: 'book',
    category: 'Surgery',
    description: 'Step by step surgical procedures for common orthopedic conditions with illustrations.',
    pages: 820,
    icon: '🦴'
  },
  {
    id: 5,
    title: 'Pharmacology Made Easy',
    type: 'article',
    category: 'Pharmacology',
    description: 'A simplified guide to drug mechanisms, interactions and clinical applications.',
    pages: 34,
    icon: '💊'
  },
  {
    id: 6,
    title: 'Neurology Case Studies',
    type: 'article',
    category: 'Neurology',
    description: 'Real clinical cases covering diagnosis and management of neurological disorders.',
    pages: 28,
    icon: '🧠'
  },
]

const categories = ['All', 'Anatomy', 'Cardiology', 'Surgery', 'Neurology', 'Pharmacology', 'Infectious Disease']
const types = ['All', 'book', 'article']

export default function Library() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedType, setSelectedType] = useState('All')
  const [opened, setOpened] = useState<number | null>(null)

  const filtered = resources.filter(r => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase())
    const matchCategory = selectedCategory === 'All' || r.category === selectedCategory
    const matchType = selectedType === 'All' || r.type === selectedType
    return matchSearch && matchCategory && matchType
  })

  return (
    <div className="min-h-[90vh] bg-gray-50 px-6 py-10">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">📚 Library</h1>
          <p className="text-gray-500 mt-1">Browse medical books and articles. Open any resource to read and ask the AI questions about it.</p>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search resources..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 mb-4 text-sm"
        />

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          <div className="flex gap-2 flex-wrap">
            {types.map(t => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                  selectedType === t
                    ? 'bg-teal-600 text-white border-teal-600'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-teal-300'
                }`}
              >
                {t === 'All' ? 'All types' : t === 'book' ? '📖 Books' : '📄 Articles'}
              </button>
            ))}
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                  selectedCategory === c
                    ? 'bg-gray-800 text-white border-gray-800'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Resource grid */}
        {filtered.length === 0 ? (
          <div className="text-center text-gray-400 py-20">No resources found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map(resource => (
              <div
                key={resource.id}
                className="bg-white rounded-2xl border border-gray-200 hover:border-teal-300 hover:shadow-md transition-all duration-200 p-5 flex flex-col gap-3"
              >
                <div className="flex items-start justify-between">
                  <span className="text-3xl">{resource.icon}</span>
                  <div className="flex gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">
                      {resource.category}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      resource.type === 'book'
                        ? 'bg-teal-50 text-teal-700'
                        : 'bg-blue-50 text-blue-700'
                    }`}>
                      {resource.type === 'book' ? '📖 Book' : '📄 Article'}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 text-base">{resource.title}</h3>
                  <p className="text-gray-500 text-sm mt-1">{resource.description}</p>
                  <p className="text-gray-400 text-xs mt-2">{resource.pages} pages</p>
                </div>

                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => setOpened(resource.id)}
                    className="flex-1 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium transition-colors"
                  >
                    Open →
                  </button>
                  <button className="px-3 py-2 rounded-lg border border-gray-200 hover:border-teal-300 text-gray-500 text-sm transition-colors">
                    🤖 Ask AI
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Opened resource modal */}
        {opened !== null && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-lg text-gray-900">
                  {resources.find(r => r.id === opened)?.title}
                </h2>
                <button
                  onClick={() => setOpened(null)}
                  className="text-gray-400 hover:text-gray-700 text-xl"
                >✕</button>
              </div>
              <p className="text-gray-500 text-sm">
                This is where the full content of the resource will be displayed. 
                You'll be able to read it and use the AI assistant to summarize, 
                explain or answer questions about it.
              </p>
              <div className="bg-gray-50 rounded-xl p-4 text-gray-400 text-sm text-center">
                📄 Content coming soon — will connect to backend
              </div>
              <button className="w-full py-2 rounded-lg bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 transition-colors">
                🤖 Ask AI about this resource
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}