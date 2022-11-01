import { InboxInIcon, MailIcon } from '@heroicons/react/solid';
import React from 'react';

const EmployerProfile = ({ employer }) => {
    const { employerEmail, receiveEmail } = employer;

    return (
        <div className='bg-white xl:w-9/12 md:w-4/5 sm:w-11/12 w-full mx-auto sm:p-8 p-4 shadow-md border rounded-md'>
            <h1 className='text-center md:text-3xl sm:text-2xl text-xl font-medium'>Employer</h1>
            <div className='mt-5 relative'>
                <ul className='list-none'>
                    <li className='mt-2 text-base flex'>
                        <div className='font-medium flex items-center gap-3'>
                            <MailIcon className='w-6 h-6 text-gray-500'></MailIcon>
                            Your email :
                        </div>
                        <span className='ml-2'>{employerEmail}</span>
                    </li>
                    <li className='mt-2 text-base flex'>
                        <div className='font-medium flex items-center gap-3'>
                            <InboxInIcon className='w-6 h-6 text-gray-500'></InboxInIcon>
                            Receive email :
                        </div>
                        <span className='ml-2'>{receiveEmail}</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default EmployerProfile;