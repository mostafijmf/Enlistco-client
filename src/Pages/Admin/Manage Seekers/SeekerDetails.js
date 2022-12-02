import { AcademicCapIcon, BookOpenIcon, BriefcaseIcon, CheckCircleIcon, ClockIcon, HomeIcon, LocationMarkerIcon, MailIcon, OfficeBuildingIcon, PhoneIcon, XIcon } from '@heroicons/react/solid';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageTitle from '../../Shared/PageTitle';
import schoolIcon from '../../../images/icons/school.png'
import studyingIcon from '../../../images/icons/studying.png'
import companyIcon from '../../../images/icons/company.png'
import dutyIcon from '../../../images/icons/duty.png'

const SeekerDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const {
        firstName,
        lastName,
        seekerTitle,
        email,
        phone,
        address,
        state,
        country,
        zip,
        education,
        jobExperience,
        seeker,
        // employer,
        seekerAbout
    } = location?.state;
    const jobExp = jobExperience && jobExperience[jobExperience.length - 1];

    return (<>
        <PageTitle title='Seeker Details - Dashboard'></PageTitle>
        <div className='bg-white md:w-9/12 sm:w-11/12 w-full mx-auto sm:p-8 p-4 mt-5 mb-14 shadow-md border rounded-md relative'>
            <div className='absolute top-3 right-3' onClick={() => navigate(-1)}>
                <XIcon className='w-9 h-9 hover:bg-slate-100 p-1 rounded-full cursor-pointer'></XIcon>
            </div>

            {/* ======================Seeker about====================== */}
            {seeker && <>
                <div>
                    <div className='border-b pb-2'>
                        <h1 className='text-center text-gray-600 md:text-3xl sm:text-2xl text-xl font-medium'>
                            {firstName} {lastName}
                        </h1>
                        <h2 className='text-center text-gray-600 sm:text-xl text-lg'>
                            {seekerTitle || jobExp?.exJobTitle}
                        </h2>
                    </div>
                    <ul className='list-none mt-5'>
                        <li className='mt-2 text-base flex'>
                            <div className='font-medium flex items-center gap-3'>
                                <MailIcon className='w-6 h-6 text-gray-500'></MailIcon>
                                Email :
                            </div>
                            <span className='ml-2'>{email}</span>
                        </li>
                        <li className='mt-4 text-base flex'>
                            <div className='font-medium flex items-center gap-3'>
                                <PhoneIcon className='w-6 h-6 text-gray-500'></PhoneIcon>
                                Phone :
                            </div>
                            <span className='ml-2'>{phone}</span>
                        </li>
                        <li className='mt-4 text-base flex'>
                            <div className='font-medium flex items-center gap-3'>
                                <HomeIcon className='w-6 h-6 text-gray-500'></HomeIcon>
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
                        {
                            seekerAbout &&
                            <li className='mt-4'>
                                <h2 className='text-left font-medium sm:text-xl text-lg my-2'>About</h2>
                                <hr />
                                <p className='p-3'>{seekerAbout}</p>
                            </li>
                        }
                    </ul>
                </div>

                {/* ======================Seeker Education====================== */}
                {education &&
                    <div className='mt-10'>
                        <h1 className='text-center text-gray-600 md:text-3xl sm:text-2xl text-xl'>Education</h1>
                        <div className='border-t mt-5'>
                            {education?.map((edu, index) =>
                                <ul key={index} className='list-none my-5 relative'>
                                    <li className='mt-4 text-base flex'>
                                        <div className='font-medium flex items-center gap-3'>
                                            <AcademicCapIcon className='w-6 h-6 text-gray-500'></AcademicCapIcon>
                                            Degree :
                                        </div>
                                        <span className='ml-2'>{edu.degree}</span>
                                    </li>
                                    <li className='mt-4 text-base flex'>
                                        <div className='font-medium flex items-center gap-3'>
                                            <img className='w-6 h-6' src={schoolIcon} alt="school icon" />
                                            Institution :
                                        </div>
                                        <span className='ml-2'>{edu.institution}</span>
                                    </li>
                                    <li className='mt-4 text-base flex'>
                                        <div className='font-medium flex items-center gap-3'>
                                            <BookOpenIcon className='w-6 h-6 text-gray-500'></BookOpenIcon>
                                            Subject/Group :
                                        </div>
                                        <span className='ml-2'>{edu.edugroup}</span>
                                    </li>
                                    <li className='mt-4 text-base flex'>
                                        <div className='font-medium flex items-center gap-3'>
                                            <ClockIcon className='w-6 h-6 text-gray-500'></ClockIcon>
                                            Start Date :
                                        </div>
                                        <span className='ml-2'>{edu.eduStartDate}</span>
                                    </li>
                                    {
                                        edu.eduEndDate ?
                                            <li className='mt-4 text-base flex'>
                                                <div className='font-medium flex items-center gap-3'>
                                                    <CheckCircleIcon className='w-6 h-6 text-gray-500'></CheckCircleIcon>
                                                    End Date :
                                                </div>
                                                <span className='ml-2'>{edu.eduEndDate}</span>
                                            </li>
                                            :
                                            <li className='mt-4 text-base flex'>
                                                <div className='font-medium flex items-center gap-3'>
                                                    <img className='w-6 h-6' src={studyingIcon} alt="studying icon" />
                                                    {edu.eduStudying}
                                                </div>
                                            </li>
                                    }
                                </ul>)
                            }
                        </div>
                    </div>
                }

                {/* ======================Seeker Job Experience====================== */}
                {jobExperience &&
                    <div className='mt-10'>
                        <h1 className='text-center text-gray-600 md:text-3xl sm:text-2xl text-xl'>Job Experience</h1>
                        <div className='border-t mt-5 relative'>
                            {
                                jobExperience.map((ex, index) =>
                                    <ul key={index} className='list-none my-5 relative'>
                                        <li className='mt-4 text-base flex'>
                                            <div className='font-medium flex items-center gap-3'>
                                                <BriefcaseIcon className='w-6 h-6 text-gray-500'></BriefcaseIcon>
                                                Job Title :
                                            </div>
                                            <span className='ml-2'>{ex.exJobTitle}</span>
                                        </li>
                                        <li className='mt-4 text-base flex'>
                                            <div className='font-medium flex items-center gap-3'>
                                                <img className='w-6 h-6' src={companyIcon} alt="company icon" />
                                                Company :
                                            </div>
                                            <span className='ml-2'>{ex.exCompany}</span>
                                        </li>
                                        <li className='mt-4 text-base flex'>
                                            <div className='font-medium flex items-center gap-3'>
                                                <ClockIcon className='w-6 h-6 text-gray-500'></ClockIcon>
                                                Start Date :
                                            </div>
                                            <span className='ml-2'>{ex.exStartDate}</span>
                                        </li>
                                        {
                                            ex.exEndDate ?
                                                <li className='mt-4 text-base flex'>
                                                    <div className='font-medium flex items-center gap-3'>
                                                        <CheckCircleIcon className='w-6 h-6 text-gray-500'></CheckCircleIcon>
                                                        End Date :
                                                    </div>
                                                    <span className='ml-2'>{ex.exEndDate}</span>
                                                </li>
                                                :
                                                <li className='mt-4 text-base flex'>
                                                    <div className='font-medium flex items-center gap-3'>
                                                        <BriefcaseIcon className='w-6 h-6 text-gray-500'></BriefcaseIcon>
                                                        {ex.exWorking}
                                                    </div>
                                                </li>
                                        }
                                        <li className='mt-4 text-base flex'>
                                            <div className='flex items-start gap-3'>
                                                <img className='w-6 h-6' src={dutyIcon} alt="company icon" />
                                                <div>
                                                    <h3 className='font-medium'>Responsibilities :</h3>
                                                    <span>{ex.exResponsibilities}</span>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                )
                            }
                        </div>
                    </div>
                }
            </>}
        </div>
    </>
    );
};

export default SeekerDetails;