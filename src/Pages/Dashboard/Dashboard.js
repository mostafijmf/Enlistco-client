import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import useGetUsers from '../../hooks/useGetUsers';
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header';
import PageTitle from '../Shared/PageTitle';
import Spinner from '../Shared/Spinner';

const Dashboard = () => {
    const [usersData, loading] = useGetUsers();

    if (loading) {
        return <div className='h-screen w-full flex items-center justify-center'>
            <Spinner></Spinner>
        </div>
    };
    const { admin, employer, seeker } = usersData;

    return (<>
        <PageTitle title='Dashboard'></PageTitle>
        <Header></Header>
        <section className='w-full bg-slate-100 grid grid-cols-9'>

            {/* ==============Sidebar============== */}
            <div className='lg:col-span-2 border-r relative lg:block hidden'>
                <ul className="list-none h-[calc(100vh-3.5rem)] sticky top-14 left-0 pt-2">
                    {
                        admin ? <>
                            <li>
                                <Link
                                    className='w-full flex items-center gap-3 py-3 px-10 hover:bg-white hover:text-accent focus:bg-white focus:text-accent'
                                    to='/dashboard/manage-employers'
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>Manage Employers
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className='w-full flex items-center gap-3 py-3 px-10 hover:bg-white hover:text-accent focus:bg-white focus:text-accent'
                                    to='/dashboard/manage-seekers'
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
                                    </svg>Manage Seekers
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className='w-full flex items-center gap-3 py-3 px-10 hover:bg-white hover:text-accent focus:bg-white focus:text-accent'
                                    to='/dashboard/manage-job-post'>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                    </svg>Manage Post
                                </Link>
                            </li>
                            {employer && <>
                                <li>
                                    <Link
                                        className='w-full flex items-center gap-3 py-3 px-10 hover:bg-white hover:text-accent focus:bg-white focus:text-accent'
                                        to='/dashboard/job'
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
                                        className='w-full flex items-center gap-3 py-3 px-10 hover:bg-white hover:text-accent focus:bg-white focus:text-accent'
                                        to='/dashboard/seeker-applications'
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
                            </>}
                        </> : <>
                            <li className=''>
                                <Link
                                    className='w-full flex items-center gap-3 py-3 px-10 hover:bg-white hover:text-accent focus:bg-white focus:text-accent'
                                    to='/dashboard/user-profile'
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>My Profile
                                </Link>
                            </li>
                            {
                                seeker && <li className=''>
                                    <Link
                                        className='w-full flex items-center gap-3 py-3 px-10 hover:bg-white hover:text-accent focus:bg-white focus:text-accent'
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

                            {employer && <>
                                <li>
                                    <Link
                                        className='w-full flex items-center gap-3 py-3 px-10 hover:bg-white hover:text-accent focus:bg-white focus:text-accent'
                                        to='/dashboard/job'
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
                                        className='w-full flex items-center gap-3 py-3 px-10 hover:bg-white hover:text-accent focus:bg-white focus:text-accent'
                                        to='/dashboard/seeker-applications'
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
                            </>}
                        </>
                    }
                </ul>
            </div>

            {/* ==============content area============== */}
            <div className='lg:col-span-7 col-span-9 h-full'>
                <Outlet></Outlet>
            </div>
        </section>
        <Footer></Footer>
    </>);
};

export default Dashboard;