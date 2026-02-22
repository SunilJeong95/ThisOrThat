import { useNavigate } from 'react-router-dom'

function Header() {
  return (
    <header className="relative z-10 w-full px-6 py-6 flex justify-center">
      <nav className="flex items-center justify-between w-full max-w-5xl bg-white/80 backdrop-blur-md border border-slate-200 rounded-full px-6 py-3 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-2">
          <div className="text-[#F59E0B] bg-[#F59E0B]/10 p-1.5 rounded-full">
            <span className="material-symbols-outlined text-2xl">radar</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800 hidden sm:block">QuirkRadar</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a className="text-sm font-semibold text-slate-500 hover:text-[#0EA5E9] transition-colors" href="#">How it Works</a>
          <a className="text-sm font-semibold text-slate-500 hover:text-[#0EA5E9] transition-colors" href="#">Global Map</a>
          <a className="text-sm font-semibold text-slate-500 hover:text-[#0EA5E9] transition-colors" href="#">About Us</a>
        </div>
        <div className="flex items-center gap-3">
          <a className="text-sm font-bold text-slate-600 hover:text-[#0EA5E9] transition-colors px-3 py-2" href="#">Login</a>
          <button className="bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-white text-sm font-bold px-5 py-2.5 rounded-full transition-all shadow-[0_4px_14px_0_rgba(245,158,11,0.39)] hover:shadow-[0_6px_20px_rgba(245,158,11,0.23)] hover:-translate-y-0.5">
            Join Now
          </button>
        </div>
      </nav>
    </header>
  )
}

function HeroSection({ onStart }) {
  return (
    <main className="relative z-10 flex-grow flex flex-col items-center justify-center px-4 py-12 md:py-20 text-center max-w-7xl mx-auto w-full">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-[#0EA5E9] mb-8 shadow-sm">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0EA5E9] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#0EA5E9]"></span>
        </span>
        <span className="text-xs font-bold tracking-wide uppercase">2,492 people testing right now</span>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl px-4">
        <div className="bg-white border border-slate-100 p-6 rounded-2xl flex flex-col items-center md:items-start hover:shadow-lg hover:border-slate-200 transition-all shadow-sm">
          <div className="p-3 bg-blue-50 rounded-xl text-[#0EA5E9] mb-4">
            <span className="material-symbols-outlined">fingerprint</span>
          </div>
          <div className="text-3xl font-extrabold text-slate-800 mb-1">1.5M+</div>
          <div className="text-sm text-slate-500 font-medium">Unique quirks analyzed</div>
        </div>
        <div className="bg-white border border-slate-100 p-6 rounded-2xl flex flex-col items-center md:items-start hover:shadow-lg hover:border-slate-200 transition-all shadow-sm">
          <div className="p-3 bg-orange-50 rounded-xl text-[#F59E0B] mb-4">
            <span className="material-symbols-outlined">public</span>
          </div>
          <div className="text-3xl font-extrabold text-slate-800 mb-1">192</div>
          <div className="text-sm text-slate-500 font-medium">Countries scanned daily</div>
        </div>
        <div className="bg-white border border-slate-100 p-6 rounded-2xl flex flex-col items-center md:items-start hover:shadow-lg hover:border-slate-200 transition-all shadow-sm">
          <div className="p-3 bg-yellow-50 rounded-xl text-yellow-600 mb-4">
            <span className="material-symbols-outlined">favorite</span>
          </div>
          <div className="text-3xl font-extrabold text-slate-800 mb-1">500k+</div>
          <div className="text-sm text-slate-500 font-medium">Soulmates connected</div>
        </div>
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
          <span className="text-slate-700 font-bold text-lg">QuirkRadar</span>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <a className="text-slate-500 hover:text-[#0EA5E9] transition-colors text-sm font-medium" href="#">Privacy Policy</a>
          <a className="text-slate-500 hover:text-[#0EA5E9] transition-colors text-sm font-medium" href="#">Terms of Service</a>
          <a className="text-slate-500 hover:text-[#0EA5E9] transition-colors text-sm font-medium" href="#">Contact Us</a>
        </div>
        <div className="text-slate-400 text-sm font-medium">
          © 2024 QuirkRadar. Stay weird.
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
      <Header />
      <HeroSection onStart={() => navigate('/quiz')} />
      <Footer />
    </div>
  )
}
