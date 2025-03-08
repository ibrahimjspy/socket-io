import React, { useState } from 'react';
import { useStripe } from '@stripe/react-stripe-js';
import styles from './styles.module.css';

const CheckoutForm = () => {
    const stripe = useStripe();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('usd');
  const [quantity, setQuantity] = useState(1);

  const handleClick = async () => {
    // Call your backend to create the Checkout Session
    const response = await fetch('http://localhost:3000/api/v1/stripe/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        amount: parseInt(amount, 10),
        currency,
        quantity,
        successUrl: 'http://localhost:3001/success',
        cancelUrl: 'http://localhost:3001/success',
      }),
    });
      
    console.log('response', response);

    const session = await response.json();

    // Redirect to Stripe Checkout
    const result = await stripe?.redirectToCheckout({
        sessionId: session.data.id,
    });

    if (result?.error) {
      console.error(result.error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.checkoutForm}>
        <h2 className={styles.title}>Checkout Form</h2>
        <div className={styles.formGroup}>
          <label className={styles.label}>Product Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Amount (in cents):</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Currency:</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className={styles.select}
          >
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="gbp">GBP</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter quantity"
            min="1"
            className={styles.input}
          />
        </div>
        <button className={styles.checkoutButton} role="link" onClick={handleClick}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CheckoutForm;
