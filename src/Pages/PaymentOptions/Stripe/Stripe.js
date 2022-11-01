import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY);

const Stripe = ({ usersData }) => {
    
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm usersData={usersData} />
        </Elements>
    );
};

export default Stripe;