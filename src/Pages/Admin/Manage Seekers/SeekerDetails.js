import { XIcon } from '@heroicons/react/solid';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageTitle from '../../Shared/PageTitle';

const SeekerDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const {
        firstName,
        lastName,
        email,
        phone,
        address,
        state,
        country,
        zip,
        education,
        jobExperience,
        seeker,
        employer,
        seekerAbout
    } = location?.state;
    const jobExp = jobExperience && jobExperience[jobExperience.length - 1];

    return (<>
        <PageTitle title='Seeker Details - Dashboard'></PageTitle>
        <div className='md:w-9/12 sm:w-11/12 w-full mx-auto sm:p-8 p-4 my-5 shadow-lg border rounded-md relative'>
            <div className='absolute top-3 right-3' onClick={() => navigate(-1)}>
                <XIcon className='w-8 h-8 hover:bg-slate-200 p-1 rounded-full cursor-pointer'></XIcon>
            </div>
            {seeker && <>
                <div>
                    <h1 className='text-center text-gray-600 md:text-3xl sm:text-2xl text-xl font-medium'>{firstName} {lastName}</h1>
                    <h2 className='text-center text-gray-600 sm:text-xl text-lg'>{jobExp?.exJobTitle}</h2>
                    <ul className='border-t mt-5'>
                        <li className='mt-2 text-base font-medium'>Email :
                            <span className='font-normal ml-2'>{email}</span>
                        </li>
                        <li className='mt-2 text-base font-medium'>Phone :
                            <span className='font-normal ml-2'>{phone}</span>
                        </li>
                        <li className='mt-2 text-base font-medium'>Address :
                            <span className='font-normal ml-2'>{address}</span>
                        </li>
                        <li className='mt-2 text-base font-medium'>City/State :
                            <span className='font-normal ml-2'>{state}</span>
                        </li>
                        <li className='mt-2 text-base font-medium'>Country :
                            <span className='font-normal ml-2'>{country}</span>
                        </li>
                        <li className='mt-2 text-base font-medium'>Zip code :
                            <span className='font-normal ml-2'>{zip}</span>
                        </li>{
                            seekerAbout &&
                            <li className='mt-2'>
                                <h2 className='text-center text-gray-600 font-medium sm:text-xl text-lg my-2'>About</h2>
                                <hr />
                                <p className='p-3'>{seekerAbout}</p>
                            </li>
                        }
                    </ul>
                </div>
                {education &&
                    <div className='mt-10'>
                        <h1 className='text-center text-gray-600 md:text-3xl sm:text-2xl text-xl'>Education</h1>
                        <div className='border-t mt-5 relative'>
                            {education?.map((edu, index) =>
                                <ul key={index} className='my-5 relative'>
                                    <li className='mt-2 text-base font-medium'>Degree :
                                        <span className='font-normal ml-2'>{edu.degree}</span>
                                    </li>
                                    <li className='mt-2 text-base font-medium'>Institution :
                                        <span className='font-normal ml-2'>{edu.institution}</span>
                                    </li>
                                    <li className='mt-2 text-base font-medium'>Subject/Group :
                                        <span className='font-normal ml-2'>{edu.edugroup}</span>
                                    </li>
                                    <li className='mt-2 text-base font-medium'>Start Date :
                                        <span className='font-normal ml-2'>{edu.eduStartDate}</span>
                                    </li>
                                    {edu.eduEndDate ?
                                        <li className='mt-2 text-base font-medium'>End Date :
                                            <span className='font-normal ml-2'>{edu.eduEndDate}</span>
                                        </li>
                                        :
                                        <li className='mt-2 text-base font-medium'>{edu.eduStudying}</li>
                                    }
                                </ul>)
                            }
                        </div>
                    </div>
                }
                {jobExperience &&
                    <div className='mt-10'>
                        <h1 className='text-center text-gray-600 md:text-3xl sm:text-2xl text-xl'>Job Experience</h1>
                        <div className='border-t mt-5 relative'>
                            {
                                jobExperience.map((ex, index) =>
                                    <ul key={index} className='my-5 relative'>
                                        <li className='mt-2 text-base font-medium'>Job Title :
                                            <span className='font-normal ml-2'>{ex.exJobTitle}</span>
                                        </li>
                                        <li className='mt-2 text-base font-medium'>Company :
                                            <span className='font-normal ml-2'>{ex.exCompany}</span>
                                        </li>
                                        <li className='mt-2 text-base font-medium'>Start Date :
                                            <span className='font-normal ml-2'>{ex.exStartDate}</span>
                                        </li>
                                        {
                                            ex.exEndDate ?
                                                <li className='mt-2 text-base font-medium'>End Date :
                                                    <span className='font-normal ml-2'>{ex.exEndDate}</span>
                                                </li>
                                                :
                                                <li className='mt-2 text-base font-medium'>{ex.exWorking}</li>
                                        }
                                        <li className='mt-2 text-base font-medium'>Responsibilities :
                                            <p className='font-normal'>{ex.exResponsibilities}</p>
                                        </li>
                                    </ul>
                                )
                            }
                        </div>
                    </div>
                }
            </>}
            {employer &&
                <div className='mt-10'>
                    <h1 className='text-center text-gray-600 md:text-3xl sm:text-2xl text-xl'>Employer</h1>
                    <div className='border-t mt-5'>
                        <ul className='my-5'>
                            <li className='mt-2 text-base font-medium'>Employer email :
                                <span className='font-normal ml-2'>{email}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            }
        </div>
    </>
    );
};

export default SeekerDetails;