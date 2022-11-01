import React from 'react';
import useGetAllPost from '../../../hooks/useGetAllPost';
import PageTitle from '../../Shared/PageTitle';
import Spinner from '../../Shared/Spinner';
import AllPostList from './AllPostList';

const ManageJobPost = () => {
    const [allPost, loading] = useGetAllPost();
    
    if (loading) {
        return <div className='h-screen w-full flex items-center justify-center'>
            <Spinner></Spinner>
        </div>
    };

    if (allPost.length === 0) {
        return <div className='h-screen w-full flex items-center justify-center'>
            <h1 className='sm:text-3xl text-2xl text-gray-500'>No jobs posted yet.</h1>
        </div>
    }

    return (<>
        <PageTitle title='Manage Posts - Dashboard'></PageTitle>
        <div className='w-full flex justify-center'>
            <div className='xl:w-9/12 md:w-4/5 w-11/12 mb-10 mx-auto'>
                <h1 className='text-2xl md:text-left text-center my-5 text-accent font-medium'>Manage all post</h1>
                {
                    allPost.reverse().map(posts => <AllPostList key={posts._id} posts={posts} ></AllPostList>)
                }
            </div>
        </div>
    </>
    );
};

export default ManageJobPost;