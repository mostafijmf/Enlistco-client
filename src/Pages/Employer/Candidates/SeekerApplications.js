import { ArrowRightIcon, XIcon } from '@heroicons/react/solid';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import * as XLSX from 'xlsx';
import auth from '../../../firebase.init';
import PageTitle from '../../Shared/PageTitle';
import Spinner from '../../Shared/Spinner';
import SeekerAppList from './SeekerAppList';

const SeekerApplications = () => {
    const [user] = useAuthState(auth);
    const [seekerApplyList, setSeekerApplyList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState('');

    useEffect(() => {
        const email = user?.email;
        axios.get(`https://boiling-beach-14928.herokuapp.com/apply-emp/${email}`)
            .then(res => {
                setSeekerApplyList(res.data);
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
            });
    }, [user, seekerApplyList]);

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
    
    const handleExport = () =>{
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
                    <div className='xl:w-3/5 md:w-3/4 sm:w-4/5 w-11/12 mx-auto py-5 sm:px-8 px-5 shadow-xl border rounded-md relative'>
                        <div className='absolute top-3 right-3'>
                            <XIcon onClick={() => setOpenModal('')} className='w-8 h-8 hover:bg-slate-200 p-1 rounded-full cursor-pointer'></XIcon>
                        </div>
                        <h1 className='text-center sm:text-2xl text-xl pb-5'>Cover Letter</h1>
                        <hr />
                        <h2 className='sm:text-lg text-base font-medium mt-5 mb-3'>Subject : <span className='font-normal'>{openModal.subject}</span></h2>
                        <div dangerouslySetInnerHTML={{ __html: openModal.coverLetter }}></div>
                    </div>
                </div>
                :
                <div>
                    <div className='w-11/12 mx-auto text-center'>
                        <h1 className='text-2xl font-medium text-accent mt-3'>Seeker Applications</h1>
                        <button onClick={handleExport} className='btn btn-link normal-case text-base min-h-0 h-10 px-2'>({seekerApplyList.length}) Export data to excel
                            <ArrowRightIcon className='w-4 h-4 ml-1'></ArrowRightIcon>
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table w-full" id='exportToxlsx'>
                            <thead>
                                <tr>
                                    <th className='bg-slate-100 py-3 rounded-t-none normal-case text-base font-medium'>({seekerApplyList.length})</th>
                                    <th className='bg-slate-100 py-3 normal-case text-base font-medium'>Seeker</th>
                                    <th className='bg-slate-100 py-3 normal-case text-base font-medium'>Seeker email</th>
                                    <th className='bg-slate-100 py-3 normal-case text-base font-medium'>Phone number</th>
                                    <th className='bg-slate-100 py-3 normal-case text-base font-medium'>Job title</th>
                                    <th className='bg-slate-100 py-3 normal-case text-base font-medium'>Applied</th>
                                    <th className='bg-slate-100 py-3 rounded-r-none normal-case text-base font-medium'>Cover-letter | Resume</th>
                                    <th className='bg-slate-100 py-3 rounded-r-none normal-case text-base font-medium'>Offer-letter</th>
                                </tr>
                            </thead>
                            {
                                seekerApplyList.map((p, index) => <SeekerAppList 
                                    key={p._id} p={p}
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