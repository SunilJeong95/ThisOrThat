import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const AVATAR_URLS = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuACOffwaPSA48nJlMY5OPZeWi-S5pu-bxuKbjdUrcqSLWWGqQ6rkUwvVv8rHVqk84sYv3Uwxv5m0rFf7_BM3YKWsNrMEJA7FenBE65mRzqeVUtl__SBoveKlpJPCvti75vW_tiiDB4x6Wf4nYdqb4WfhNMrUTuntQ82GDN2JciyiKl18zbJ7W632cXje6a3jSpjyIv_ujJs9A3RjptKFDoiIKB1II10ClB-_52EjIYHF8CTJPSRQOPNY6kwKcQIBuBOpGF3pqdhFPFk',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCZccjA-5FL-mdhdppXzxkARv5HpAhFZ-JbkPOLuAUFygxWaPzTmi1spZXl3l0C-Vl9HW8V7WVj741k2nwlElaFObIDXWWasSm1gAGqa5i7NdbE6TzGAQ5tURKSS4YEaGXPFX-Ijj0sKL9Js84shC7dSg9KsiBb5qNru2tNLYDYSqLDK37WPMdEyRpGKcstbJ_PbBM5azy13lz7HyqHnR58bJ0HMeb2u5uTnuR4zDgi5gfJArpsBSL9thYmBlSwwLLsvZOK6spqCqBF',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCb28WDK4Em_wua_veH-u1RtWOYNpAeDmBRMm1AumleNAsL5zdeLROFuscFyebk0BCrvag7XR7FcjvPGoGU5Y6zz_5uwIK6aEC26yrUTixOUlaDXz_Hjgfc9gct67yqSbJ4lyQ2oTAG_PILnzuVVdbsnas9OUJct5vI9XPFDpp2tOU0vAKF5mrVq-pMupdqenRFDY-_gtsaabHikvUVOk_iMldU3pNNilGbs9omjLjZtAEiyYAztrH06NkN16VIkoKBgsNa8DhQoPcz',
]

const USER_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1uLzjl71SLBQuY4fnrCgWWDA-Hm9UXA9n7w4ZDvCya_MrL5Ale5JOeRzPkSJIfj5s9aoJjgTY4ZDcy7PXeGjcFKRtdSuiA6YfE1klIONZ1qA7XzTlNKs_bJPq5f5OgvE4WVp7UWngnq6hfpN9O7IRi1spixMKw7qKcjHpCHuADTUn_ACGxEdo8oEIG9erJB9GAHJ-ICRpU8dlHwBiNpfgVzQcU948peQEny35WcKjuKmNVDPchWCBpd3FHQjvGYvx0Pzo5Ecxy6iL'

const questions = [
  {
    id: 1,
    label: 'Controversial',
    labelIcon: 'local_fire_department',
    labelColor: 'text-orange-500',
    title: 'Pineapple on Pizza?',
    description: 'Culinary genius or a crime against humanity? 🍍🍕',
    type: 'image',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4OUaCipBza5iXhrzVyKy1yq0FX2MInPuiyWpBg105qquXdIF-rptL8JFz-k1LXUB7kDxB3E9HauMsAsXAIplh5_ek8QTKjsRoF5y-KqPmvblD-FEaATv0dcnYNu9cfyMYozp7f-tRlA0tL1bQgfBpohi81hhRMJy6JXhcfPliJ-I5vPYzrJY7DXcHl1ry5t8yX6VYu6NBeRDieuzOMG3pvvClJbXg497_wU6vO6Qh28u_SljQ8I-OFmhhbo4D3WaQfHSYe2_weLgu',
    votes: '12.5k',
  },
  {
    id: 2,
    label: 'Fashion Crime',
    labelIcon: 'style',
    labelColor: 'text-purple-600',
    title: 'Socks with Sandals?',
    description: 'Ultimate comfort or fashion apocalypse? 🧦👡',
    type: 'emoji',
    emoji: '🧦',
    gradient: 'from-purple-200 via-violet-100 to-indigo-200',
    votes: '8.3k',
  },
  {
    id: 3,
    label: 'Night Ritual',
    labelIcon: 'bedtime',
    labelColor: 'text-blue-600',
    title: 'Sleeping with Socks On?',
    description: 'Warm feet = better sleep? Or absolute chaos? 🧦😴',
    type: 'emoji',
    emoji: '😴',
    gradient: 'from-blue-200 via-sky-100 to-indigo-200',
    votes: '9.1k',
  },
  {
    id: 4,
    label: 'Social Experiment',
    labelIcon: 'flight',
    labelColor: 'text-sky-600',
    title: 'Talking to Strangers on Planes?',
    description: 'Networking opportunity or please don\'t talk to me? ✈️🤫',
    type: 'emoji',
    emoji: '✈️',
    gradient: 'from-sky-200 via-cyan-100 to-teal-200',
    votes: '15.2k',
  },
  {
    id: 5,
    label: 'Breakfast War',
    labelIcon: 'emoji_food_beverage',
    labelColor: 'text-amber-600',
    title: 'Milk Before Cereal?',
    description: 'The ancient debate that divides families. 🥛🥣',
    type: 'emoji',
    emoji: '🥣',
    gradient: 'from-amber-200 via-yellow-100 to-orange-100',
    votes: '20.7k',
  },
  {
    id: 6,
    label: 'Comfort Mode',
    labelIcon: 'tv',
    labelColor: 'text-rose-500',
    title: 'Rewatching Instead of New Shows?',
    description: 'Cozy familiarity or wasted opportunity? 📺🔄',
    type: 'emoji',
    emoji: '📺',
    gradient: 'from-rose-200 via-pink-100 to-red-100',
    votes: '18.4k',
  },
  {
    id: 7,
    label: 'Eating Ritual',
    labelIcon: 'lunch_dining',
    labelColor: 'text-orange-600',
    title: 'Eating the Crust First?',
    description: 'Save the best for last or get it out of the way? 🍕🔄',
    type: 'emoji',
    emoji: '🍕',
    gradient: 'from-orange-200 via-amber-100 to-yellow-100',
    votes: '7.6k',
  },
  {
    id: 8,
    label: 'Morning Person?',
    labelIcon: 'wb_sunny',
    labelColor: 'text-teal-600',
    title: 'Making Your Bed Every Day?',
    description: 'Productive habit or pointless chore? 🛏️✨',
    type: 'emoji',
    emoji: '🛏️',
    gradient: 'from-teal-200 via-emerald-100 to-green-100',
    votes: '22.1k',
  },
  {
    id: 9,
    label: 'Privacy Mode',
    labelIcon: 'phone_android',
    labelColor: 'text-slate-600',
    title: 'Phone Face-Down in Public?',
    description: 'Privacy habit or just suspicious behavior? 📱🙈',
    type: 'emoji',
    emoji: '📱',
    gradient: 'from-slate-200 via-gray-100 to-zinc-100',
    votes: '11.9k',
  },
  {
    id: 10,
    label: 'Solo Concert',
    labelIcon: 'music_note',
    labelColor: 'text-pink-500',
    title: 'Singing in the Shower?',
    description: 'Grammy performance or noise complaint waiting to happen? 🚿🎤',
    type: 'emoji',
    emoji: '🎤',
    gradient: 'from-pink-200 via-rose-100 to-fuchsia-100',
    votes: '31.5k',
  },
]

function ResultsScreen({ answers, onRestart }) {
  const loveCount = answers.filter(a => a === 'love').length
  const hateCount = answers.filter(a => a === 'hate').length
  const skipCount = answers.filter(a => a === 'skip').length
  const weirdoScore = Math.round((loveCount * 12 + skipCount * 5) % 100)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white relative overflow-hidden" style={{ fontFamily: '"Spline Sans", sans-serif' }}>
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#0ea5e9]/10 blur-[100px] opacity-60" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#facc15]/20 blur-[100px] opacity-60" />
        <div style={{ backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)', backgroundSize: '24px 24px' }} className="absolute inset-0" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-md w-full">
        <div className="text-7xl mb-4 animate-bounce">🎉</div>
        <h2 className="text-4xl font-black text-slate-900 mb-2">Quiz Complete!</h2>
        <p className="text-slate-500 text-lg mb-6">Your quirk profile has been analyzed</p>

        <div className="w-full bg-gradient-to-br from-[#0ea5e9] to-indigo-600 rounded-3xl p-8 mb-6 text-white shadow-2xl shadow-[#0ea5e9]/30">
          <div className="text-sm font-bold uppercase tracking-widest opacity-80 mb-1">Your Weirdo Score</div>
          <div className="text-8xl font-black mb-1">{weirdoScore}</div>
          <div className="text-sm opacity-70">out of 100</div>
        </div>

        <div className="w-full bg-white rounded-2xl p-6 border border-slate-100 shadow-sm mb-8 flex justify-around">
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-black text-green-500">{loveCount}</span>
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wide">Loved</span>
          </div>
          <div className="w-px bg-slate-100" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-black text-red-500">{hateCount}</span>
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wide">Hated</span>
          </div>
          <div className="w-px bg-slate-100" />
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-black text-slate-400">{skipCount}</span>
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wide">Skipped</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <button
            onClick={onRestart}
            className="flex-1 bg-[#0ea5e9] hover:bg-[#0ea5e9]/90 text-white font-bold px-8 py-4 rounded-full transition-all shadow-lg hover:-translate-y-0.5"
          >
            Back to Home
          </button>
          <button
            onClick={onRestart}
            className="flex-1 bg-white hover:bg-slate-50 text-slate-700 font-bold px-8 py-4 rounded-full transition-all border border-slate-200 hover:-translate-y-0.5"
          >
            Share Result
          </button>
        </div>
      </div>
    </div>
  )
}

export default function QuizPage() {
  const navigate = useNavigate()
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState([])
  const [exitDir, setExitDir] = useState(null) // null | 'left' | 'right' | 'up'
  const [isDone, setIsDone] = useState(false)

  const question = questions[currentIdx]
  const nextQuestion = questions[currentIdx + 1]
  const progress = (answers.length / questions.length) * 100

  const handleAnswer = useCallback((answer) => {
    if (exitDir !== null || isDone) return

    const dir = answer === 'love' ? 'right' : answer === 'hate' ? 'left' : 'up'
    setExitDir(dir)

    setTimeout(() => {
      const newAnswers = [...answers, answer]
      setAnswers(newAnswers)
      if (newAnswers.length >= questions.length) {
        setIsDone(true)
      } else {
        setCurrentIdx(i => i + 1)
      }
      setExitDir(null)
    }, 380)
  }, [exitDir, isDone, answers])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') handleAnswer('love')
      else if (e.key === 'ArrowLeft') handleAnswer('hate')
      else if (e.key === 'ArrowUp') handleAnswer('skip')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handleAnswer])

  const cardTransform =
    exitDir === 'right' ? 'translateX(130%) rotate(18deg)' :
    exitDir === 'left'  ? 'translateX(-130%) rotate(-18deg)' :
    exitDir === 'up'    ? 'translateY(-120%) scale(0.85)' :
    'translateX(0) rotate(0deg)'

  if (isDone) {
    return <ResultsScreen answers={answers} onRestart={() => navigate('/')} />
  }

  return (
    <div className="min-h-screen flex flex-col overflow-hidden bg-white text-slate-800" style={{ fontFamily: '"Spline Sans", sans-serif' }}>
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#0ea5e9]/10 blur-[100px] opacity-60" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#facc15]/20 blur-[100px] opacity-60" />
        <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-pink-300/10 blur-[80px] opacity-40" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      </div>

      {/* Header */}
      <header className="relative z-50 flex items-center justify-between px-6 py-4 md:px-10 border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center size-10 rounded-full bg-[#0ea5e9] text-white shadow-lg shadow-[#0ea5e9]/20 hover:scale-105 transition-transform"
          >
            <span className="material-symbols-outlined text-[24px]">radar</span>
          </button>
          <h1 className="text-xl font-bold tracking-tight text-slate-800 hidden sm:block">QuirkRadar</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center justify-center size-10 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-800">
            <span className="material-symbols-outlined">share</span>
          </button>
          <div className="h-6 w-px bg-slate-200" />
          <div
            className="rounded-full size-10 ring-2 ring-[#0ea5e9]/20 shadow-sm bg-cover bg-center"
            style={{ backgroundImage: `url('${USER_AVATAR}')` }}
          />
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-4 md:p-6 w-full max-w-7xl mx-auto">

        {/* Progress bar */}
        <div className="w-full max-w-md mb-6 md:mb-8 flex flex-col gap-2">
          <div className="flex justify-between items-center px-1">
            <span className="text-sm font-bold text-[#0ea5e9] uppercase tracking-wider bg-[#0ea5e9]/10 px-3 py-0.5 rounded-full">
              Quirk {answers.length + 1} of {questions.length}
            </span>
            {nextQuestion && (
              <span className="text-xs font-medium text-slate-400 truncate max-w-[160px]">
                Next: {nextQuestion.title}
              </span>
            )}
          </div>
          <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div
              className="h-full bg-gradient-to-r from-[#0ea5e9] to-sky-300 rounded-full shadow-[0_0_10px_rgba(14,165,233,0.3)] transition-all duration-500"
              style={{ width: `${Math.max(progress, 3)}%` }}
            />
          </div>
        </div>

        {/* Card wrapper — group for hover LOVE/HATE labels */}
        <div className="relative w-full max-w-md group" style={{ perspective: '1000px' }}>

          {/* Quiz card */}
          <div
            key={question.id}
            className="aspect-[4/5] md:aspect-[3/4] max-h-[58vh] md:max-h-[580px] bg-white rounded-[2rem] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 flex flex-col hover:shadow-[0_25px_70px_-12px_rgba(14,165,233,0.15)] hover:scale-[1.02] transition-[box-shadow,transform] duration-300"
            style={{
              transform: cardTransform,
              opacity: exitDir ? 0 : 1,
              transition: 'transform 0.38s cubic-bezier(0.4,0,0.2,1), opacity 0.38s ease',
            }}
          >
            {/* Image / emoji area */}
            <div className="relative flex-1 overflow-hidden">
              {question.type === 'image' ? (
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${question.image}')` }}
                />
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${question.gradient} flex items-center justify-center`}>
                  <span className="text-[120px] md:text-[150px] select-none leading-none drop-shadow-sm">
                    {question.emoji}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-40" />
              {/* Label badge */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md shadow-sm border border-slate-100 px-3 py-1.5 rounded-full flex items-center gap-2">
                <span className={`material-symbols-outlined text-[18px] ${question.labelColor}`}>{question.labelIcon}</span>
                <span className="text-xs font-bold text-slate-800 tracking-wide uppercase">{question.label}</span>
              </div>
            </div>

            {/* Card text content */}
            <div className="relative p-6 md:p-7 flex flex-col gap-2 bg-white">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight tracking-tight">
                {question.title}
              </h2>
              <p className="text-slate-500 text-base md:text-lg leading-relaxed font-medium">
                {question.description}
              </p>
              <div className="flex items-center gap-3 mt-1 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex -space-x-2">
                  {AVATAR_URLS.map((url, i) => (
                    <div
                      key={i}
                      className="size-7 rounded-full ring-2 ring-white bg-slate-200 bg-cover shadow-sm"
                      style={{ backgroundImage: `url('${url}')` }}
                    />
                  ))}
                </div>
                <span className="text-xs text-slate-600 font-semibold">{question.votes} voted recently</span>
              </div>
            </div>
          </div>

          {/* Hover: LOVE label */}
          <div className="absolute top-10 right-8 rotate-12 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none bg-green-500 text-white shadow-xl shadow-green-500/30 font-black text-2xl px-6 py-2 rounded-xl uppercase tracking-widest scale-75 group-hover:scale-100 z-20">
            Love
          </div>
          {/* Hover: HATE label */}
          <div className="absolute top-10 left-8 -rotate-12 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none bg-red-500 text-white shadow-xl shadow-red-500/30 font-black text-2xl px-6 py-2 rounded-xl uppercase tracking-widest scale-75 group-hover:scale-100 z-20">
            Hate
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-8 md:mt-10 flex items-center justify-center gap-8 md:gap-16 w-full max-w-lg">

          {/* Hate */}
          <div className="flex flex-col items-center gap-3 group/btn">
            <button
              onClick={() => handleAnswer('hate')}
              className="relative flex items-center justify-center size-16 md:size-20 bg-white hover:bg-red-50 text-red-500 rounded-full transition-all duration-300 hover:scale-110 border border-slate-200 shadow-[0_10px_30px_-10px_rgba(239,68,68,0.2)] hover:shadow-[0_15px_40px_-5px_rgba(239,68,68,0.3)] hover:border-red-200"
            >
              <span className="material-symbols-outlined text-4xl md:text-5xl transition-transform group-hover/btn:scale-110">close</span>
            </button>
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 group-hover/btn:text-red-500 transition-colors">Hate</span>
              <div className="hidden md:flex mt-1 items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-[10px] text-slate-400 font-mono">
                <span>←</span> Left
              </div>
            </div>
          </div>

          {/* Skip */}
          <button
            onClick={() => handleAnswer('skip')}
            className="flex flex-col items-center gap-2 group/skip -mt-5"
          >
            <div className="size-12 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-400 shadow-sm hover:shadow-md group-hover/skip:bg-[#facc15] group-hover/skip:text-slate-900 group-hover/skip:border-[#facc15] transition-all hover:-translate-y-1">
              <span className="material-symbols-outlined text-2xl">keyboard_arrow_up</span>
            </div>
            <span className="text-[10px] uppercase font-bold text-slate-400 group-hover/skip:text-slate-600 transition-colors">Skip</span>
          </button>

          {/* Love */}
          <div className="flex flex-col items-center gap-3 group/btn">
            <button
              onClick={() => handleAnswer('love')}
              className="relative flex items-center justify-center size-16 md:size-20 bg-white hover:bg-green-50 text-green-500 rounded-full transition-all duration-300 hover:scale-110 border border-slate-200 shadow-[0_10px_30px_-10px_rgba(34,197,94,0.2)] hover:shadow-[0_15px_40px_-5px_rgba(34,197,94,0.3)] hover:border-green-200"
            >
              <span className="material-symbols-outlined text-3xl md:text-4xl transition-transform group-hover/btn:scale-110">favorite</span>
            </button>
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 group-hover/btn:text-green-500 transition-colors">Love</span>
              <div className="hidden md:flex mt-1 items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-[10px] text-slate-400 font-mono">
                Right <span>→</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
