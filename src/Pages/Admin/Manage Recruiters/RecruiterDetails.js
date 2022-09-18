import { MailIcon, XIcon } from '@heroicons/react/solid';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageTitle from '../../Shared/PageTitle';
import companyIcon from '../../../images/icons/company.png';

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
        <div className='bg-white md:w-9/12 sm:w-11/12 w-full mx-auto sm:p-8 p-4 my-5 shadow-md border rounded-md relative'>
            <div className='absolute top-3 right-3' onClick={() => navigate(-1)}>
                <XIcon className='w-8 h-8 hover:bg-slate-200 p-1 rounded-full cursor-pointer'></XIcon>
            </div>
            <h1 className='text-center text-gray-600 md:text-3xl sm:text-2xl text-xl font-medium'>{firstName} {lastName}</h1>
            <h2 className='text-gray-500 text-lg font-medium my-1 flex items-center justify-center gap-3'>
                <img className='w-5 h-5' src={companyIcon} alt="company icon" />
                {location?.state?.company}
            </h2>
            <h2 className='text-gray-500 text-lg flex items-center justify-center gap-3'>
                <MailIcon className='w-6 h-6 text-gray-500'></MailIcon>
                {email}
            </h2>
        </div>
    </>
    );
};

export default RecruiterDetails;