import React from 'react';
import useGetAllPost from '../../hooks/useGetAllPost';
import Spinner from '../Shared/Spinner';
import AllPost from './AllPost';

const ManageJobPost = () => {
    const [allPost] = useGetAllPost();
    // console.log(allPost)
    if (allPost.length === 0) {
        return <div className='h-screen top-0 w-full flex items-center justify-center'>
            <Spinner></Spinner>
        </div>
    };

    return (
        <div className='w-full flex justify-center'>
            <div className='w-4/5 mb-10 mx-auto'>
                <h1 className='text-3xl my-5 text-accent font-medium'>Manage all post</h1>
                {
                    allPost.map(posts => <AllPost key={posts._id} posts={posts}></AllPost>)
                }
            </div>
        </div>
    );
};

export default ManageJobPost;