import React from 'react'
import Navpage from './Navpage'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

export default function Main() {
  return (
    <div>
      <Navpage/>
    <main>
        <Outlet/>
    </main>
    <Footer/>
    </div>
  )
}
