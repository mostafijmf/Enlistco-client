import { ExclamationCircleIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { useSendEmailVerification } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Spinner from '../Shared/Spinner';

const EmailVerify = () => {
    const [sendEmailVerification, sending, error] = useSendEmailVerification(auth);
    const [sentMsg, setSentMsg] = useState('');
    const [againMsg, setAgainMsg] = useState("");
    const [reload, setReload] = useState("");


    useEffect(() => {
        if (sentMsg) {
            setTimeout(() => {
                setSentMsg('')
                setAgainMsg("Didn't recieve email, Send again!");
                setReload("After verified, reload this page");
            }, 5000);
        }
    }, [sentMsg]);

    const handleSendEmail = async () => {
        await sendEmailVerification();
        setSentMsg('Email sent succesfully, check inbox or spam folder');
        setTimeout(() => {
            setReload("After verified, reload this page");
        }, 6000);
    }

    return (
        <section className="fixed top-0 left-0 z-10 w-full h-screen bg-slate-100 flex justify-center items-center">
            <div className='lg:w-2/5 md:w-3/5 sm:w-4/5 w-full p-10 rounded-lg shadow-md border hover:shadow-lg bg-white h-max text-center'>
                <h3 className='text-3xl font-medium mb-3'>Verify your email</h3>
                <p className='text-base'>Verify your email for identification</p>
                <div className="mt-8">
                    {
                        error && <p className='text-sm text-red-600 mb-3 flex items-center justify-center gap-1'>
                            <ExclamationCircleIcon className='w-4 h-4 inline-block'></ExclamationCircleIcon>Too many requests
                        </p>
                    }
                    {
                        !error && sentMsg && <p className='text-sm text-success mb-3 flex items-center justify-center gap-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>{sentMsg}
                        </p>
                    }
                    {
                        !error && againMsg && <p className='text-sm mb-3'>{againMsg}
                        </p>
                    }
                    <button
                        className='btn btn-primary text-base hover:text-white min-h-0 h-11 normal-case sm:w-max w-full'
                        onClick={handleSendEmail}>
                        {
                            sending ? <Spinner></Spinner> : againMsg ? 'Send again!' : 'Verify email'
                        }
                    </button>
                    {
                        reload && <p className='text-sm text-gray-500 mt-3'>{reload}
                        </p>
                    }
                </div>
            </div>
        </section>
    );
};

export default EmailVerify;