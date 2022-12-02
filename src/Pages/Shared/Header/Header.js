import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MenuAlt3Icon, XIcon } from '@heroicons/react/solid';
import useGetUsers from '../../../hooks/useGetUsers';
import './Header.css';
import ResMobile from './Notification/ResMobile';
import ResDesktop from './Notification/ResDesktop';

const Header = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const [openNotification, setOpenNotification] = useState(false);
    const [usersData] = useGetUsers();
    const navigate = useNavigate();
    const user_token = localStorage.getItem('user_token');


    // ======================Sign out button======================
    const handleSignOut = () => {
        localStorage.removeItem('user_token');
        navigate('/login')
    };

    const menuLeft =
        <>
            <li className='hover:text-primary duration-300 sm:text-lg text-base my-5 lg:my-0 relative before:duration-300 hover:before:content-[""] hover:before:absolute hover:before:w-full hover:before:h-0.5 hover:before:bg-primary hover:before:-bottom-1 hover:before:left-0'>
                <Link to='/'>Find Jobs</Link>
            </li>
            <li className='hover:text-primary duration-300 sm:text-lg text-base my-5 lg:my-0 relative before:duration-300 hover:before:content-[""] hover:before:absolute hover:before:w-full hover:before:h-0.5 hover:before:bg-primary hover:before:-bottom-1 hover:before:left-0'>
                <Link to='/job-form/contact'>Post a job</Link>
            </li>
            {
                !usersData?.admin &&
                <li className='hover:text-primary duration-300 sm:text-lg text-base my-5 lg:my-0 relative before:duration-300 hover:before:content-[""] hover:before:absolute hover:before:w-full hover:before:h-0.5 hover:before:bg-primary hover:before:-bottom-1 hover:before:left-0'>
                    <Link to='/form/seeker-contact'>Upload Your Resume</Link>
                </li>
            }
        </>
    const menuRight =
        <>
            {
                usersData?.admin ? <>
                    <li>
                        <Link
                            className='w-full flex items-center gap-3 py-3 px-5 hover:bg-slate-100 hover:text-accent focus:bg-white focus:text-accent'
                            to='/dashboard/manage-employers'
                            onClick={() => setOpenMenu(!openMenu)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor"
                                strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            Manage Employers
                        </Link>
                    </li>
                    <li>
                        <Link
                            className='w-full flex items-center gap-3 py-3 px-5 hover:bg-slate-100 hover:text-accent focus:bg-white focus:text-accent'
                            to='/dashboard/manage-seekers'
                            onClick={() => setOpenMenu(!openMenu)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor"
                                strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Manage Seekers
                        </Link>
                    </li>
                    <li>
                        <Link
                            className='w-full flex items-center gap-3 py-3 px-5 hover:bg-slate-100 hover:text-accent focus:bg-white focus:text-accent'
                            to='/dashboard/manage-job-post'
                            onClick={() => setOpenMenu(!openMenu)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor"
                                strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                            Manage Post
                        </Link>
                    </li>
                    <li>
                        <Link
                            className='w-full flex items-center gap-3 py-3 px-5 hover:bg-slate-100 hover:text-accent focus:bg-white focus:text-accent'
                            to='/dashboard/job'
                            onClick={() => setOpenMenu(!openMenu)}
                        >
                            <svg
                                className="w-6 h-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24"
                                strokeWidth="2" stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                            </svg>
                            Job Post
                        </Link>
                    </li>
                    {
                        usersData?.employer &&
                        <li>
                            <Link
                                className='w-full flex items-center gap-3 py-3 px-5 hover:bg-slate-100 hover:text-accent focus:bg-white focus:text-accent'
                                to='/dashboard/seeker-applications'
                                onClick={() => setOpenMenu(!openMenu)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                Seeker Applications
                            </Link>
                        </li>
                    }
                </> : <>
                    <li>
                        <Link
                            className='w-full flex items-center gap-3 py-3 px-5 hover:bg-slate-100 hover:text-accent focus:bg-white focus:text-accent'
                            to='/dashboard/user-profile'
                            onClick={() => setOpenMenu(!openMenu)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor"
                                strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            My Profile
                        </Link>
                    </li>
                    {
                        usersData?.seeker && <li className=''>
                            <Link
                                className='w-full flex items-center gap-3 py-3 px-5 hover:bg-slate-100 hover:text-accent focus:bg-white focus:text-accent'
                                to='/dashboard/applied-jobs'
                            >
                                <svg
                                    className="w-6 h-6"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    strokeWidth={1.5} stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                </svg>
                                My Jobs
                            </Link>
                        </li>
                    }
                    {
                        usersData?.employer && <>
                            <li>
                                <Link
                                    className='w-full flex items-center gap-3 py-3 px-5 hover:bg-slate-100 hover:text-accent focus:bg-white focus:text-accent'
                                    to='/dashboard/job'
                                    onClick={() => setOpenMenu(!openMenu)}
                                >
                                    <svg
                                        className="w-6 h-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none" viewBox="0 0 24 24"
                                        strokeWidth="2" stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                                    </svg>
                                    Job Post
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className='w-full flex items-center gap-3 py-3 px-5 hover:bg-slate-100 hover:text-accent focus:bg-white focus:text-accent'
                                    to='/dashboard/seeker-applications'
                                    onClick={() => setOpenMenu(!openMenu)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    Seeker Applications
                                </Link>
                            </li>
                        </>
                    }
                </>
            }
            <li>
                <Link
                    className='w-full flex items-center gap-3 py-3 px-5 hover:bg-slate-100 hover:text-accent focus:bg-white focus:text-accent'
                    to='/help-center'
                    onClick={() => setOpenMenu(!openMenu)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor"
                        strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Help Center
                </Link>
            </li>
            <li>
                <button
                    onClick={handleSignOut}
                    className='w-full flex items-center gap-3 py-3 px-5 hover:bg-slate-100 hover:text-accent focus:bg-white focus:text-accent'
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor"
                        strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sing out
                </button>
            </li>
        </>

    return (
        <header className='w-full shadow z-30 sticky top-0 left-0 bg-white'>
            <nav className="flex items-center justify-between w-11/12 mx-auto h-14 relative">
                <div className="logo lg:flex-none flex justify-between items-center lg:w-auto w-full">
                    <Link to='/' className='md:text-2xl text-xl font-medium'>Enlistco</Link>

                    {/* ===================================================
                        tablet and mobile view
                    =================================================== */}
                    <div className='flex items-center gap-6 lg:hidden'>

                        {/* ======================
                            Notification bell icon
                        ====================== */}
                        <ResMobile
                            usersData={usersData}
                            setOpenProfile={setOpenProfile}
                            openNotification={openNotification}
                            setOpenNotification={setOpenNotification}
                        />


                        {/* ====================Hamburger icon==================== */}
                        <span
                            id='hamburger'
                            className='cursor-pointer'
                            onClick={() => { setOpenMenu(!openMenu); setOpenProfile(false) }}>
                            {
                                !openMenu && <MenuAlt3Icon className='w-8 h-8'></MenuAlt3Icon>
                            }
                        </span>
                    </div>
                </div>

                {/* ===================================================
                                Desktop view
                =================================================== */}
                <div className='lg:block hidden'>
                    <ul className='lg:flex lg:gap-8 lg:items-center list-none'>
                        {menuLeft}
                    </ul>
                </div>
                <div className='lg:block hidden'>
                    <ul className='list-none lg:flex lg:gap-5 lg:items-center'>
                        {user_token ? <>
                            {/* ==================Notification bell icon================== */}
                            <ResDesktop
                                usersData={usersData}
                                setOpenProfile={setOpenProfile}
                                openNotification={openNotification}
                                setOpenNotification={setOpenNotification}
                            />

                            {/* ==================Profile icon================== */}
                            <li
                                onClick={() => {
                                    setOpenProfile(!openProfile);
                                    setOpenNotification(false)
                                }}
                                className='text-gray-500 duration-300 text-base my-0 relative'>
                                <div className="w-11 h-full rounded-full cursor-pointer hover:text-primary dashboard_icon">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-full w-full" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor"
                                        strokeWidth="1.8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <ul className={`list-none rounded bg-white shadow-md w-60 absolute top-12 border -right-2 ${openProfile ? 'block' : 'hidden'}`}>
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
                    <ul className={`absolute list-none top-0 right-0 md:w-96 sm:w-1/2 w-4/5 h-screen bg-white overflow-y-auto scrollBar-none`}>

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
                                onClick={() => setOpenMenu(!openMenu)}
                            >Find Jobs
                            </Link>
                        </li>
                        <li>
                            <Link
                                className='w-full sm:text-lg text-base flex items-center gap-3 py-3 px-14 hover:bg-slate-100 hover:text-accent focus:bg-white focus:text-accent'
                                to='/job-form/contact'
                            >Post a job
                            </Link>
                        </li>
                        {
                            !usersData?.admin &&
                            <li>
                                <Link
                                    className='w-full sm:text-lg text-base flex items-center gap-3 py-3 px-14 hover:bg-slate-100 hover:text-accent focus:bg-white focus:text-accent'
                                    to='/form/seeker-contact'
                                >Upload Your Resume
                                </Link>
                            </li>
                        }

                        {/* ==========Dashboard menu========== */}
                        {
                            user_token ? <>
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