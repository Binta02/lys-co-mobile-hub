
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { CartProvider } from './components/cart/CartContext'
import { loadStripe } from '@stripe/stripe-js'
import { Elements }     from '@stripe/react-stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <CartProvider>
      <Elements stripe={stripePromise}>
      <App />
      </Elements>
    </CartProvider>
  </BrowserRouter>
);
