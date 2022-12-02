import React from 'react';
import JobPostList from './JobPostList';
import { useNavigate } from 'react-router-dom';
import useGetPost from '../../../hooks/useGetPost';
import PageTitle from '../../Shared/PageTitle';
import Spinner from '../../Shared/Spinner';

const JobPost = () => {
    const [myPost, loading] = useGetPost();
    const navigate = useNavigate();

    if (loading) {
        return <div className='w-full h-screen flex items-center justify-center'>
            <Spinner></Spinner>
        </div>
    };

    return (
        <>
            <PageTitle title='Admin Post - Dashboard'></PageTitle>
            <div className='w-full flex justify-center'>
                <div className='md:w-11/12 w-full mx-2'>
                    <h1 className='text-2xl font-medium text-gray-600 md:text-left text-center mt-5 mb-3'>
                        My posted jobs
                    </h1>
                    {
                        myPost.length === 0 ?
                            <div className='h-96 w-11/12 mx-auto flex flex-col justify-center gap-5 items-center'>
                                <h1 className='md:text-4xl sm:text-3xl text-2xl text-center text-gray-500'>
                                    You don't have posted job
                                </h1>
                                <button
                                    onClick={() => navigate('/job-form/contact')}
                                    className='btn btn-primary hover:text-white min-h-0 sm:h-11 h-10 normal-case text-lg tracking-wide'
                                >Post a job
                                </button>
                            </div>
                            :
                            myPost.reverse().map(post => <JobPostList key={post._id} post={post} />)
                    }
                </div>
            </div>
        </>
    );
};

export default JobPost;