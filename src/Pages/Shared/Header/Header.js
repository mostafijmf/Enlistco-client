import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MenuAlt3Icon, XIcon } from '@heroicons/react/solid';
import useGetUsers from '../../../hooks/useGetUsers';
import useGetPost from '../../../hooks/useGetPost';
import './Header.css';
import axios from 'axios';

const Header = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const [openNotification, setOpenNotification] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [usersData] = useGetUsers();
    const [myPost] = useGetPost(null);
    const emp = myPost[0]?.permission;
    const navigate = useNavigate();
    const user_token = localStorage.getItem('user_token');

    // =============Get Notifications=============
    useEffect(() => {
        axios.get('https://api.enlistco.co.in/notifications', {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('user_token')
            }
        })
            .then(res => {
                setNotifications(res.data);
            })
            .catch(err => { });
    }, [notifications, navigate]);
    const notifyAdmin = notifications?.filter(adm => adm.notifyAdmin);
    const notifyPermission = notifications?.filter(p => p.permission);
    const notifySeeker = notifyPermission?.filter(n => n.notifyUsers.indexOf(usersData?._id) === -1);

    // Admin seen notification event
    const adminSeenNotif = async (id, postId) => {
        await axios.put(`https://api.enlistco.co.in/admin_seen_notification/${id}`,
            { notifyAdmin: false },
            {
                method: 'PUT',
                headers: {
                    'Authorization': localStorage.getItem('user_token')
                }
            })
            .then(res => {
                res && navigate('/dashboard/manage-job-post', {
                    state: postId
                })
            })
            .catch(err => {
                if (err?.response?.data?.logout) {
                    localStorage.removeItem('user_token');
                    return navigate('/login');
                }
            });
    };

    // Seeker seen notification event
    const seekerSeenNotif = async (id, postId) => {
        await axios.put(`https://api.enlistco.co.in/seeker_seen_notification/${id}`,
            { seekerId: usersData?._id },
            {
                method: 'PUT',
                headers: {
                    'Authorization': localStorage.getItem('user_token')
                }
            })
            .then(res => {
                res && navigate(`/job/${postId.slice(5, 20)}`)
            })
            .catch(err => {
                if (err?.response?.data?.logout) {
                    localStorage.removeItem('user_token');
                    return navigate('/login');
                }
            });
    };


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
                <Link to='/employer-form/contact'>Post a job</Link>
            </li>
            {
                !usersData?.admin &&
                <li className='hover:text-primary duration-300 sm:text-lg text-base my-5 lg:my-0 relative before:duration-300 hover:before:content-[""] hover:before:absolute hover:before:w-full hover:before:h-0.5 hover:before:bg-primary hover:before:-bottom-1 hover:before:left-0'>
                    <Link to='/form/user-contact'>Upload Your Resume</Link>
                </li>
            }
        </>
    const menuRight =
        <>
            {
                usersData?.admin ? <>
                    <li><Link className='w-full flex items-center gap-3 py-3 px-5 hover:bg-slate-100 hover:text-accent focus:bg-white focus:text-accent' to='/dashboard/manage-employers'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor"
                            strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        Manage Employers
                    </Link></li>
                    <li><Link className='w-full flex items-center gap-3 py-3 px-5 hover:bg-slate-100 hover:text-accent focus:bg-white focus:text-accent' to='/dashboard/manage-seekers'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor"
                            strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>Manage Seekers
                    </Link></li>
                    <li><Link className='w-full flex items-center gap-3 py-3 px-5 hover:bg-slate-100 hover:text-accent focus:bg-white focus:text-accent' to='/dashboard/manage-job-post'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor"
                            strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>Manage Post
                    </Link></li>
                    <li><Link className='w-full flex items-center gap-3 py-3 px-5 hover:bg-slate-100 hover:text-accent focus:bg-white focus:text-accent' to='/dashboard/admin-job-post'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor"
                            strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>My Post
                    </Link></li>
                    {
                        emp &&
                        <li><Link className='w-full flex items-center gap-3 py-3 px-5 hover:bg-slate-100 hover:text-accent focus:bg-white focus:text-accent' to='/dashboard/seeker-applications'>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor"
                                strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                            </svg>
                            Seeker Applications
                        </Link></li>
                    }
                </> : <>
                    <li>
                        <Link className='w-full flex items-center gap-3 py-3 px-5 hover:bg-slate-100 hover:text-accent focus:bg-white focus:text-accent' to='/dashboard/user-profile'>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor"
                                strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>My Profile
                        </Link>
                    </li>
                    <li><Link className='w-full flex items-center gap-3 py-3 px-5 hover:bg-slate-100 hover:text-accent focus:bg-white focus:text-accent' to='/dashboard/application/applied'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor"
                            strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        My Application
                    </Link></li>
                    {
                        emp &&
                        <li><Link className='w-full flex items-center gap-3 py-3 px-5 hover:bg-slate-100 hover:text-accent focus:bg-white focus:text-accent' to='/dashboard/seeker-applications'>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor"
                                strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                            </svg>
                            Seeker Applications
                        </Link></li>
                    }
                </>
            }
            <li><Link className='w-full flex items-center gap-3 py-3 px-5 hover:bg-slate-100 hover:text-accent focus:bg-white focus:text-accent' to='/help-center'>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor"
                    strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Help Center
            </Link></li>
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

                    {/* ===========tablet and mobile view=========== */}
                    <div className='flex items-center gap-6 lg:hidden'>
                        {/* ====================Notification bell icon==================== */}
                        {user_token &&
                            <div
                                onClick={() => {
                                    setOpenNotification(!openNotification);
                                    setOpenProfile(false)
                                }}
                                className='text-gray-500 duration-300 text-base my-5 lg:my-0 relative'>
                                {/* ------------Admin notification bell------------ */}
                                {usersData?.admin &&
                                    notifyAdmin.length !== 0 &&
                                    <span className='absolute -top-2 left-3 z-10 text-xs font-medium bg-accent text-white px-2 py-0.5 rounded-full'>{
                                        notifyAdmin.length > 20 ? '20+' : notifyAdmin.length
                                    }</span>
                                }
                                {/* ------------Seeker notification bell------------ */}
                                {usersData?.seeker &&
                                    notifySeeker.length !== 0 &&
                                    <span className='absolute -top-2 left-3 z-10 text-xs font-medium bg-accent text-white px-2 py-0.5 rounded-full'>{
                                        notifySeeker.length > 20 ? '20+' : notifySeeker.length
                                    }</span>
                                }

                                {/* ------------Notification Icon------------ */}
                                <div
                                    className="w-8 h-full rounded-full cursor-pointer hover:text-primary notification_icon">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor"
                                        strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                </div>

                                <div className={`rounded bg-white shadow-lg sm:w-96 w-80 absolute top-9 border sm:right-0 -right-16 ${openNotification ? 'block' : 'hidden'}`}>
                                    <h2 className='px-5 py-3 border-b text-lg text-gray-700 font-medium text-center'>Notifications</h2>
                                    <ul
                                        className={`
                                            list-none 
                                            ${usersData?.admin &&
                                                notifyAdmin.length > 6 ?
                                                'h-[calc(100vh-8.5rem)] overflow-y-auto scrollBar-sm'
                                                : 'h-max'}
                                            ${usersData?.seeker &&
                                                notifySeeker.length > 6 ?
                                                'h-[calc(100vh-8.5rem)] overflow-y-auto scrollBar-sm'
                                                : 'h-max'}`
                                        }
                                    >
                                        {/* ------------Admin notification list------------ */}
                                        {usersData?.admin && <>
                                            {
                                                notifyAdmin.map(n => <li key={n._id}
                                                    onClick={() => adminSeenNotif(n._id, n.postId)}
                                                    className='w-full py-1 px-5 hover:bg-slate-100 hover:text-accent focus:bg-white focus:text-accent cursor-pointer'
                                                    to='/dashboard/manage-employers'>
                                                    <h3 className='font-medium text-base'>
                                                        {n.jobTitle}
                                                        <span className='ml-2 text-sm font-normal text-fuchsia-500 px-1'>new post</span>
                                                    </h3>
                                                    <p className='text-sm'>{n.company}</p>
                                                </li>)
                                            }
                                            {
                                                notifyAdmin.length === 0 && <li
                                                    className='w-full py-2 px-5 text-center'
                                                >
                                                    There is no notifications.
                                                </li>
                                            }
                                        </>}
                                        {/* ------------Admin notification list------------ */}
                                        {usersData?.seeker && <>
                                            {
                                                notifySeeker.map(n => <li key={n._id}
                                                    onClick={() => seekerSeenNotif(n._id, n.postId)}
                                                    className='w-full py-1 px-5 hover:bg-slate-100 hover:text-accent focus:bg-white focus:text-accent cursor-pointer'
                                                    to='/dashboard/manage-employers'>
                                                    <h3 className='font-medium text-base'>
                                                        {n.jobTitle}
                                                        <span className='ml-2 text-sm font-normal text-fuchsia-500 px-1'>new post</span>
                                                    </h3>
                                                    <p className='text-sm'>{n.company}</p>
                                                </li>)
                                            }
                                            {
                                                notifySeeker.length === 0 && <li className='w-full py-2 px-5 text-center'>
                                                    There is no notifications.
                                                </li>
                                            }
                                        </>}
                                    </ul>
                                </div>
                            </div>
                        }

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

                {/* ===========Desktop view=========== */}
                <div className='lg:block hidden'>
                    <ul className='lg:flex lg:gap-8 lg:items-center list-none'>
                        {menuLeft}
                    </ul>
                </div>
                <div className='lg:block hidden'>
                    <ul className='list-none lg:flex lg:gap-5 lg:items-center'>
                        {user_token ? <>
                            {/* ==================Notification bell icon================== */}
                            <li
                                onClick={() => {
                                    setOpenNotification(!openNotification);
                                    setOpenProfile(false)
                                }}
                                className='text-gray-500 text-base relative'
                            >
                                {/* ------------Admin notification bell------------ */}
                                {usersData?.admin &&
                                    notifyAdmin.length !== 0 &&
                                    <span className='absolute -top-2 left-3 z-10 text-xs font-medium bg-accent text-white px-2 py-0.5 rounded-full'>{
                                        notifyAdmin.length > 20 ? '20+' : notifyAdmin.length
                                    }</span>
                                }
                                {/* ------------Seeker notification bell------------ */}
                                {usersData?.seeker &&
                                    notifySeeker.length !== 0 &&
                                    <span className='absolute -top-2 left-3 z-10 text-xs font-medium bg-accent text-white px-2 py-0.5 rounded-full'>{
                                        notifySeeker.length > 20 ? '20+' : notifySeeker.length
                                    }</span>
                                }

                                {/* ------------Notification Icon------------ */}
                                <div
                                    className="w-8 h-full cursor-pointer hover:text-primary notification_icon">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor"
                                        strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                </div>

                                <div
                                    className={`rounded bg-white shadow-lg w-96 absolute top-9 border right-0 ${openNotification ? 'block' : 'hidden'}`}
                                >
                                    <h2 className='px-5 py-3 border-b text-lg text-gray-700 font-medium text-center'>Notifications</h2>
                                    <ul
                                        className={`
                                            list-none 
                                            ${usersData?.admin &&
                                                notifyAdmin.length > 10 ?
                                                'h-[calc(100vh-8.5rem)] overflow-y-auto scrollBar-sm'
                                                : 'h-max'}
                                            ${usersData?.seeker &&
                                                notifySeeker.length > 10 ?
                                                'h-[calc(100vh-8.5rem)] overflow-y-auto scrollBar-sm'
                                                : 'h-max'}`
                                        }
                                    >
                                        {/* ------------Admin notification list------------ */}
                                        {usersData?.admin && <>
                                            {
                                                notifyAdmin.map(n => <li key={n._id}
                                                    onClick={() => adminSeenNotif(n._id, n.postId)}
                                                    className='w-full py-1 px-5 hover:bg-slate-100 hover:text-accent focus:bg-white focus:text-accent cursor-pointer'
                                                    to='/dashboard/manage-employers'>
                                                    <h3 className='font-medium text-base'>
                                                        {n.jobTitle}
                                                        <span className='ml-2 text-sm font-normal text-fuchsia-500 px-1'>new post</span>
                                                    </h3>
                                                    <p className='text-sm'>{n.company}</p>
                                                </li>)
                                            }
                                            {
                                                notifyAdmin.length === 0 && <li
                                                    className='w-full py-2 px-5 text-center'
                                                >
                                                    There is no notifications.
                                                </li>
                                            }
                                        </>}
                                        {/* ------------Seeker notification list------------ */}
                                        {usersData?.seeker && <>
                                            {
                                                notifySeeker.map(n => <li key={n._id}
                                                    onClick={() => seekerSeenNotif(n._id, n.postId)}
                                                    className='w-full py-1 px-5 hover:bg-slate-100 hover:text-accent focus:bg-white focus:text-accent cursor-pointer'
                                                    to='/dashboard/manage-employers'>
                                                    <h3 className='font-medium text-base'>
                                                        {n.jobTitle}
                                                        <span className='ml-2 text-sm font-normal text-fuchsia-500 px-1'>new post</span>
                                                    </h3>
                                                    <p className='text-sm'>{n.company}</p>
                                                </li>)
                                            }
                                            {
                                                notifySeeker.length === 0 && <li className='w-full py-2 px-5 text-center'>
                                                    There is no notifications.
                                                </li>
                                            }
                                        </>}
                                    </ul>
                                </div>
                            </li>

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
                            !usersData?.admin &&
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