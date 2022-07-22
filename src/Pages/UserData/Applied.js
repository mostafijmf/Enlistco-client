import React from 'react';
import useGetAllPost from '../../hooks/useGetAllPost';
import useGetApply from '../../hooks/useGetApply';
import AppliedList from './AppliedList';
import { useNavigate } from 'react-router-dom';

const Applied = () => {
    const [applied] = useGetApply(null);
    const [allPost] = useGetAllPost(null);
    const navigate = useNavigate();

    if (applied.length === 0) {
        return <div className='h-screen w-full flex items-center justify-center'>
            <div className='h-96 w-full flex flex-col justify-center gap-5 items-center'>
                <h1 className='md:text-4xl sm:text-3xl text-2xl text-center text-gray-500'>You haven't applied for the job yet.</h1>
                <button onClick={() => navigate('/')} className='btn btn-primary hover:text-white min-h-0 sm:h-12 h-10 normal-case sm:text-xl text-lg tracking-wide'>Go to apply</button>
            </div>
        </div>
    }
    return (
        <div className='w-full flex justify-center relative'>
            <div className='sm:w-4/5 w-11/12 mx-auto'>
                <h1 className='sm:text-3xl text-2xl font-medium text-accent sm:text-left text-center mt-5 mb-3'>My applied jobs</h1>
                {
                    applied.map(appliedJob => <AppliedList key={appliedJob._id} appliedJob={appliedJob} allPost={allPost}></AppliedList>)
                }
            </div>
        </div>
    );
};

export default Applied;