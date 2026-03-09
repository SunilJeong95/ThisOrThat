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
      <Footer />
    </div>
  )
}
