import React, { useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import SocialLogin from './SocialLogin';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import Spinner from '../Shared/Spinner';
import PageTitle from '../Shared/PageTitle';

const Login = () => {
    const emailRef = useRef('');
    const passwordRef = useRef('');

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const [sendPasswordResetEmail, sending, resetError] = useSendPasswordResetEmail(auth);
    const [resetMessage, setResetMessage] = useState(false);
    const [resetErrorMessage, setResetErrorMessage] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    if (resetMessage || resetErrorMessage) {
        setTimeout(() => {
            setResetMessage(false);
            setResetErrorMessage(false);
        }, 5000);
    };


    if (user) {
        return navigate(from, { replace: true });
    };


    const handleSignIn = async event => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        await signInWithEmailAndPassword(email, password);
    };


    const handleReset = async () => {
        const email = emailRef.current.value;
        const validEmail = email.indexOf('@');
        if (validEmail !== -1) {
            await sendPasswordResetEmail(email);
            setResetMessage(true);
        }
        else {
            setResetMessage(false);
            setResetErrorMessage(true);
        };
    };

    return (<>
        <PageTitle title='Login'></PageTitle>
        <div className="h-screen flex justify-center items-center bg-slate-100">
            <div className='lg:w-1/3 mx-4 bg-white sm:px-10 px-5 sm:py-8 py-6 rounded-xl border shadow-lg'>
                <h1 className='text-center text-4xl font-semibold mb-5'>Login</h1>
                <form onSubmit={handleSignIn}>
                    <div>
                        <label htmlFor='email' className='font-medium text-lg'>Email Address <span className='text-orange-600'>*</span></label>
                        <input ref={emailRef} required id='email' type="email" placeholder="Enter your email" className="input text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                    </div>
                    <div className='mt-5'>
                        <label htmlFor='password' className='font-medium text-lg'>Password <span className='text-orange-600'>*</span></label>
                        <input ref={passwordRef} required id='password' type="password" placeholder="Password" className="input text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                    </div>
                    {
                        error && <p className='text-sm text-red-600 mt-3'>Invalid email or password</p>
                    }
                    <div className='mt-6'>
                        <button className='btn btn-primary capitalize text-lg text-white w-full' type="submit">
                            {
                                loading ? <Spinner></Spinner> : 'Login'
                            }
                        </button>
                    </div>
                </form>
                <p className='text-base mt-3'>Don't have an account? <span className='text-blue-600'><Link to="/signUp">Create an account</Link></span></p>

                {
                    resetMessage ?
                        <p className='text-sm text-green-500'>Check Your Email . . .</p> :
                        <>
                            {
                                sending ?
                                    <Spinner></Spinner>
                                    :
                                    <p className='text-sm'>Forget Password?
                                        <button onClick={() => handleReset()} className="text-blue-600 normal-case ml-1">Reset</button>
                                    </p>
                            }
                        </>
                }
                {
                    resetErrorMessage || resetError ?
                        <p className='text-sm text-red-600'>Please provide a valid email.</p> :
                        <p>{resetError}</p>
                }
                <SocialLogin></SocialLogin>
            </div>
        </div>
    </>
    );
};

export default Login;