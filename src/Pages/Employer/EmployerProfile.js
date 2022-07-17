import React from 'react';

const EmployerProfile = ({ emp }) => {
    const {employerEmail, receiveEmail} = emp;

    return (
        <div className='md:w-3/5 sm:w-4/5 w-11/12 mx-auto'>
            <h1 className='text-center text-3xl font-medium mt-5'>Employer</h1>
            <div className='mt-5 mb-20 relative'>
                <ul>
                    <li className='mt-4 text-lg font-medium'>Your email :
                        <span className='font-normal ml-2'>{employerEmail}</span>
                    </li>
                    <li className='mt-4 text-lg font-medium'>Receive email :
                        <span className='font-normal ml-2'>{receiveEmail}</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default EmployerProfile;