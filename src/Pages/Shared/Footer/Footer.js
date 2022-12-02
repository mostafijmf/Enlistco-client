import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {

    return (
        <footer className='w-full bg-neutral relative'>
            <div className='sm:w-11/12 w-full mx-auto'>
                <div
                    onClick={() => {
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        });
                    }}
                    className='absolute bottom-10 md:right-10 right-4 cursor-pointer text-white border p-3 rounded-full bg-black/30 hover:bg-transparent duration-300'>
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
                <ul className='list-none w-full flex items-center justify-center flex-wrap gap-x-10 gap-y-5 text-gray-200 p-5'>
                    <li className='hover:underline duration-300'>
                        <Link to={'/about'}>About Us</Link>
                    </li>
                    <li className='hover:underline duration-300'>
                        <Link to={'/contact'}>Contact Us</Link>
                    </li>
                    <li className='hover:underline duration-300'>
                        <Link to={'/careers'}>Careers</Link>
                    </li>
                    <li className='hover:underline duration-300'>
                        <Link to={'/blog'}>Blog</Link>
                    </li>
                    <li className='hover:underline duration-300'>
                        <Link to={'/invoice'}>Pay Invoice</Link>
                    </li>
                    <li className='hover:underline duration-300'>
                        <Link to={'faq'}>FAQ</Link>
                    </li>
                    <li className='hover:underline duration-300'>
                        <Link to={'trainings'}>Trainings</Link>
                    </li>
                </ul>
                <div className='w-full mx-auto text-center border-t border-gray-500'>
                    <p className='p-5 m-0 text-gray-50 sm:text-base text-sm'>
                        &copy; <span className='mr-2'>Copyright {new Date().getFullYear()} </span>
                        Ecerasystem  - All Rights Reserved
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;