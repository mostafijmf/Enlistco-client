import React from 'react';
import useGetAllPost from '../../../hooks/useGetAllPost';
import PageTitle from '../../Shared/PageTitle';
import Spinner from '../../Shared/Spinner';
import AllPost from './AllPost';

const ManageJobPost = () => {
    const [allPost, loading] = useGetAllPost();
    if (loading) {
        return <div className='h-screen top-0 w-full flex items-center justify-center'>
            <Spinner></Spinner>
        </div>
    };

    return (<>
        <PageTitle title='Manage Posts - Dashboard'></PageTitle>
        <div className='w-full flex justify-center'>
            <div className='md:w-4/5 w-11/12 mb-10 mx-auto'>
                <h1 className='text-2xl md:text-left text-center my-5 text-accent font-medium'>Manage all post</h1>
                {
                    allPost.map(posts => <AllPost key={posts._id} posts={posts}></AllPost>)
                }
            </div>
        </div>
    </>
    );
};

export default ManageJobPost;