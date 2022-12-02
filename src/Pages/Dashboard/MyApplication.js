import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import useGetUsers from '../../hooks/useGetUsers';

const MyApplication = () => {
    const [usersData] = useGetUsers();

    return (
        <div className='w-full h-screen'>
            {
                usersData?.employer && usersData?.seeker &&
                <div>
                    <ul className='list-none bg-white flex items-center justify-center pl-10 gap-10 h-10 shadow'>
                        {
                            usersData?.employer && <li><Link to='/dashboard/application/post' className='text-lg hover:text-accent duration-200 font-medium'>Job-post</Link></li>
                        }
                        {
                            usersData?.seeker && <li><Link to='/dashboard/application/applied' className='text-lg hover:text-accent duration-200 font-medium'>Applied</Link></li>
                        }
                    </ul>
                </div>
            }
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default MyApplication;