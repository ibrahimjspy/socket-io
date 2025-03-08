import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Load your Stripe publishable key
const stripePromise = loadStripe('pk_test_51QoP08QKGmru98vnPcEkMQgl4NTr57PVGjRR29z3v1DWAjXsxpXuMKuxnjVezmnwGQffClq4KdJlEMv6KVBEWXcK00AGJpWztI');

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

        const fetchClientSecret = async () => {
      try {
    const res = await fetch('http://localhost:4000/api/v1/license/request/stripe/intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerId: 'cus_RhtwEKYg2zzSjq',
      }),
    });
          const data = await res.json();
          console.log('data', data);
        if (data.data.client_secret) {
          setClientSecret(data.data.client_secret);
        } else {
          setError('Failed to fetch client secret.');
        }
      } catch (err) {
        setError('Error fetching client secret.');
      }
    };

  // Fetch the client secret when the component mounts
  useEffect(() => {
    fetchClientSecret();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!stripe || !elements) {
      setError('Stripe has not loaded yet.');
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError('Card Element not found.');
      setLoading(false);
      return;
    }

    // Confirm the card setup using the client secret
    const { error: confirmError, setupIntent } = await stripe.confirmCardSetup(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: { name: 'Customer Name' },
      },
    });

    if (confirmError) {
      setError(confirmError.message as any);
      setLoading(false);
      return;
    }

    console.log('Card verified, PaymentMethod ID:', setupIntent.payment_method);

    // Hardcoded customer ID (replace with real logic in production)
    const customerId = 'cus_RhtwEKYg2zzSjq';

    // Call your API to attach the payment method to the customer
    try {
      const res = await fetch('http://localhost:4000/api/v1/license/request/stripe/attach-payment-method', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId,
          paymentMethodId: setupIntent.payment_method,
        }),
      });
      const result = await res.json();
      if (res.ok) {
        setSuccess('Payment method saved successfully!');
          cardElement.clear();
          fetchClientSecret();
      } else {
        setError(result.error || 'Failed to save payment method.');
      }
    } catch (err) {
      setError('Error saving payment method.');
    }
    setLoading(false);
  };

return (
  <div
    style={{
      maxWidth: '500px',
      margin: '50px auto',
      padding: '40px',
      backgroundColor: '#fff0f6', // a light pink background
      border: '1px solid #ffc0cb',
      borderRadius: '10px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif',
    }}
  >
    <h1
      style={{
        textAlign: 'center',
        color: '#d81b60', // deep pink for the heading
        marginBottom: '30px',
      }}
    >
      Save Your Payment Method
    </h1>

    {error && (
      <p
        style={{
          color: '#e91e63',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '10px',
        }}
      >
        {error}
      </p>
    )}
    {success && (
      <p
        style={{
          color: '#4caf50',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '10px',
        }}
      >
        {success}
      </p>
    )}

    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <div
        style={{
          padding: '10px',
          border: '1px solid #f48fb1',
          borderRadius: '5px',
          backgroundColor: '#ffffff',
        }}
      >
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '18px',
                color: '#424770',
                '::placeholder': { color: '#aab7c4' },
              },
            },
          }}
        />
      </div>
      <button
        type="submit"
        disabled={!stripe || loading}
        style={{
          backgroundColor: '#e91e63',
          color: '#fff',
          border: 'none',
          padding: '12px 0',
          borderRadius: '5px',
          fontSize: '16px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = '#ad1457')
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = '#e91e63')
        }
      >
        {loading ? 'Processing...' : 'Save Payment Method'}
      </button>
    </form>
  </div>
);

}

export default function SetupPaymentPage() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
}
