import { HomeIcon, LocationMarkerIcon, MailIcon, OfficeBuildingIcon, PhoneIcon, XIcon } from '@heroicons/react/solid';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageTitle from '../../Shared/PageTitle';

const EmployerDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {
        firstName,
        lastName,
        company,
        email,
        phone,
        address,
        state,
        country,
        zip,
        employer,
    } = location?.state?.emp;

    return (<>
        <PageTitle title='Employer Details - Dashboard'></PageTitle>
        <div className='bg-white md:w-9/12 sm:w-11/12 w-full mx-auto sm:p-8 p-4 mt-5 mb-14 shadow-md border rounded-md relative'>
            <div className='absolute top-3 right-3' onClick={() => navigate(-1)}>
                <XIcon className='w-9 h-9 hover:bg-slate-100 duration-200 p-1 rounded-full cursor-pointer'></XIcon>
            </div>
            <div>
                <div className='border-b pb-2'>
                    <h1 className='text-center text-gray-600 md:text-3xl sm:text-2xl text-xl font-medium'>{firstName} {lastName}</h1>
                    <h2 className='text-center text-gray-600 sm:text-xl text-lg'>{company}</h2>
                </div>
                <ul className='list-none mt-5'>
                    <li className='mt-2 text-base flex'>
                        <div className='font-medium flex items-center gap-3'>
                            <MailIcon className='w-6 h-6 text-gray-500' />
                            Email :
                        </div>
                        <span className='ml-2'>{email}</span>
                    </li>
                    <li className='mt-4 text-base flex'>
                        <div className='font-medium flex items-center gap-3'>
                            <PhoneIcon className='w-6 h-6 text-gray-500' />
                            Phone :
                        </div>
                        <span className='ml-2'>{phone}</span>
                    </li>
                    <li className='mt-4 text-base flex'>
                        <div className='font-medium flex items-center gap-3'>
                            <HomeIcon className='w-6 h-6 text-gray-500' />
                            Address :
                        </div>
                        <span className='ml-2'>{address}</span>
                    </li>
                    <li className='mt-4 text-base flex'>
                        <div className='font-medium flex items-center gap-3'>
                            <OfficeBuildingIcon className='w-6 h-6 text-gray-500' />
                            City/State :
                        </div>
                        <span className='ml-2'>{state}</span>
                    </li>
                    <li className='mt-4 text-base flex'>
                        <div className='font-medium flex items-center gap-3'>
                            <LocationMarkerIcon className='w-6 h-6 text-gray-500' />
                            Country :
                        </div>
                        <span className='ml-2'>{country}</span>
                    </li>
                    <li className='mt-4 text-base flex'>
                        <div className='font-medium flex items-center gap-3'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-500">
                                <path d="M19.5 22.5a3 3 0 003-3v-8.174l-6.879 4.022 3.485 1.876a.75.75 0 01-.712 1.321l-5.683-3.06a1.5 1.5 0 00-1.422 0l-5.683 3.06a.75.75 0 01-.712-1.32l3.485-1.877L1.5 11.326V19.5a3 3 0 003 3h15z" />
                                <path d="M1.5 9.589v-.745a3 3 0 011.578-2.641l7.5-4.039a3 3 0 012.844 0l7.5 4.039A3 3 0 0122.5 8.844v.745l-8.426 4.926-.652-.35a3 3 0 00-2.844 0l-.652.35L1.5 9.59z" />
                            </svg>
                            Zip code :
                        </div>
                        <span className='ml-2'>{zip}</span>
                    </li>
                </ul>
            </div>
        </div>
    </>
    );
};

export default EmployerDetails;