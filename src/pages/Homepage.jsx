import React from 'react'
import Herosection from '../shared/services/components/Home/Herosection'
import Contactus from '../shared/services/components/Home/Contactus'
import IndiaJobFairSection from '../shared/services/components/Home/IndiaJobFairSection'
import AboutUs from '../shared/services/components/Home/AboutUs'
import PreviousUpcomingSection from '../shared/services/components/Home/PreviousUpcomingSection'
import Services from '../shared/services/components/Home/Services'


export default function Homepage() {
  return (
    <div>
      <Herosection/>
      <AboutUs/>
      <Services/>
      <IndiaJobFairSection/>
      <PreviousUpcomingSection/>
      <Contactus/>
    </div>
  )
}