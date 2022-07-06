import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <section>
            <div class="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content scrollBar">
                    <label title='Open sidebar' htmlFor="my-drawer-2" className='cursor-pointer absolute z-30 text-5xl left-2 h-screen flex items-center lg:hidden'>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 bg-slate-300 rounded" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </label>
                    <Outlet></Outlet>
                </div>
                <div class="drawer-side">
                    <label for="my-drawer-2" class="drawer-overlay"></label>
                    <ul class="menu bg-slate-100 sticky top-0 h-screen border-r p-4 overflow-y-auto w-80 text-base-content">
                        <li><Link className='w-full px-5 hover:text-accent focus:text-accent' to='/dashboard/userProfile'>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>My Profile
                        </Link>
                        </li>
                        <li><Link className='w-full px-5 hover:text-accent focus:text-accent' to='/dashboard/userApplication'>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            My Application
                        </Link>
                        </li>
                        <label title='Close' htmlFor="my-drawer-2" className='cursor-pointer absolute text-5xl right-1 top-0 bottom-0 flex items-center lg:hidden'>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 bg-slate-300 rounded" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </label>
                    </ul>

                </div>
            </div>
        </section>
    );
};

export default Dashboard;