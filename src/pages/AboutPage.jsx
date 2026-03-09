import { useNavigate } from 'react-router-dom'

export default function AboutPage() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-white font-[Spline_Sans,sans-serif] text-slate-800">
      <header className="border-b border-slate-100 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-slate-500 hover:text-[#0EA5E9] transition-colors text-sm font-medium">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Home
          </button>
          <span className="text-slate-300">|</span>
          <span className="text-slate-400 text-sm">About</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-black text-slate-900 mb-4">About ThisOrThat</h1>

        <div className="space-y-8 text-slate-600 leading-relaxed">

          <section>
            <p className="text-lg">
              <strong className="text-slate-800">ThisOrThat</strong> is a free personality quiz that discovers your unique "weirdo score" through 10 simple This-or-That questions about everyday habits and preferences.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">How It Works</h2>
            <p>
              We ask you 10 quick questions — things like how you squeeze toothpaste, whether you eat pineapple on pizza, and if you wear socks to bed.
              Your answers are scored across three dimensions: <strong>Structural Integrity</strong>, <strong>Efficiency</strong>, and <strong>Normative Behaviour</strong>.
              The combination maps you to one of 8 unique personality archetypes, complete with a radar chart and a soulmate country.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">Why We Built This</h2>
            <p>
              We believe everyone is weird in their own wonderful way. ThisOrThat started as a fun experiment to see whether small, everyday choices reveal something genuine about personality.
              Turns out, they do — and the results are surprisingly accurate (and hilarious).
            </p>
            <p className="mt-3">
              The quiz is completely free, takes under two minutes, and is designed to be shared with friends, family, and anyone who's ever argued about the right way to load a dishwasher.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">The 8 Archetypes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              {[
                { name: 'The AI Control Freak', rarity: 'Top 3%' },
                { name: 'Full Send Delulu', rarity: 'Top 5%' },
                { name: 'The Smart Weirdo', rarity: 'Top 8%' },
                { name: 'The Detail Obsessive', rarity: 'Top 12%' },
                { name: 'The Radical Sigma', rarity: 'Top 7%' },
                { name: 'The Principled Traditionalist', rarity: 'Top 10%' },
                { name: 'The Aspiring Go-Getter', rarity: 'Top 15%' },
                { name: 'The Straight-Cut Minimalist', rarity: 'Top 9%' },
              ].map(a => (
                <div key={a.name} className="bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
                  <div className="font-bold text-slate-800 text-sm">{a.name}</div>
                  <div className="text-xs text-[#0EA5E9] font-semibold mt-0.5">{a.rarity}</div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">Contact & Feedback</h2>
            <p>
              Have feedback, found a bug, or just want to tell us your archetype? We'd love to hear from you.
              Reach out via our <button onClick={() => navigate('/contact')} className="text-[#0EA5E9] hover:underline font-medium">Contact page</button>.
            </p>
          </section>

        </div>
      </main>

      <footer className="border-t border-slate-100 py-8 px-6 text-center text-slate-400 text-sm">
        © 2026 ThisOrThat. Stay weird.
      </footer>
    </div>
  )
}
