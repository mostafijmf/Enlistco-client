import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuAlt3Icon, XIcon } from '@heroicons/react/solid';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { signOut } from 'firebase/auth';
import useAdmin from '../../hooks/useAdmin';
import useGetUsers from '../../hooks/useGetUsers';

const Header = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const [user] = useAuthState(auth);
    const [admin] = useAdmin();
    const [usersData] = useGetUsers();
    const emp = usersData[0]?.employer;
    const handleSignOut = () => {
        localStorage.removeItem('accessToken');
        signOut(auth)
    };

    const menuLeft =
        <>
            <li className='hover:text-primary duration-300 sm:text-lg text-base my-5 lg:my-0 relative before:duration-300 hover:before:content-[""] hover:before:absolute hover:before:w-full hover:before:h-0.5 hover:before:bg-primary hover:before:-bottom-1 hover:before:left-0'>
                <Link to='/'>Find Jobs</Link>
            </li>
            <li className='hover:text-primary duration-300 sm:text-lg text-base my-5 lg:my-0 relative before:duration-300 hover:before:content-[""] hover:before:absolute hover:before:w-full hover:before:h-0.5 hover:before:bg-primary hover:before:-bottom-1 hover:before:left-0'>
                <Link to='/employer-form/contact'>Post a job</Link>
            </li>
            {
                !admin.admin &&
                <li className='hover:text-primary duration-300 sm:text-lg text-base my-5 lg:my-0 relative before:duration-300 hover:before:content-[""] hover:before:absolute hover:before:w-full hover:before:h-0.5 hover:before:bg-primary hover:before:-bottom-1 hover:before:left-0'>
                    <Link to='/form/user-contact'>Upload Your Resume</Link>
                </li>
            }
        </>
    const menuRight =
        <>
            {
                admin.admin ? <>
                    <li><Link className='w-full flex items-center gap-3 py-3 px-5 hover:bg-slate-100 hover:text-accent focus:bg-white focus:text-accent' to='/dashboard/manage-recruiters'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        Manage Recruiters
                    </Link></li>
                    <li><Link className='w-full flex items-center gap-3 py-3 px-5 hover:bg-slate-100 hover:text-accent focus:bg-white focus:text-accent' to='/dashboard/manage-seekers'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>Manage Seekers
                    </Link></li>
                    <li><Link className='w-full flex items-center gap-3 py-3 px-5 hover:bg-slate-100 hover:text-accent focus:bg-white focus:text-accent' to='/dashboard/manage-job-post'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>Manage Post
                    </Link></li>
                    <li><Link className='w-full flex items-center gap-3 py-3 px-5 hover:bg-slate-100 hover:text-accent focus:bg-white focus:text-accent' to='/dashboard/admin-job-post'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>My Post
                    </Link></li>
                    {
                        emp &&
                        <li><Link className='w-full flex items-center gap-3 py-3 px-5 hover:bg-slate-100 hover:text-accent focus:bg-white focus:text-accent' to='/dashboard/seeker-applications'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                            </svg>
                            Seeker Applications
                        </Link></li>
                    }
                </> : <>
                    <li>
                        <Link className='w-full flex items-center gap-3 py-3 px-5 hover:bg-slate-100 hover:text-accent focus:bg-white focus:text-accent' to='/dashboard/user-profile'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>My Profile
                        </Link>
                    </li>
                    <li><Link className='w-full flex items-center gap-3 py-3 px-5 hover:bg-slate-100 hover:text-accent focus:bg-white focus:text-accent' to='/dashboard/application/applied'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        My Application
                    </Link></li>
                    {
                        emp &&
                        <li><Link className='w-full flex items-center gap-3 py-3 px-5 hover:bg-slate-100 hover:text-accent focus:bg-white focus:text-accent' to='/dashboard/seeker-applications'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                            </svg>
                            Seeker Applications
                        </Link></li>
                    }
                </>
            }
            <li><Link className='w-full flex items-center gap-3 py-3 px-5 hover:bg-slate-100 hover:text-accent focus:bg-white focus:text-accent' to='/help-center'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Help Center
            </Link></li>
            <li>
                <button
                    onClick={() => handleSignOut()}
                    className='w-full flex items-center gap-3 py-3 px-5 hover:bg-slate-100 hover:text-accent focus:bg-white focus:text-accent'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sing out
                </button>
            </li>
        </>

    return (
        <header className='w-full shadow z-30 sticky top-0 left-0 bg-white'>
            <nav className="flex items-center justify-between w-11/12 mx-auto h-14 relative">
                <div className="logo lg:flex-none flex justify-between items-center lg:w-auto w-full">
                    <Link to='/' className='btn btn-ghost normal-case text-xl md:text-2xl'>Enlistco</Link>
                    <span
                        id='hamburger'
                        className='lg:hidden cursor-pointer'
                        onClick={() => { setOpenMenu(!openMenu); setOpenProfile(false) }}>
                        {
                            !openMenu && <MenuAlt3Icon className='w-8 h-8'></MenuAlt3Icon>
                        }
                    </span>
                </div>

                {/* ===========Desktop view=========== */}
                <div className='lg:block hidden'>
                    <ul className='lg:flex lg:gap-8 lg:items-center'>
                        {menuLeft}
                    </ul>
                </div>
                <div className='lg:block hidden'>
                    <ul className='lg:flex lg:gap-5 lg:items-center'>
                        {user ? <>
                            <li
                                onClick={() => setOpenProfile(!openProfile)}
                                className='text-gray-500 duration-300 text-base my-5 lg:my-0 relative'>
                                <div className="w-10 h-full rounded-full cursor-pointer hover:text-primary overflow-hidden">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <ul className={`rounded bg-white shadow-md sm:w-60 w-full absolute top-14 lg:right-0 md:-right-5 md:left-auto sm:left0 ${openProfile ? 'block' : 'hidden'}`}>
                                    {menuRight}
                                </ul>
                            </li>
                        </> : <>
                            <li className='hover:text-primary duration-300 sm:text-lg text-base my-5 lg:my-0 relative before:duration-300 hover:before:content-[""] hover:before:absolute hover:before:w-full hover:before:h-0.5 hover:before:bg-primary hover:before:-bottom-1 hover:before:left-0'>
                                <Link to='/login'>Log in</Link>
                            </li>
                            <li className='hover:text-primary duration-300 sm:text-lg text-base my-5 lg:my-0 relative before:duration-300 hover:before:content-[""] hover:before:absolute hover:before:w-full hover:before:h-0.5 hover:before:bg-primary hover:before:-bottom-1 hover:before:left-0'>
                                <Link to='/signup'>Sign up</Link>
                            </li>
                        </>
                        }
                    </ul>
                </div>

                {/* ===========tablet and mobile view=========== */}
                <div
                    className={`lg:hidden fixed top-0 right-0 w-full h-full bg-black/50  duration-300 ease-out ${openMenu ? '' : 'hidden'}`}
                >
                    <ul className={`absolute top-0 right-0 md:w-96 sm:w-1/2 w-4/5 h-screen bg-white overflow-y-auto scrollBar-none`}>

                        {/* ==========navbar menu========== */}
                        <li className='border-b shadow px-5 py-3'>
                            <XIcon
                                onClick={() => setOpenMenu(!openMenu)}
                                className='w-8 h-8 text-gray-400 hover:text-gray-500 duration-300 cursor-pointer'></XIcon>
                        </li>
                        <li>
                            <Link
                                className='w-full sm:text-lg text-base flex items-center gap-3 py-3 px-14 hover:bg-slate-100 hover:text-accent focus:bg-white focus:text-accent'
                                to='/'
                            >Find Jobs
                            </Link>
                        </li>
                        <li>
                            <Link
                                className='w-full sm:text-lg text-base flex items-center gap-3 py-3 px-14 hover:bg-slate-100 hover:text-accent focus:bg-white focus:text-accent'
                                to='/employer-form/contact'
                            >Post a job
                            </Link>
                        </li>
                        {
                            !admin.admin &&
                            <li>
                                <Link
                                    className='w-full sm:text-lg text-base flex items-center gap-3 py-3 px-14 hover:bg-slate-100 hover:text-accent focus:bg-white focus:text-accent'
                                    to='/form/user-contact'
                                >Upload Your Resume
                                </Link>
                            </li>
                        }

                        {/* ==========Dashboard menu========== */}
                        {
                            user ? <>
                                <li className='text-center text-lg font-medium border-b pb-2 pt-5'>
                                    Dashboard
                                </li>
                                {menuRight}
                            </> : <>
                                <li>
                                    <Link
                                        className='w-full sm:text-lg text-base flex items-center gap-3 py-3 px-14 hover:bg-slate-100 hover:text-accent focus:bg-white focus:text-accent'
                                        to='/login'
                                    >Log in
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className='w-full sm:text-lg text-base flex items-center gap-3 py-3 px-14 hover:bg-slate-100 hover:text-accent focus:bg-white focus:text-accent'
                                        to='/signup'
                                    >Sign up
                                    </Link>
                                </li>
                            </>
                        }
                    </ul>
                </div>

            </nav>
        </header>
    );
};

export default Header;