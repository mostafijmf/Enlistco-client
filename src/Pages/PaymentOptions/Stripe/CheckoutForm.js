import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';


const CheckoutForm = ({ usersData }) => {
    const { email, amount, paymentSystem } = usersData;
    const stripe = useStripe();
    const elements = useElements();
    const [paymentState, setPaymentState] = useState({
        loading: false,
        clientSecret: '',
        transactionId: '',
        success: '',
        error: ''
    });
    const { loading, clientSecret, success, error } = paymentState;

    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    // =================Create-payment-intent=================
    useEffect(() => {
        axios.post('https://api.enlistco.co.in/create-payment-intent', { amount }, {
            method: 'POST',
            headers: {
                'Authorization': localStorage.getItem('user_token')
            }
        })
            .then(res => {
                if (res.data) {
                    setPaymentState({ ...paymentState, clientSecret: res.data.clientSecret })
                }
            })
            .catch(err => { })
    }, [amount]);


    // =================Submit button=================
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        };

        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        setPaymentState({ ...paymentState, loading: true });

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        setPaymentState({ ...paymentState, transactionId: '', error: error?.message || '', success: '' });

        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: email,
                    },
                },
            },
        );

        if (intentError) {
            setPaymentState({ ...paymentState, loading: false, transactionId: '', error: intentError?.message, success: '' });
        }
        else if (paymentIntent) {
            setPaymentState({
                ...paymentState,
                transactionId: paymentIntent.id,
                error: '',
                success: 'Congrats! Your payment is completed.'
            });

            await axios.post('https://api.enlistco.co.in/payment-complete',
                {
                    email: email,
                    paymentSystem,
                    amount,
                    transactionId: paymentIntent.id,
                    paymentMethod: 'stripe'
                },
                {
                    method: 'POST',
                    headers: {
                        'Authorization': localStorage.getItem('user_token')
                    }
                })
                .then(res => {
                    res.data && navigate(from, { replace: true });
                    setPaymentState({ ...paymentState, loading: false })
                })
                .catch(err => {
                    err && setPaymentState({ ...paymentState, loading: false })
                });
        }
    };

    return (
        <form onSubmit={handleSubmit} className='w-full mb-5'>
            <CardElement
                className='border border-gray-400 rounded p-3'
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c5',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            {
                error && <p className='text-red-500 mt-2'>{error}</p>
            }
            {
                success && <p className='text-success mt-2'>{success}</p>
            }
            <div className='text-right mt-5'>
                <button
                    type='submit'
                    className='btn btn-active btn-sm normal-case text-base rounded-full text-white'
                    disabled={loading || !stripe || !clientSecret}
                >
                    Pay ${amount}
                </button>
            </div>
        </form>
    );
};

export default CheckoutForm;