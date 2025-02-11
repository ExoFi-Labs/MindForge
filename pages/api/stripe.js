// pages/api/stripe.js
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { priceId } = req.body; // Expecting priceId

      // Create a Checkout Session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
          price: priceId, // Use the price ID for the subscription
          quantity: 1,
        }],
        mode: 'subscription',
        success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`, // Ensure this is a valid URL
        cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`, // Ensure this is a valid URL
      });

      // Send back the session ID
      res.status(200).json({ id: session.id });
    } catch (error) {
      console.error('Error creating checkout session:', error); // Log the error
      res.status(400).json({ statusCode: 400, message: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
  }
}

