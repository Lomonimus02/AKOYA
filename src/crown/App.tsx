import { useState } from 'react'
import { EngineProvider } from './cinema/EngineProvider'
import { MotionProvider } from './cinema/motion'
import { IndexOverlay, SiteHeader } from './chrome/SiteHeader'
import { SiteFooter } from './chrome/SiteFooter'
import { AltitudeRail } from './chrome/AltitudeRail'
import { Story } from './story/Story'

export default function App() {
  const [indexOpen, setIndexOpen] = useState(false)

  return (
    <MotionProvider>
      <EngineProvider>
        <SiteHeader indexOpen={indexOpen} onToggleIndex={() => setIndexOpen((v) => !v)} />
        <IndexOverlay open={indexOpen} onClose={() => setIndexOpen(false)} />
        <AltitudeRail />
        <main>
          <Story />
        </main>
        <SiteFooter />
      </EngineProvider>
    </MotionProvider>
  )
}
