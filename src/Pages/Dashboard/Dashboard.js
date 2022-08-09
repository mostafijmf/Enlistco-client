import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import useAdmin from '../../hooks/useAdmin';
import useGetUsers from '../../hooks/useGetUsers';
import Footer from '../Shared/Footer';
import Header from '../Shared/Header';
import PageTitle from '../Shared/PageTitle';
import Spinner from '../Shared/Spinner';

const Dashboard = () => {
    const [admin, adminLoading] = useAdmin();
    const [usersData] = useGetUsers();
    const emp = usersData[0]?.employer;
    if (adminLoading) {
        return <div className='h-screen w-full flex items-center justify-center'>
            <Spinner></Spinner>
        </div>
    };
    return (<>
        <PageTitle title='Dashboard'></PageTitle>
        <Header></Header>
        <section>
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content sm:scrollBar-none scrollBar">
                    <label title='Open sidebar' htmlFor="my-drawer-2" className='cursor-pointer absolute z-30 text-5xl left-0 h-screen flex items-center lg:hidden'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 bg-slate-300/40 rounded" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </label>
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side lg:z-0">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu bg-slate-100 sticky top-0 h-screen border-r p-4 overflow-y-auto w-72 text-base-content">
                        {
                            admin.admin ? <>
                                <li><Link
                                    className='w-full px-5 hover:text-accent focus:text-accent' to='/dashboard/manage-recruiters'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>Manage Recruiters
                                </Link>
                                </li>
                                <li><Link className='w-full px-5 hover:text-accent focus:text-accent' to='/dashboard/manage-seekers'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>Manage Seekers
                                </Link></li>
                                <li><Link className='w-full px-5 hover:text-accent focus:text-accent' to='/dashboard/manage-job-post'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                    </svg>Manage Post
                                </Link></li>
                                <li><Link className='w-full px-5 hover:text-accent focus:text-accent' to='/dashboard/admin-job-post'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>My Post
                                </Link></li>
                                {
                                    emp &&
                                    <li><Link className='w-full px-5 hover:text-accent focus:text-accent' to='/dashboard/seeker-applications'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                        </svg>
                                        Seeker Applications
                                    </Link></li>
                                }
                            </> : <>
                                <li><Link className='w-full px-5 hover:text-accent focus:text-accent' to='/dashboard/user-profile'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>My Profile
                                </Link></li>

                                <li><Link className='w-full px-5 hover:text-accent focus:text-accent' to='/dashboard/application/applied'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    My Application
                                </Link></li>
                                {
                                    emp &&
                                    <li><Link className='w-full px-5 hover:text-accent focus:text-accent' to='/dashboard/seeker-applications'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                        </svg>
                                        Seeker Applications
                                    </Link></li>
                                }
                            </>
                        }
                        <label title='Close' htmlFor="my-drawer-2" className='cursor-pointer absolute text-5xl right-1 top-0 bottom-0 flex items-center lg:hidden'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 bg-slate-300/40 rounded" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </label>
                    </ul>

                </div>
            </div>
        </section>
        <Footer></Footer>
    </>);
};

export default Dashboard;