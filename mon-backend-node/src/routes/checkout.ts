import { Router } from 'express'
import stripe from '../lib/stripe'

const router = Router()

router.post('/session', async (req, res) => {
  const { lineItems, successUrl, cancelUrl, mode } = req.body

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,    // [{ price: 'price_xxx', quantity: 1 }]
      mode: mode || 'payment',  // 'payment' ou 'subscription'
      success_url: successUrl,
      cancel_url: cancelUrl,
    })
    res.json({ url: session.url })
  } catch (err: any) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
})

export default router
