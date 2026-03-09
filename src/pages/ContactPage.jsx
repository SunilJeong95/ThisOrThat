import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ContactPage() {
  const navigate = useNavigate()
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Opens the user's mail client with pre-filled fields
    const subject = encodeURIComponent('ThisOrThat Feedback')
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)
    window.location.href = `mailto:contact@thisorthat.pages.dev?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-white font-[Spline_Sans,sans-serif] text-slate-800">
      <header className="border-b border-slate-100 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-slate-500 hover:text-[#0EA5E9] transition-colors text-sm font-medium">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Home
          </button>
          <span className="text-slate-300">|</span>
          <span className="text-slate-400 text-sm">Contact Us</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-black text-slate-900 mb-2">Contact Us</h1>
        <p className="text-slate-500 mb-10">Questions, feedback, or just want to say hi? We'd love to hear from you.</p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact info */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[#0EA5E9] text-[20px]">mail</span>
              </div>
              <div>
                <div className="font-bold text-slate-800 text-sm mb-1">Email</div>
                <a href="mailto:contact@thisorthat.pages.dev" className="text-[#0EA5E9] hover:underline text-sm">
                  contact@thisorthat.pages.dev
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[#0EA5E9] text-[20px]">schedule</span>
              </div>
              <div>
                <div className="font-bold text-slate-800 text-sm mb-1">Response Time</div>
                <p className="text-slate-500 text-sm">We typically respond within 2–3 business days.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[#0EA5E9] text-[20px]">language</span>
              </div>
              <div>
                <div className="font-bold text-slate-800 text-sm mb-1">Website</div>
                <a href="https://thisorthat.pages.dev" className="text-[#0EA5E9] hover:underline text-sm">
                  thisorthat.pages.dev
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          {sent ? (
            <div className="flex flex-col items-center justify-center text-center py-8">
              <span className="material-symbols-outlined text-[48px] text-green-500 mb-4">check_circle</span>
              <p className="font-bold text-slate-800 text-lg">Your mail client has opened!</p>
              <p className="text-slate-500 text-sm mt-2">Send the email to reach us. We'll get back to you soon.</p>
              <button onClick={() => setSent(false)} className="mt-6 text-sm text-[#0EA5E9] hover:underline">Send another message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/30 focus:border-[#0EA5E9] transition"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/30 focus:border-[#0EA5E9] transition"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/30 focus:border-[#0EA5E9] transition resize-none"
                  placeholder="Your feedback, bug report, or just a hello…"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#0EA5E9] hover:bg-sky-500 text-white font-bold py-3 rounded-xl text-sm transition-colors"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </main>

      <footer className="border-t border-slate-100 py-8 px-6 text-center text-slate-400 text-sm mt-12">
        © 2026 ThisOrThat. Stay weird.
      </footer>
    </div>
  )
}
