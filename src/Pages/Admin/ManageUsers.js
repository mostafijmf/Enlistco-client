import React from 'react';
import useGetAllUsers from '../../hooks/useGetAllUsers';
import AUser from './AUser';

const ManageUsers = () => {
    const [allUsers] = useGetAllUsers();

    return (
        <div className="overflow-x-auto">
            <table className="table w-full" id='exportToxlsx'>
                <thead>
                    <tr>
                        <th className='bg-slate-100 py-3 rounded-t-none normal-case text-base font-medium'>No.</th>
                        <th className='bg-slate-100 py-3 normal-case text-base font-medium'>Name</th>
                        <th className='bg-slate-100 py-3 normal-case text-base font-medium'>Seeker/Employer</th>
                        <th className='bg-slate-100 py-3 normal-case text-base font-medium'>Email</th>
                        <th className='bg-slate-100 py-3 normal-case text-base font-medium'></th>
                    </tr>
                </thead>
                {allUsers.map((user, index) =>
                    <AUser
                        key={user._id}
                        user={user}
                        index={index}>
                    </AUser>)}
            </table>
        </div>
    );
};

export default ManageUsers;