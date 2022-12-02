import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialLogin from './SocialLogin';
import Spinner from '../Shared/Spinner';
import PageTitle from '../Shared/PageTitle';
import axios from 'axios';
import { CheckIcon, ExclamationIcon } from '@heroicons/react/solid';


const initialState = {
    email: '',
    password: '',
    error: '',
    success: '',
    resetError: '',
    resetSuccess: ''
}

const Login = () => {
    const [loginState, setLoginState] = useState(initialState);
    const { email, password, error, success, resetError, resetSuccess } = loginState;
    const [loading, setLoading] = useState(false);
    const [resetLoading, setResetLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    useEffect(() => {
        const token = localStorage.getItem('user_token');
        if (token) {
            return navigate(from, { replace: true });
        }
    }, [navigate, from]);


    // ============================Sign in button============================
    const handleSignIn = async event => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        if (!email.includes('@')) {
            return setLoginState({ ...loginState, email: '', error: 'Please provide a valid email' })
        };
        if (!email) {
            return setLoginState({ ...loginState, email: '', error: 'Please provide a valid email' })
        };
        if (!password) {
            return setLoginState({ ...loginState, password: '', error: 'Please provide a valid password' })
        };

        setLoading(true);
        await axios.post('https://api.enlistco.co.in/login', { email, password })
            .then(res => {
                if (res.data) {
                    const { user_token, user, message } = res.data;
                    setLoading(false);
                    setLoginState({ ...loginState, error: '', success: message });
                    localStorage.setItem('user_token', user_token);
                    user.newEntry ? navigate('/user-information') : navigate(from, { replace: true });
                }
            })
            .catch(err => {
                setLoading(false);
                setLoginState({ ...loginState, error: err.response.data.message, success: '' });
            })
    };


    // ============================Reset button============================
    const handleReset = async () => {
        if (!email.includes('@')) {
            return setLoginState({ ...loginState, email: '', resetError: 'Please provide a valid email' })
        };

        if (!email) {
            return setLoginState({ ...loginState, email: '', resetError: 'Please provide a valid email' })
        };

        setResetLoading(true);
        await axios.post('https://api.enlistco.co.in/forget-password', { email })
            .then(res => {
                const { message } = res.data;
                setResetLoading(false);
                setLoginState({ ...loginState, resetError: '', resetSuccess: message });
            })
            .catch(err => {
                setResetLoading(false);
                setLoginState({ ...loginState, resetError: err.response.data.message, resetSuccess: '' });
            })
    };

    return (<>
        <PageTitle title='Login'></PageTitle>
        <div className="w-screen h-screen flex justify-center items-center bg-slate-100">
            <div className='lg:w-1/3 md:w-1/2 sm:w-4/5 w-11/12 bg-white sm:px-10 px-5 sm:py-8 py-6 rounded-xl border shadow-lg'>
                <h1 className='text-center text-4xl font-semibold mb-5'>Login</h1>
                <form onSubmit={handleSignIn}>
                    <div>
                        <label htmlFor='email' className='font-medium text-lg'>
                            Email Address <span className='text-orange-600'>*</span>
                        </label>
                        <input
                            onChange={(e) => {
                                setLoginState({ ...loginState, email: e.target.value })
                            }}
                            id='email'
                            type="email"
                            placeholder="Enter your email"
                            className="input text-base bg-slate-100 min-h-0 h-11 w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md"
                        />
                    </div>
                    <div className='mt-5'>
                        <label htmlFor='password' className='font-medium text-lg'>
                            Password <span className='text-orange-600'>*</span>
                        </label>
                        <input
                            onChange={(e) => {
                                setLoginState({ ...loginState, password: e.target.value })
                            }}
                            id='password'
                            type="password"
                            placeholder="Password"
                            className="input text-base bg-slate-100 min-h-0 h-11 w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md"
                        />
                    </div>
                    {
                        error && <p className='text-sm text-red-600 mt-3 flex items-center gap-1'>
                            <ExclamationIcon className='w-4 h-4'></ExclamationIcon>
                            {error}
                        </p>
                    }
                    {
                        success && <p className='text-sm text-success mt-3 flex items-center gap-1'>
                            <CheckIcon className='w-4 h-4'></CheckIcon>
                            {success}
                        </p>
                    }
                    <div className='mt-6'>
                        <button
                            type="submit"
                            className='btn btn-primary min-h-0 h-11 capitalize text-lg text-white w-full'
                            disabled={loading}
                        >
                            {
                                loading ? <Spinner></Spinner> : 'Login'
                            }
                        </button>
                    </div>
                </form>
                <p className='text-base mt-3 flex items-center gap-1'>Don't have an account?
                    <span className='text-blue-600'>
                        <Link to="/signUp">Create an account</Link>
                    </span>
                </p>

                {
                    resetSuccess ?
                        <p className='text-sm text-success'>{resetSuccess}</p>
                        :
                        <button
                            disabled={resetLoading}
                            onClick={handleReset}
                            className="text-blue-600"
                        >
                            {
                                resetLoading ? 'Loading...' : 'Forget Password?'
                            }
                        </button>
                }
                {
                    resetError && <p className='text-sm text-red-600 mt-3 flex items-center gap-1'>
                        <ExclamationIcon className='w-4 h-4'></ExclamationIcon>
                        {resetError}
                    </p>
                }
                <SocialLogin></SocialLogin>
            </div>
        </div>
        {
            resetSuccess &&
            <div
                onClick={() => setLoginState(
                    { ...loginState, resetSuccess: "" }
                )}
                className='fixed top-0 left-0 w-screen h-screen glass flex items-center justify-center'
            >
                <div className='bg-white sm:w-96 w-11/12 h-max sm:px-8 sm:py-6 p-5 rounded-lg'>
                    <div className='w-full flex justify-center'>
                        <CheckIcon className='w-16 h-16 p-3 border-2 rounded-full text-success'></CheckIcon>
                    </div>
                    <p className='text-base text-gray-500 my-6 text-center'>{resetSuccess}</p>
                    <div className='w-full flex justify-end'>
                        <button
                            onClick={() => setLoginState(
                                { ...loginState, resetSuccess: "" }
                            )}
                            className='btn btn-primary normal-case text-white min-h-0 h-9 rounded-md px-5 shadow'
                        >Ok
                        </button>
                    </div>
                </div>
            </div>
        }
    </>
    );
};

export default Login;