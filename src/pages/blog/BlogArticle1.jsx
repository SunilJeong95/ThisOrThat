import { Link } from 'react-router-dom'

function Nav() {
  return (
    <header className="border-b border-slate-100 px-6 py-4 bg-white sticky top-0 z-10">
      <div className="max-w-3xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-slate-700 hover:text-[#0EA5E9] transition-colors font-bold">
          <span className="material-symbols-outlined text-[20px]">radar</span>
          ThisOrThat
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-slate-500">
          <Link to="/blog" className="hover:text-[#0EA5E9] transition-colors">Blog</Link>
          <Link to="/quiz" className="bg-[#0EA5E9] text-white px-4 py-1.5 rounded-full hover:bg-sky-600 transition-colors text-xs font-bold">Take Quiz</Link>
        </nav>
      </div>
    </header>
  )
}

export default function BlogArticle1() {
  return (
    <div className="min-h-screen bg-white font-[Spline_Sans,sans-serif] text-slate-800">
      <Nav />

      <main className="max-w-3xl mx-auto px-6 py-14">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-8">
          <Link to="/blog" className="hover:text-[#0EA5E9] transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-slate-600">Daily Habits & Personality</span>
        </div>

        {/* Header */}
        <div className="mb-10">
          <span className="text-xs font-bold bg-blue-50 text-[#0EA5E9] px-3 py-1 rounded-full">Psychology</span>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mt-4 mb-4 leading-tight">
            What Your Daily Habits Reveal About Your Personality
          </h1>
          <div className="flex items-center gap-3 text-sm text-slate-400">
            <span>March 10, 2026</span>
            <span>·</span>
            <span>6 min read</span>
          </div>
        </div>

        {/* Article Body */}
        <div className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed text-[17px]">

          <p>
            Psychologists have long argued that the small, automatic choices we make every day — how we squeeze toothpaste, which side of the bed we sleep on, whether we eat breakfast — are windows into our deeper character. These micro-decisions, so mundane they barely register consciously, are shaped by personality traits that have been forming since childhood.
          </p>

          <p>
            This is not a new idea. William James, writing in 1890, described habit as "the enormous flywheel of society." More recently, researchers like Charles Duhigg (<em>The Power of Habit</em>) and Wendy Wood (a habit researcher at USC) have demonstrated that roughly 43% of our daily behaviors are habitual — meaning they happen without deliberate decision-making. If habits are automatic expressions of self, they are also, in a very real sense, personality made visible.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">The Big Five and Your Morning Routine</h2>

          <p>
            The most widely accepted scientific model of personality is the Big Five, sometimes called OCEAN: Openness to experience, Conscientiousness, Extraversion, Agreeableness, and Neuroticism. Researchers have repeatedly found that these five traits predict behavior across cultures, age groups, and life circumstances.
          </p>

          <p>
            <strong>Conscientiousness</strong> — the tendency toward organization, discipline, and reliability — correlates strongly with structured morning routines. People high in conscientiousness are more likely to wake at the same time each day, make their beds, eat a consistent breakfast, and complete tasks in sequence. They are, in the language of our quiz, likely to set a single alarm and turn it off on the first ring.
          </p>

          <p>
            <strong>Openness to experience</strong>, on the other hand, correlates with novelty-seeking and flexibility. High-openness individuals are more likely to try unconventional combinations — pineapple on pizza, for instance — not because they are contrarians but because their brains genuinely find variety rewarding. A 2019 study in the journal <em>Personality and Individual Differences</em> found that openness scores predicted dietary adventurousness with statistical significance.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Tiny Preferences, Big Patterns</h2>

          <p>
            Consider the toilet paper over-or-under debate. In 2011, psychologist Gilda Carle surveyed 2,000 people and found a surprising correlation: people who hang toilet paper over the roll tend to be more dominant, assertive, and decisive, while those who prefer it under tend to be more easygoing and submissive — traits that align loosely with extraversion and agreeableness in the Big Five model. It's a silly example, but it illustrates a genuine point: our habits are consistent across domains because our personality traits are consistent.
          </p>

          <p>
            The same principle applies to how we manage phone battery. Someone who charges at 50% is exercising proactive risk management — a signature of conscientious, anxiety-aware individuals. Someone who plays chicken with a 1% battery is demonstrating a higher tolerance for uncertainty and a preference for living in the present moment. These aren't random behaviors. They are personality expressed through everyday choices.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">The Chrono-Routine Axis: When You Sleep Shapes Who You Are</h2>

          <p>
            One of the most scientifically validated personality predictors is chronotype — your biological preference for morning or evening activity. Chronotype is substantially heritable (studies suggest 50% genetic influence) and remains relatively stable across adulthood. Morning types ("larks") score higher on conscientiousness and agreeableness. Evening types ("owls") score higher on openness to experience and, in some studies, intelligence — though the relationship is complex.
          </p>

          <p>
            This is why ThisOrThat weights shower timing and alarm behavior as its Chrono-Routine axis. These habits are tightly coupled to chronotype, which in turn predicts a cluster of downstream personality characteristics. It's not that shower time <em>causes</em> a personality type — rather, both are expressions of the same underlying biological and psychological profile.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Why Small Questions Work</h2>

          <p>
            Traditional personality assessments like the Big Five Inventory ask you to evaluate yourself directly: "I see myself as someone who is talkative." But self-report has a well-documented flaw: we are poor observers of our own behavior. We answer based on who we want to be, not always who we are.
          </p>

          <p>
            Behavioral questions sidestep this problem. Asking "do you wear socks to bed?" is harder to answer aspirationally. You either do or you don't. This is why behavioral trivia-style quizzes can sometimes surface personality signal that formal self-assessments miss. The question is low-stakes and concrete, which means the answer is more honest.
          </p>

          <p>
            Of course, a 10-question quiz cannot replace a validated psychological assessment. But it can be a genuinely useful lens — a way of noticing patterns in yourself you hadn't consciously articulated. Many ThisOrThat users report that their result "feels exactly right," precisely because the quiz bypassed their self-idealization and caught their actual habits.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">What This Means for Self-Understanding</h2>

          <p>
            The practical implication of habit-as-personality is that small changes to daily routines can, over time, shift self-perception and even personality scores. This is the basis of behavioral activation therapy for depression — acting "as if" you are the energetic, engaged person you want to be, through consistent small behaviors, gradually makes it true.
          </p>

          <p>
            Conversely, auditing your existing habits can be a form of self-discovery. If you notice you always squeeze toothpaste from the middle, snooze your alarm four times, and charge your phone only at 1% — you might be getting a genuine signal about your relationship with rules, structure, and risk. Not a judgment, just a mirror.
          </p>

          <p>
            That's ultimately what ThisOrThat is for. Not to label you, but to give you a funny, surprisingly accurate mirror — one made of toilet paper orientation and sock choices and pineapple opinions. Stay weird.
          </p>

          <hr className="border-slate-200 my-10" />

          <div className="bg-blue-50 rounded-2xl p-6 text-center">
            <p className="text-slate-700 font-semibold mb-3">Curious what your habits say about you?</p>
            <Link
              to="/quiz"
              className="inline-flex items-center gap-2 bg-[#F59E0B] text-white font-bold px-6 py-3 rounded-full hover:bg-orange-500 transition-colors"
            >
              Take the ThisOrThat Quiz
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-100 py-8 px-6 text-center text-slate-400 text-sm mt-10">
        © 2026 ThisOrThat. Stay weird. ·{' '}
        <Link to="/privacy" className="hover:text-[#0EA5E9] transition-colors">Privacy Policy</Link>
      </footer>
    </div>
  )
}
