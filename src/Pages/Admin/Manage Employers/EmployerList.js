import { XIcon } from '@heroicons/react/solid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGetAllPost from '../../../hooks/useGetAllPost'
import Spinner from '../../Shared/Spinner';

const EmployerList = ({ emp, index }) => {
    const { _id, firstName, lastName, admin, email, subscription } = emp;
    const [openDelete, setOpenDelete] = useState('');
    const [dLoading, setDLoading] = useState(false);

    const [allPost] = useGetAllPost();
    const jobPost = allPost.filter(p => p.employerEmail === email);
    const [getPayments, setGetPayments] = useState([]);
    const amount = getPayments.filter(f => f.email === email);
    let totalAmount;
    amount.map(a => {
        totalAmount = a.amount * amount.length
    });

    const company = jobPost[0]?.company;
    const [openModal, setOpenModal] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // ================Get payments================
    useEffect(() => {
        axios.get('https://api.enlistco.co.in/payment-complete',
            {
                method: 'GET',
                headers: {
                    'Authorization': localStorage.getItem('user_token')
                }
            })
            .then(res => {
                setGetPayments(res.data)
            })
            .catch(err => {
                const { logout, message } = err.response.data;
                if (logout) {
                    localStorage.removeItem('user_token');
                    return navigate('/login');
                }
            });
    }, [getPayments, navigate]);


    // ================Delete employer button================
    const handleDelete = async email => {
        setDLoading(true);
        await axios.delete(`https://api.enlistco.co.in/admin_delete/${email}`, {
            method: 'DELETE',
            headers: {
                'Authorization': localStorage.getItem('user_token')
            }
        })
            .then(res => {
                setOpenDelete(!openDelete);
                setDLoading(false);
            })
            .catch(err => {
                setDLoading(false);
                if (err?.response?.data?.logout) {
                    localStorage.removeItem('user_token');
                    return navigate('/login');
                }
            });
    };

    // ================Make payment required================
    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);
        const paymentSystem = e.target.payment_system.value;
        const amount = e.target.amount.value;
        const subscription = 'required';

        // ================Send data to database================
        await axios.put(`https://api.enlistco.co.in/payment_required/${openModal}`,
            { paymentSystem, amount, subscription },
            {
                method: 'PUT',
                headers: {
                    'Authorization': localStorage.getItem('user_token')
                }
            })
            .then(res => {
                if (res) {
                    setLoading(false);
                    setOpenModal('')
                }
            })
            .catch(err => {
                setLoading(false);
                setOpenModal('');
                const { logout, message } = err.response.data;
                if (logout) {
                    localStorage.removeItem('user_token');
                    return navigate('/login');
                }
            });
    };

    return (<>
        <tbody className='border-b'>
            <tr>
                <td className='py-2 text-sm'>{index + 1}</td>
                <td className='py-2 text-sm'>
                    <div className='flex items-center gap-2'>
                        <button
                            onClick={() => navigate('/dashboard/manage-employers/details', {
                                state: { emp, company }
                            })}
                            className='text-base text-primary font-medium hover:text-emerald-600'
                        >
                            {firstName} {lastName}
                        </button>
                    </div>
                    <p className='text-gray-500'>{email}</p>
                </td>
                <td className='py-2 text-sm'>{company}</td>
                <td className='py-2 text-sm'>{jobPost.filter(f => f.postType === 'free').length}</td>
                <td className='py-2 text-sm'>{jobPost.filter(f => f.postType === 'paid').length}</td>
                <td className='py-2 text-sm'>{totalAmount}</td>
                <td className='py-2 text-sm'>{
                    !admin && <>{
                        (subscription === 'required') ||
                            (subscription === 'paid') || (subscription === 'per_post') ?
                            <button
                                onClick={() => setOpenModal(_id)}
                                className='btn btn-accent btn-outline normal-case text-base font-medium min-h-0 h-9 px-3 hover:text-white/95 rounded'
                            >Edit payment
                            </button>
                            :
                            <button
                                onClick={() => setOpenModal(_id)}
                                className='btn btn-accent normal-case text-base font-medium min-h-0 h-9 px-3 text-white/95 rounded'
                            >Make required
                            </button>
                    }</>
                }</td>
                <td className='py-2 text-sm'>
                    {
                        !admin &&
                        <svg
                            onClick={() => setOpenDelete(email)}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24"
                            strokeWidth="2" stroke="currentColor"
                            className='w-6 h-6 text-gray-500 hover:text-red-600 duration-300 cursor-pointer mx-auto'
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    }
                </td>
            </tr>
        </tbody >

        {/* ====================Payment Modal==================== */}
        {
            openModal && <div className='fixed top-0 left-0 z-30 w-full h-screen bg-black/60 flex items-center justify-center'>
                <form
                    onSubmit={handlePayment}
                    className='lg:w-2/5 md:w-3/5 sm:w-4/5 w-full mx-2 bg-white p-8 rounded-md relative'>
                    <XIcon
                        onClick={() => setOpenModal('')}
                        className='absolute top-5 right-5 w-9 h-9 p-1 text-gray-500 hover:bg-slate-200 hover:text-gray-600 rounded-full duration-300'>
                    </XIcon>
                    <div>
                        <p className='font-medium text-base min-w-max'>
                            Payment system :
                        </p>
                        <div className='flex flex-col ml-3 mt-2 gap-2'>
                            <div className='flex items-center gap-2'>
                                <input
                                    required
                                    type="radio"
                                    id="one-time"
                                    name="payment_system"
                                    value="One time"
                                    className='radio w-5 h-5' />
                                <label htmlFor="one-time" className='text-base cursor-pointer'>One time</label>
                            </div>
                            <div className='flex items-center gap-2'>
                                <input
                                    required
                                    type="radio"
                                    id="each-post"
                                    name="payment_system"
                                    value="Each post"
                                    className='radio w-5 h-5' />
                                <label htmlFor="each-post" className='text-base cursor-pointer'>Each post</label>
                            </div>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <label htmlFor='number' className='font-medium text-base min-w-max'>
                            Amount :
                        </label>
                        <input
                            required
                            id='number'
                            type="number"
                            name='amount'
                            placeholder="Enter amount $"
                            className="input text-base bg-slate-100 min-h-0 h-11 w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md"
                        />
                    </div>
                    <div className='mt-8 text-right'>
                        <button
                            disabled={loading}
                            className='sm:w-max w-full btn btn-primary px-6 normal-case sm:text-lg text-base text-white h-11 min-h-0'
                            type="submit">
                            {loading ? <Spinner></Spinner> : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        }

        {/* ====================Delete User Modal==================== */}
        {
            openDelete &&
            <div className="fixed w-screen h-screen bg-black/60 top-0 left-0 z-30 flex items-center justify-center">
                <div className="modal-box text-center bg-secondary">
                    <h3 className="font-medium text-2xl text-white">Are you sure!</h3>
                    <p className="text-lg py-4 text-gray-300">Do you want to delete it?</p>
                    <div className="flex justify-center gap-10 mt-5">
                        <button
                            onClick={() => setOpenDelete('')}
                            className="btn btn-primary text-white min-h-0 h-10 px-10"
                        >
                            No
                        </button>

                        <button onClick={() => handleDelete(openDelete)}
                            disabled={dLoading}
                            className="btn btn-outline text-white hover:text-secondary border-white hover:bg-white min-h-0 h-10 px-10 ">
                            {dLoading ? <Spinner></Spinner> : 'Yes'}
                        </button>

                    </div>
                </div>
            </div>
        }
    </>
    );
};

export default EmployerList;