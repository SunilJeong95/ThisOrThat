import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const BASE_COUNT = 2

function HeroSection({ onStart }) {
  const [visitorCount, setVisitorCount] = useState(BASE_COUNT)

  useEffect(() => {
    let sessionId = sessionStorage.getItem('tot_session')
    if (!sessionId) {
      sessionId = Math.random().toString(36).slice(2) + Date.now().toString(36)
      sessionStorage.setItem('tot_session', sessionId)
    }

    const heartbeat = async () => {
      try {
        const res = await fetch('/api/presence', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        })
        const data = await res.json()
        setVisitorCount(BASE_COUNT + (data.count || 0))
      } catch {
        // dev 환경 등 API 없을 때는 기본값 유지
      }
    }

    heartbeat()
    const interval = setInterval(heartbeat, 45000)

    const onLeave = () => {
      navigator.sendBeacon('/api/presence', JSON.stringify({ sessionId, leaving: true }))
    }
    window.addEventListener('beforeunload', onLeave)

    return () => {
      clearInterval(interval)
      window.removeEventListener('beforeunload', onLeave)
    }
  }, [])

  return (
    <main className="relative z-10 flex-grow flex flex-col items-center justify-center px-4 py-12 md:py-20 text-center max-w-7xl mx-auto w-full">
      <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-blue-50 border border-blue-100 text-[#0EA5E9] mb-8 shadow-sm">
        <span className="relative flex h-3 w-3 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0EA5E9] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#0EA5E9]"></span>
        </span>
        <span className="text-sm font-bold tracking-wide">
          <span className="text-xl font-black text-[#0EA5E9]">{visitorCount.toLocaleString()}</span>
          {' '}live
        </span>
      </div>

      <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] mb-6 text-slate-900 drop-shadow-sm max-w-4xl mx-auto">
        What is your <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0EA5E9] via-blue-500 to-indigo-600">
          weirdo score?
        </span>
      </h1>

      <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
        Is there anyone just like me on Earth? Let's scan the globe. Our advanced algorithm matches your quirks with millions of profiles.
      </p>

      <div className="flex items-center justify-center mb-16">
        <button
          onClick={onStart}
          className="group relative flex items-center justify-center gap-4 bg-[#F59E0B] hover:bg-orange-500 text-white text-2xl md:text-3xl font-black px-16 py-7 rounded-full transition-all shadow-[0_14px_40px_rgba(245,158,11,0.45)] hover:shadow-[0_20px_50px_rgba(245,158,11,0.55)] hover:-translate-y-1.5 overflow-hidden ring-4 ring-orange-100"
        >
          <span className="relative z-10">Start Test</span>
          <span className="material-symbols-outlined relative z-10 text-3xl group-hover:translate-x-1.5 transition-transform">arrow_forward</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
        </button>
      </div>

    </main>
  )
}


function HowItWorksSection() {
  const steps = [
    {
      icon: 'quiz',
      title: '10 Quick Questions',
      desc: 'Answer simple This-or-That questions about your everyday habits — toilet paper, pizza toppings, shower time, and more.',
    },
    {
      icon: 'analytics',
      title: 'Two-Axis Scoring',
      desc: 'Your answers are scored on two dimensions: Chrono-Routine (your sleep & alarm habits) and Micro-Chaos Quotient (how much you deviate from "the norm").',
    },
    {
      icon: 'person_celebrate',
      title: 'Discover Your Archetype',
      desc: 'Get matched to one of 24 unique personality archetypes — from "The Flawless Vanguard" to "The Rootless Destroyer" — with a radar chart and a soulmate country.',
    },
  ]

  return (
    <section className="relative z-10 w-full bg-slate-50 border-t border-slate-100 py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 text-center mb-2">How It Works</h2>
        <p className="text-slate-500 text-center mb-10 text-sm">Science-backed habits. Surprisingly accurate results.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <span className="material-symbols-outlined text-[#0EA5E9] text-[22px]">{step.icon}</span>
              </div>
              <h3 className="font-bold text-slate-800">{step.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const FAQ_ITEMS = [
  {
    q: 'Is this quiz based on real personality science?',
    a: 'Yes and no. The quiz is inspired by research linking habitual behaviors to Big Five personality traits — especially Conscientiousness, Openness, and Chronotype (morning vs. evening tendency). However, it\'s designed to be fun and shareable, not a clinical assessment. Think of it as a playful window into your habits, not a diagnosis.',
  },
  {
    q: 'How are the 24 archetypes determined?',
    a: 'Your result is determined by two axes. The Chrono-Routine axis (based on your shower timing and alarm behavior) produces one of 4 base types. Your Micro-Chaos Quotient — derived from the remaining 8 questions — places you in one of 6 tiers from low chaos to high chaos. The combination maps you to one of 24 unique archetypes.',
  },
  {
    q: 'Why pineapple on pizza, socks in bed, and toilet paper orientation?',
    a: 'These questions have become cultural flashpoints precisely because they reveal genuine preference differences. They\'re low-stakes enough that people answer honestly, but polarizing enough to discriminate between personality types. Research suggests that food preferences and domestic habits correlate meaningfully with personality traits like openness to experience and conscientiousness.',
  },
  {
    q: 'How long does the quiz take?',
    a: 'About 90 seconds. There are 10 questions and you can answer each in a few seconds. No login, no email required.',
  },
  {
    q: 'Can I retake the quiz?',
    a: 'Yes, anytime. Just go back to the home page and click "Start Test." Your previous result is not saved on our servers.',
  },
  {
    q: 'Is my data stored or shared?',
    a: 'We don\'t store your quiz answers permanently. We use anonymous session data to power the live visitor counter. For advertising, Google AdSense may use cookies to show relevant ads. See our Privacy Policy for full details.',
  },
]

function FaqSection() {
  return (
    <section className="relative z-10 w-full py-16 px-6 bg-white border-t border-slate-100">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 text-center mb-2">Frequently Asked Questions</h2>
        <p className="text-slate-500 text-center mb-10 text-sm">Everything you need to know about ThisOrThat.</p>
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <details key={i} className="group border border-slate-200 rounded-2xl overflow-hidden">
              <summary className="flex items-center justify-between px-6 py-4 cursor-pointer font-semibold text-slate-800 hover:bg-slate-50 transition-colors list-none">
                <span>{item.q}</span>
                <span className="material-symbols-outlined text-slate-400 group-open:rotate-180 transition-transform text-[20px] shrink-0 ml-4">expand_more</span>
              </summary>
              <div className="px-6 pb-5 pt-1 text-slate-600 text-sm leading-relaxed">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="relative z-10 bg-slate-50 py-12 px-6 border-t border-slate-200">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-slate-400">radar</span>
          <span className="text-slate-700 font-bold text-lg">ThisOrThat</span>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <Link className="text-slate-500 hover:text-[#0EA5E9] transition-colors text-sm font-medium" to="/about">About</Link>
          <Link className="text-slate-500 hover:text-[#0EA5E9] transition-colors text-sm font-medium" to="/blog">Blog</Link>
          <Link className="text-slate-500 hover:text-[#0EA5E9] transition-colors text-sm font-medium" to="/privacy">Privacy Policy</Link>
          <Link className="text-slate-500 hover:text-[#0EA5E9] transition-colors text-sm font-medium" to="/contact">Contact Us</Link>
        </div>
        <div className="text-slate-400 text-sm font-medium">
          © 2026 ThisOrThat. Stay weird.
        </div>
      </div>
    </footer>
  )
}

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="relative flex flex-col min-h-screen w-full bg-white font-[Spline_Sans,sans-serif] text-[#0f172a] antialiased overflow-x-hidden">
      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#0EA5E9]/10 rounded-full blur-[120px] opacity-60"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#FDE047]/20 rounded-full blur-[100px] opacity-50"></div>
        <div className="absolute top-20 left-20 w-[300px] h-[300px] bg-[#F59E0B]/10 rounded-full blur-[80px] opacity-40"></div>
      </div>
      <HeroSection onStart={() => navigate('/quiz')} />
      <HowItWorksSection />
      <FaqSection />
      <Footer />
    </div>
  )
}
