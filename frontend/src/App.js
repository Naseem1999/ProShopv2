import React from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'
import HomeScreen from './Screens/HomeScreen'
import { Outlet } from 'react-router-dom'
const App = () => {
  return (
    <>
    <Header/>
    <main className='py-3'>
      <container>
        <Outlet/>
      </container>
    </main>
    <Footer/>
    </>
  )
}

export default App