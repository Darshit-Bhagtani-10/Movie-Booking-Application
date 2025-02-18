import React from 'react'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import PaymentSuccessful from './Layout/MyTicket'
import PaymentFailedPage from './Layout/Paymentfailed'
import PaymentSuccessfulPage from './Layout/PaymentSuccessful'
import PaymentLayout from './Layout/PaymentOption'
import Buyticket from './Layout/BuyTicket'
import BuffetPage from './Layout/BuffetPage'
import IndexLayout from './Layout/IndexLayout'
import SignOutLayout from './Layout/SingUpPage'
import SignInPage from './Layout/SIgnIn'
import HomeLayout from './Layout/Home'
import MovieDetailsPage from './Layout/MovieDetails'
import CheckoutPage from './Layout/Checkout'
function App() {
  return (
     <div>
     <Router>
       <Routes>
        <Route path='/home' element={<HomeLayout/>} />
        <Route path='/moviedetail/:movieId' element={<MovieDetailsPage/>} /> 
         <Route path='/index' element={<IndexLayout/>} />
         <Route path="/MyTicket" element={<PaymentSuccessful />} />
         <Route path='/paymentfailed' element={<PaymentFailedPage />} />
         <Route path='/paymentSuccessful' element={<PaymentSuccessfulPage/>} />
         <Route path='/paymentOption' element={<PaymentLayout/>} />
         <Route path="/buyticket/:movieId" element={<Buyticket />} />
         <Route path='/popcorn' element={<BuffetPage/>} />
         <Route path='/signout' element={<SignOutLayout/>} />
         <Route path='/' element={<SignInPage/>} />
         <Route path='/checkout' element={<CheckoutPage/>} /> 
         
       </Routes>
       </Router>

    </div>
  )
}

export default App