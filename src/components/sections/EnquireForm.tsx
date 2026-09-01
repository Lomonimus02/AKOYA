import { useState, type FormEvent } from 'react'
import { ENQUIRY_EMAIL } from '../../data/copy'
import { photos } from '../../data/images'
import { PagePad } from '../ui/PagePad'
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
      <div className="grid lg:grid-cols-2">
        <PagePad className="flex items-center py-24 lg:py-32">
          <div className="w-full max-w-lg">
            <Reveal>
              <SectionCopy
                label="Enquire"
                title={
                  <>
                    Some residences are viewed.
                    <br />
                    This one is experienced.
                  </>
                }
                body="For availability, private viewings and bespoke concierge arrangements, enquire privately."
              />
            </Reveal>

            {status === 'success' ? (
              <div
                className="mt-12 text-[1.02rem] leading-relaxed text-ink/80"
                role="status"
                aria-live="polite"
              >
                <p>Thank you. Your enquiry has been prepared.</p>
                <p className="mt-4">
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
              <form className="mt-12" onSubmit={onSubmit} noValidate>
                <Field name="name" label="Name" required />
                <Field name="email" label="Email" type="email" required />
                <Field name="dates" label="Preferred dates or duration" />
                <label className="mb-6 block">
                  <span className="mb-2 block text-[0.68rem] tracking-[0.2em] text-lagoon/80 uppercase">
                    Your enquiry
                  </span>
                  <textarea
                    name="message"
                    rows={5}
                    className="w-full resize-y border-0 border-b border-aqua/50 bg-transparent py-3 text-ink outline-none focus:border-lagoon"
                  />
                </label>
                {status === 'error' ? (
                  <p className="mb-4 text-sm text-ink" role="alert">
                    {error}
                  </p>
                ) : null}
                <button
                  type="submit"
                  className="mt-4 w-full bg-lagoon py-3.5 text-[0.72rem] font-medium tracking-[0.24em] text-white uppercase transition-colors hover:bg-azure"
                >
                  Submit enquiry
                </button>
              </form>
            )}
          </div>
        </PagePad>
        <div className="min-h-[50vh] lg:min-h-full">
          <Photo
            src={photos.poolHigh}
            alt="Pool, palms and the Atlantic from above"
            caption="Private enquiries"
            className="enquire-frame h-full"
            imgClassName="h-full min-h-[50vh] lg:min-h-full"
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
}: {
  name: string
  label: string
  type?: string
  required?: boolean
}) {
  return (
    <label className="mb-8 block">
      <span className="mb-2 block text-[0.68rem] tracking-[0.2em] text-lagoon/80 uppercase">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full border-0 border-b border-aqua/50 bg-transparent py-3 text-ink outline-none focus:border-lagoon"
      />
    </label>
  )
}
