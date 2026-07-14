import { useState } from 'react'

type Step = {
  instruction: string
  options: string[]
  correct: number
  explanation: string
}

type Surgery = {
  id: string
  title: string
  icon: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  description: string
  steps: Step[]
}

const surgeries: Surgery[] = [
  {
    id: 'appendectomy',
    title: 'Appendectomy',
    icon: '🔪',
    difficulty: 'Beginner',
    description: 'Surgical removal of the appendix. One of the most common emergency surgeries.',
    steps: [
      {
        instruction: 'The patient is in the OR. What is your first step?',
        options: [
          'Start the incision immediately',
          'Confirm patient identity, consent and allergies',
          'Ask the nurses to leave the room',
          'Request extra antibiotics without checking the chart',
        ],
        correct: 1,
        explanation: 'Always confirm patient identity, consent and allergies before any procedure. This is a mandatory safety step.'
      },
      {
        instruction: 'Anesthesia is confirmed. How do you position the patient?',
        options: [
          'Prone position (face down)',
          'Lateral decubitus (on the side)',
          'Supine position (on the back)',
          'Sitting position',
        ],
        correct: 2,
        explanation: 'The patient is placed supine (on their back) to allow access to the right lower quadrant of the abdomen.'
      },
      {
        instruction: 'You need to make the incision. Where do you cut?',
        options: [
          'Upper left quadrant',
          'Right lower quadrant (McBurney\'s point)',
          'Midline sternum to navel',
          'Left lower quadrant',
        ],
        correct: 1,
        explanation: 'McBurney\'s point in the right lower quadrant is the standard incision site for appendectomy, located 1/3 of the way from the ASIS to the navel.'
      },
      {
        instruction: 'You have exposed the appendix. It is inflamed but not ruptured. What next?',
        options: [
          'Remove it immediately without any ties',
          'Ligate the mesoappendix and base, then remove the appendix',
          'Leave it and close — it will heal on its own',
          'Cut it and leave the stump open',
        ],
        correct: 1,
        explanation: 'The mesoappendix must be ligated first to control blood supply, then the base is tied before removal to prevent contamination.'
      },
      {
        instruction: 'The appendix is removed. How do you close?',
        options: [
          'Leave the wound open — no closure needed',
          'Close only the skin, skip the muscle layers',
          'Close in layers: peritoneum, muscle, fascia, then skin',
          'Pack the wound with gauze and send the patient home',
        ],
        correct: 2,
        explanation: 'Proper closure in anatomical layers is essential to prevent hernia, infection and ensure good healing.'
      },
    ]
  },
  {
    id: 'cholecystectomy',
    title: 'Cholecystectomy',
    icon: '🫀',
    difficulty: 'Intermediate',
    description: 'Laparoscopic removal of the gallbladder. The most common elective abdominal surgery.',
    steps: [
      {
        instruction: 'The patient has cholelithiasis. You plan a laparoscopic approach. First step?',
        options: [
          'Insert trocars immediately',
          'Obtain informed consent and review imaging',
          'Start with an open incision just in case',
          'Skip the pre-op checklist to save time',
        ],
        correct: 1,
        explanation: 'Reviewing imaging (ultrasound, MRCP if needed) and confirming informed consent is mandatory before laparoscopic cholecystectomy.'
      },
      {
        instruction: 'You are creating pneumoperitoneum. What gas do you use?',
        options: [
          'Oxygen',
          'Nitrogen',
          'Carbon dioxide (CO2)',
          'Room air',
        ],
        correct: 2,
        explanation: 'CO2 is used for pneumoperitoneum because it is quickly absorbed, non-flammable and does not support combustion unlike oxygen.'
      },
      {
        instruction: 'You need to identify the critical view of safety. What must you see?',
        options: [
          'Only the cystic duct',
          'Two structures entering the gallbladder with the hepatocystic triangle cleared',
          'The common bile duct clearly',
          'The hepatic artery',
        ],
        correct: 1,
        explanation: 'The critical view of safety requires two structures (cystic duct and cystic artery) entering the gallbladder, with the lower third of the gallbladder dissected free.'
      },
      {
        instruction: 'Structures are clipped and divided. How do you remove the gallbladder?',
        options: [
          'Pull it out through the largest trocar site',
          'Leave it and close — it is detached already',
          'Place it in a retrieval bag and extract through the umbilical port',
          'Cut it into pieces inside the abdomen',
        ],
        correct: 2,
        explanation: 'A retrieval bag prevents bile spillage and contamination. The gallbladder is extracted through the umbilical port which can be slightly enlarged if needed.'
      },
      {
        instruction: 'After extraction, what is your final check before closing?',
        options: [
          'Nothing — just close quickly',
          'Irrigate, check for bleeding or bile leak, confirm instrument count',
          'Only check the instrument count',
          'Take a photo for documentation only',
        ],
        correct: 1,
        explanation: 'Always irrigate the field, inspect for bleeding or bile leak, and confirm the instrument and sponge count before closing to prevent retained foreign bodies.'
      },
    ]
  },
  {
    id: 'hernia',
    title: 'Inguinal Hernia Repair',
    icon: '🧵',
    difficulty: 'Intermediate',
    description: 'Repair of a protrusion through the inguinal canal. One of the most performed surgeries globally.',
    steps: [
      {
        instruction: 'A 45 year old male presents with a reducible right inguinal hernia. Best approach?',
        options: [
          'Emergency surgery tonight',
          'Elective laparoscopic or open repair with mesh',
          'Treat with antibiotics only',
          'Watchful waiting forever — no surgery needed',
        ],
        correct: 1,
        explanation: 'Reducible inguinal hernias in fit patients are repaired electively. Both laparoscopic (TEP/TAPP) and open (Lichtenstein) mesh repairs are acceptable.'
      },
      {
        instruction: 'During open repair, you identify the hernia sac. What do you do with it?',
        options: [
          'Cut it off immediately',
          'Dissect it free, reduce contents, then ligate at the neck',
          'Leave it — just place the mesh over it',
          'Burn it with cautery',
        ],
        correct: 1,
        explanation: 'The hernia sac must be dissected, contents reduced back into the abdomen, and the neck ligated before mesh placement to prevent recurrence.'
      },
      {
        instruction: 'You are placing the mesh. Where do you fix it?',
        options: [
          'Just lay it loosely — it will stay on its own',
          'Fix it to the inguinal ligament, conjoint tendon and pubic tubercle',
          'Suture it to the skin only',
          'Glue it to the bowel',
        ],
        correct: 1,
        explanation: 'The mesh must be anchored securely to anatomical landmarks including the inguinal ligament and conjoint tendon to prevent migration and recurrence.'
      },
      {
        instruction: 'Post-op, the patient reports scrotal swelling. Most likely cause?',
        options: [
          'Infection — start IV antibiotics immediately',
          'Normal seroma formation or hematoma — monitor first',
          'The mesh has migrated',
          'Recurrence of the hernia',
        ],
        correct: 1,
        explanation: 'Scrotal swelling in the early post-op period is most commonly a seroma or small hematoma, which is usually self-limiting and managed conservatively.'
      },
    ]
  },
]

const difficultyColor: Record<string, string> = {
  Beginner: 'bg-green-50 text-green-700',
  Intermediate: 'bg-amber-50 text-amber-700',
  Advanced: 'bg-rose-50 text-rose-700',
}

type GameState = 'select' | 'playing' | 'finished'

export default function SurgeryGame() {
  const [gameState, setGameState] = useState<GameState>('select')
  const [selected, setSelected] = useState<Surgery | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [chosenOption, setChosenOption] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<boolean[]>([])
  const [showExplanation, setShowExplanation] = useState(false)

  const startSurgery = (surgery: Surgery) => {
    setSelected(surgery)
    setCurrentStep(0)
    setScore(0)
    setAnswers([])
    setChosenOption(null)
    setShowExplanation(false)
    setGameState('playing')
  }

  const handleChoice = (index: number) => {
    if (chosenOption !== null) return
    setChosenOption(index)
    setShowExplanation(true)
    const isCorrect = index === selected!.steps[currentStep].correct
    if (isCorrect) setScore(s => s + 1)
    setAnswers(prev => [...prev, isCorrect])
  }

  const nextStep = () => {
    if (currentStep + 1 >= selected!.steps.length) {
      setGameState('finished')
    } else {
      setCurrentStep(s => s + 1)
      setChosenOption(null)
      setShowExplanation(false)
    }
  }

  const reset = () => {
    setGameState('select')
    setSelected(null)
    setCurrentStep(0)
    setScore(0)
    setAnswers([])
    setChosenOption(null)
    setShowExplanation(false)
  }

  const step = selected ? selected.steps[currentStep] : null
  const progress = selected ? ((currentStep) / selected.steps.length) * 100 : 0

  // ── SELECT SCREEN ──
  if (gameState === 'select') {
    return (
      <div className="min-h-[90vh] bg-gray-50 px-6 py-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-gray-900">🔬 Surgery Simulation</h1>
            <p className="text-gray-500 mt-2">Choose a procedure and make step-by-step decisions. Every mistake is a learning moment.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {surgeries.map(s => (
              <div
                key={s.id}
                className="bg-white rounded-2xl border border-gray-200 hover:border-rose-300 hover:shadow-lg transition-all duration-200 p-6 flex flex-col gap-4 cursor-pointer"
                onClick={() => startSurgery(s)}
              >
                <div className="flex items-start justify-between">
                  <span className="text-4xl">{s.icon}</span>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${difficultyColor[s.difficulty]}`}>
                    {s.difficulty}
                  </span>
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900 text-lg">{s.title}</h2>
                  <p className="text-gray-500 text-sm mt-1">{s.description}</p>
                  <p className="text-gray-400 text-xs mt-3">{s.steps.length} steps</p>
                </div>
                <button className="w-full py-2 rounded-lg bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium transition-colors">
                  Start Surgery →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ── FINISHED SCREEN ──
  if (gameState === 'finished') {
    const percentage = Math.round((score / selected!.steps.length) * 100)
    const grade =
      percentage === 100 ? { label: 'Perfect!', color: 'text-green-600', icon: '🏆' } :
      percentage >= 70  ? { label: 'Good job!', color: 'text-blue-600', icon: '👍' } :
                          { label: 'Keep practicing', color: 'text-amber-600', icon: '📖' }

    return (
      <div className="min-h-[90vh] bg-gray-50 px-6 py-10 flex items-center justify-center">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 max-w-md w-full text-center flex flex-col gap-6">
          <div className="text-5xl">{grade.icon}</div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{grade.label}</h2>
            <p className="text-gray-500 mt-1">{selected!.title} completed</p>
          </div>
          <div className={`text-5xl font-bold ${grade.color}`}>{percentage}%</div>
          <p className="text-gray-500 text-sm">
            You answered <strong>{score}</strong> out of <strong>{selected!.steps.length}</strong> steps correctly
          </p>

          {/* Step review */}
          <div className="flex gap-2 justify-center">
            {answers.map((correct, i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                  correct ? 'bg-green-500' : 'bg-red-400'
                }`}
              >
                {correct ? '✓' : '✗'}
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => startSurgery(selected!)}
              className="flex-1 py-2 rounded-lg bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium transition-colors"
            >
              Try again
            </button>
            <button
              onClick={reset}
              className="flex-1 py-2 rounded-lg border border-gray-200 hover:border-gray-400 text-gray-600 text-sm font-medium transition-colors"
            >
              Other surgery
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── PLAYING SCREEN ──
  return (
    <div className="min-h-[90vh] bg-gray-50 px-6 py-10">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">

        {/* Top bar */}
        <div className="flex items-center justify-between">
          <button onClick={reset} className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
            ← Back
          </button>
          <span className="text-sm font-medium text-gray-500">
            Step {currentStep + 1} / {selected!.steps.length}
          </span>
          <span className="text-sm font-semibold text-rose-500">
            Score: {score}/{currentStep}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-rose-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Surgery title */}
        <div className="text-center">
          <span className="text-2xl">{selected!.icon}</span>
          <h2 className="font-semibold text-gray-700 mt-1">{selected!.title}</h2>
        </div>

        {/* Question card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-5">
          <p className="text-gray-900 font-medium text-base leading-relaxed">
            🩺 {step!.instruction}
          </p>

          {/* Options */}
          <div className="flex flex-col gap-3">
            {step!.options.map((option, i) => {
              let style = 'border-gray-200 bg-white text-gray-700 hover:border-rose-300'
              if (chosenOption !== null) {
                if (i === step!.correct) style = 'border-green-400 bg-green-50 text-green-800'
                else if (i === chosenOption) style = 'border-red-400 bg-red-50 text-red-700'
                else style = 'border-gray-100 bg-gray-50 text-gray-400'
              }
              return (
                <button
                  key={i}
                  onClick={() => handleChoice(i)}
                  disabled={chosenOption !== null}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all duration-200 ${style}`}
                >
                  <span className="font-semibold mr-2">{String.fromCharCode(65 + i)}.</span>
                  {option}
                </button>
              )
            })}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className={`rounded-xl px-4 py-3 text-sm ${
              chosenOption === step!.correct
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              <p className="font-semibold mb-1">
                {chosenOption === step!.correct ? '✅ Correct!' : '❌ Incorrect'}
              </p>
              <p>{step!.explanation}</p>
            </div>
          )}

          {/* Next button */}
          {chosenOption !== null && (
            <button
              onClick={nextStep}
              className="w-full py-3 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-medium text-sm transition-colors"
            >
              {currentStep + 1 >= selected!.steps.length ? 'See Results →' : 'Next Step →'}
            </button>
          )}
        </div>

      </div>
    </div>
  )
}