import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import SocialLogin from './SocialLogin';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import Spinner from '../Shared/Spinner';
import { useEffect } from 'react';
import PageTitle from '../Shared/PageTitle';

const SignUp = () => {
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const confirmPasswordRef = useRef('');
    const [passMessage, setPassMessage] = useState('');
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/new-entry');
        };
    }, [user, navigate]);

    const handleSignUp = async event => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;
        if (password === confirmPassword) {
            await createUserWithEmailAndPassword(email, password);
            setPassMessage('');
        }
        else {
            return setPassMessage("Password didn't match");
        };
    };

    return (<>
        <PageTitle title='Sign Up'></PageTitle>
        <div className="flex justify-center py-10 bg-slate-100">
            <div className='lg:w-1/3 mx-4 bg-white sm:px-10 px-5 sm:py-8 py-6 rounded-xl border shadow-lg'>
                <h1 className='text-center text-4xl font-semibold mb-5'>Sign Up</h1>
                <form onSubmit={handleSignUp}>
                    <div>
                        <label htmlFor='email' className='font-medium text-lg'>Email Address
                            <span className='text-orange-600 ml-1'>*</span></label>
                        <input ref={emailRef} required id='email' type="email" placeholder="Enter your email" className="input text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                    </div>
                    <div className='mt-5'>
                        <label htmlFor='password' className='font-medium text-lg'>
                            Password
                            <span className='text-orange-600 ml-1'>*</span>
                        </label>
                        <input ref={passwordRef} required id='password' type="password" placeholder="Minimum 6 characters" className="input text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                    </div>
                    <div className='mt-5'>
                        <label htmlFor='confirmPassword' className='font-medium text-lg'>
                            Confirm Password
                            <span className='text-orange-600 ml-1'>*</span>
                        </label>
                        <input ref={confirmPasswordRef} required id='confirmPassword' type="password" placeholder="Confirm minimum 6 characters" className="input text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                    </div>
                    {
                        passMessage ? <p className='text-sm text-red-600 mt-3'>{passMessage}</p> : ''
                    }
                    {
                        error && <p className='text-sm text-red-600 mt-3'>Already have an account in this email</p>
                    }
                    <div className='mt-6'>
                        <button className='btn btn-primary normal-case text-lg text-white w-full' type="submit">
                            {
                                loading ? <Spinner></Spinner> : 'Sign up'
                            }
                        </button>
                    </div>
                </form>
                <p className='text-base mt-3'>Already have an account? <span className='text-blue-600'><Link to="/login">Login</Link></span></p>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    </>
    );
};

export default SignUp;