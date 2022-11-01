import { CheckIcon, ExclamationIcon } from '@heroicons/react/solid';
import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageTitle from '../Shared/PageTitle';
import emailVerify from './../../images/email-verify/email.png'

const ActivateEmail = () => {
    const { activation_token } = useParams();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        if (activation_token) {
            const activationEmail = async () => {
                await axios.post('https://api.enlistco.co.in/email/activation', { activation_token })
                    .then(res => {
                        setSuccess(res.data.message);
                        setLoading(false);
                    })
                    .catch(err => {
                        err.response.data.message && setError(err.response.data.message);
                        setLoading(false);
                    })
            }
            activationEmail()
        }
    }, [activation_token]);

    return (<>
        <PageTitle title={error ? 'Error - link expired' : 'Verified success'}></PageTitle>
        <div
            className='w-screen h-screen bg-no-repeat bg-auto bg-center bg-white'
            style={{ backgroundImage: `url(${emailVerify})` }}
        >
            <div className='w-full h-full bg-slate-100/70 flex items-center justify-center'>
                <div className='sm:w-96 w-11/12 h-max sm:p-10 p-5 border rounded-md bg-white/50 shadow-lg text-center'>
                    <div className='w-full flex justify-center relative'>
                        {
                            success && <CheckIcon className='absolute sm:-top-20 -top-14 left-auto right-auto w-16 h-16 p-3 rounded-full text-white bg-success shadow-lg'></CheckIcon>
                        }
                        {
                            error && <ExclamationIcon className='absolute sm:-top-20 -top-14 left-auto right-auto w-16 h-16 p-3 rounded-full text-white bg-red-600 shadow-lg'></ExclamationIcon>
                        }
                    </div>
                    <p className='sm:my-5 mt-10 mb-5 font-medium text-gray-500'>
                        {
                            loading ?
                                'Loading...'
                                :
                                <>
                                    {success && success}
                                    {error && error}
                                </>
                        }
                    </p>
                    {
                        success &&
                        <button
                            onClick={() => navigate('/login')}
                            className='btn btn-link min-h-0 h-max p-0 normal-case text-lg font-normal'>
                            Now you can Log in
                        </button>
                    }
                </div>
            </div>
        </div>
    </>);
};

export default ActivateEmail;