import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageTitle from '../Shared/PageTitle';
import resetPassIcon from '../../images/reset-password/reset-password.png';
import Spinner from '../Shared/Spinner';
import { CheckIcon, ExclamationIcon, EyeIcon, EyeOffIcon } from '@heroicons/react/solid';


const initialState = {
    password: '',
    cf_password: '',
    error: '',
    success: ''
}

const ResetPassword = () => {
    const [resetState, setResetState] = useState(initialState);
    const { password, cf_password, error, success } = resetState;

    const { reset_token } = useParams();
    const [loading, setLoading] = useState(false);

    const [showPass1, setShowPass1] = useState(true);
    const [showPass2, setShowPass2] = useState(true);

    const [regexOpen, setRegexOpen] = useState(false);

    const [capital, setCapital] = useState(false);
    const [number, setNumber] = useState(false);
    const [special, setSpecial] = useState(false);
    const [digit, setDigit] = useState(false);

    const navigate = useNavigate();

    // ===================password onChange===================
    const handlePassChange = (e) => {
        const password = e.target.value;
        if (password) {
            setResetState({ ...resetState, password: password });
            setRegexOpen(true)
        } else {
            setResetState({ ...resetState, password: '' });
            setRegexOpen(false)
        };

        (password.match(/[A-Z]/) !== null) ? setCapital(true) : setCapital(false);
        (password.match(/[0-9]/) !== null) ? setNumber(true) : setNumber(false);
        (password.match(/[!@#$%^&*]/) !== null) ? setSpecial(true) : setSpecial(false);
        (password.length > 7) ? setDigit(true) : setDigit(false);
    };

    // ===================confirm password onChange===================
    const handleConfirmPassChange = (e) => {
        const confirmPass = e.target.value;
        if (confirmPass === password) {
            if (confirmPass.match(/^(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[A-Z]).{8,}$/)) {
                setResetState({ ...resetState, cf_password: confirmPass, error: "" });
                setRegexOpen(false)
            } else {
                setResetState({ ...resetState, cf_password: confirmPass, error: "Please provide a valid password" });
                setRegexOpen(true)
            }
        } else {
            setResetState({ ...resetState, cf_password: confirmPass, error: "Password didn't match" });
            setRegexOpen(true)
        }
    };

    // ===================Reset button===================
    const handleReset = async (event) => {
        event.preventDefault();
        if (password !== cf_password) {
            return setResetState({ ...resetState, error: "Password didn't match" });
        }
        else if (!password || !cf_password) {
            return setResetState({ ...resetState, error: "Please provide a valid password" });
        }
        else if (
            (password.search(/^(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[A-Z]).{8,}$/) === 0)
            &&
            (cf_password.search(/^(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[A-Z]).{8,}$/) === 0)
        ) {
            setLoading(true)
            await axios.patch('https://api.enlistco.co.in/reset-password', { password }, {
                method: 'PATCH',
                headers: {
                    'Authorization': reset_token
                }
            })
                .then(res => {
                    setLoading(false);
                    setResetState({ ...resetState, error: '', success: res.data.message })
                })
                .catch(err => {
                    setLoading(false);
                    setResetState({ ...resetState, error: err.response.data.message, success: '' })
                })
        }
        else {
            return setResetState({ ...resetState, error: "Please provide a valid password" });
        }
    };

    return (<>
        <PageTitle title='Reset Password'></PageTitle>
        <div className="w-screen h-screen"
            style={{ backgroundImage: `url(${resetPassIcon})` }}
        >
            <div className='w-full h-full bg-white/80 flex justify-center items-center'>
                <div className='lg:w-1/3 md:w-1/2 sm:w-4/5 w-11/12 bg-white sm:px-10 px-5 sm:py-8 py-6 rounded-xl border shadow-lg'>
                    <h1 className='text-center text-3xl font-semibold mb-5'>Reset Password</h1>
                    <form onSubmit={handleReset}>
                        <div className='mt-5'>
                            <label htmlFor='password' className='font-medium text-lg'>
                                New Password
                                <span className='text-orange-600 ml-1'>*</span>
                            </label>
                            <div className='flex items-center justify-between bg-slate-100 mt-2 border border-gray-200 rounded-lg focus-within:shadow-md'>
                                <input
                                    onChange={handlePassChange}
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
                            {regexOpen && <ul className='list-none mt-3'>
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
                            error && <p className='text-sm text-red-600 mt-3 flex items-center gap-1'>
                                <ExclamationIcon className='w-4 h-4'></ExclamationIcon>
                                {error}
                            </p>
                        }
                        <div className='mt-8 mb-2'>
                            <button
                                // disabled={loading}
                                type="submit"
                                className='btn btn-primary min-h-0 h-11 w-full normal-case text-lg text-white'
                            >
                                {
                                    loading ? <Spinner></Spinner> : 'Submit'
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        {
            success && <div className='fixed top-0 left-0 w-full h-full glass flex items-center justify-center'>
                <div className='sm:w-96 w-11/12 h-max sm:p-10 p-5 border rounded-md bg-white shadow-lg text-center'>
                    <div className='w-full flex justify-center relative'>
                        <CheckIcon className='absolute sm:-top-20 -top-14 left-auto right-auto w-16 h-16 p-3 rounded-full text-white bg-success shadow-lg'></CheckIcon>
                    </div>
                    <p className='sm:my-5 mt-10 mb-5 font-medium text-gray-500'>
                        {success}
                    </p>
                    <button
                        onClick={() => navigate('/login')}
                        className='btn btn-link min-h-0 h-max p-0 normal-case text-lg font-normal'>
                        Now you can Log in
                    </button>
                </div>
            </div>
        }
    </>);
};

export default ResetPassword;