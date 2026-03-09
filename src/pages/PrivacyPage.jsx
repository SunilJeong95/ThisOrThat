import { useNavigate } from 'react-router-dom'

export default function PrivacyPage() {
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
          <span className="text-slate-400 text-sm">Privacy Policy</span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-black text-slate-900 mb-2">Privacy Policy</h1>
        <p className="text-slate-400 text-sm mb-10">Last updated: March 2026</p>

        <div className="prose prose-slate max-w-none space-y-8 text-slate-600 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">Overview</h2>
            <p>
              ThisOrThat ("we", "us", or "our") operates the website{' '}
              <a href="https://thisorthat.pages.dev" className="text-[#0EA5E9] hover:underline">thisorthat.pages.dev</a>.
              This Privacy Policy explains how we collect, use, and protect information when you use our service.
              By using ThisOrThat, you agree to the practices described in this policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">Information We Collect</h2>
            <p>We do not require account registration and do not collect personally identifiable information directly. However, the following data may be collected automatically:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring URL</li>
              <li>Anonymous session identifiers (stored in <code className="bg-slate-100 px-1 rounded text-sm">sessionStorage</code>, not transmitted to our servers permanently)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to improve your experience and to serve relevant advertisements.
              Cookies are small text files stored on your device.
            </p>
            <p className="mt-3">Cookies we use include:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong>Session cookies:</strong> Temporary identifiers used for live visitor counting. These are deleted when you close your browser.</li>
              <li><strong>Advertising cookies:</strong> Set by Google AdSense to serve personalised advertisements (see below).</li>
              <li><strong>Analytics cookies:</strong> May be set by third-party services to help us understand site usage.</li>
            </ul>
            <p className="mt-3">
              You can control cookies through your browser settings. Disabling cookies may affect certain features of this site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">Google AdSense and Advertising</h2>
            <p>
              We use Google AdSense to display advertisements. Google AdSense is operated by Google LLC, and uses cookies to serve ads based on your prior visits to this website and other sites on the internet.
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites on the internet.</li>
              <li>You may opt out of personalised advertising by visiting <a href="https://www.google.com/settings/ads" className="text-[#0EA5E9] hover:underline" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.</li>
              <li>You may also opt out of a third-party vendor's use of cookies for personalised advertising by visiting <a href="https://www.aboutads.info/choices/" className="text-[#0EA5E9] hover:underline" target="_blank" rel="noopener noreferrer">www.aboutads.info</a>.</li>
            </ul>
            <p className="mt-3">
              For more information on how Google uses data when you use our site, please visit{' '}
              <a href="https://policies.google.com/technologies/partner-sites" className="text-[#0EA5E9] hover:underline" target="_blank" rel="noopener noreferrer">
                How Google uses information from sites or apps that use our services
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">How We Use Your Information</h2>
            <p>Information we collect is used to:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Display the live visitor count feature</li>
              <li>Improve the website's functionality and user experience</li>
              <li>Serve relevant advertisements through Google AdSense</li>
              <li>Analyse site traffic patterns (in aggregate, anonymised form)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">Third-Party Services</h2>
            <p>We use the following third-party services, each subject to their own privacy policies:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong>Google AdSense</strong> — Advertising (<a href="https://policies.google.com/privacy" className="text-[#0EA5E9] hover:underline" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>)</li>
              <li><strong>Cloudflare</strong> — Hosting and CDN (<a href="https://www.cloudflare.com/privacypolicy/" className="text-[#0EA5E9] hover:underline" target="_blank" rel="noopener noreferrer">Cloudflare Privacy Policy</a>)</li>
              <li><strong>Google Fonts</strong> — Web fonts</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">Data Retention</h2>
            <p>
              We do not store personal data on our servers beyond what is necessary to operate the live visitor counter (session-based, temporary).
              Third-party services such as Google may retain data according to their own policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">Children's Privacy</h2>
            <p>
              ThisOrThat is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13.
              If you believe we have inadvertently collected such information, please contact us so we can promptly delete it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">Your Rights</h2>
            <p>Depending on your jurisdiction, you may have the right to:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Access the personal data we hold about you</li>
              <li>Request correction or deletion of your data</li>
              <li>Object to or restrict processing of your data</li>
              <li>Opt out of personalised advertising (see Google Ads Settings above)</li>
            </ul>
            <p className="mt-3">To exercise these rights, please contact us at the address below.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date.
              Continued use of the site after changes constitutes acceptance of the revised policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-800 mb-3">Contact</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:wjdtjsdlf210@gmail.com" className="text-[#0EA5E9] hover:underline">wjdtjsdlf210@gmail.com</a>.
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
