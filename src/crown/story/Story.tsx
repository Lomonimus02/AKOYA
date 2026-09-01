import { photos } from '../data/images'
import { Stage, Still } from '../frame/Stage'
import { PrivateLetter } from '../letter/PrivateLetter'

const floors = [
  { mark: '48', line: 'Office, and a Sky Terrace for this floor alone.' },
  { mark: '47', line: 'Living behind curved glass — ocean, bay, skyline.' },
  { mark: '46', line: 'Three private suites. Five bathrooms.' },
  { mark: '00', line: 'A Beach House beside the pool and the sand.' },
]

export function Story() {
  return (
    <>
      <Stage
        id="arrive"
        src={photos.living}
        alt="Living room behind curved glass, looking over Miami at dusk"
        position="50% 48%"
        priority
      >
        <h1 className="max-w-[16ch] font-display text-[clamp(3rem,7vw,7.2rem)] leading-[0.92] text-bone">
          A private
          <span className="mt-1 block italic md:ml-[14vw]">residence</span>
          <span className="mt-1 block text-[0.72em]">above Miami Beach</span>
        </h1>
        <p className="mt-10 flex items-center gap-5 text-[0.92rem] text-bone/70">
          <span className="hidden h-px w-12 bg-gilt md:inline-block" />
          $40,000 a month · thirty days · 46–48
        </p>
      </Stage>

      <section className="relative overflow-hidden px-6 py-28 md:px-20 md:py-36">
        <p
          aria-hidden
          className="pointer-events-none absolute top-[42%] right-[-4%] -translate-y-1/2 font-mark text-[26vw] leading-none font-semibold text-bone/[0.07] select-none"
        >
          46–48
        </p>
        <div className="relative max-w-3xl">
          <h2 className="font-display text-[clamp(2.4rem,5vw,4.4rem)] leading-[1.05] text-bone">
            Three floors.
            <br />
            <span className="italic">Two worlds.</span>
          </h2>
          <p className="mt-8 max-w-[38ch] text-[1.05rem] leading-[1.85] text-ash">
            The penthouse occupies 46, 47 and 48 of Akoya. Furnished. Private. Monthly. The Beach
            House at the water is part of the same residence.
          </p>
          <div className="mt-20 flex gap-10 md:gap-16">
            <div className="stave hidden self-stretch md:block" />
            <ul className="flex-1 space-y-12">
              {floors.map((floor) => (
                <li key={floor.mark} className="grid grid-cols-[5.5rem_1fr] items-baseline gap-8">
                  <span className="font-mark text-[2.6rem] leading-none font-semibold text-gilt">
                    {floor.mark}
                  </span>
                  <span className="pt-2 text-[1.05rem] leading-relaxed text-bone/85">{floor.line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="residence" className="relative scroll-mt-20 min-h-dvh bg-dusk">
        <Still
          src={photos.bedroomOcean}
          alt="Ocean-view suite with the Atlantic beyond the glass"
          position="50% 42%"
          className="h-[100dvh] min-h-[32rem] md:w-[80%]"
        />
        <div className="px-6 py-14 md:absolute md:bottom-[11%] md:left-[56%] md:w-[30rem] md:px-0 md:py-0 md:drop-shadow-[0_18px_50px_rgba(16,14,12,0.72)]">
          <p className="font-mark text-[6.5rem] leading-none font-semibold text-gilt">46</p>
          <h2 className="-mt-2 font-display text-[clamp(2.4rem,3.6vw,3.4rem)] italic leading-[1.02] text-bone">
            The suites
          </h2>
          <p className="mt-5 max-w-[26ch] bg-dusk/80 px-3 py-3 text-[1.02rem] leading-[1.8] text-ash">
            Three bedrooms. Five bathrooms. Marriott mattresses. The ocean stays in the room.
          </p>
        </div>
      </section>

      <section className="relative min-h-dvh bg-dusk">
        <Still
          src={photos.officeAlt}
          alt="Private office at sunset, looking over the bay"
          position="46% 28%"
          className="h-[100dvh] min-h-[32rem] md:ml-auto md:w-[80%]"
        />
        <div className="px-6 py-14 md:absolute md:bottom-[11%] md:left-[6%] md:w-[28rem] md:px-0 md:py-0 md:drop-shadow-[0_18px_50px_rgba(16,14,12,0.72)]">
          <p className="font-mark text-[6.5rem] leading-none font-semibold text-gilt">48</p>
          <h2 className="-mt-2 font-display text-[clamp(2.4rem,3.6vw,3.4rem)] italic leading-[1.02] text-bone">
            The office,
            <br />
            the Sky Terrace
          </h2>
          <p className="mt-5 max-w-[26ch] bg-dusk/80 px-3 py-3 text-[1.02rem] leading-[1.8] text-ash">
            A glass corner at last light. The terrace on this floor is private to the residence.
          </p>
        </div>
      </section>

      <Stage
        id="beach"
        src={photos.aerialCabana}
        alt="Aerial view of the beach, pool deck and Akoya"
        position="30% 46%"
      >
        <h2 className="font-display text-[clamp(2.4rem,5vw,4.6rem)] leading-[1.02] text-bone">
          Residence in the sky.
          <br />
          <span className="italic">Beach House below.</span>
        </h2>
      </Stage>

      <section className="bg-dusk">
        <Still
          src={photos.poolBeach}
          alt="Pool deck, cabanas and the beach beyond"
          position="50% 58%"
          className="h-[min(88vh,46rem)]"
          reveal={false}
        />
        <div className="grid items-end gap-12 px-6 py-20 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] md:gap-20 md:px-20 md:py-28">
          <Still
            src={photos.beachHouse}
            alt="Interior of the private Beach House"
            position="50% 36%"
            className="aspect-[3/4] max-h-[34rem]"
          />
          <p className="max-w-[38ch] pb-2 text-[1.08rem] leading-[1.85] text-ash">
            The Beach House sits beside the pool: living, kitchenette, bathroom, television and
            Wi-Fi. The Atlantic is at the door of the residence.
          </p>
        </div>
      </section>

      <section id="terms" className="relative scroll-mt-20 min-h-dvh bg-dusk">
        <Still
          src={photos.facade}
          alt="Akoya from the street, palms at the entrance"
          position="50% 70%"
          className="h-[100dvh] min-h-[36rem] md:w-[70%]"
        />
        <div className="px-6 py-16 md:absolute md:top-1/2 md:right-[5%] md:w-[min(34rem,40%)] md:-translate-y-1/2 md:px-0 md:py-0">
          <div className="bg-stone px-8 py-12 text-dusk md:px-12 md:py-16">
            <p className="font-mark text-[clamp(3.6rem,8vw,6.4rem)] leading-none font-semibold">
              $40,000
            </p>
            <p className="mt-5 text-[0.95rem] text-dusk/60">
              A month · thirty days · furnished private residence
            </p>
            <p className="mt-10 max-w-[34ch] text-[1.02rem] leading-[1.8] text-dusk/80">
              Three bedrooms. Five bathrooms. Private rooftop. Private Beach House. Three parking
              spaces. Miami Beach without the permanence of ownership.
            </p>
          </div>
        </div>
      </section>

      <PrivateLetter />
    </>
  )
}
