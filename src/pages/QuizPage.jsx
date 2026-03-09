import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const AVATAR_URLS = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuACOffwaPSA48nJlMY5OPZeWi-S5pu-bxuKbjdUrcqSLWWGqQ6rkUwvVv8rHVqk84sYv3Uwxv5m0rFf7_BM3YKWsNrMEJA7FenBE65mRzqeVUtl__SBoveKlpJPCvti75vW_tiiDB4x6Wf4nYdqb4WfhNMrUTuntQ82GDN2JciyiKl18zbJ7W632cXje6a3jSpjyIv_ujJs9A3RjptKFDoiIKB1II10ClB-_52EjIYHF8CTJPSRQOPNY6kwKcQIBuBOpGF3pqdhFPFk',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCZccjA-5FL-mdhdppXzxkARv5HpAhFZ-JbkPOLuAUFygxWaPzTmi1spZXl3l0C-Vl9HW8V7WVj741k2nwlElaFObIDXWWasSm1gAGqa5i7NdbE6TzGAQ5tURKSS4YEaGXPFX-Ijj0sKL9Js84shC7dSg9KsiBb5qNru2tNLYDYSqLDK37WPMdEyRpGKcstbJ_PbBM5azy13lz7HyqHnR58bJ0HMeb2u5uTnuR4zDgi5gfJArpsBSL9thYmBlSwwLLsvZOK6spqCqBF',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCb28WDK4Em_wua_veH-u1RtWOYNpAeDmBRMm1AumleNAsL5zdeLROFuscFyebk0BCrvag7XR7FcjvPGoGU5Y6zz_5uwIK6aEC26yrUTixOUlaDXz_Hjgfc9gct67yqSbJ4lyQ2oTAG_PILnzuVVdbsnas9OUJct5vI9XPFDpp2tOU0vAKF5mrVq-pMupdqenRFDY-_gtsaabHikvUVOk_iMldU3pNNilGbs9omjLjZtAEiyYAztrH06NkN16VIkoKBgsNa8DhQoPcz',
]

// S = Structural Integrity (Q1,Q3,Q8,Q9) | E = Efficiency (Q5,Q6,Q10) | N = Normative (Q2,Q4,Q7)
const ARCHETYPES = [
  {
    s: true, e: true, n: true,
    rarity: 'Top 3%',
    subtitle: 'Turned into a machine chasing the perfect life',
    name: 'The AI Control Freak',
    desc: 'Toilet paper over, one alarm, everything in its place — you\'re a perfectionist with a slight deficiency in human warmth. Your fridge probably has an assigned spot for every condiment. People find your aura insufferable, but honestly, the world would fall apart without you. Wearing socks to bed? That level of self-discipline is genuinely impressive.',
    country: 'Germany', flag: '🇩🇪', color: '#0EA5E9',
  },
  {
    s: false, e: false, n: false,
    rarity: 'Top 5%',
    subtitle: 'The rootless destroyer of chaos',
    name: 'Full Send Delulu',
    desc: 'You squeeze toothpaste from the middle without hesitation, store ketchup in the cupboard like a free spirit, and order pineapple pizza with zero shame. With multiple alarms set and a standing bathroom routine, you are the true chaos villain of our generation. The audacity is honestly iconic.',
    country: 'Florida, USA', flag: '🇺🇸', color: '#FF6B00',
  },
  {
    s: true, e: true, n: false,
    rarity: 'Top 8%',
    subtitle: 'Clinically obsessed with efficiency',
    name: 'The Smart Weirdo',
    desc: 'Night showers and socks in bed for optimal body temperature — you operate like a precision machine, every action calculated for tomorrow\'s performance. Even your TV volume is a multiple of five. You\'re ready to enjoy chaos more efficiently than anyone else.',
    country: 'South Korea', flag: '🇰🇷', color: '#10B981',
  },
  {
    s: true, e: false, n: false,
    rarity: 'Top 12%',
    subtitle: 'Cannot function without subtitles',
    name: 'The Detail Obsessive',
    desc: 'You watch movies with subtitles because you trust text more than sound — a true product of the information overload era. You look fine on the outside, but inside you\'re mentally filing 100 charges against anyone who squeezes toothpaste from the middle. Infuriating and weirdly charming.',
    country: 'Finland', flag: '🇫🇮', color: '#8B5CF6',
  },
  {
    s: false, e: true, n: false,
    rarity: 'Top 7%',
    subtitle: 'Shredded every convention',
    name: 'The Radical Sigma',
    desc: 'Standing up alone puts you in the top 1% of uniqueness. Pineapple pizza, ketchup in the cupboard — you do it all without apology. Morning showers, one alarm, out the door: you\'re a one-of-a-kind existence who enjoys chaos with surprising structure.',
    country: 'Brazil', flag: '🇧🇷', color: '#EF4444',
  },
  {
    s: true, e: false, n: true,
    rarity: 'Top 10%',
    subtitle: 'Living and dying by the rules',
    name: 'The Principled Traditionalist',
    desc: 'Everything in its place, every food eaten the correct way — you\'re the last rule-keeper standing in modern times. You end the day with a dignified night shower, yet somehow hit snooze five times every morning, which is honestly your most lovable flaw.',
    country: 'Italy', flag: '🇮🇹', color: '#059669',
  },
  {
    s: false, e: false, n: true,
    rarity: 'Top 15%',
    subtitle: 'Drifting between ambition and pure laziness',
    name: 'The Aspiring Go-Getter',
    desc: 'You want to do everything everyone else does, but when it comes down to it, it\'s just too much effort. No pineapple on pizza — hard line — but you\'ll squeeze toothpaste from the middle without blinking. Night showers, socks off, pure freedom. Your whole vibe is a walking beige flag collection.',
    country: 'Spain', flag: '🇪🇸', color: '#F59E0B',
  },
  {
    s: false, e: true, n: true,
    rarity: 'Top 9%',
    subtitle: 'Zero excess, zero tolerance',
    name: 'The Straight-Cut Minimalist',
    desc: 'No subtitles, no socks, no fruit on pizza — you have crystal-clear preferences. You start the day with a morning shower and move through a set routine, but you\'ll occasionally squeeze toothpaste from the middle with zero thought, which is your most unexpected trait.',
    country: 'Japan', flag: '🇯🇵', color: '#64748B',
  },
]

function RadarChart({ scores, color }) {
  const cx = 100, cy = 100, R = 68, n = 5
  const axes = ['CHAOS', 'CHARM', 'WIT', 'CHILL', 'WEIRD']
  const vals = [scores.chaos, scores.charm, scores.wit, scores.chill, scores.weird]
  const ang = (i) => -Math.PI / 2 + (2 * Math.PI / n) * i
  const pt = (i, r) => ({ x: cx + r * Math.cos(ang(i)), y: cy + r * Math.sin(ang(i)) })
  const poly = (pts) => pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
  const rings = [0.25, 0.5, 0.75, 1].map(s => Array.from({ length: n }, (_, i) => pt(i, R * s)))
  const outerPts = Array.from({ length: n }, (_, i) => pt(i, R))
  const dataPts = Array.from({ length: n }, (_, i) => pt(i, R * Math.max(vals[i], 0.06)))
  const labelPts = Array.from({ length: n }, (_, i) => pt(i, R + 15))
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {rings.map((ring, ri) => (
        <polygon key={ri} points={poly(ring)} fill={ri === 3 ? '#F8FAFC' : 'none'} stroke="#E2E8F0" strokeWidth="1" />
      ))}
      {outerPts.map((p, i) => (
        <line key={i} x1={cx} y1={cy} x2={p.x.toFixed(1)} y2={p.y.toFixed(1)} stroke="#E2E8F0" strokeWidth="1" />
      ))}
      <polygon points={poly(dataPts)} fill={`${color}22`} stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
      {dataPts.map((p, i) => (
        <circle key={i} cx={p.x.toFixed(1)} cy={p.y.toFixed(1)} r="4" fill={color} stroke="white" strokeWidth="2" />
      ))}
      {labelPts.map((p, i) => (
        <text key={i} x={p.x.toFixed(1)} y={p.y.toFixed(1)} textAnchor="middle" dominantBaseline="middle"
          fontSize="7.5" fontWeight="800" fill={vals[i] > 0.6 ? color : '#94a3b8'}
          fontFamily="'Spline Sans', sans-serif" letterSpacing="0.04em">
          {axes[i]}
        </text>
      ))}
    </svg>
  )
}

// S = Structural (love=structured) | E = Efficiency (love=efficient) | N = Normative
// left image → 'love' | right image → 'hate'
const questions = [
  {
    id: 1,
    label: 'The Great Debate',
    labelIcon: 'priority_high',
    labelColor: 'text-amber-500',
    title: 'Toilet Paper: Over or Under?',
    description: 'A question that has ended friendships and started wars.',
    leftImg: '/img/Q1_Over.png',
    leftLabel: 'Over',
    rightImg: '/img/Q1_Under.png',
    rightLabel: 'Under',
    votes: '14.2k',
  },
  {
    id: 2,
    label: 'Bold Claim',
    labelIcon: 'wc',
    labelColor: 'text-blue-500',
    title: 'Bathroom: Sit or Stand?',
    description: 'Some routines are done seated. Some people prefer to stand.',
    leftImg: '/img/Q2_Sit.png',
    leftLabel: 'Sit',
    rightImg: '/img/Q2_Stand.png',
    rightLabel: 'Stand',
    votes: '9.8k',
  },
  {
    id: 3,
    label: 'Tube Terror',
    labelIcon: 'emergency',
    labelColor: 'text-green-500',
    title: 'Toothpaste: Bottom or Middle?',
    description: 'Methodical bottom-squeezer or a chaotic middle-crusher?',
    leftImg: '/img/Q3_bottom.png',
    leftLabel: 'From Bottom',
    rightImg: '/img/Q3_middle.png',
    rightLabel: 'From Middle',
    votes: '7.3k',
  },
  {
    id: 4,
    label: 'Controversial',
    labelIcon: 'local_fire_department',
    labelColor: 'text-orange-500',
    title: 'Pineapple on Pizza: Yes or No?',
    description: 'Tropical genius or a crime against Italian culture?',
    leftImg: '/img/Q4_pineapple.png',
    leftLabel: 'Yes Please',
    rightImg: '/img/Q4_normal.png',
    rightLabel: 'Absolutely Not',
    votes: '18.5k',
  },
  {
    id: 5,
    label: 'Daily Ritual',
    labelIcon: 'wb_sunny',
    labelColor: 'text-sky-500',
    title: 'Shower: Morning or Night?',
    description: 'Start the day fresh or wash off the world before bed?',
    leftImg: '/img/Q5_morning.png',
    leftLabel: 'Morning',
    rightImg: '/img/Q5_night.png',
    rightLabel: 'Night',
    votes: '11.4k',
  },
  {
    id: 6,
    label: 'Wake-Up Style',
    labelIcon: 'alarm',
    labelColor: 'text-rose-500',
    title: 'Alarm: One Shot or Snooze Marathon?',
    description: 'First alarm, out of bed — or do you negotiate 10 more minutes five times?',
    leftImg: '/img/Q6_one.png',
    leftLabel: 'One & Done',
    rightImg: '/img/Q6_snooze.png',
    rightLabel: 'Snooze x5',
    votes: '13.7k',
  },
  {
    id: 7,
    label: 'Viewing Habit',
    labelIcon: 'subtitles',
    labelColor: 'text-purple-500',
    title: 'Subtitles: Always On or Always Off?',
    description: 'Do you read while you watch, or does text on screen drive you crazy?',
    leftImg: '/img/Q7_on.png',
    leftLabel: 'Always On',
    rightImg: '/img/Q7_off.png',
    rightLabel: 'Always Off',
    votes: '16.2k',
  },
  {
    id: 8,
    label: 'Number Brain',
    labelIcon: 'volume_up',
    labelColor: 'text-teal-500',
    title: 'TV Volume: Multiple of 5 or Random?',
    description: 'Does volume 17 give you anxiety? Or do you not even look at the number?',
    leftImg: '/img/Q8_even.png',
    leftLabel: 'Only 5s',
    rightImg: '/img/Q8_odd.png',
    rightLabel: 'Whatever',
    votes: '8.9k',
  },
  {
    id: 9,
    label: 'Battery Anxiety',
    labelIcon: 'battery_alert',
    labelColor: 'text-red-500',
    title: 'Phone Battery: Charge at 50% or 1%?',
    description: 'Do you plug in preemptively, or live on the edge until it dies?',
    leftImg: '/img/Q9_50pct.png',
    leftLabel: '50% Charge',
    rightImg: '/img/Q9_1pct.png',
    rightLabel: '1% Gamble',
    votes: '10.1k',
  },
  {
    id: 10,
    label: 'Night Mode',
    labelIcon: 'bedtime',
    labelColor: 'text-indigo-500',
    title: 'Socks On or Off in Bed?',
    description: 'Warm-feet disciples vs. bare-foot-freedom sleepers.',
    leftImg: '/img/Q10_sockson.png',
    leftLabel: 'Socks On',
    rightImg: '/img/Q10_socksoff.png',
    rightLabel: 'Socks Off',
    votes: '19.3k',
  },
]

function ResultsScreen({ answers, onRestart }) {
  // S: Structural Integrity (Q1,Q3,Q8,Q9) — love = structured choice
  const S = [answers[0]==='love', answers[2]==='love', answers[7]==='love', answers[8]==='love'].filter(Boolean).length
  // E: Efficiency Pragmatism (Q5,Q6,Q10) — love = efficient choice
  const E = [answers[4]==='love', answers[5]==='love', answers[9]==='love'].filter(Boolean).length
  // N: Normative Adherence (Q2 love=sit, Q4 hate=no-pineapple, Q7 hate=subtitles-off)
  const N = [answers[1]==='love', answers[3]==='hate', answers[6]==='hate'].filter(Boolean).length

  const sHigh = S >= 2
  const eHigh = E >= 2
  const nHigh = N >= 2

  const archetype = ARCHETYPES.find(a => a.s === sHigh && a.e === eHigh && a.n === nHigh) ?? ARCHETYPES[0]

  const [copied, setCopied] = useState(false)

  const shareText = `I got '${archetype.name}' (${archetype.rarity}) on ThisOrThat! 😮 Try it yourself`
  const shareUrl = window.location.href

  const handleShare = (platform) => {
    const encodedUrl = encodeURIComponent(shareUrl)
    const encodedText = encodeURIComponent(shareText)
    const encodedFull = encodeURIComponent(shareText + '\n' + shareUrl)
    if (platform === 'instagram' || platform === 'kakao') {
      if (navigator.share) {
        navigator.share({ title: 'ThisOrThat', text: shareText, url: shareUrl }).catch(() => {})
      } else {
        navigator.clipboard.writeText(shareText + '\n' + shareUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
      return
    }
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      threads: `https://www.threads.net/intent/post?text=${encodedFull}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodedFull}`,
    }
    if (urls[platform]) window.open(urls[platform], '_blank', 'noopener,noreferrer')
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const radar = {
    chaos: (4 - S) / 4,
    charm: N / 3,
    wit: (S / 4 + E / 3) / 2,
    chill: (3 - E) / 3,
    weird: (3 - N) / 3,
  }

  return (
    <div
      style={{ fontFamily: '"Spline Sans", sans-serif', backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)', backgroundSize: '24px 24px' }}
      className="bg-[#FAFAFA] text-slate-800 min-h-screen flex flex-col overflow-x-hidden"
    >
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 md:px-10 sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <button
          onClick={onRestart}
          className="flex items-center gap-2 rounded-full h-10 px-5 bg-slate-100 hover:bg-slate-200 transition-colors text-slate-700 text-sm font-bold"
        >
          <span className="material-symbols-outlined text-[20px]">refresh</span>
          <span className="hidden sm:inline">Retake Quiz</span>
        </button>
      </header>

      {/* Main */}
      <main className="flex-1 relative flex flex-col items-center justify-center py-12 px-4">
        {/* Background glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] bg-sky-200/40 rounded-full blur-[100px]" />
          <div className="absolute bottom-[10%] right-[15%] w-[400px] h-[400px] bg-orange-200/40 rounded-full blur-[100px]" />
        </div>

        <div className="relative w-full max-w-[420px] flex flex-col gap-5 z-10">

          {/* Main result card */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.12)] border border-slate-100 overflow-hidden">

            {/* Badge + Title */}
            <div className="text-center mb-6">
              <span
                className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3"
                style={{ backgroundColor: `${archetype.color}18`, color: archetype.color }}
              >
                Rare Personality Type
              </span>
              <div className="text-slate-400 font-extrabold text-2xl">{archetype.rarity}</div>
              <h1
                className="text-5xl font-black leading-none mt-2 mb-3"
                style={{ backgroundImage: `linear-gradient(135deg, ${archetype.color}, ${archetype.color}99)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                {archetype.name}
              </h1>
              <p className="text-slate-400 text-sm font-semibold">{archetype.subtitle}</p>
            </div>

            {/* Radar chart */}
            <div className="relative w-full aspect-square max-h-[280px] mx-auto mb-5">
              <RadarChart scores={radar} color={archetype.color} />
            </div>

            {/* Soulmate country */}
            <div className="bg-slate-50 rounded-2xl p-4 flex items-center gap-4 border border-slate-100">
              <div className="size-12 shrink-0 rounded-full flex items-center justify-center text-3xl bg-white shadow-sm border border-slate-200">
                {archetype.flag}
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Soulmate Location</span>
                <span className="text-slate-800 font-bold text-lg leading-tight">{archetype.country} {archetype.flag}</span>
              </div>
              <div className="ml-auto bg-white p-2 rounded-full shadow-sm">
                <span className="material-symbols-outlined text-xl" style={{ color: archetype.color }}>favorite</span>
              </div>
            </div>
          </div>

          {/* Description card */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <p className="text-slate-600 text-sm leading-relaxed font-medium">{archetype.desc}</p>
          </div>

          {/* Share buttons */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex flex-col gap-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 text-center">Share Your Result</p>
            <div className="grid grid-cols-3 gap-2">
              {/* KakaoTalk */}
              <button onClick={() => handleShare('kakao')} className="flex flex-col items-center gap-1.5 p-2 rounded-2xl hover:bg-slate-50 transition-colors">
                <div className="size-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FEE500' }}>
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#3A1D00">
                    <path d="M12 3C6.477 3 2 6.582 2 11c0 2.866 1.736 5.394 4.357 6.968l-.938 3.507c-.07.26.2.471.432.327L9.9 19.568C10.585 19.688 11.286 19.75 12 19.75c5.523 0 10-3.582 10-8S17.523 3 12 3z"/>
                  </svg>
                </div>
                <span className="text-[11px] font-bold text-slate-600">KakaoTalk</span>
              </button>
              {/* Instagram */}
              <button onClick={() => handleShare('instagram')} className="flex flex-col items-center gap-1.5 p-2 rounded-2xl hover:bg-slate-50 transition-colors">
                <div className="size-12 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}>
                  <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <span className="text-[11px] font-bold text-slate-600">Instagram</span>
              </button>
              {/* X (Twitter) */}
              <button onClick={() => handleShare('twitter')} className="flex flex-col items-center gap-1.5 p-2 rounded-2xl hover:bg-slate-50 transition-colors">
                <div className="size-12 rounded-full flex items-center justify-center bg-black">
                  <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </div>
                <span className="text-[11px] font-bold text-slate-600">X</span>
              </button>
              {/* Facebook */}
              <button onClick={() => handleShare('facebook')} className="flex flex-col items-center gap-1.5 p-2 rounded-2xl hover:bg-slate-50 transition-colors">
                <div className="size-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#1877F2' }}>
                  <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <span className="text-[11px] font-bold text-slate-600">Facebook</span>
              </button>
              {/* WhatsApp */}
              <button onClick={() => handleShare('whatsapp')} className="flex flex-col items-center gap-1.5 p-2 rounded-2xl hover:bg-slate-50 transition-colors">
                <div className="size-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#25D366' }}>
                  <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <span className="text-[11px] font-bold text-slate-600">WhatsApp</span>
              </button>
              {/* Threads */}
              <button onClick={() => handleShare('threads')} className="flex flex-col items-center gap-1.5 p-2 rounded-2xl hover:bg-slate-50 transition-colors">
                <div className="size-12 rounded-full flex items-center justify-center bg-black">
                  <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.5 12.068c0-3.516.85-6.37 2.495-8.422C5.845 1.341 8.598.16 12.18.136h.014c2.744.018 5.154.869 6.967 2.461 1.683 1.476 2.678 3.498 2.908 5.988l-2.253.023c-.185-1.876-.909-3.397-2.116-4.455-1.232-1.078-2.937-1.64-4.914-1.654h-.01c-2.84.019-5.02.928-6.478 2.704C4.932 6.961 4.26 9.393 4.26 12.068c0 2.676.672 5.107 1.949 6.861 1.456 1.977 3.634 2.985 6.474 2.986h.007c2.563-.003 4.537-.675 5.77-1.943 1.16-1.194 1.717-2.907 1.74-5.265-.026-.004-.052-.006-.078-.01-1.023.44-2.116.655-3.21.605-1.477-.067-2.88-.61-3.97-1.566a5.277 5.277 0 01-1.716-3.614c-.1-1.423.315-2.759 1.168-3.754.918-1.066 2.23-1.671 3.7-1.704 1.548-.036 2.915.524 3.847 1.573.855.963 1.326 2.33 1.4 4.063.01.228.014.454.012.678.012 2.982-.808 5.271-2.437 6.824-1.535 1.463-3.74 2.208-6.553 2.211zm.557-11.218c-.825.02-1.57.36-2.082.964-.565.665-.812 1.603-.727 2.677.086 1.092.535 2.037 1.29 2.694.7.608 1.614.924 2.647.97.924.042 1.839-.15 2.682-.567.007-.186.013-.373.007-.564-.056-1.432-.393-2.488-1.003-3.14-.551-.588-1.333-.877-2.256-.855l-.558.021z"/>
                  </svg>
                </div>
                <span className="text-[11px] font-bold text-slate-600">Threads</span>
              </button>
            </div>
            <div className="flex gap-3">
              <button className="flex-1 h-12 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-full font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-sm">
                <span className="material-symbols-outlined text-[18px]">download</span>
                Save
              </button>
              <button
                onClick={handleCopyLink}
                className="flex-1 h-12 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-full font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">{copied ? 'check_circle' : 'link'}</span>
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-slate-400 font-medium pb-4">
            Join 2M+ others discovering their quirk score.
          </p>
        </div>
      </main>
    </div>
  )
}

export default function QuizPage() {
  const navigate = useNavigate()
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState([])
  const [exitDir, setExitDir] = useState(null) // null | 'left' | 'right'
  const [isDone, setIsDone] = useState(false)
  const [hoveredSide, setHoveredSide] = useState(null) // 'left' | 'right' | null
  const [voteCounts, setVoteCounts] = useState({}) // { q1: { left, right }, ... }

  // Preload all quiz images + fetch vote counts on mount
  useEffect(() => {
    questions.forEach(q => {
      const l = new Image()
      const r = new Image()
      l.src = q.leftImg
      r.src = q.rightImg
    })
    fetch('/api/vote')
      .then(r => r.json())
      .then(data => setVoteCounts(data))
      .catch(() => {})
  }, [])

  const question = questions[currentIdx]
  const nextQuestion = questions[currentIdx + 1]
  const progress = (answers.length / questions.length) * 100

  const handleAnswer = useCallback((answer) => {
    if (exitDir !== null || isDone) return

    const side = answer === 'love' ? 'left' : 'right'
    const qKey = `q${questions[currentIdx].id}`

    // Optimistically update local vote count
    setVoteCounts(prev => {
      const cur = prev[qKey] || { left: 0, right: 0 }
      return { ...prev, [qKey]: { ...cur, [side]: (cur[side] || 0) + 1 } }
    })

    // Persist to KV
    fetch('/api/vote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questionId: questions[currentIdx].id, side }),
    })
      .then(r => r.json())
      .then(updated => setVoteCounts(prev => ({ ...prev, [qKey]: updated })))
      .catch(() => {})

    const dir = answer === 'love' ? 'right' : 'left'
    setExitDir(dir)
    setHoveredSide(null)

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
  }, [exitDir, isDone, answers, currentIdx])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') handleAnswer('love')
      else if (e.key === 'ArrowLeft') handleAnswer('hate')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handleAnswer])

  const cardTransform =
    exitDir === 'right' ? 'translateX(130%) rotate(18deg)' :
    exitDir === 'left'  ? 'translateX(-130%) rotate(-18deg)' :
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

      {/* Main */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-4 md:p-6 w-full max-w-7xl mx-auto">

        {/* Progress bar */}
        <div className="w-full max-w-md mb-5 md:mb-6 flex flex-col gap-2">
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

        {/* Quiz card */}
        <div
          key={question.id}
          className="w-full max-w-md bg-white rounded-[2rem] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] border border-slate-100"
          style={{
            transform: cardTransform,
            opacity: exitDir ? 0 : 1,
            transition: 'transform 0.38s cubic-bezier(0.4,0,0.2,1), opacity 0.38s ease',
          }}
        >
          {/* Card header */}
          <div className="px-5 pt-5 pb-3 flex items-start justify-between gap-3">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className={`material-symbols-outlined text-[18px] ${question.labelColor}`}>{question.labelIcon}</span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{question.label}</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight">{question.title}</h2>
              <p className="text-slate-400 text-sm font-medium leading-snug">{question.description}</p>
            </div>
          </div>

          {/* Two-image choice area */}
          <div className="relative flex mx-4 mb-4 gap-2 h-56 md:h-64">

            {/* Left image — love */}
            <button
              className="relative flex-1 rounded-2xl overflow-hidden cursor-pointer focus:outline-none"
              onClick={() => handleAnswer('love')}
              onMouseEnter={() => setHoveredSide('left')}
              onMouseLeave={() => setHoveredSide(null)}
            >
              <img
                src={question.leftImg}
                alt={question.leftLabel}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300"
                style={{ transform: hoveredSide === 'left' ? 'scale(1.06)' : 'scale(1)' }}
                fetchPriority="high"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div
                className="absolute inset-0 transition-opacity duration-200 rounded-2xl"
                style={{
                  opacity: hoveredSide === 'left' ? 1 : 0,
                  boxShadow: 'inset 0 0 0 3px #22c55e',
                  background: 'rgba(34,197,94,0.12)',
                }}
              />
              <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                <span
                  className="px-3 py-1 rounded-full text-sm font-bold shadow-lg transition-all duration-200"
                  style={{
                    background: hoveredSide === 'left' ? '#22c55e' : 'rgba(255,255,255,0.92)',
                    color: hoveredSide === 'left' ? 'white' : '#1e293b',
                  }}
                >
                  {question.leftLabel}
                </span>
              </div>
              <div className="absolute top-2.5 left-2.5 hidden md:flex items-center gap-1 bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full">
                <span className="text-white/70 text-[10px] font-mono">← Left</span>
              </div>
            </button>

            {/* VS badge */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
              <div className="bg-white text-slate-800 font-black text-xs px-2.5 py-1.5 rounded-full shadow-xl border-2 border-slate-100 tracking-widest">
                VS
              </div>
            </div>

            {/* Right image — hate */}
            <button
              className="relative flex-1 rounded-2xl overflow-hidden cursor-pointer focus:outline-none"
              onClick={() => handleAnswer('hate')}
              onMouseEnter={() => setHoveredSide('right')}
              onMouseLeave={() => setHoveredSide(null)}
            >
              <img
                src={question.rightImg}
                alt={question.rightLabel}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300"
                style={{ transform: hoveredSide === 'right' ? 'scale(1.06)' : 'scale(1)' }}
                fetchPriority="high"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div
                className="absolute inset-0 transition-opacity duration-200 rounded-2xl"
                style={{
                  opacity: hoveredSide === 'right' ? 1 : 0,
                  boxShadow: 'inset 0 0 0 3px #ef4444',
                  background: 'rgba(239,68,68,0.12)',
                }}
              />
              <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                <span
                  className="px-3 py-1 rounded-full text-sm font-bold shadow-lg transition-all duration-200"
                  style={{
                    background: hoveredSide === 'right' ? '#ef4444' : 'rgba(255,255,255,0.92)',
                    color: hoveredSide === 'right' ? 'white' : '#1e293b',
                  }}
                >
                  {question.rightLabel}
                </span>
              </div>
              <div className="absolute top-2.5 right-2.5 hidden md:flex items-center gap-1 bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full">
                <span className="text-white/70 text-[10px] font-mono">Right →</span>
              </div>
            </button>
          </div>

          {/* Footer: vote count */}
          {(() => {
            const qc = voteCounts[`q${question.id}`]
            const total = qc ? (qc.left + qc.right) : null
            return (
              <div className="px-5 pb-4 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {AVATAR_URLS.map((url, i) => (
                    <div
                      key={i}
                      className="size-6 rounded-full ring-2 ring-white bg-slate-200 bg-cover shadow-sm"
                      style={{ backgroundImage: `url('${url}')` }}
                    />
                  ))}
                </div>
                <span className="text-xs text-slate-400 font-semibold">
                  {total !== null ? `${total.toLocaleString()} voted` : 'Be the first to vote!'}
                </span>
              </div>
            )
          })()}
        </div>

        {/* Tap hint for mobile */}
        <p className="mt-4 text-xs text-slate-400 font-medium text-center md:hidden">
          Tap a photo to pick your side
        </p>
      </main>
    </div>
  )
}
