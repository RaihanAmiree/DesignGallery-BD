import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Shop from './Pages/Shop';
import Contact from './Pages/Contact';
import About from './Pages/About';
import Cart from './Pages/Cart';
import Wishlist from './Pages/Wishlist';
import Footer from './Components/Footer';
import ScrollToTop from './ScrollToTop';
import ProductDetails from './Pages/ProductDetails';
import NotFoundPage from './Pages/404';
import BillingPage from './Pages/BillingPage';
import OrderConfirmation from './Pages/OrderConfirmation';



const App = () => {
  return (
    <Router>

      <ScrollToTop></ScrollToTop>
      <Navbar></Navbar>

      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/shop" element={<Shop />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/about" element={<About />} />
  <Route path="/wishlist" element={<Wishlist />} />
  <Route path="/cart" element={<Cart />} />
  <Route path="/product/:id" element={<ProductDetails />} />
  <Route path="/billingpage" element={<BillingPage />} />
  <Route path="/order-confirmation" element={<OrderConfirmation />} />


  <Route path="*" element={<NotFoundPage />} />
</Routes>

      <Footer></Footer>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </Router>
  )
}

export default App
