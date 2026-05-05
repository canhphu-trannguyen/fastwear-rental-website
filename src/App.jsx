import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import AboutUsPage from './pages/AboutUsPage'
import CartPage from './pages/CartPage'
import CatalogPage from './pages/CatalogPage'
import CheckoutPage from './pages/CheckoutPage'
import HomePage from './pages/HomePage'
import OrderSuccessPage from './pages/OrderSuccessPage'
import ProductDetailPage from './pages/ProductDetailPage'
import RentalPolicyPage from './pages/RentalPolicyPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/products/categories/:category" element={<CatalogPage />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
          <Route path="/rental-policy" element={<RentalPolicyPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
