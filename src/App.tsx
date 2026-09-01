import { Hero } from './components/sections/Hero'
import { DiscoverResidence } from './components/sections/DiscoverResidence'
import { RetreatBedrooms } from './components/sections/RetreatBedrooms'
import { ExperienceLiving } from './components/sections/ExperienceLiving'
import { AscendSky } from './components/sections/AscendSky'
import { DescendBeachHouse } from './components/sections/DescendBeachHouse'
import { EnquireForm } from './components/sections/EnquireForm'
import { IndulgeAmenities } from './components/sections/IndulgeAmenities'
import { RelaxServices } from './components/sections/RelaxServices'
import { UnderstandPricing } from './components/sections/UnderstandPricing'
import { FloorNav } from './components/layout/FloorNav'
import { ScrollProgress } from './components/layout/ScrollProgress'
import { SiteFooter } from './components/layout/SiteFooter'
import { SiteHeader } from './components/layout/SiteHeader'

export default function App() {
  return (
    <>
      <ScrollProgress />
      <SiteHeader />
      <FloorNav />
      <main>
        <Hero />
        <DiscoverResidence />
        <RetreatBedrooms />
        <ExperienceLiving />
        <AscendSky />
        <DescendBeachHouse />
        <IndulgeAmenities />
        <RelaxServices />
        <UnderstandPricing />
        <EnquireForm />
      </main>
      <SiteFooter />
    </>
  )
}
