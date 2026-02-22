import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const AVATAR_URLS = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuACOffwaPSA48nJlMY5OPZeWi-S5pu-bxuKbjdUrcqSLWWGqQ6rkUwvVv8rHVqk84sYv3Uwxv5m0rFf7_BM3YKWsNrMEJA7FenBE65mRzqeVUtl__SBoveKlpJPCvti75vW_tiiDB4x6Wf4nYdqb4WfhNMrUTuntQ82GDN2JciyiKl18zbJ7W632cXje6a3jSpjyIv_ujJs9A3RjptKFDoiIKB1II10ClB-_52EjIYHF8CTJPSRQOPNY6kwKcQIBuBOpGF3pqdhFPFk',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCZccjA-5FL-mdhdppXzxkARv5HpAhFZ-JbkPOLuAUFygxWaPzTmi1spZXl3l0C-Vl9HW8V7WVj741k2nwlElaFObIDXWWasSm1gAGqa5i7NdbE6TzGAQ5tURKSS4YEaGXPFX-Ijj0sKL9Js84shC7dSg9KsiBb5qNru2tNLYDYSqLDK37WPMdEyRpGKcstbJ_PbBM5azy13lz7HyqHnR58bJ0HMeb2u5uTnuR4zDgi5gfJArpsBSL9thYmBlSwwLLsvZOK6spqCqBF',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCb28WDK4Em_wua_veH-u1RtWOYNpAeDmBRMm1AumleNAsL5zdeLROFuscFyebk0BCrvag7XR7FcjvPGoGU5Y6zz_5uwIK6aEC26yrUTixOUlaDXz_Hjgfc9gct67yqSbJ4lyQ2oTAG_PILnzuVVdbsnas9OUJct5vI9XPFDpp2tOU0vAKF5mrVq-pMupdqenRFDY-_gtsaabHikvUVOk_iMldU3pNNilGbs9omjLjZtAEiyYAztrH06NkN16VIkoKBgsNa8DhQoPcz',
]

const USER_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1uLzjl71SLBQuY4fnrCgWWDA-Hm9UXA9n7w4ZDvCya_MrL5Ale5JOeRzPkSJIfj5s9aoJjgTY4ZDcy7PXeGjcFKRtdSuiA6YfE1klIONZ1qA7XzTlNKs_bJPq5f5OgvE4WVp7UWngnq6hfpN9O7IRi1spixMKw7qKcjHpCHuADTUn_ACGxEdo8oEIG9erJB9GAHJ-ICRpU8dlHwBiNpfgVzQcU948peQEny35WcKjuKmNVDPchWCBpd3FHQjvGYvx0Pzo5Ecxy6iL'

// S = Structural Integrity (Q1,Q3,Q8,Q9) | E = Efficiency (Q5,Q6,Q10) | N = Normative (Q2,Q4,Q7)
const ARCHETYPES = [
  {
    s: true, e: true, n: true,
    rarity: 'Top 3%',
    subtitleKo: '갓생 살다 기계가 되어버린',
    nameKo: 'AI형 통제광',
    descKo: '치약은 무조건 끝에서부터, 알람은 단 하나로 기상하는 당신은 인간미가 살짝 결여된 완벽주의자입니다. 냉장고 속 케첩 위치까지 정해져 있을 것 같은 당신의 아우라는 주변 사람들을 킹받게 하지만, 사실 당신 없으면 세상은 엉망이 될 거예요. 양말까지 신고 자는 그 철저한 자기관리, 솔직히 폼 미쳤습니다.',
    country: '독일', flag: '🇩🇪', color: '#0EA5E9',
  },
  {
    s: false, e: false, n: false,
    rarity: 'Top 5%',
    subtitleKo: '근본 없는 혼돈의 파괴자',
    nameKo: '풀네임 델루루',
    descKo: '케첩은 찬장에 방치하고 치약은 중간부터 푹 짜버리는 당신의 손길에는 일말의 망설임도 없습니다. 파인애플 피자를 당당히 시키고 알람을 7개나 맞추는 당신은 이 시대의 진정한 쿨가이이자 혼돈의 빌런입니다. 뒤처리를 서서 하는 그 독특한 폼, 진짜 광기가 느껴져서 오히려 리스펙하게 되네요.',
    country: '미국 플로리다', flag: '🇺🇸', color: '#FF6B00',
  },
  {
    s: true, e: true, n: false,
    rarity: 'Top 8%',
    subtitleKo: '효율에 미친',
    nameKo: '스마트한 변태',
    descKo: '밤에 샤워하고 양말까지 신어서 체온을 조절하는 당신의 모습은 흡사 정밀 기계와 같습니다. 모든 행동이 내일의 컨디션을 위해 계산된 것이며, TV 볼륨조차 짝수로 맞추는 그 섬세함은 경이롭기까지 합니다. 당신은 누구보다 빠르게 혼돈을 즐길 준비가 되어 있군요.',
    country: '대한민국', flag: '🇰🇷', color: '#10B981',
  },
  {
    s: true, e: false, n: false,
    rarity: 'Top 12%',
    subtitleKo: '자막 없으면 대화 불가능한',
    nameKo: '디테일 집착러',
    descKo: '한국어 영화도 자막 없이는 안 보는 당신은 소리보다 텍스트를 더 믿는 정보 과잉 시대의 산물입니다. 겉으로는 멀쩡해 보이지만 속으로는 "저 사람 왜 치약을 중간부터 짜지?"라며 100가지 유죄 목록을 작성하고 있는 당신, 정말 킹받는 매력이 있네요.',
    country: '핀란드', flag: '🇫🇮', color: '#8B5CF6',
  },
  {
    s: false, e: true, n: false,
    rarity: 'Top 7%',
    subtitleKo: '관습을 찢어버린',
    nameKo: '파격적 시그마',
    descKo: '뒤처리를 서서 한다는 사실 하나만으로도 당신은 이미 상위 1%의 유니크함을 가졌습니다. 남들이 뭐라 하든 파인애플 피자를 먹고 케첩을 찬장에 방치하는 당신은 진정한 시그마 그 자체입니다. 아침 샤워에 알람 한 번 기상까지, 혼돈을 질서 있게 즐기는 유일무이한 존재입니다.',
    country: '브라질', flag: '🇧🇷', color: '#EF4444',
  },
  {
    s: true, e: false, n: true,
    rarity: 'Top 10%',
    subtitleKo: '근본에 죽고 근본에 사는',
    nameKo: '선비형 꼰대',
    descKo: '모든 물건은 제자리에, 모든 음식은 정석대로 먹어야 행복한 당신은 이 시대의 마지막 유교보이/걸입니다. 밤에 샤워하며 경건하게 하루를 마무리하지만 아침엔 알람을 5번이나 미루는 인간적인 모습이 킬포입니다. 누군가 케첩을 찬장에 넣는 걸 보는 순간, 당신의 눈에 지진이 일어나겠죠.',
    country: '이탈리아', flag: '🇮🇹', color: '#059669',
  },
  {
    s: false, e: false, n: true,
    rarity: 'Top 15%',
    subtitleKo: '쾌락과 귀차니즘 사이를 유영하는',
    nameKo: '갓생 호소인',
    descKo: '남들 하는 건 다 하고 싶지만 막상 하려니 너무 귀찮은 당신! 피자에 파인애플은 절대 안 되지만 치약은 중간부터 짜버리는 그 모순적인 매력이 포인트입니다. 밤 샤워의 여유를 즐기고 양말 따위는 벗어 던진 채 자유를 만끽하는 당신의 아우라는 베이지 플래그의 집합체입니다.',
    country: '스페인', flag: '🇪🇸', color: '#F59E0B',
  },
  {
    s: false, e: true, n: true,
    rarity: 'Top 9%',
    subtitleKo: '군더더기 제로',
    nameKo: '직선적 미니멀리스트',
    descKo: '자막도 필요 없고, 양말도 답답하고, 피자에 과일이 올라가는 것도 용납 못 하는 당신은 아주 명확한 취향의 소유자입니다. 아침 샤워로 정신을 가다듬고 정해진 루틴대로 움직이지만, 가끔은 너무 무심하게 치약을 중간부터 짜버리는 반전 매력이 있습니다.',
    country: '일본', flag: '🇯🇵', color: '#64748B',
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
  // --- Scoring ---
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

  const shareText = `나는 ThisOrThat에서 '${archetype.nameKo}' (${archetype.rarity}) 유형이 나왔어! 😮 너도 해봐`
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
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-3xl text-[#FF6B00]">radar</span>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">ThisOrThat</h2>
        </div>
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
                {archetype.nameKo}
              </h1>
              <p className="text-slate-400 text-sm font-semibold">{archetype.subtitleKo}</p>
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
            <p className="text-slate-600 text-sm leading-relaxed font-medium">{archetype.descKo}</p>
          </div>

          {/* Share buttons */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex flex-col gap-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 text-center">결과 공유하기</p>
            <div className="grid grid-cols-3 gap-2">
              {/* KakaoTalk */}
              <button onClick={() => handleShare('kakao')} className="flex flex-col items-center gap-1.5 p-2 rounded-2xl hover:bg-slate-50 transition-colors">
                <div className="size-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FEE500' }}>
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#3A1D00">
                    <path d="M12 3C6.477 3 2 6.582 2 11c0 2.866 1.736 5.394 4.357 6.968l-.938 3.507c-.07.26.2.471.432.327L9.9 19.568C10.585 19.688 11.286 19.75 12 19.75c5.523 0 10-3.582 10-8S17.523 3 12 3z"/>
                  </svg>
                </div>
                <span className="text-[11px] font-bold text-slate-600">카카오톡</span>
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
                저장
              </button>
              <button
                onClick={handleCopyLink}
                className="flex-1 h-12 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-full font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">{copied ? 'check_circle' : 'link'}</span>
                {copied ? '복사됨!' : '링크 복사'}
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
          <h1 className="text-xl font-bold tracking-tight text-slate-800 hidden sm:block">ThisOrThat</h1>
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
