import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Paypal = ({ usersData }) => {
    const { email, amount, paymentSystem } = usersData;
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    const handleApprove = async (data, transactionId) => {
        if (data) {
            transactionId && setSuccess('Congrats! Your payment is completed.');
            await axios.post('https://api.enlistco.co.in/payment-complete',
                {
                    email: email,
                    paymentSystem,
                    amount,
                    transactionId: transactionId,
                    paymentMethod: 'paypal'
                },
                {
                    method: 'POST',
                    headers: {
                        'Authorization': localStorage.getItem('user_token')
                    }
                })
                .then(res => {
                    res.data && navigate(from, { replace: true });
                })
                .catch(err => {});
        }

    };
    return (
        <div style={{ width: "100%" }}>
            <PayPalScriptProvider
                options={{
                    "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
                    components: "buttons",
                    currency: "USD"
                }}
            >
                <PayPalButtons
                    style={{
                        layout: "horizontal",
                        color: 'silver'
                    }}
                    fundingSource={'paypal'}
                    onClick={(data, actions) => {
                        const hasAlreadyBoughtCourse = false;
                        if (hasAlreadyBoughtCourse) {
                            return actions.reject();
                        } else {
                            return actions.resolve();
                        }
                    }}
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    description: paymentSystem,
                                    amount: {
                                        value: amount,
                                    },
                                },
                            ],
                        });
                    }}
                    onApprove={async (data, actions) => {
                        const order = await actions.order.capture();
                        const transactionId = order.purchase_units[0].payments.captures[0].id;
                        handleApprove(data, transactionId)
                    }}
                    onCancel={() => { }}
                    onError={(err) => {
                        setError("Something went wrong!");
                    }}
                />
                {
                    error && <p className='text-red-500 mt-1'>{error}</p>
                }
                {
                    success && <p className='text-success mt-1'>{success}</p>
                }
            </PayPalScriptProvider>
        </div>
    );
};

export default Paypal;