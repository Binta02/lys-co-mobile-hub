// src/index.ts
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import Stripe from 'stripe'

dotenv.config()

const app = express()
app.use(cors({ origin: 'http://localhost:5173' /* ton front */ }))
app.use(express.json())

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
})

// 1) Paiement One-Shot (Payment Intent)
app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency = 'eur' } = req.body

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      // tu peux ajouter metadata, description, receipt_email, etc.
    })

    res.json({ clientSecret: paymentIntent.client_secret })
  } catch (err: any) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
})

// 2) Session Checkout (paiement ou abonnement)
app.post('/create-checkout-session', async (req, res) => {
  try {
    const { priceId, mode, successUrl, cancelUrl } = req.body
    // mode = 'payment' ou 'subscription'

    const session = await stripe.checkout.sessions.create({
      mode,
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl,
    })

    res.json({ sessionUrl: session.url })
  } catch (err: any) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`⚡️ Backend Stripe démarré sur http://localhost:${PORT}`)
})
