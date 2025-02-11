import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';

// Load your Stripe publishable key from an environment variable or your config file
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleCheckout = async () => {
    setLoading(true);
    setMessage(null);

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId: 'price_1Pi9UdClTxcM5vvL74WZeecd', // Use the correct price ID
      }),
    });

    const text = await response.text(); // Get the response as text
    console.log('Response:', text); // Log the raw response

    try {
      const session = JSON.parse(text); // Try to parse the response as JSON
      if (response.ok) {
        const { error } = await stripe.redirectToCheckout({ sessionId: session.id });
        if (error) {
          console.warn('Error redirecting to checkout:', error);
          setMessage('Failed to redirect to checkout.');
        }
      } else {
        setMessage('Failed to create checkout session.');
      }
    } catch (error) {
      console.error('Error parsing JSON:', error);
      setMessage('Error parsing response: ' + text); // Show the raw response in the message
    }

    setLoading(false);
  };

  return (
    <div className="subscription-container">
      <h1>Subscribe to Our Service</h1>
      <p>Join us for just $9.99/month and enjoy exclusive benefits!</p>
      <button onClick={handleCheckout} disabled={loading}>
        {loading ? "Processing..." : "Subscribe Now"}
      </button>
      {message && <div>{message}</div>}
    </div>
  );
};

const SubscriptionPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default SubscriptionPage;
