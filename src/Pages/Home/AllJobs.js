import React from 'react';
import { useState } from 'react';
import useGetAllPost from '../../hooks/useGetAllPost';
import Spinner from '../Shared/Spinner';
import JobDetails from './JobDetails';
import PostList from './PostList';

const AllJobs = () => {
    const [open, setOpen] = useState();
    const [allPost] = useGetAllPost([]);

    if (allPost.length === 0) {
        return <div className='h-screen w-full flex items-center justify-center'>
            <Spinner></Spinner>
        </div>
    };
    const aPost = allPost.filter(ap => ap.permission);

    return (
        <section>
            <h1 className='text-center md:text-5xl sm:text-4xl text-3xl my-10 relative'>All Jobs
                <span className='sm:text-base text-sm bg-accent text-white md:px-2 px-1 md:py-1 absolute top-3 ml-3 rounded-md'>{aPost.length}</span>
            </h1>
            <div className='md:w-4/5 sm:w-10/12 w-11/12 mx-auto flex justify-between gap-5 mb-10'>
                <div className={`lg:block w-full ${open ? 'hidden' : 'block'}`}>
                    {
                        allPost.map(post => <PostList key={post._id} post={post} setOpen={setOpen}></PostList>)
                    }
                </div>
                <div className={`w-full lg:block ${open ? 'block' : 'hidden'} relative`}>
                    <button
                        onClick={()=>setOpen('')}
                        className='btn btn-outline h-8 min-h-0 rounded-md absolute -top-16 left-0 lg:hidden'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </button>
                    <JobDetails open={open ? open : aPost[0]}></JobDetails>
                </div>
            </div>
        </section>
    );
};

export default AllJobs;