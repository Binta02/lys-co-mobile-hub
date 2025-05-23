//routes/payments.js
import express from 'express'
import Stripe from 'stripe'
import dotenv from 'dotenv'

dotenv.config()

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
if (!stripeSecretKey) {
  throw new Error('STRIPE_SECRET_KEY is not defined in environment variables')
}
const stripe = new Stripe(stripeSecretKey, { apiVersion: '2022-11-15' })
const router = express.Router()

router.post('/create-payment-intent', async (req, res) => {
  const { amount, email } = req.body

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // montant en centimes
      currency: 'eur',
      receipt_email: email,
    })

    res.send({ clientSecret: paymentIntent.client_secret })
  } catch (err) {
    console.error(err)
    res.status(500).send({ error: 'Échec de la création du paiement' })
  }
})

export default router
