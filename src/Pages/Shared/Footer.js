import React from 'react';
import { useNavigate } from 'react-router-dom';
import facebook from '../../images/social-icon/facebook.svg'
import twitter from '../../images/social-icon/twitter.svg'
import linkedin from '../../images/social-icon/linkedin.svg'

const Footer = () => {
    const navigate = useNavigate();

    return (
        <footer className='bg-neutral relative'>
            <div
                onClick={() => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }}
                style={{ boxShadow: '0 3px 20px 5px #282D36' }}
                className='absolute bottom-28 right-10 cursor-pointer text-white border p-3 rounded-full hover:bg-black/30 duration-300'>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none" viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 11l7-7 7 7M5 19l7-7 7 7" />
                </svg>
            </div>

            <div className='w-10/12 mx-auto pb-5 pt-16 lg:grid lg:gap-28 lg:grid-cols-7 flex flex-col gap-10 justify-between'>
                <div className='lg:col-span-3 lg:w-full sm:w-4/5 full mx-auto'>
                    <h3 className='text-xl text-gray-50'>About us</h3>
                    <p className='text-base text-gray-300 my-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
                <div className='lg:col-span-4 grid gap-28 grid-cols-2'>

                    {/* =======================Help & Support======================= */}
                    <div className='col-span-1'>
                        <h3 className='text-xl text-gray-50'>Help & Support</h3>
                        <ul className='list-none mt-4'>
                            <li className='text-base text-gray-300 mb-2'>
                                <span
                                    onClick={() => {
                                        navigate('/help-center');
                                        window.scrollTo({
                                            top: 0,
                                            behavior: 'smooth'
                                        });
                                    }}
                                    className='inline-block cursor-pointer hover:underline'>
                                    Help Center
                                </span>
                            </li>
                            <li className='text-base text-gray-300 mb-2'>
                                <span
                                    onClick={() => {
                                        navigate('/');
                                        window.scrollTo({
                                            top: 0,
                                            behavior: 'smooth'
                                        });
                                    }}
                                    className='inline-block cursor-pointer hover:underline'>
                                    FAQ
                                </span>
                            </li>
                            <li className='text-base text-gray-300 mb-2'>
                                <span
                                    onClick={() => {
                                        navigate('/');
                                        window.scrollTo({
                                            top: 0,
                                            behavior: 'smooth'
                                        });
                                    }}
                                    className='inline-block cursor-pointer hover:underline'>
                                    Contact us
                                </span>
                            </li>
                            <li className='text-base text-gray-300 mb-2'>
                                <span
                                    onClick={() => {
                                        navigate('/');
                                        window.scrollTo({
                                            top: 0,
                                            behavior: 'smooth'
                                        });
                                    }}
                                    className='inline-block cursor-pointer hover:underline'>
                                    Terms & Conditions
                                </span>
                            </li>
                            <li className='text-base text-gray-300 mb-2'>
                                <span
                                    onClick={() => {
                                        navigate('/');
                                        window.scrollTo({
                                            top: 0,
                                            behavior: 'smooth'
                                        });
                                    }}
                                    className='inline-block cursor-pointer hover:underline'>
                                    Privacy Policy
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* =======================Social Icons======================= */}
                    <div className='col-span-1'>
                        <h3 className='text-xl text-gray-50'>Follow us</h3>
                        <ul className='list-none mt-4'>
                            <li className='mb-2'>
                                <span className='border hover:border-transparent duration-300 rounded p-1.5 inline-block cursor-pointer'>
                                    <img className='w-6 h-6' src={facebook} alt="" />
                                </span>
                            </li>
                            <li className='mb-2'>
                                <span className='border hover:border-transparent duration-300 rounded p-1.5 inline-block cursor-pointer'>
                                    <img className='w-6 h-6' src={twitter} alt="" />
                                </span>
                            </li>
                            <li className='mb-2'>
                                <span className='border hover:border-transparent duration-300 rounded p-1.5 inline-block cursor-pointer'>
                                    <img className='w-6 h-6' src={linkedin} alt="" />
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='w-10/12 mx-auto text-center border-t border-gray-500'>
                <p className='p-5 m-0 text-gray-50 '>&copy; <span className='mr-2'>Copyright {new Date().getFullYear()} </span> Enlistco - All Rights Reserved</p>
            </div>
        </footer>
    );
};

export default Footer;