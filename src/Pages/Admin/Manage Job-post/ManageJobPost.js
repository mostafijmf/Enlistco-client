import React from 'react';
import useGetAllPost from '../../../hooks/useGetAllPost';
import PageTitle from '../../Shared/PageTitle';
import Spinner from '../../Shared/Spinner';
import ManageJobPostList from './ManageJobPostList';

const ManageJobPost = () => {
    const [allPost, loading] = useGetAllPost();

    if (loading) {
        return <div className='h-screen w-full flex items-center justify-center'>
            <Spinner></Spinner>
        </div>
    };

    const post = allPost.reverse().sort((a, b) => a.permission - b.permission)

    if (allPost.length === 0) {
        return <div className='h-screen w-full flex items-center justify-center'>
            <h1 className='sm:text-3xl text-2xl text-gray-500'>No jobs posted yet.</h1>
        </div>
    }

    return (<>
        <PageTitle title='Manage Posts - Dashboard'></PageTitle>
        <div className='w-full flex justify-center'>
            <div className='sm:w-11/12 w-full mx-2 mb-10'>
                <h1 className='text-2xl md:text-left text-center my-5 font-medium'>Manage all post</h1>
                {
                    post.map(posts => <ManageJobPostList key={posts._id} posts={posts} ></ManageJobPostList>)
                }
            </div>
        </div>
    </>
    );
};

export default ManageJobPost;