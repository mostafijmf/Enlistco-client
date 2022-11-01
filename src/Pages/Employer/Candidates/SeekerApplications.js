import { ArrowRightIcon, XIcon } from '@heroicons/react/solid';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import PageTitle from '../../Shared/PageTitle';
import Spinner from '../../Shared/Spinner';
import SeekerAppList from './SeekerAppList';

const SeekerApplications = () => {
    const [seekerApplyList, setSeekerApplyList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState('');
    const navigate = useNavigate();

    // ===============Fetch seeker applications===============
    useEffect(() => {
        axios.get('https://api.enlistco.co.in/apply/seeker_applications', {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('user_token')
            }
        })
            .then(res => {
                setSeekerApplyList(res.data);
                setLoading(false)
            })
            .catch(err => {
                setLoading(false);
                if (err?.response?.data?.logout) {
                    localStorage.removeItem('user_token');
                    return navigate('/login');
                }
            });
    }, [seekerApplyList, navigate]);

    if (loading) {
        return <div className='h-screen w-full flex items-center justify-center'>
            <Spinner></Spinner>
        </div>
    };

    if (seekerApplyList.length === 0) {
        return <div className='h-96 w-11/12 mx-auto flex flex-col justify-center gap-5 items-center'>
            <h1 className='md:text-4xl sm:text-3xl text-2xl text-center text-gray-500'>No one has applied yet.</h1>
        </div>
    };

    // ===============Download XLSX button===============
    const handleExport = () => {
        const table = document.getElementById("exportToxlsx");

        const wb = XLSX.utils.table_to_book(table);
        XLSX.writeFile(wb, 'SeekerData.xlsx');
    };

    return (<>
        <PageTitle title='Seeker Applications - Dashboard'></PageTitle>
        <section>
            {
                openModal ?
                    <div className='w-full py-10'>
                        <div className=' bg-white xl:w-3/5 md:w-3/4 sm:w-4/5 w-11/12 mx-auto py-5 sm:px-8 px-5 shadow-md border rounded-md relative'>
                            <div className='absolute top-3 right-3'>
                                <XIcon onClick={() => setOpenModal('')} className='w-8 h-8 hover:bg-slate-100 p-1 rounded-full cursor-pointer'></XIcon>
                            </div>
                            <h1 className='text-center sm:text-2xl text-xl pb-3'>Cover Letter</h1>
                            <hr />
                            <h2 className='sm:text-lg text-base font-medium mt-5 mb-3'>Subject : <span className='font-normal'>{openModal.subject}</span></h2>
                            <div dangerouslySetInnerHTML={{ __html: openModal.coverLetter }}></div>

                            {openModal?.bgCheck || openModal?.certification || openModal?.drivingLicense || openModal?.drugTest || openModal?.education || openModal?.gpa || openModal?.hybridWork || openModal?.remoteWork || openModal?.workExperience || openModal?.urgentHiring || openModal?.customQuestion ?
                                <div className='border-t mt-5'>
                                    <h1 className='text-center sm:text-2xl text-xl my-5'>Additional Questions Answer</h1>
                                    <ul className='list-none'>
                                        {Object.keys(openModal.bgCheck).length !== 0 && <>
                                            <li className='flex items-start gap-2'>
                                                <h2 className='font-medium'>Q:</h2>
                                                <p>{openModal?.bgCheck?.bgCheckQ}</p>
                                            </li>
                                            <li className='flex items-start gap-2 mb-5'>
                                                <h2 className='font-medium mr-2'>A:</h2>
                                                <p>{openModal?.bgCheck?.idealAns}</p>
                                            </li>
                                        </>}

                                        {Object.keys(openModal.certification).length !== 0 && <>
                                            <li className='flex items-start gap-2'>
                                                <h2 className='font-medium'>Q:</h2>
                                                <p>{openModal?.certification?.certificationQ}</p>
                                            </li>
                                            <li className='flex items-start gap-2 mb-5'>
                                                <h2 className='font-medium mr-2'>A:</h2>
                                                <p>{openModal?.certification?.idealAns}</p>
                                            </li>
                                        </>}

                                        {Object.keys(openModal.drivingLicense).length !== 0 && <>
                                            <li className='flex items-start gap-2'>
                                                <h2 className='font-medium'>Q:</h2>
                                                <p>{openModal?.drivingLicense?.drivingLicenseQ}</p>
                                            </li>
                                            <li className='flex items-start gap-2 mb-5'>
                                                <h2 className='font-medium mr-2'>A:</h2>
                                                <p>{openModal?.drivingLicense?.idealAns}</p>
                                            </li>
                                        </>}

                                        {Object.keys(openModal.drugTest).length !== 0 && <>
                                            <li className='flex items-start gap-2'>
                                                <h2 className='font-medium'>Q:</h2>
                                                <p>{openModal?.drugTest?.drugTestQ}</p>
                                            </li>
                                            <li className='flex items-start gap-2 mb-5'>
                                                <h2 className='font-medium mr-2'>A:</h2>
                                                <p>{openModal?.drugTest?.idealAns}</p>
                                            </li>
                                        </>}

                                        {Object.keys(openModal.education).length !== 0 && <>
                                            <li className='flex items-start gap-2'>
                                                <h2 className='font-medium'>Q:</h2>
                                                <p>{openModal?.education?.educationQ}</p>
                                            </li>
                                            <li className='flex items-start gap-2 mb-5'>
                                                <h2 className='font-medium mr-2'>A:</h2>
                                                <p>{openModal?.education?.idealAns}</p>
                                            </li>
                                        </>}

                                        {Object.keys(openModal.gpa).length !== 0 && <>
                                            <li className='flex items-start gap-2'>
                                                <h2 className='font-medium'>Q:</h2>
                                                <p>{openModal?.gpa?.gpaQ}</p>
                                            </li>
                                            <li className='flex items-start gap-2 mb-5'>
                                                <h2 className='font-medium mr-2'>A:</h2>
                                                <p>{openModal?.gpa?.idealAns}</p>
                                            </li>
                                        </>}

                                        {Object.keys(openModal.hybridWork).length !== 0 && <>
                                            <li className='flex items-start gap-2'>
                                                <h2 className='font-medium'>Q:</h2>
                                                <p>{openModal?.hybridWork?.hybridWorkQ}</p>
                                            </li>
                                            <li className='flex items-start gap-2 mb-5'>
                                                <h2 className='font-medium mr-2'>A:</h2>
                                                <p>{openModal?.hybridWork?.idealAns}</p>
                                            </li>
                                        </>}

                                        {Object.keys(openModal.remoteWork).length !== 0 && <>
                                            <li className='flex items-start gap-2'>
                                                <h2 className='font-medium'>Q:</h2>
                                                <p>{openModal?.remoteWork?.remoteWorkQ}</p>
                                            </li>
                                            <li className='flex items-start gap-2 mb-5'>
                                                <h2 className='font-medium mr-2'>A:</h2>
                                                <p>{openModal?.remoteWork?.idealAns}</p>
                                            </li>
                                        </>}

                                        {Object.keys(openModal.workExperience).length !== 0 && <>
                                            <li className='flex items-start gap-2'>
                                                <h2 className='font-medium'>Q:</h2>
                                                <p>{openModal?.workExperience?.workExperienceQ}</p>
                                            </li>
                                            <li className='flex items-start gap-2 mb-5'>
                                                <h2 className='font-medium mr-2'>A:</h2>
                                                <p>{openModal?.workExperience?.idealAns}</p>
                                            </li>
                                        </>}

                                        {Object.keys(openModal.urgentHiring).length !== 0 && <>
                                            <li className='flex items-start gap-2'>
                                                <h2 className='font-medium'>Q:</h2>
                                                <p>{openModal?.urgentHiring?.urgentHiringQ}</p>
                                            </li>
                                            <li className='flex items-start gap-2 mb-5'>
                                                <h2 className='font-medium mr-2'>A:</h2>
                                                <p>{openModal?.urgentHiring?.idealAns}</p>
                                            </li>
                                        </>}
                                    </ul>
                                    <ul className='list-none'>{
                                        openModal.customQuestion.map((q, index) =>
                                            q.customQ && <div key={index}>
                                                <li className='flex items-start gap-2'>
                                                    <h2 className='font-medium'>Q:</h2>
                                                    <p>{q.customQ}</p>
                                                </li>
                                                <li className='flex items-start gap-2 mb-5'>
                                                    <h2 className='font-medium mr-2'>A:</h2>
                                                    <p>{q.idealAns}</p>
                                                </li>
                                            </div>
                                        )
                                    }</ul>
                                </div> : ''
                            }
                        </div>
                    </div>
                    :
                    <div>
                        <div className='w-11/12 mx-auto text-center'>
                            <h1 className='text-2xl font-medium text-accent mt-3'>Seeker Applications</h1>
                            <button
                                onClick={handleExport}
                                className='btn btn-link normal-case text-base min-h-0 h-10 px-2'>({seekerApplyList.length}) Export data to excel
                                <ArrowRightIcon className='w-4 h-4 ml-1'></ArrowRightIcon>
                            </button>
                        </div>
                        <div className="overflow-x-auto mb-10">
                            <table className="table w-full" id='exportToxlsx'>
                                <thead>
                                    <tr>
                                        <th className='py-3 rounded-l-none normal-case text-base font-medium'>({seekerApplyList.length})</th>
                                        <th className='py-3 normal-case text-base font-medium'>Seeker</th>
                                        <th className='py-3 normal-case text-base font-medium'>Seeker email</th>
                                        <th className='py-3 normal-case text-base font-medium'>Phone number</th>
                                        <th className='py-3 normal-case text-base font-medium'>Job title</th>
                                        <th className='py-3 normal-case text-base font-medium'>Applied</th>
                                        <th className='py-3 rounded-r-none normal-case text-base font-medium'>Cover-letter | Resume</th>
                                        <th className='py-3 rounded-r-none normal-case text-base font-medium'>Offer-letter</th>
                                    </tr>
                                </thead>
                                {
                                    seekerApplyList.map((items, index) => <SeekerAppList
                                        key={items._id} items={items}
                                        index={index}
                                        setOpenModal={setOpenModal}>
                                    </SeekerAppList>)
                                }
                            </table>
                        </div>
                    </div>
            }</section>
    </>
    );
};

export default SeekerApplications;