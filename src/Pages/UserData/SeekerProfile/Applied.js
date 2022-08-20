import React from 'react';
import useGetAllPost from '../../../hooks/useGetAllPost';
import useGetApply from '../../../hooks/useGetApply';
import AppliedList from './AppliedList';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../Shared/PageTitle';

const Applied = () => {
    const [applied] = useGetApply(null);
    const [allPost] = useGetAllPost(null);
    const navigate = useNavigate();

    return (<>
        <PageTitle title='Applied - Dashboard'></PageTitle>
        <div className='w-full flex justify-center relative'>
            <div className='sm:w-4/5 w-11/12 mx-auto'>
                <h1 className='text-2xl font-medium text-accent sm:text-left text-center mt-5 mb-3'>My applied jobs</h1>
                {
                    applied.length === 0 ?
                        <div className='h-96 w-11/12 mx-auto flex flex-col justify-center gap-5 items-center'>
                            <h1 className='md:text-4xl sm:text-3xl text-2xl text-center text-gray-500'>You haven't applied for the job yet.</h1>
                            <button onClick={() => navigate('/')} className='btn btn-primary hover:text-white min-h-0 sm:h-11 h-10 normal-case text-lg tracking-wide'>Go to apply</button>
                        </div>
                        :
                        applied.map(appliedJob => <AppliedList key={appliedJob._id} appliedJob={appliedJob} allPost={allPost}></AppliedList>)
                }
            </div>
        </div>
    </>
    );
};

export default Applied;