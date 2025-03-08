import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './checkout';

const stripePromise = loadStripe('pk_test_51NpyCxLTNew48I6MP0gdvjvXUKURxazTM5vpM4bZMRUuPWhZuxrgxMW2wnC1G7ttaPUq0f4N9ejgRbmcKvjQAKHA009pS3Y3vS');

const App = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default App;