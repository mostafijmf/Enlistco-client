import React, { useState } from 'react';
import useGetUsers from '../../hooks/useGetUsers';
import PageTitle from '../Shared/PageTitle';
import Spinner from '../Shared/Spinner';
import Paypal from './Paypal';
import Stripe from './Stripe/Stripe';

const PaymentOptions = () => {
    const [usersData, loading] = useGetUsers();
    const [openCard, setOpenCard] = useState(false);

    if (loading) {
        return <div className='w-full h-screen flex items-center justify-center'>
            <Spinner></Spinner>
        </div>
    };
    const { amount, paymentSystem } = usersData;


    return (<>
        <PageTitle title='Payment Options'></PageTitle>
        <section className='w-full h-screen flex items-center justify-center'>
            <div style={{ boxShadow: '0 0 50px 2px rgb(0, 0, 0, 0.2 )' }} className='xl:w-1/3 lg:w-2/5 md:w-2/4 sm:w-4/5 w-full mx-2 p-8 rounded-md bg-white'>
                <div className='flex items-center justify-between text-2xl font-medium'>
                    {
                        paymentSystem === 'One time' && <>
                            <h1>One time subscription</h1>
                            <h1>{amount && '$' + amount}</h1>
                        </>
                    }
                    {
                        paymentSystem === 'Each post' && <>
                            <h1>Per post subscription</h1>
                            <h1>{amount && '$' + amount}</h1>
                        </>
                    }
                </div>
                <div className='mt-8'>
                    <h1 className='text-lg font-medium mb-5'>Payment Method</h1>
                    <ul className='list-none'>
                        <li className='flex items-center'>
                            <Paypal usersData={usersData}></Paypal>
                        </li>
                        <li className='flex items-center gap-5 my-5'>
                            <div className='w-full h-px bg-gray-200'/>
                            <span className='text-base uppercase text-gray-400'>or</span>
                            <div className='w-full h-px bg-gray-200'/>
                        </li>
                        <li className='flex items-center'>
                            {
                                openCard ?
                                    <Stripe usersData={usersData}/>
                                    :
                                    <button
                                        onClick={() => setOpenCard(true)}
                                        className='w-full text-lg font-medium text-gray-600 hover:bg-gray-100 border hover:border-gray-100 rounded py-2 my-2'
                                    >
                                        Debit or credit card
                                    </button>
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    </>);
};

export default PaymentOptions;