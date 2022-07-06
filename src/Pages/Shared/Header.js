import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuAlt3Icon, XIcon } from '@heroicons/react/solid';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { signOut } from 'firebase/auth';

const Header = () => {
    const [open, setOpen] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const [user, loading, error] = useAuthState(auth);

    const menuLeft =
        <>
            <li className='hover:text-primary hover:font-medium duration-300 text-lg my-5 lg:my-0'>
                <Link to='/'>Find Jobs</Link>
            </li>
            <li className='hover:text-primary hover:font-medium duration-300 text-lg my-5 lg:my-0'>
                <Link to='/'>Post a job</Link>
            </li>
            <li className='hover:text-primary hover:font-medium duration-300 text-lg my-5 lg:my-0'>
                <Link to='/form/userContact'>Upload Your Resume</Link>
            </li>
        </>
    const menuRight = user ?
        <>
            <li onClick={() => setOpenProfile(!openProfile)} className='text-gray-500 duration-300 text-base my-5 lg:my-0 relative'>
                <div className="w-10 h-full rounded-full cursor-pointer hover:text-primary overflow-hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <ul class={`menu bg-slate-50 shadow-md sm:w-60 w-full absolute top-14 lg:right-0 md:-right-5 md:left-auto sm:left0 ${openProfile ? 'block' : 'hidden'}`}>
                    <li><Link className='w-full px-5' to='/dashboard/userProfile'>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>My Profile
                    </Link>
                    </li>
                    <li><Link className='w-full px-5' to='/dashboard/userApplication'>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        My Application
                    </Link></li>
                    <li><Link className='w-full px-5' to='/helpCenter'>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Help Center
                    </Link></li>
                    <li>
                        <button onClick={() => signOut(auth)} className='w-full px-5'>Singn out</button>
                    </li>
                </ul>
            </li>
        </>
        :
        <>
            <li className='hover:text-primary hover:font-medium duration-300 text-lg my-5 lg:my-0'>
                <Link to='/login'>Log in</Link>
            </li>
            <li className='hover:text-primary hover:font-medium duration-300 text-lg my-5 lg:my-0'>
                <Link to='/signUp'>Sign up</Link>
            </li>
        </>
        ;

    return (
        <header className='w-full shadow z-10 sticky'>
            <nav className="flex items-center justify-between w-11/12 mx-auto h-16 relative">
                <div className="logo lg:flex-none flex justify-between items-center lg:w-auto w-full">
                    <Link to='/' className='btn btn-ghost normal-case lg:text-2xl md:text-2xl'>JOB PORTAL</Link>
                    <span id='hamburger' className='lg:hidden cursor-pointer' onClick={() => setOpen(!open)}>
                        {
                            open ? <XIcon className='w-8 h-8'></XIcon> :
                                <MenuAlt3Icon className='w-8 h-8'></MenuAlt3Icon>
                        }
                    </span>
                </div>
                <div className='lg:block hidden'>
                    <ul className='lg:flex lg:gap-8 lg:items-center'>
                        {menuLeft}
                    </ul>
                </div>
                <div className='lg:block hidden'>
                    <ul className='lg:flex lg:gap-5 lg:items-center'>
                        {menuRight}
                    </ul>
                </div>
                <ul className={`lg:hidden md:w-64 sm:w-1/2 w-full glass rounded-lg shadow-md px-7 py-4 absolute right-0 duration-300 ease-out ${open ? 'top-20' : '-top-96'}`}>
                    {menuLeft}
                    {menuRight}
                </ul>
            </nav>
        </header>
    );
};

export default Header;