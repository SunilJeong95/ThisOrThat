import { Link } from 'react-router-dom'

const STEPS = [
  {
    icon: 'quiz',
    title: '10 Quick Questions',
    desc: 'Answer simple This-or-That questions about your everyday habits — toilet paper orientation, pizza toppings, shower time, alarm habits, and more. Each question is designed to be low-stakes and honest.',
  },
  {
    icon: 'analytics',
    title: 'Two-Axis Scoring',
    desc: 'Your answers are scored on two dimensions: Chrono-Routine (your sleep & alarm habits) and Micro-Chaos Quotient (how much you deviate from the socially "normal" choice). Together they create your unique profile.',
  },
  {
    icon: 'person_celebrate',
    title: 'Discover Your Archetype',
    desc: 'Get matched to one of 24 unique personality archetypes — from "The Flawless Vanguard" to "The Rootless Destroyer" — complete with a radar chart, rarity percentile, and a soulmate country.',
  },
]

const AXES = [
  {
    name: 'Chrono-Routine Axis',
    icon: 'schedule',
    color: 'bg-sky-50 border-sky-100',
    iconColor: 'text-[#0EA5E9]',
    desc: 'Based on your shower timing and alarm behavior, you\'re assigned one of four base types. This axis reflects your chronotype — your biological preference for morning or evening activity. Research shows chronotype is roughly 50% genetic and predicts downstream personality traits like conscientiousness and openness.',
    types: [
      { label: 'Morning Shower + One Alarm', name: 'The Structured Lark' },
      { label: 'Morning Shower + Snooze Habit', name: 'The Aspirational Early Bird' },
      { label: 'Night Shower + One Alarm', name: 'The Disciplined Owl' },
      { label: 'Night Shower + Snooze Habit', name: 'The True Night Owl' },
    ],
  },
  {
    name: 'Micro-Chaos Quotient',
    icon: 'bolt',
    color: 'bg-amber-50 border-amber-100',
    iconColor: 'text-[#F59E0B]',
    desc: 'Your remaining 8 answers each award a chaos point if you pick the statistically less common option. Your total (0–8) places you in one of six tiers — from highly norm-conforming to gleefully chaotic. This axis captures openness to experience, sensation-seeking, and tolerance for ambiguity.',
    types: [
      { label: '0–1 points', name: 'Tier 1 — The Conformist' },
      { label: '2 points', name: 'Tier 2 — The Mostly Normal' },
      { label: '3–4 points', name: 'Tier 3 — The Balanced' },
      { label: '5 points', name: 'Tier 4 — The Mildly Chaotic' },
      { label: '6–7 points', name: 'Tier 5 — The Chaotic' },
      { label: '8 points', name: 'Tier 6 — The Pure Chaos Agent' },
    ],
  },
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white font-[Spline_Sans,sans-serif] text-slate-800">
      <header className="border-b border-slate-100 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-[#0EA5E9] transition-colors text-sm font-medium">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Home
          </Link>
          <span className="text-slate-300">|</span>
          <span className="text-slate-400 text-sm">How It Works</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-black text-slate-900 mb-2">How It Works</h1>
        <p className="text-slate-500 mb-10 leading-relaxed">
          ThisOrThat uses a two-axis scoring system inspired by personality psychology research.
          Here's exactly how your 10 answers become a personality archetype.
        </p>

        {/* Steps */}
        <section className="mb-14">
          <h2 className="text-xl font-bold text-slate-800 mb-6">The Three Steps</h2>
          <div className="space-y-5">
            {STEPS.map((step, i) => (
              <div key={i} className="flex gap-5 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="shrink-0 w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-[#0EA5E9] text-[22px]">{step.icon}</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 mb-0.5">Step {i + 1}</div>
                  <h3 className="font-bold text-slate-800 mb-1">{step.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Scoring Axes */}
        <section className="mb-14">
          <h2 className="text-xl font-bold text-slate-800 mb-6">The Two Scoring Axes</h2>
          <div className="space-y-6">
            {AXES.map((axis) => (
              <div key={axis.name} className={`rounded-2xl border p-6 ${axis.color}`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className={`material-symbols-outlined text-[22px] ${axis.iconColor}`}>{axis.icon}</span>
                  <h3 className="font-bold text-slate-800">{axis.name}</h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{axis.desc}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {axis.types.map((t) => (
                    <div key={t.label} className="bg-white rounded-xl px-4 py-2.5 border border-white/80 shadow-sm">
                      <div className="text-xs text-slate-400 font-medium">{t.label}</div>
                      <div className="text-sm font-bold text-slate-700">{t.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Result */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Your Result: 1 of 24 Archetypes</h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            The 4 Chrono-Routine base types × 6 Micro-Chaos tiers = <strong>24 unique archetypes</strong>.
            Each archetype comes with a name, a rarity percentile (from Top 15% down to Top 0.03%),
            a radar chart across five personality axes (CHAOS, REBEL, WILD, CHILL, WEIRD),
            a short description, and a soulmate country.
          </p>
          <p className="text-slate-600 text-sm leading-relaxed">
            Results can be downloaded as an image and shared directly to Twitter, Instagram, KakaoTalk, WhatsApp, and more.
          </p>
        </section>

        <div className="bg-blue-50 rounded-2xl p-6 text-center">
          <p className="text-slate-700 font-semibold mb-3">Ready to find your archetype?</p>
          <Link
            to="/quiz"
            className="inline-flex items-center gap-2 bg-[#F59E0B] text-white font-bold px-6 py-3 rounded-full hover:bg-orange-500 transition-colors"
          >
            Start the Quiz
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>
      </main>

      <footer className="border-t border-slate-100 py-8 px-6 text-center text-slate-400 text-sm">
        <div className="flex justify-center gap-6 mb-3">
          <Link to="/about" className="hover:text-[#0EA5E9] transition-colors">About</Link>
          <Link to="/faq" className="hover:text-[#0EA5E9] transition-colors">FAQ</Link>
          <Link to="/blog" className="hover:text-[#0EA5E9] transition-colors">Blog</Link>
          <Link to="/privacy" className="hover:text-[#0EA5E9] transition-colors">Privacy Policy</Link>
        </div>
        © 2026 ThisOrThat. Stay weird.
      </footer>
    </div>
  )
}
