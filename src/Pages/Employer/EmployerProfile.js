import React from 'react';

const EmployerProfile = ({ employer }) => {
    const {employerEmail, receiveEmail} = employer;

    return (
        <div className='md:w-4/5 sm:w-11/12 w-full mx-auto sm:p-8 p-4 shadow-lg border rounded-md mb-20'>
            <h1 className='text-center md:text-3xl sm:text-2xl text-xl font-medium'>Employer</h1>
            <div className='mt-5 relative'>
                <ul>
                    <li className='mt-2 text-base font-medium'>Your email :
                        <span className='font-normal ml-2'>{employerEmail}</span>
                    </li>
                    <li className='mt-2 text-base font-medium'>Receive email :
                        <span className='font-normal ml-2'>{receiveEmail}</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default EmployerProfile;