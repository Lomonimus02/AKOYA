import { ENQUIRY_EMAIL } from '../data/copy'

export function SiteFooter() {
  return (
    <footer className="border-t border-rule px-6 py-16 md:px-20">
      <div className="grid gap-12 text-[0.88rem] text-ash md:grid-cols-3">
        <p>
          Floors 46, 47 &amp; 48
          <br />
          Sky Terrace · Miami Beach
        </p>
        <p>
          $40,000 / month
          <br />
          30-day minimum · Furnished
        </p>
        <p>
          <a className="text-bone" href={`mailto:${ENQUIRY_EMAIL}`}>
            {ENQUIRY_EMAIL}
          </a>
        </p>
      </div>
      <p className="mt-16 font-mark text-[0.78rem] tracking-[0.36em] text-bone">AKOYA</p>
    </footer>
  )
}
