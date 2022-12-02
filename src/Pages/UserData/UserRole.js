import { ExclamationIcon } from '@heroicons/react/solid';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../Shared/PageTitle';
import Spinner from '../Shared/Spinner';

const UserRole = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isNavigate, setIsNavigate] = useState(false);
    const [error, setError] = useState('');

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    useEffect(() => {
        if (!userInfo) {
            return navigate('/user-information');
        }
    }, [navigate, userInfo]);

    // ================User info send button================
    const handleEntry = async entry => {
        setLoading(true)
        const admin = false;
        const seeker = entry === 'seeker' ? true : false;
        const employer = entry === 'employer' ? true : false;
        const newEntry = false

        if (userInfo) {
            await axios.put('https://api.enlistco.co.in/users/newEntry',
                { admin, seeker, employer, newEntry, userInfo }, {
                method: 'PUT',
                headers: {
                    'Authorization': localStorage.getItem('user_token')
                }
            })
                .then(res => {
                    if (res) {
                        if (seeker) {
                            navigate('/form/seeker-contact');
                            localStorage.removeItem('userInfo');
                        }
                        employer && setIsNavigate(!isNavigate);
                        setLoading(false);
                    }
                })
                .catch(err => {
                    setError(err.response.data.message);
                    setLoading(false)
                });
        }
    };


    return (<>
        <PageTitle title='New Entry'></PageTitle>
        <section className='h-screen w-full bg-slate-100 flex items-center justify-center'>
            {
                loading &&
                <div className='fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-black/50 z-10'>
                    <Spinner></Spinner>
                </div>
            }
            {
                isNavigate &&
                <div className="fixed w-screen h-screen top-0 left-0 z-20 flex items-center justify-center bg-black/50 ">
                    <div className="modal-box text-center bg-secondary">
                        <h3 className="text-2xl py-4 text-white">Do you want to post a job?</h3>
                        <div className="flex justify-center gap-10 my-5">
                            <button
                                onClick={() => {
                                    navigate('/job-form/contact');
                                    localStorage.removeItem('userInfo');
                                }}
                                className="btn btn-primary normal-case tracking-wider text-white min-h-0 h-11 px-10 ">
                                Now
                            </button>
                            <button
                                onClick={() => {
                                    navigate('/');
                                    localStorage.removeItem('userInfo');
                                }}
                                className="btn btn-outline normal-case tracking-wider text-white hover:bg-white hover:border-white hover:text-secondary min-h-0 h-11 px-10 ">
                                Later
                            </button>
                        </div>
                    </div>
                </div>
            }
            <div className='lg:w-2/5 md:w-1/2 sm:w-4/5 w-full mx-2 bg-white shadow-2xl px-10 py-8 rounded-lg'>
                <h1 className='text-4xl text-gray-500 mb-10 text-center'>Welcome!</h1>
                <h4 className='text-xl font-medium text-gray-500'>What is your role?</h4>
                <button
                    onClick={() => handleEntry('seeker')}
                    className='btn btn-outline btn-primary hover:text-white w-full mt-5 normal-case tracking-wide text-xl'>Job seeker
                </button>
                <button
                    onClick={() => handleEntry('employer')}
                    className='btn btn-outline btn-primary hover:text-white w-full mt-5 normal-case tracking-wide text-xl'>Employer
                </button>
                {
                    error &&
                    <p className='text-sm text-red-600 mt-3 flex items-center gap-1'>
                        <ExclamationIcon className='w-4 h-4'></ExclamationIcon>
                        {error}
                    </p>
                }
            </div>
        </section>
    </>);
};

export default UserRole;