import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import SocialLogin from './SocialLogin';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import Spinner from '../Shared/Spinner';
import { useEffect } from 'react';
import PageTitle from '../Shared/PageTitle';
import { CheckIcon, ExclamationIcon, EyeIcon, EyeOffIcon } from '@heroicons/react/solid';

const SignUp = () => {
    const [passMessage, setPassMessage] = useState('');
    const [showPass1, setShowPass1] = useState(true);
    const [showPass2, setShowPass2] = useState(true);
    // Password Regex
    const [regexOpen, setRegexOpen] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [capital, setCapital] = useState(false);
    const [number, setNumber] = useState(false);
    const [special, setSpecial] = useState(false);
    const [digit, setDigit] = useState(false);
    const [isDisable, setIsDisable] = useState(true);

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

    // password onChange
    const handlePassChange = (e) => {
        const password = e.target.value;
        if (password) {
            setPassword(password);
            setRegexOpen(true)
        } else {
            setPassword('');
            setRegexOpen(false);
        }

        (password.match(/[A-Z]/) !== null) ? setCapital(true) : setCapital(false);
        (password.match(/[0-9]/) !== null) ? setNumber(true) : setNumber(false);
        (password.match(/[!@#$%^&*]/) !== null) ? setSpecial(true) : setSpecial(false);
        (password.length > 7) ? setDigit(true) : setDigit(false);
        if (confirmPassword === password) {
            setIsDisable(false)
        }else{
            setIsDisable(true)
        }
    };

    // confirm password onChange
    const handleConfirmPassChange = (e) => {
        const confirmPass = e.target.value;
        setConfirmPassword(confirmPass)
        if (confirmPass.match(/^(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[A-Z]).{8,}$/)) {
            if (confirmPass === password) {
                setPassMessage('');
                setRegexOpen(false);
                setIsDisable(false)
            } else {
                setPassMessage("Password didn't match");
                setRegexOpen(true);
                setIsDisable(true)
            }
        } else {
            setPassMessage("Password didn't match");
            setRegexOpen(true);
            setIsDisable(true)
        }
    };

    // Sign up button
    const handleSignUp = async event => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const confirmPassword = event.target.confirmPassword.value;

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
                        <input
                            required
                            id='email'
                            type="email"
                            placeholder="Enter your email"
                            className="input text-base bg-slate-100 min-h-0 h-11 w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md"
                        />
                    </div>
                    <div className='mt-5'>
                        <label htmlFor='password' className='font-medium text-lg'>
                            Password
                            <span className='text-orange-600 ml-1'>*</span>
                        </label>
                        <div className='flex items-center justify-between bg-slate-100 mt-2 border border-gray-200 rounded-lg focus-within:shadow-md'>
                            <input
                                onChange={handlePassChange}
                                required
                                id='password'
                                type={showPass1 ? 'password' : 'text'}
                                placeholder="Minimum 8 characters"
                                className="input text-base bg-slate-100 min-h-0 h-11 w-full focus:outline-0"
                            />
                            {
                                showPass1 ?
                                    <div onClick={() => setShowPass1(false)} className='px-2 cursor-pointer'>
                                        <EyeIcon className='w-5 h-5 text-gray-500'></EyeIcon>
                                    </div> :
                                    <div onClick={() => setShowPass1(true)} className='px-2 cursor-pointer'>
                                        <EyeOffIcon className='w-5 h-5 text-gray-500'></EyeOffIcon>
                                    </div>
                            }

                        </div>
                        {regexOpen && <ul className='mt-3'>
                            <li className={`${capital ? 'text-success' : 'text-red-600'} flex items-center gap-1`}>
                                {
                                    capital ?
                                        <CheckIcon id='capitalCheck' className='w-4 h-4'></CheckIcon> :
                                        <ExclamationIcon id='capitalExc' className='w-4 h-4'></ExclamationIcon>
                                }
                                <span className='text-sm'>At least one capital letter</span>
                            </li>
                            <li className={`${number ? 'text-success' : 'text-red-600'} flex items-center gap-1`}>
                                {
                                    number ?
                                        <CheckIcon id='capitalCheck' className='w-4 h-4'></CheckIcon> :
                                        <ExclamationIcon id='capitalExc' className='w-4 h-4'></ExclamationIcon>
                                }
                                <span className='text-sm'>At least one number</span>
                            </li>
                            <li className={`${special ? 'text-success' : 'text-red-600'} flex items-center gap-1`}>
                                {
                                    special ?
                                        <CheckIcon id='capitalCheck' className='w-4 h-4'></CheckIcon> :
                                        <ExclamationIcon id='capitalExc' className='w-4 h-4'></ExclamationIcon>
                                }
                                <span className='text-sm'>At least one special character</span>
                            </li>
                            <li className={`${digit ? 'text-success' : 'text-red-600'} flex items-center gap-1`}>
                                {
                                    digit ?
                                        <CheckIcon id='capitalCheck' className='w-4 h-4'></CheckIcon> :
                                        <ExclamationIcon id='capitalExc' className='w-4 h-4'></ExclamationIcon>
                                }
                                <span className='text-sm'>At least 8 characters</span>
                            </li>
                        </ul>
                        }
                    </div>
                    <div className='mt-5'>
                        <label htmlFor='confirmPassword' className='font-medium text-lg'>
                            Confirm Password
                            <span className='text-orange-600 ml-1'>*</span>
                        </label>
                        <div className='flex items-center justify-between bg-slate-100 mt-2 border border-gray-200 rounded-lg focus-within:shadow-md'>
                            <input
                                onChange={handleConfirmPassChange}
                                required
                                id='confirmPassword'
                                type={showPass2 ? 'password' : 'text'}
                                placeholder="Confirm minimum 8 characters"
                                className="input text-base bg-slate-100 min-h-0 h-11 w-full focus:outline-0"
                            />
                            {
                                showPass2 ?
                                    <div onClick={() => setShowPass2(false)} className='px-2 cursor-pointer'>
                                        <EyeIcon className='w-5 h-5 text-gray-500'></EyeIcon>
                                    </div> :
                                    <div onClick={() => setShowPass2(true)} className='px-2 cursor-pointer'>
                                        <EyeOffIcon className='w-5 h-5 text-gray-500'></EyeOffIcon>
                                    </div>
                            }
                        </div>
                    </div>
                    {
                        passMessage ?
                            <p className='text-sm text-red-600 mt-3'>{passMessage}</p>
                            : ''
                    }
                    {
                        error && <p className='text-sm text-red-600 mt-3'>Already have an account in this email</p>
                    }
                    <div className='mt-6'>
                        <button
                            disabled={isDisable}
                            type="submit"
                            className='btn btn-primary min-h-0 h-11 w-full normal-case text-lg text-white'
                        >
                            {
                                loading ? <Spinner></Spinner> : 'Sign up'
                            }
                        </button>
                    </div>
                </form>
                <p className='text-base mt-3'>
                    Already have an account?
                    <span className='text-blue-600 ml-1'>
                        <Link to="/login">Login</Link>
                    </span>
                </p>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    </>
    );
};

export default SignUp;