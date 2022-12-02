import React, { useState } from 'react';
import PageTitle from '../../Shared/PageTitle';
import useGetUsers from '../../../hooks/useGetUsers';
import Spinner from '../../Shared/Spinner';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { ChevronLeftIcon, ExclamationIcon } from '@heroicons/react/solid';
import CountryList from '../../Shared/CountryList';
import axios from 'axios';

const SeekerContactForm = () => {
    const setStep = useOutletContext();
    setStep(0);
    const [usersData, loading] = useGetUsers();
    const navigate = useNavigate();
    const [subLoading, setSubLoading] = useState(false);
    const [error, setError] = useState('');

    if (loading) {
        return <div className="w-full h-screen flex justify-center items-center bg-slate-100">
            <Spinner></Spinner>
        </div>
    };

    const {
        firstName,
        lastName,
        phone,
        address,
        state,
        country,
        zip,
        email
    } = usersData;


    // ===================Submit button===================
    const handleContact = async event => {
        event.preventDefault();
        // setLoading(true);
        const firstName = event.target.firstName.value;
        const lastName = event.target.lastName.value;
        const phone = event.target.phone.value;
        const country = event.target.country.value;
        const address = event.target.address.value;
        const state = event.target.state.value;
        const zip = event.target.zip.value;

        localStorage.setItem('userContact', JSON.stringify({
            firstName,
            lastName,
            phone,
            country,
            address,
            state,
            zip
        }));

        const seeker = true;

        await axios.put('https://api.enlistco.co.in/seeker_data/update',
            { email, seeker },
            {
                method: 'PUT',
                headers: {
                    'Authorization': localStorage.getItem('user_token')
                }
            })
            .then(res => {
                if (res.data) {
                    setSubLoading(false);
                    navigate('/form/seeker-about');
                }
            })
            .catch(err => {
                const { logout, message } = err.response.data;
                if (logout) {
                    setSubLoading(false);
                    localStorage.removeItem('user_token');
                    return navigate('/login');
                }
                setError(message)
                setSubLoading(false);
            });
    };

    return (<>
        <PageTitle title='Contact Form - Dashboard'></PageTitle>
        <div
            className='lg:w-1/2 md:w-3/5 sm:w-11/12 w-full sm:mx-auto mx-2 bg-white sm:px-10 px-5 sm:py-8 py-5 h-max sm:mt-8 mt-6 mb-10 rounded-lg shadow-lg'
        >
            <h1 className='text-center sm:text-3xl text-2xl font-semibold mb-5'>
                Personal information
            </h1>

            <form onSubmit={handleContact}>
                <div className='flex items-center justify-between gap-5'>
                    <label
                        htmlFor='firstName'
                        className='font-medium sm:text-lg text-base'
                    >
                        First name<span className='text-orange-600 ml-1'>*</span>
                        <input
                            defaultValue={firstName}
                            id='firstName'
                            type="text" required
                            placeholder="Enter your first name"
                            className="input font-normal h-11 text-base bg-slate-100 w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md"
                        />
                    </label>
                    <label
                        htmlFor='lastName'
                        className='font-medium sm:text-lg text-base'
                    >
                        Last name<span className='text-orange-600 ml-1'>*</span>
                        <input
                            defaultValue={lastName}
                            id='lastName'
                            type="text" required
                            placeholder="Enter your last name"
                            className="input font-normal h-11 text-base bg-slate-100 w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md"
                        />
                    </label>
                </div>
                <div className='mt-5'>
                    <label
                        htmlFor='phone'
                        className='font-medium sm:text-lg text-base'
                    >
                        Phone<span className='text-orange-600 ml-1'>*</span>
                        <input
                            defaultValue={phone}
                            id='phone'
                            type="number" required
                            placeholder="Ex: +12345678900"
                            className="input font-normal h-11 text-base bg-slate-100 w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md"
                        />
                    </label>
                </div>
                <div className='mt-5'>
                    <label
                        htmlFor='password'
                        className='font-medium sm:text-lg text-base'
                    >
                        Email<span className='text-orange-600 ml-1'>*</span>
                        <input
                            required readOnly
                            value={email}
                            className="input font-normal h-11 text-base bg-slate-100 w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md"
                        />
                    </label>
                </div>
                <div className='mt-5'>
                    <label
                        htmlFor='address'
                        className='font-medium sm:text-lg text-base'
                    >
                        Street address<span className='text-orange-600 ml-1'>*</span>
                        <input
                            defaultValue={address}
                            id='address'
                            type="text" required
                            placeholder="Your address"
                            className="input font-normal h-11 text-base bg-slate-100 w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md"
                        />
                    </label>
                </div>
                <div className='mt-5'>
                    <label
                        htmlFor='state'
                        className='font-medium sm:text-lg text-base'
                    >
                        City / State<span className='text-orange-600 ml-1'>*</span>
                        <input
                            defaultValue={state}
                            id='state'
                            type="text" required
                            placeholder="Your city / state"
                            className="input font-normal h-11 text-base bg-slate-100 w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md"
                        />
                    </label>
                </div>
                <div className='flex items-center justify-between gap-5 mt-5'>
                    <label
                        htmlFor='country'
                        className='font-medium sm:text-lg text-base'
                    >
                        Country<span className='text-orange-600 ml-1'>*</span>
                        <select
                            defaultValue={country}
                            required
                            id='country'
                            className="select font-normal bg-slate-100 min-h-0 h-11 w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md"
                        >
                            <option defaultValue=''>Select country</option>
                            <CountryList></CountryList>
                        </select>
                    </label>
                    <label
                        htmlFor='zip'
                        className='font-medium sm:text-lg text-base'
                    >
                        Zip code<span className='text-orange-600 ml-1'>*</span>
                        <input
                            defaultValue={zip}
                            id='zip'
                            type="number" required
                            placeholder="Zip code"
                            className="input font-normal h-11 text-base bg-slate-100 w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md"
                        />
                    </label>
                </div>
                {
                    error && <p className='text-sm text-red-600 mt-3 flex items-center gap-1'>
                        <ExclamationIcon className='w-4 h-4'></ExclamationIcon>
                        {error}
                    </p>
                }
                <div className='mt-10 flex sm:flex-row flex-col-reverse justify-between gap-4'>
                    <div
                        onClick={() => navigate(-1)}
                        className='sm:w-max w-full btn btn-outline btn-primary px-6 gap-2 normal-case sm:text-lg text-base hover:text-white h-11 min-h-0'
                    >
                        <ChevronLeftIcon className='w-6 h-6 inline-block' /> Back
                    </div>
                    <button
                        type='submit'
                        disabled={subLoading}
                        className='sm:w-max w-full btn btn-primary px-6 normal-case sm:text-lg text-base text-white h-11 min-h-0'
                    >
                        {
                            subLoading ?
                                <span className='px-14'><Spinner></Spinner></span>
                                : 'Save and continue'
                        }
                    </button>
                </div>
            </form>
        </div>
    </>
    );
};

export default SeekerContactForm;