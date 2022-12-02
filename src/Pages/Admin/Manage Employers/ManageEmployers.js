import React from 'react';
import useGetAllUsers from '../../../hooks/useGetAllUsers';
import PageTitle from '../../Shared/PageTitle';
import Spinner from '../../Shared/Spinner';
import EmployerList from './EmployerList';

const ManageEmployers = () => {
    const [allUsers, loading] = useGetAllUsers();

    if (loading) {
        return <div className='w-full h-screen flex items-center justify-center'>
            <Spinner></Spinner>
        </div>
    };

    const employer = allUsers.filter(rec => rec.employer);


    return (<>
        <PageTitle title='Manage Employers - Dashboard'></PageTitle>
        <h1 className='text-2xl text-center my-5 text-accent font-medium'>Manage employers</h1>
        <div className="overflow-x-auto mb-10 w-auto mx-2">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th className='py-3 normal-case text-base font-medium'>
                            ({employer.length})
                        </th>
                        <th className='py-3 normal-case text-base font-medium'>Name</th>
                        <th className='py-3 normal-case text-base font-medium'>Company</th>
                        <th className='py-3 normal-case text-base font-medium'>Free Post</th>
                        <th className='py-3 normal-case text-base font-medium'>Paid Post</th>
                        <th className='py-3 normal-case text-base font-medium'>Total paid</th>
                        <th className='py-3 normal-case text-base font-medium'>Payment option</th>
                        <th className='py-3 normal-case text-base font-medium'>Delete user</th>
                    </tr>
                </thead>
                {employer.map((emp, index) =>
                    <EmployerList
                        key={emp._id}
                        emp={emp}
                        index={index}
                    />
                )}
            </table>
        </div>
    </>);
};

export default ManageEmployers;