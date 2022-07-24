import React from 'react';

const EmployerProfile = ({ employer }) => {
    const {employerEmail, receiveEmail} = employer;

    return (
        <div className='md:w-9/12 sm:w-4/5 w-11/12 mx-auto'>
            <h1 className='text-center  my-5 md:text-3xl sm:text-2xl text-xl font-medium mt-5'>Employer</h1>
            <div className='mt-5 mb-20 relative'>
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