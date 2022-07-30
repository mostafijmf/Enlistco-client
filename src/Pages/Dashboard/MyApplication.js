import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const MyApplication = () => {
    return (
        <div className='w-full h-screen'>
            <div>
                <ul className='bg-slate-100 flex items-center justify-center pl-10 gap-10 h-10 shadow'>
                    <li><Link to='/dashboard/application/applied' className='text-lg hover:text-accent duration-300 '>Applied</Link></li>
                    <li><Link to='/dashboard/application/post' className='text-lg hover:text-accent duration-300 '>Post-job</Link></li>
                </ul>
            </div>
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default MyApplication;