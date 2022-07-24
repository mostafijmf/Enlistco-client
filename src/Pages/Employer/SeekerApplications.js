import { XIcon } from '@heroicons/react/solid';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import useGetPost from '../../hooks/useGetPost';
import Spinner from '../Shared/Spinner';
import SeekerAppList from './SeekerAppList';

const SeekerApplications = () => {
    const [myPost] = useGetPost();
    const [seekerApplyList, setSeekerApplyList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState('');

    useEffect(() => {
        axios.get('https://boiling-beach-14928.herokuapp.com/apply')
            .then(res => {
                setSeekerApplyList(res.data);
                setLoading(false)
            })
            .catch(err => {
                console.log(err);
                setLoading(false)
            });
    }, [seekerApplyList]);

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

    return (
        <section>{
            openModal ?
                <div className='w-full py-10'>
                    <div className='bg-slate-100 xl:w-3/5 md:w-3/4 sm:w-4/5 w-11/12 mx-auto py-5 sm:px-8 px-5 shadow-lg rounded-md relative'>
                        <div className='absolute top-3 right-3'>
                            <XIcon onClick={() => setOpenModal('')} className='w-10 h-10 hover:bg-slate-300 p-1 rounded-full cursor-pointer'></XIcon>
                        </div>
                        <h1 className='text-center sm:text-2xl text-xl pb-5'>Cover Letter</h1>
                        <hr />
                        <h2 className='sm:text-lg text-base font-medium mt-5 mb-3'>Subject : <span className='font-normal'>{openModal.subject}</span></h2>
                        <div dangerouslySetInnerHTML={{ __html: openModal.coverLetter }}></div>
                    </div>
                </div>
                :
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Seeker</th>
                                <th>Seeker email</th>
                                <th>Job title</th>
                                <th>Applied</th>
                                <th>Cover-letter | Resume</th>
                            </tr>
                        </thead>
                        {
                            myPost.map(p => <SeekerAppList key={p._id} p={p} seekerApplyList={seekerApplyList} setOpenModal={setOpenModal}></SeekerAppList>)
                        }
                    </table>
                </div>
        }</section>
    );
};

export default SeekerApplications;