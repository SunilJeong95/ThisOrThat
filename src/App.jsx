import './App.css'

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

function HeroSection() {
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

      <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
        <button className="group relative flex items-center justify-center gap-3 bg-[#F59E0B] hover:bg-orange-500 text-white text-lg md:text-xl font-bold px-10 py-5 rounded-full transition-all shadow-[0_10px_30px_rgba(245,158,11,0.4)] hover:shadow-[0_15px_35px_rgba(245,158,11,0.5)] hover:-translate-y-1 overflow-hidden ring-4 ring-orange-100">
          <span className="relative z-10">Start Test</span>
          <span className="material-symbols-outlined relative z-10 group-hover:translate-x-1 transition-transform">arrow_forward</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
        </button>
        <a className="px-8 py-5 rounded-full text-slate-600 font-bold hover:text-slate-900 hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200" href="#">
          View Sample Report
        </a>
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

function FeaturesSection() {
  return (
    <section className="relative z-10 py-20 px-4 bg-[#f8fafc] border-t border-slate-200">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 space-y-8">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              Find the{' '}
              <span className="text-[#0EA5E9] underline decoration-wavy decoration-[#FDE047] decoration-4 underline-offset-4">
                others
              </span>
              . <br />
              They are waiting.
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed font-medium">
              Most personality tests put you in a box. We break the box. QuirkRadar uses deep-learning to find the subtle, weird, wonderful traits that make you... you. Then we find who matches those exact frequencies.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white transition-colors">
                <div className="mt-1 min-w-[24px] text-[#0EA5E9] bg-[#0EA5E9]/10 rounded-full p-1">
                  <span className="material-symbols-outlined text-sm font-bold">check</span>
                </div>
                <div>
                  <h3 className="text-slate-800 font-bold text-lg">Deep Psychological Mapping</h3>
                  <p className="text-slate-500 text-sm mt-1">We analyze 50+ dimensions of personality, not just the big 5.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white transition-colors">
                <div className="mt-1 min-w-[24px] text-[#0EA5E9] bg-[#0EA5E9]/10 rounded-full p-1">
                  <span className="material-symbols-outlined text-sm font-bold">check</span>
                </div>
                <div>
                  <h3 className="text-slate-800 font-bold text-lg">Instant Global Connection</h3>
                  <p className="text-slate-500 text-sm mt-1">See exactly where your mental twins are located on a live map.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 relative w-full flex justify-center">
            <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px]">
              <div className="absolute inset-0 border border-[#0EA5E9]/20 rounded-full animate-[ping_3s_linear_infinite] bg-blue-50/50"></div>
              <div className="absolute inset-[15%] border border-[#0EA5E9]/20 rounded-full bg-white/40"></div>
              <div className="absolute inset-[30%] border border-[#0EA5E9]/20 rounded-full bg-white/60"></div>
              <div className="absolute inset-[45%] border border-[#0EA5E9]/40 rounded-full bg-white/80 shadow-inner"></div>
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div className="w-1/2 h-full bg-gradient-to-l from-[#0EA5E9]/20 to-transparent absolute top-0 left-1/2 origin-left animate-[spin_4s_linear_infinite]"></div>
              </div>
              <div className="absolute top-[20%] right-[20%] w-12 h-12 rounded-full bg-white border-2 border-[#0EA5E9] overflow-hidden shadow-lg animate-pulse z-20">
                <img
                  alt="Profile of a user"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkcTJHv_YbQ2sKBFH8vgjhSG-fjquQHHETwWI6eDzoqNUfI5sGkQDMP9z2hkObwUYtv_0JwXlQBwOMGnOifdZBesKLf3tSXEGi8ns6hfBjECqU3RR5zfh1qTqo_mN9t-qqbH5vQOavmKrpnHbGOjXK7uA6rLcywrnBWZFOJVSteHpx0OP88TVKLT0KBDxsgPED5odF9rI4K8c_rBUz3MQ6r9ctEH3aXamfPPbnZieD-UC9FSl3nn3xA3xyiADb8R3Hi8nt3m64D62Y"
                />
              </div>
              <div className="absolute bottom-[25%] left-[20%] w-10 h-10 rounded-full bg-white border border-slate-300 overflow-hidden opacity-90 shadow-md z-20">
                <img
                  alt="Profile of a user"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTplTRaOXPhMCP4TwwSUUjAkeqXWCzkQbOmkJhgflSqsAMUxKch3RnHwuPTmJtAHP0f9UpZfEKb62cU-Hy2eu_Xg9Vr5IUcCpTPlpHhMZI73iIuHPFS1Zgwug1vFWtqWn0lHnW2XEWK-xUAZeThVUWh9rzLJ4ynktbHOvBR5MHOOk-ajcIpar6V7OWaWvZQKGtt5XFPQQleUiwY0WfBR_3CU3nx-xTMWL8gzwlhjsZoJt-lcUPrBbyPED7X-JnPRtwaNYK-f8D_DO8"
                />
              </div>
              <div className="absolute top-[10%] left-[40%] w-6 h-6 rounded-full bg-[#F59E0B] animate-ping z-10"></div>
              <div className="absolute inset-0 m-auto w-24 h-24 rounded-full border-4 border-white bg-[#F59E0B] flex items-center justify-center z-30 shadow-xl ring-4 ring-orange-100">
                <span className="material-symbols-outlined text-4xl text-white">person</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const marqueeItems = [
  'Alex from London found a 98% match in Tokyo',
  'Sarah just unlocked "Chaotic Good" archetype',
  'Rajiv matched with 4 people in Brazil',
  'Elena found her twin in New York',
  'Kenji from Osaka found a 99% match in Berlin',
  'Maya just discovered she\'s a "Lunar Dreamer"',
]

function MarqueeBanner() {
  const items = [...marqueeItems, ...marqueeItems]
  return (
    <div className="w-full bg-white border-t border-b border-slate-200 overflow-hidden py-4 relative z-10">
      <div className="flex items-center gap-8 whitespace-nowrap animate-[marquee_30s_linear_infinite] hover:pause">
        {items.map((text, i) => (
          <div key={i} className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-2 text-slate-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
              <span>{text}</span>
            </div>
            {i < items.length - 1 && <span className="text-slate-300 ml-8">|</span>}
          </div>
        ))}
      </div>
    </div>
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

function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#0EA5E9]/10 rounded-full blur-[120px] opacity-60"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#FDE047]/20 rounded-full blur-[100px] opacity-50"></div>
      <div className="absolute top-20 left-20 w-[300px] h-[300px] bg-[#F59E0B]/10 rounded-full blur-[80px] opacity-40"></div>
    </div>
  )
}

export default function App() {
  return (
    <div className="relative flex flex-col min-h-screen w-full bg-white font-[Spline_Sans,sans-serif] text-[#0f172a] antialiased overflow-x-hidden">
      <BackgroundBlobs />
      <Header />
      <HeroSection />
      <FeaturesSection />
      <MarqueeBanner />
      <Footer />
    </div>
  )
}
