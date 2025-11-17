import React from 'react'
import { Route,Routes, useLocation } from 'react-router-dom'
import Home from './components/Home'
import Kurta from './components/Kurta'
import Lehenga from './components/Lehenga'
import Coords from './components/Coords'
import Login from './components/Login'
import Register from './components/register'
import Header from './components/Header'
import ProductDetail from './components/ProductDetail'
import CartPage from './components/CartPage'
import WishlistPage from './components/WishlistPage'
import OrderDetails from './components/OrderDetails'


 
const App = () => {
  return (
   <>

    <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/kurta' element={<Kurta/>}/>
     <Route path='/lehenga' element={<Lehenga/>}/>
     <Route path='/co-ords' element={<Coords/>}/> 
     <Route path='/login' element={<Login/>}/>
     <Route path='/register' element={<Register/>}/>
       <Route path="/product/:id" element={<ProductDetail />} />
       <Route path="/cart" element={<CartPage />} />
       <Route path="/wishlist"element={<WishlistPage/>}/>
       <Route path="/order-details" element={<OrderDetails />} />

      </Routes>
  
    </>
  )
}

export default App