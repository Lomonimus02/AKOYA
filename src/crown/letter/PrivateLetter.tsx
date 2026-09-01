import { useState, type FormEvent } from 'react'
import { ENQUIRY_EMAIL } from '../data/copy'

type Status = 'idle' | 'error' | 'success'

export function PrivateLetter() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const dates = String(data.get('dates') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()

    if (name.length < 2) {
      setStatus('error')
      setError('Please share your name.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error')
      setError('Please provide a valid email address.')
      return
    }

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Preferred dates: ${dates || '—'}`,
      '',
      message || 'I would like to enquire privately about Akoya Penthouse.',
    ].join('\n')

    window.location.href = `mailto:${ENQUIRY_EMAIL}?subject=${encodeURIComponent(
      'Akoya Penthouse enquiry',
    )}&body=${encodeURIComponent(body)}`

    setStatus('success')
    setError('')
  }

  return (
    <section id="enquire" className="scroll-mt-20 border-t border-rule px-6 py-28 md:px-20 md:py-36">
      <div className="grid gap-16 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-24">
        <div>
          <a
            href={`mailto:${ENQUIRY_EMAIL}`}
            className="font-display text-[clamp(1.8rem,3.6vw,3.1rem)] italic leading-[1.15] text-bone"
          >
            {ENQUIRY_EMAIL}
          </a>
          <p className="mt-8 max-w-[34ch] text-[1.02rem] leading-[1.8] text-ash">
            Availability, viewings, concierge — a letter to the residence.
          </p>
        </div>

        {status === 'success' ? (
          <p className="self-center text-[1.05rem] leading-relaxed text-bone" role="status">
            Thank you. Your enquiry has been prepared. If your email client did not open, write to{' '}
            <a className="text-gilt" href={`mailto:${ENQUIRY_EMAIL}`}>
              {ENQUIRY_EMAIL}
            </a>
            .
          </p>
        ) : (
          <form className="flex flex-col gap-5" onSubmit={onSubmit} noValidate>
            <label className="block">
              <span className="text-[0.68rem] text-ash">Name</span>
              <input className="field-line" name="name" autoComplete="name" required />
            </label>
            <label className="block">
              <span className="text-[0.68rem] text-ash">Email</span>
              <input className="field-line" name="email" type="email" autoComplete="email" required />
            </label>
            <label className="block">
              <span className="text-[0.68rem] text-ash">Dates or duration</span>
              <input className="field-line" name="dates" />
            </label>
            <label className="block">
              <span className="text-[0.68rem] text-ash">Message</span>
              <textarea className="field-line min-h-28 resize-none" name="message" rows={4} />
            </label>
            {status === 'error' ? (
              <p className="text-sm text-gilt" role="alert">
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              className="mt-4 self-start text-[0.78rem] text-bone underline decoration-gilt/60 underline-offset-8"
            >
              Send
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
