import { Link } from 'react-router-dom'

const ARTICLES = [
  {
    slug: 'what-your-daily-habits-reveal-about-personality',
    title: 'What Your Daily Habits Reveal About Your Personality',
    excerpt:
      'Psychologists have long argued that the small, automatic choices we make every day — how we squeeze toothpaste, which side of the bed we sleep on, whether we eat breakfast — are windows into our deeper character.',
    date: 'March 10, 2026',
    readTime: '6 min read',
    tag: 'Psychology',
  },
  {
    slug: 'morning-shower-vs-night-shower',
    title: 'Morning Shower vs. Night Shower: What Your Choice Says About You',
    excerpt:
      'It seems like a trivial preference, but when you dig into the research, the morning-vs-night shower debate touches on chronobiology, stress hormones, sleep science, and personality psychology.',
    date: 'March 8, 2026',
    readTime: '5 min read',
    tag: 'Science',
  },
  {
    slug: 'why-personality-quizzes-are-so-popular',
    title: 'Why Personality Quizzes Are So Wildly Popular (And What They Actually Measure)',
    excerpt:
      'From Myers-Briggs to BuzzFeed, personality quizzes have captivated billions of people. But why? And is there any real science behind them, or are we just chasing flattering mirror images of ourselves?',
    date: 'March 5, 2026',
    readTime: '7 min read',
    tag: 'Culture',
  },
]

function Nav() {
  return (
    <header className="border-b border-slate-100 px-6 py-4 bg-white sticky top-0 z-10">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-slate-700 hover:text-[#0EA5E9] transition-colors font-bold">
          <span className="material-symbols-outlined text-[20px]">radar</span>
          ThisOrThat
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-slate-500">
          <Link to="/about" className="hover:text-[#0EA5E9] transition-colors">About</Link>
          <Link to="/quiz" className="bg-[#0EA5E9] text-white px-4 py-1.5 rounded-full hover:bg-sky-600 transition-colors text-xs font-bold">Take Quiz</Link>
        </nav>
      </div>
    </header>
  )
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white font-[Spline_Sans,sans-serif] text-slate-800">
      <Nav />

      <main className="max-w-4xl mx-auto px-6 py-14">
        <div className="mb-10">
          <h1 className="text-4xl font-black text-slate-900 mb-3">Blog</h1>
          <p className="text-slate-500 text-lg">
            Insights on personality psychology, habit science, and the quirks that make us human.
          </p>
        </div>

        <div className="space-y-8">
          {ARTICLES.map((article) => (
            <article key={article.slug} className="border border-slate-100 rounded-2xl p-7 hover:shadow-md transition-shadow bg-white">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-bold bg-blue-50 text-[#0EA5E9] px-3 py-1 rounded-full">{article.tag}</span>
                <span className="text-xs text-slate-400">{article.date}</span>
                <span className="text-xs text-slate-400">· {article.readTime}</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2 leading-snug">
                <Link to={`/blog/${article.slug}`} className="hover:text-[#0EA5E9] transition-colors">
                  {article.title}
                </Link>
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">{article.excerpt}</p>
              <Link
                to={`/blog/${article.slug}`}
                className="inline-flex items-center gap-1.5 text-[#0EA5E9] text-sm font-semibold hover:gap-2.5 transition-all"
              >
                Read more
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </article>
          ))}
        </div>
      </main>

      <footer className="border-t border-slate-100 py-8 px-6 text-center text-slate-400 text-sm">
        © 2026 ThisOrThat. Stay weird.
      </footer>
    </div>
  )
}
