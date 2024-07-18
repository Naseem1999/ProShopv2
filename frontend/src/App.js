import React from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'   
import 'react-toastify/dist/ReactToastify.css'
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
    <ToastContainer/>
    </>
  )
}

export default App