import { useState, type FormEvent } from 'react'
import { ENQUIRY_EMAIL } from '../../data/copy'
import { photos } from '../../data/images'
import { Photo } from '../ui/Photo'
import { Reveal } from '../ui/Reveal'
import { SectionCopy } from '../ui/SectionCopy'

type Status = 'idle' | 'error' | 'success'

export function EnquireForm() {
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
    <section id="enquire" className="enquire-wash scroll-mt-24">
      <div className="grid lg:min-h-dvh lg:grid-cols-[42fr_58fr]">
        <div className="flex items-center px-6 pt-28 pb-16 md:px-12 md:pt-36 md:pb-20 lg:px-10 lg:py-16 xl:px-14 xl:py-20">
          <div className="enquire-stack w-full">
            <Reveal>
              <SectionCopy
                className="max-w-none"
                titleClassName="enquire-headline"
                label="Enquire"
                title={
                  <>
                    Some residences
                    <br />
                    are viewed.
                    <br />
                    This one is
                    <br />
                    experienced.
                  </>
                }
                body="For availability, private viewings and bespoke concierge arrangements, enquire privately."
              />
              <p className="enquire-detail">
                <span>Private viewings · 7 days a week</span>
                <span>Miami Beach, FL</span>
              </p>
            </Reveal>

            {status === 'success' ? (
              <div
                className="enquire-success"
                role="status"
                aria-live="polite"
              >
                <p>Thank you. Your enquiry has been prepared.</p>
                <p>
                  If your email client did not open, write to{' '}
                  <a
                    className="text-lagoon underline underline-offset-4"
                    href={`mailto:${ENQUIRY_EMAIL}`}
                  >
                    {ENQUIRY_EMAIL}
                  </a>
                  .
                </p>
              </div>
            ) : (
              <form className="enquire-form" onSubmit={onSubmit} noValidate>
                <Field name="name" label="Name" autoComplete="name" required />
                <Field
                  name="email"
                  label="Email"
                  type="email"
                  autoComplete="email"
                  required
                />
                <Field name="dates" label="Preferred dates" />
                <Field name="message" label="Your enquiry" multiline />
                {status === 'error' ? (
                  <p className="enquire-error" role="alert">
                    {error}
                  </p>
                ) : null}
                <button type="submit" className="enquire-cta">
                  <span>Request a private viewing</span>
                  <span className="enquire-cta-rule" aria-hidden="true" />
                  <span className="enquire-cta-arrow" aria-hidden="true">
                    →
                  </span>
                </button>
                <p className="enquire-assurance">
                  A member of our residence team
                  <br />
                  will respond within 24 hours.
                </p>
              </form>
            )}
          </div>
        </div>
        <div className="min-h-[50vh] lg:sticky lg:top-0 lg:h-dvh">
          <Photo
            src={photos.poolHigh}
            alt="Pool, palms and the Atlantic from above"
            caption="Private enquiries"
            stretch
            className="enquire-frame min-h-[50vh]"
            captionClassName="px-6 pb-8 md:px-12 lg:px-20"
          />
        </div>
      </div>
    </section>
  )
}

function Field({
  name,
  label,
  type = 'text',
  required = false,
  multiline = false,
  autoComplete,
}: {
  name: string
  label: string
  type?: string
  required?: boolean
  multiline?: boolean
  autoComplete?: string
}) {
  return (
    <label className="enquire-field">
      <span className="enquire-label">{label}</span>
      {multiline ? (
        <textarea name={name} className="enquire-control enquire-textarea" />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          autoComplete={autoComplete}
          className="enquire-control"
        />
      )}
    </label>
  )
}
