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
    label: 'The Great Debate',
    labelIcon: 'priority_high',
    labelColor: 'text-amber-500',
    title: 'Toilet Paper: Over or Under?',
    description: 'A question that has ended friendships and started wars. Which way do you hang it? 🧻',
    type: 'svg',
    svgBg: 'from-amber-100 via-yellow-50 to-orange-100',
    svg: (
      <svg viewBox="0 0 200 200" className="w-40 h-40 drop-shadow-xl">
        <rect x="80" y="30" width="40" height="140" rx="8" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2"/>
        <circle cx="100" cy="30" r="16" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="2"/>
        <circle cx="100" cy="30" r="6" fill="#9ca3af"/>
        {/* paper roll */}
        <rect x="86" y="46" width="28" height="100" rx="4" fill="#fef3c7"/>
        {/* over flap */}
        <path d="M100 46 Q120 60 114 80 Q108 60 100 54 Z" fill="#fde68a" stroke="#fbbf24" strokeWidth="1"/>
        {/* lines on paper */}
        <line x1="90" y1="60" x2="110" y2="60" stroke="#fbbf24" strokeWidth="1.5" opacity="0.5"/>
        <line x1="90" y1="70" x2="110" y2="70" stroke="#fbbf24" strokeWidth="1.5" opacity="0.5"/>
        <line x1="90" y1="80" x2="110" y2="80" stroke="#fbbf24" strokeWidth="1.5" opacity="0.5"/>
      </svg>
    ),
    votes: '14.2k',
  },
  {
    id: 2,
    label: 'Bold Claim',
    labelIcon: 'wc',
    labelColor: 'text-blue-500',
    title: 'Bathroom: Sit or Stand?',
    description: 'Some routines are done seated. Some people prefer to stand. No judgment here. 🚽',
    type: 'svg',
    svgBg: 'from-blue-100 via-sky-50 to-cyan-100',
    svg: (
      <svg viewBox="0 0 200 200" className="w-40 h-40 drop-shadow-xl">
        {/* toilet */}
        <ellipse cx="100" cy="155" rx="44" ry="18" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="2"/>
        <rect x="58" y="100" width="84" height="58" rx="16" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2"/>
        <ellipse cx="100" cy="100" rx="42" ry="12" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="2"/>
        {/* seat */}
        <path d="M70 100 Q100 120 130 100 Q130 118 100 128 Q70 118 70 100Z" fill="#d1d5db" opacity="0.6"/>
        {/* tank */}
        <rect x="74" y="60" width="52" height="44" rx="8" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2"/>
        <rect x="80" y="54" width="40" height="10" rx="4" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="1.5"/>
        {/* button */}
        <circle cx="100" cy="66" r="5" fill="#9ca3af"/>
      </svg>
    ),
    votes: '9.8k',
  },
  {
    id: 3,
    label: 'Tube Terror',
    labelIcon: 'emergency',
    labelColor: 'text-green-500',
    title: 'Toothpaste: Bottom or Middle?',
    description: 'Methodical bottom-squeezer or a chaotic middle-crusher? This says everything. 🪥',
    type: 'svg',
    svgBg: 'from-green-100 via-emerald-50 to-teal-100',
    svg: (
      <svg viewBox="0 0 200 200" className="w-40 h-40 drop-shadow-xl">
        {/* tube body */}
        <rect x="70" y="50" width="60" height="110" rx="10" fill="#a7f3d0" stroke="#34d399" strokeWidth="2"/>
        {/* crimp bottom - neat */}
        <rect x="72" y="148" width="56" height="12" rx="3" fill="#6ee7b7" stroke="#34d399" strokeWidth="1.5"/>
        {/* cap */}
        <rect x="84" y="38" width="32" height="16" rx="6" fill="#34d399"/>
        <rect x="90" y="30" width="20" height="12" rx="4" fill="#059669"/>
        {/* label */}
        <rect x="78" y="80" width="44" height="40" rx="4" fill="white" opacity="0.5"/>
        <line x1="82" y1="92" x2="118" y2="92" stroke="#34d399" strokeWidth="2"/>
        <line x1="82" y1="100" x2="108" y2="100" stroke="#34d399" strokeWidth="2"/>
        {/* toothpaste squirt */}
        <path d="M100 38 Q105 20 112 14 Q108 22 116 18" stroke="#34d399" strokeWidth="3" fill="none" strokeLinecap="round"/>
      </svg>
    ),
    votes: '7.3k',
  },
  {
    id: 4,
    label: 'Controversial',
    labelIcon: 'local_fire_department',
    labelColor: 'text-orange-500',
    title: 'Pineapple on Pizza: Yes or No?',
    description: 'Tropical genius or a crime against Italian culture? Pick your side. 🍍🍕',
    type: 'svg',
    svgBg: 'from-yellow-100 via-orange-50 to-red-100',
    svg: (
      <svg viewBox="0 0 200 200" className="w-40 h-40 drop-shadow-xl">
        {/* pizza base */}
        <circle cx="100" cy="110" r="72" fill="#fbbf24"/>
        <circle cx="100" cy="110" r="62" fill="#f97316"/>
        {/* cheese */}
        <circle cx="100" cy="110" r="52" fill="#fef08a"/>
        {/* crust */}
        <circle cx="100" cy="110" r="72" fill="none" stroke="#d97706" strokeWidth="8"/>
        {/* pineapple chunks */}
        <rect x="86" y="94" width="16" height="14" rx="3" fill="#fde047" stroke="#eab308" strokeWidth="1.5"/>
        <rect x="108" y="104" width="14" height="12" rx="3" fill="#fde047" stroke="#eab308" strokeWidth="1.5"/>
        <rect x="80" y="114" width="14" height="12" rx="3" fill="#fde047" stroke="#eab308" strokeWidth="1.5"/>
        {/* pepperoni */}
        <circle cx="88" cy="118" r="7" fill="#dc2626" opacity="0.8"/>
        <circle cx="112" cy="96" r="7" fill="#dc2626" opacity="0.8"/>
        {/* pineapple top */}
        <path d="M90 94 Q94 84 98 80 Q96 86 100 82 Q100 88 102 84 Q104 90 94 92Z" fill="#4ade80"/>
      </svg>
    ),
    votes: '18.5k',
  },
  {
    id: 5,
    label: 'Daily Ritual',
    labelIcon: 'wb_sunny',
    labelColor: 'text-sky-500',
    title: 'Shower: Morning or Night?',
    description: 'Start the day fresh or wash off the world before bed? The eternal hygiene debate. 🚿',
    type: 'svg',
    svgBg: 'from-sky-100 via-blue-50 to-indigo-100',
    svg: (
      <svg viewBox="0 0 200 200" className="w-40 h-40 drop-shadow-xl">
        {/* shower head pipe */}
        <rect x="94" y="30" width="8" height="50" rx="4" fill="#94a3b8"/>
        {/* shower head */}
        <ellipse cx="98" cy="82" rx="28" ry="10" fill="#64748b"/>
        <ellipse cx="98" cy="78" rx="28" ry="10" fill="#94a3b8"/>
        {/* water drops */}
        <ellipse cx="80" cy="105" rx="3" ry="6" fill="#7dd3fc" opacity="0.8"/>
        <ellipse cx="90" cy="112" rx="3" ry="6" fill="#7dd3fc" opacity="0.8"/>
        <ellipse cx="100" cy="104" rx="3" ry="6" fill="#7dd3fc" opacity="0.8"/>
        <ellipse cx="110" cy="113" rx="3" ry="6" fill="#7dd3fc" opacity="0.8"/>
        <ellipse cx="120" cy="104" rx="3" ry="6" fill="#7dd3fc" opacity="0.8"/>
        <ellipse cx="85" cy="125" rx="3" ry="6" fill="#7dd3fc" opacity="0.6"/>
        <ellipse cx="105" cy="128" rx="3" ry="6" fill="#7dd3fc" opacity="0.6"/>
        {/* sun */}
        <circle cx="155" cy="50" r="18" fill="#fde047"/>
        {/* sun rays */}
        {[0,45,90,135,180,225,270,315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180
          return <line key={i} x1={155 + 22*Math.cos(rad)} y1={50 + 22*Math.sin(rad)} x2={155 + 30*Math.cos(rad)} y2={50 + 30*Math.sin(rad)} stroke="#fde047" strokeWidth="3" strokeLinecap="round"/>
        })}
        {/* moon */}
        <path d="M42 55 Q55 45 62 55 Q50 75 42 55Z" fill="#c7d2fe"/>
        <circle cx="52" cy="48" r="3" fill="#818cf8"/>
      </svg>
    ),
    votes: '11.4k',
  },
  {
    id: 6,
    label: 'Wake-Up Style',
    labelIcon: 'alarm',
    labelColor: 'text-rose-500',
    title: 'Alarm: One Shot or Snooze Marathon?',
    description: 'First alarm, out of bed. Or do you negotiate 10 more minutes five times? ⏰',
    type: 'svg',
    svgBg: 'from-rose-100 via-pink-50 to-red-100',
    svg: (
      <svg viewBox="0 0 200 200" className="w-40 h-40 drop-shadow-xl">
        {/* clock body */}
        <circle cx="100" cy="105" r="60" fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="3"/>
        <circle cx="100" cy="105" r="54" fill="white" stroke="#e5e7eb" strokeWidth="1"/>
        {/* alarm feet */}
        <ellipse cx="70" cy="162" rx="12" ry="6" fill="#e5e7eb"/>
        <ellipse cx="130" cy="162" rx="12" ry="6" fill="#e5e7eb"/>
        {/* alarm bells */}
        <circle cx="65" cy="58" r="14" fill="#fb7185" stroke="#f43f5e" strokeWidth="2"/>
        <circle cx="135" cy="58" r="14" fill="#fb7185" stroke="#f43f5e" strokeWidth="2"/>
        {/* bell detail */}
        <line x1="65" y1="50" x2="65" y2="66" stroke="#f43f5e" strokeWidth="2"/>
        <line x1="135" y1="50" x2="135" y2="66" stroke="#f43f5e" strokeWidth="2"/>
        {/* clock hands */}
        <line x1="100" y1="105" x2="100" y2="68" stroke="#1e293b" strokeWidth="4" strokeLinecap="round"/>
        <line x1="100" y1="105" x2="128" y2="105" stroke="#1e293b" strokeWidth="3" strokeLinecap="round"/>
        <circle cx="100" cy="105" r="5" fill="#0ea5e9"/>
        {/* hour markers */}
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((angle, i) => {
          const rad = (angle * Math.PI) / 180
          const len = i % 3 === 0 ? 8 : 4
          return <line key={i} x1={100+46*Math.cos(rad-Math.PI/2)} y1={105+46*Math.sin(rad-Math.PI/2)} x2={100+(46-len)*Math.cos(rad-Math.PI/2)} y2={105+(46-len)*Math.sin(rad-Math.PI/2)} stroke="#cbd5e1" strokeWidth={i%3===0?2:1}/>
        })}
      </svg>
    ),
    votes: '13.7k',
  },
  {
    id: 7,
    label: 'Viewing Habit',
    labelIcon: 'subtitles',
    labelColor: 'text-purple-500',
    title: 'Subtitles: Always On or Always Off?',
    description: 'Do you read while you watch, or does text on screen drive you absolutely crazy? 📺',
    type: 'svg',
    svgBg: 'from-purple-100 via-violet-50 to-indigo-100',
    svg: (
      <svg viewBox="0 0 200 200" className="w-40 h-40 drop-shadow-xl">
        {/* TV body */}
        <rect x="30" y="45" width="140" height="100" rx="12" fill="#1e293b"/>
        <rect x="38" y="52" width="124" height="86" rx="6" fill="#0f172a"/>
        {/* screen content */}
        <rect x="42" y="56" width="116" height="78" rx="4" fill="#1e293b"/>
        {/* movie scene lines */}
        <line x1="50" y1="70" x2="100" y2="70" stroke="#475569" strokeWidth="2" strokeLinecap="round"/>
        <line x1="50" y1="80" x2="130" y2="80" stroke="#475569" strokeWidth="2" strokeLinecap="round"/>
        <line x1="50" y1="90" x2="90" y2="90" stroke="#475569" strokeWidth="2" strokeLinecap="round"/>
        {/* subtitle bar */}
        <rect x="44" y="112" width="112" height="18" rx="3" fill="#7c3aed" opacity="0.85"/>
        <rect x="52" y="116" width="70" height="6" rx="2" fill="white" opacity="0.9"/>
        <rect x="52" y="120" width="50" height="4" rx="2" fill="white" opacity="0.6"/>
        {/* TV stand */}
        <rect x="88" y="144" width="24" height="16" rx="2" fill="#334155"/>
        <rect x="72" y="158" width="56" height="6" rx="3" fill="#334155"/>
        {/* TV buttons */}
        <circle cx="148" cy="95" r="4" fill="#475569"/>
        <circle cx="148" cy="107" r="4" fill="#475569"/>
      </svg>
    ),
    votes: '16.2k',
  },
  {
    id: 8,
    label: 'Number Brain',
    labelIcon: 'volume_up',
    labelColor: 'text-teal-500',
    title: 'TV Volume: Multiple of 5 or Random?',
    description: 'Does volume 17 give you anxiety? Or do you not even look at the number? 🔊',
    type: 'svg',
    svgBg: 'from-teal-100 via-cyan-50 to-green-100',
    svg: (
      <svg viewBox="0 0 200 200" className="w-40 h-40 drop-shadow-xl">
        {/* speaker */}
        <rect x="60" y="70" width="44" height="60" rx="6" fill="#334155"/>
        <rect x="66" y="76" width="32" height="48" rx="4" fill="#1e293b"/>
        <circle cx="82" cy="100" r="16" fill="#0f172a"/>
        <circle cx="82" cy="100" r="10" fill="#1e293b"/>
        <circle cx="82" cy="100" r="4" fill="#94a3b8"/>
        {/* sound waves */}
        <path d="M110 88 Q122 100 110 112" stroke="#2dd4bf" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M118 80 Q136 100 118 120" stroke="#2dd4bf" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.7"/>
        <path d="M126 72 Q150 100 126 128" stroke="#2dd4bf" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.4"/>
        {/* volume number display */}
        <rect x="56" y="140" width="88" height="30" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="2"/>
        <text x="100" y="161" textAnchor="middle" fill="#2dd4bf" fontFamily="monospace" fontSize="18" fontWeight="bold">15</text>
      </svg>
    ),
    votes: '8.9k',
  },
  {
    id: 9,
    label: 'Storage Wars',
    labelIcon: 'kitchen',
    labelColor: 'text-red-500',
    title: 'Ketchup: Fridge or Cupboard?',
    description: 'Cold ketchup straight from the fridge, or room temperature from the shelf? 🍅',
    type: 'svg',
    svgBg: 'from-red-100 via-rose-50 to-orange-100',
    svg: (
      <svg viewBox="0 0 200 200" className="w-40 h-40 drop-shadow-xl">
        {/* bottle body */}
        <path d="M80 170 L80 110 Q80 90 90 80 L90 60 L110 60 L110 80 Q120 90 120 110 L120 170 Z" fill="#dc2626"/>
        {/* bottle highlight */}
        <path d="M85 170 L85 115 Q85 95 93 85 L93 62 L98 62 L98 85 Q90 95 90 115 L90 170 Z" fill="#ef4444" opacity="0.5"/>
        {/* neck */}
        <rect x="88" y="44" width="24" height="18" rx="4" fill="#b91c1c"/>
        {/* cap */}
        <rect x="84" y="36" width="32" height="12" rx="5" fill="#991b1b"/>
        {/* label */}
        <rect x="82" y="105" width="36" height="44" rx="4" fill="white" opacity="0.9"/>
        {/* tomato icon on label */}
        <circle cx="100" cy="120" r="10" fill="#ef4444"/>
        <path d="M96 110 Q100 104 104 110" stroke="#16a34a" strokeWidth="2" fill="none"/>
        <line x1="100" y1="104" x2="100" y2="110" stroke="#16a34a" strokeWidth="2"/>
        {/* lines on label */}
        <line x1="86" y1="135" x2="114" y2="135" stroke="#dc2626" strokeWidth="1.5" opacity="0.4"/>
        <line x1="88" y1="140" x2="112" y2="140" stroke="#dc2626" strokeWidth="1.5" opacity="0.3"/>
      </svg>
    ),
    votes: '10.1k',
  },
  {
    id: 10,
    label: 'Night Mode',
    labelIcon: 'bedtime',
    labelColor: 'text-indigo-500',
    title: 'Socks On or Off in Bed?',
    description: 'Warm-feet disciples vs. bare-foot-freedom sleepers. The bedtime identity crisis. 🧦',
    type: 'svg',
    svgBg: 'from-indigo-100 via-blue-50 to-slate-100',
    svg: (
      <svg viewBox="0 0 200 200" className="w-40 h-40 drop-shadow-xl">
        {/* sock shape */}
        <path d="M68 50 L68 130 Q68 155 90 160 L130 160 Q148 160 148 142 Q148 128 132 126 L120 124 L120 50 Z" fill="#6366f1" stroke="#4f46e5" strokeWidth="2"/>
        {/* sock cuff */}
        <rect x="68" y="50" width="52" height="20" rx="4" fill="#818cf8"/>
        {/* cuff stripes */}
        <line x1="68" y1="58" x2="120" y2="58" stroke="#a5b4fc" strokeWidth="2"/>
        <line x1="68" y1="64" x2="120" y2="64" stroke="#a5b4fc" strokeWidth="2"/>
        {/* toe highlight */}
        <ellipse cx="128" cy="143" rx="20" ry="12" fill="#818cf8" opacity="0.5"/>
        {/* heel highlight */}
        <ellipse cx="80" cy="148" rx="16" ry="10" fill="#818cf8" opacity="0.4"/>
        {/* moon & stars */}
        <path d="M155 50 Q165 40 170 50 Q160 68 155 50Z" fill="#fde047"/>
        <circle cx="148" cy="36" r="3" fill="#fde047" opacity="0.8"/>
        <circle cx="162" cy="30" r="2" fill="#fde047" opacity="0.6"/>
        <circle cx="174" cy="42" r="2" fill="#fde047" opacity="0.5"/>
        <circle cx="40" cy="130" r="3" fill="#a5b4fc" opacity="0.6"/>
        <circle cx="50" cy="118" r="2" fill="#a5b4fc" opacity="0.4"/>
      </svg>
    ),
    votes: '19.3k',
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
            {/* Image / emoji / svg area */}
            <div className="relative flex-1 overflow-hidden">
              {question.type === 'image' ? (
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${question.image}')` }}
                />
              ) : question.type === 'svg' ? (
                <div className={`absolute inset-0 bg-gradient-to-br ${question.svgBg} flex items-center justify-center`}>
                  {question.svg}
                </div>
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
