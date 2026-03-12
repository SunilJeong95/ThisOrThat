import { Link } from 'react-router-dom'

const FAQ_ITEMS = [
  {
    category: 'About the Quiz',
    questions: [
      {
        q: 'Is this quiz based on real personality science?',
        a: 'Yes and no. The quiz is inspired by research linking habitual behaviors to Big Five personality traits — especially Conscientiousness, Openness, and Chronotype (morning vs. evening tendency). However, it\'s designed to be fun and shareable, not a clinical assessment. Think of it as a playful window into your habits, not a diagnosis.',
      },
      {
        q: 'How long does the quiz take?',
        a: 'About 90 seconds. There are 10 questions and you can answer each in a few seconds. No login, no email required — just start and go.',
      },
      {
        q: 'Can I retake the quiz?',
        a: 'Yes, anytime. Just go back to the home page and click "Start Test." Your previous result is not saved on our servers, so each attempt is fresh.',
      },
      {
        q: 'Why pineapple on pizza, socks in bed, and toilet paper orientation?',
        a: 'These questions have become cultural flashpoints precisely because they reveal genuine preference differences. They\'re low-stakes enough that people answer honestly, but polarizing enough to discriminate between personality types. Research suggests that food preferences and domestic habits correlate meaningfully with personality traits like openness to experience and conscientiousness.',
      },
    ],
  },
  {
    category: 'Results & Archetypes',
    questions: [
      {
        q: 'How are the 24 archetypes determined?',
        a: 'Your result is determined by two axes. The Chrono-Routine axis (based on your shower timing and alarm behavior) produces one of 4 base types. Your Micro-Chaos Quotient — derived from the remaining 8 questions — places you in one of 6 tiers from low chaos to high chaos. The 4 × 6 combination maps you to one of 24 unique archetypes.',
      },
      {
        q: 'What does the rarity percentile mean?',
        a: 'The rarity figure (e.g., "Top 3%") reflects how statistically uncommon your particular combination of answers is among all users. Archetypes requiring extreme scores on both axes — like a perfect chaos score with a very structured routine — are the rarest.',
      },
      {
        q: 'What does the radar chart show?',
        a: 'The radar chart visualizes five personality dimensions: CHAOS (how norm-defying your choices are), REBEL (how much you resist defaults), WILD (unpredictability of your preferences), CHILL (your tolerance for low-effort solutions), and WEIRD (overall departure from the statistical average). Each axis is scored from your answers.',
      },
      {
        q: 'What is the "soulmate country"?',
        a: 'Each archetype is paired with a country whose cultural personality profile most closely matches yours — based on cross-cultural research on national personality traits, individualism vs. collectivism scores, and openness indices. It\'s a fun illustration, not a precise scientific claim.',
      },
      {
        q: 'Can I download or share my result?',
        a: 'Yes. From the results screen you can download your archetype card as a PNG image, or share directly to Twitter, Facebook, Threads, WhatsApp, Instagram, and KakaoTalk.',
      },
    ],
  },
  {
    category: 'Privacy & Data',
    questions: [
      {
        q: 'Is my data stored or shared?',
        a: 'We don\'t store your individual quiz answers permanently. Anonymous vote counts are stored in aggregate (e.g., "X people chose pineapple on pizza") to power the vote display. We use anonymous session data to power the live visitor counter. See our Privacy Policy for full details.',
      },
      {
        q: 'Does the site use cookies?',
        a: 'Yes. We use session cookies for the live visitor counter, and Google AdSense uses advertising cookies to serve relevant ads. You can control or disable cookies in your browser settings. Our Privacy Policy has full details and opt-out links.',
      },
      {
        q: 'Is the site safe for children?',
        a: 'ThisOrThat is not directed at children under 13. If you are a parent and believe your child has submitted information through this site, please contact us and we will promptly delete it.',
      },
    ],
  },
]

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-white font-[Spline_Sans,sans-serif] text-slate-800">
      <header className="border-b border-slate-100 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-[#0EA5E9] transition-colors text-sm font-medium">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Home
          </Link>
          <span className="text-slate-300">|</span>
          <span className="text-slate-400 text-sm">FAQ</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-black text-slate-900 mb-2">Frequently Asked Questions</h1>
        <p className="text-slate-500 mb-10 leading-relaxed">
          Everything you need to know about ThisOrThat — the quiz, the results, and the science behind it.
        </p>

        <div className="space-y-10">
          {FAQ_ITEMS.map((section) => (
            <section key={section.category}>
              <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-[#0EA5E9] rounded-full inline-block"></span>
                {section.category}
              </h2>
              <div className="space-y-3">
                {section.questions.map((item, i) => (
                  <details key={i} className="group border border-slate-200 rounded-2xl overflow-hidden">
                    <summary className="flex items-center justify-between px-6 py-4 cursor-pointer font-semibold text-slate-800 hover:bg-slate-50 transition-colors list-none">
                      <span>{item.q}</span>
                      <span className="material-symbols-outlined text-slate-400 group-open:rotate-180 transition-transform text-[20px] shrink-0 ml-4">expand_more</span>
                    </summary>
                    <div className="px-6 pb-5 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 rounded-2xl p-6 text-center">
          <p className="text-slate-700 font-semibold mb-1">Still have questions?</p>
          <p className="text-slate-500 text-sm mb-4">We're happy to help — reach out anytime.</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-[#0EA5E9] text-white font-bold px-6 py-3 rounded-full hover:bg-sky-600 transition-colors text-sm"
          >
            Contact Us
            <span className="material-symbols-outlined text-[16px]">mail</span>
          </Link>
        </div>
      </main>

      <footer className="border-t border-slate-100 py-8 px-6 text-center text-slate-400 text-sm">
        <div className="flex justify-center gap-6 mb-3">
          <Link to="/about" className="hover:text-[#0EA5E9] transition-colors">About</Link>
          <Link to="/how-it-works" className="hover:text-[#0EA5E9] transition-colors">How It Works</Link>
          <Link to="/blog" className="hover:text-[#0EA5E9] transition-colors">Blog</Link>
          <Link to="/privacy" className="hover:text-[#0EA5E9] transition-colors">Privacy Policy</Link>
        </div>
        © 2026 ThisOrThat. Stay weird.
      </footer>
    </div>
  )
}
