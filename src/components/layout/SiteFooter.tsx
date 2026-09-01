import { ENQUIRY_EMAIL } from '../../data/copy'
import { PagePad } from '../ui/PagePad'

export function SiteFooter() {
  return (
    <footer className="footer-wash">
      <PagePad className="py-16 md:py-20 lg:py-24">
        <p className="font-display text-2xl tracking-[0.42em] text-lagoon">AKOYA</p>
        <p className="mt-3 text-[0.68rem] tracking-[0.28em] text-lagoon/70 uppercase">
          Miami Beach · Private enquiries only
        </p>
        <a
          href={`mailto:${ENQUIRY_EMAIL}`}
          className="mt-6 inline-block text-[0.85rem] text-ink/70 transition-colors hover:text-lagoon"
        >
          {ENQUIRY_EMAIL}
        </a>
        <p className="mt-10 text-[0.65rem] tracking-[0.2em] text-ink/35 uppercase">
          Akoya Penthouse · The Suites · Living · Sky Terrace
        </p>
      </PagePad>
    </footer>
  )
}
