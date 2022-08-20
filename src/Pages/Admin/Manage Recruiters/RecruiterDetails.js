import { XIcon } from '@heroicons/react/solid';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageTitle from '../../Shared/PageTitle';

const RecruiterDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const {
        firstName,
        lastName,
        email,
        employer
    } = location?.state?.emp;

    return (<>
        <PageTitle title='Recruiter Details - Dashboard'></PageTitle>
        <div className='md:w-9/12 sm:w-11/12 w-full mx-auto sm:p-8 p-4 my-5 shadow-lg border rounded-md relative'>
            <div className='absolute top-3 right-3' onClick={() => navigate(-1)}>
                <XIcon className='w-8 h-8 hover:bg-slate-200 p-1 rounded-full cursor-pointer'></XIcon>
            </div>
            <h1 className='text-center text-gray-600 md:text-3xl sm:text-2xl text-xl font-medium'>{firstName} {lastName}</h1>
            <h2 className='text-center text-gray-600 text-lg'>{location?.state?.company}</h2>
            <h3 className='text-center text-gray-600 text-lg'>{email}</h3>
        </div>
    </>
    );
};

export default RecruiterDetails;