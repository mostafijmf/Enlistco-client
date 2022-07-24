import React from 'react';
import useGetAllUsers from '../../hooks/useGetAllUsers';
import AUser from './AUser';

const ManageUsers = () => {
    const [allUsers] = useGetAllUsers();

    return (
        <div>
            <ul className='grid grid-cols-4 px-5 h-14 items-center sm:text-lg text-base text-gray-600 font-medium bg-slate-100'>
                <li><span className='mr-20'>No.</span>Name</li>
                <li>Seeker/Employer</li>
                <li>Email</li>
                <li></li>
            </ul>
            <hr />
            {allUsers.map((user, index) => <AUser key={user._id} user={user} index={index}></AUser>)}
        </div>
    );
};

export default ManageUsers;