import { useEffect, useState } from 'react'
import { SectionHeading, Reveal, Button, Chip } from '../components/ui.jsx'

const TYPES = ['Solar farm', 'Rooftop', 'Investor', 'OEM', 'Other']

export default function Contact() {
  const [form, setForm] = useState({ name: '', org: '', type: 'Solar farm', size: '', message: '' })
  const [sent, setSent] = useState(false)
  const [newsletter, setNewsletter] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    function onPrefill(e) {
      setForm((f) => ({ ...f, ...e.detail }))
      setSent(false)
    }
    window.addEventListener('kb:prefill', onPrefill)
    return () => window.removeEventListener('kb:prefill', onPrefill)
  }, [])

  function submit(e) {
    e.preventDefault()
    const body = encodeURIComponent(`Name: ${form.name}\nOrg: ${form.org}\nType: ${form.type}\nSite size: ${form.size}\n\n${form.message}`)
    window.location.href = `mailto:rmquaiser@gmail.com?subject=${encodeURIComponent(`Kleanbotics inquiry — ${form.type}`)}&body=${body}`
    setSent(true)
  }

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  return (
    <section id="contact" className="border-t border-white/[0.07]">
      <div className="section-pad">
        <div className="container-max grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* form */}
          <div>
            <SectionHeading eyebrow="Contact" title="Let's clean up your solar" subtitle="Tell us about your site or interest — we'll reply within a couple of days." />

            <Reveal>
              <form onSubmit={submit} className="mt-8 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input label="Name" value={form.name} onChange={set('name')} required />
                  <Input label="Organisation" value={form.org} onChange={set('org')} />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-caption text-ink-400">Type</label>
                    <select value={form.type} onChange={set('type')} className="w-full rounded-btn border border-white/10 bg-navy-850 px-4 py-2.5 text-[0.9375rem] text-ink-100 focus:border-accent-400 focus:outline-none">
                      {TYPES.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <Input label="Site size" placeholder="e.g. 500 kW" value={form.size} onChange={set('size')} />
                </div>
                <div>
                  <label className="mb-1.5 block text-caption text-ink-400">Message</label>
                  <textarea rows={4} value={form.message} onChange={set('message')} className="w-full rounded-btn border border-white/10 bg-navy-850 px-4 py-2.5 text-[0.9375rem] text-ink-100 focus:border-accent-400 focus:outline-none" />
                </div>
                <Button variant="primary" size="lg" as="button" type="submit" className="w-full">
                  {sent ? 'Opening your email…' : 'Send inquiry'}
                </Button>
                {sent && <p className="caption text-center font-mono text-data-400">Your email app should open. Or email rmquaiser@gmail.com directly.</p>}
              </form>
            </Reveal>
          </div>

          {/* info */}
          <Reveal delay={0.08}>
            <div className="surface flex h-full flex-col rounded-panel p-8">
              <Chip tone="neutral">InfinitiSense LLP</Chip>
              <h3 className="h3 mt-4 text-2xl">Kleanbotics</h3>
              <p className="mt-2 text-ink-400">Cloud-connected EdgeAI robots for solar O&M. Built in India.</p>

              <dl className="mt-8 space-y-3">
                <Row term="Founder" desc="Raunaque" />
                <Row term="Email" desc={<a className="text-data-400 hover:underline" href="mailto:rmquaiser@gmail.com">rmquaiser@gmail.com</a>} />
                <Row term="Phone" desc={<a className="text-data-400 hover:underline" href="tel:+919810503438">+91 98105 03438</a>} />
              </dl>

              <div className="mt-8">
                <p className="mb-2 text-caption text-ink-400">Newsletter — solar O&M insights</p>
                {subscribed ? (
                  <p className="rounded-btn border border-data-500/30 bg-data-500/10 px-4 py-2.5 font-mono text-caption text-data-400">Subscribed — thank you.</p>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); if (newsletter) setSubscribed(true) }} className="flex gap-2">
                    <input type="email" required value={newsletter} onChange={(e) => setNewsletter(e.target.value)} placeholder="you@company.com" className="flex-1 rounded-btn border border-white/10 bg-navy-850 px-4 py-2.5 text-[0.9375rem] text-ink-100 focus:border-accent-400 focus:outline-none" />
                    <Button variant="secondary" as="button" type="submit">Join</Button>
                  </form>
                )}
              </div>

              <div className="mt-auto flex flex-wrap items-center gap-2 pt-8">
                {['LinkedIn', 'X', 'YouTube', 'Instagram'].map((s) => (
                  <a key={s} href="#" className="rounded-btn border border-white/10 px-3 py-1.5 text-caption text-ink-400 transition-colors hover:text-ink-100" aria-label={s}>{s}</a>
                ))}
                <Chip tone="accent" className="ml-auto">Made in India 🇮🇳</Chip>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <footer className="border-t border-white/[0.07] py-8">
        <div className="container-max flex flex-col items-center justify-between gap-3 px-5 text-center caption sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} InfinitiSense LLP · Kleanbotics. All rights reserved.</p>
          <p className="font-mono">Clean panels. Smarter power.</p>
        </div>
      </footer>
    </section>
  )
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="mb-1.5 block text-caption text-ink-400">{label}</label>
      <input {...props} className="w-full rounded-btn border border-white/10 bg-navy-850 px-4 py-2.5 text-[0.9375rem] text-ink-100 focus:border-accent-400 focus:outline-none" />
    </div>
  )
}

function Row({ term, desc }) {
  return (
    <div className="flex items-center justify-between border-b border-white/[0.07] pb-3">
      <dt className="label">{term}</dt>
      <dd className="text-ink-200">{desc}</dd>
    </div>
  )
}
