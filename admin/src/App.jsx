import React from 'react'
import { Route,Routes, useLocation } from 'react-router-dom'
import Home from './components/Home'
import AllOrders from './components/AllOrders'
import AllProducts from './components/AllProducts'
import AllCategory from './components/AllCategory'

const App = () => {
  return (
   <>

    <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/all-orders' element={<AllOrders/>}/>
     <Route path="/all-products" element={<AllProducts />} />
     <Route path="/all-categories" element={<AllCategory/>} />
      </Routes>
  
    </>
  )
}

export default App