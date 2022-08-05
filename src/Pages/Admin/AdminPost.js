import React from 'react';
import { useNavigate } from 'react-router-dom';
import useGetPost from '../../hooks/useGetPost';
import PageTitle from '../Shared/PageTitle';
import AdminPostList from './AdminPostList';

const AdminPost = () => {
    const [myPost] = useGetPost();
    const navigate = useNavigate();

    return (<>
        <PageTitle title='Admin Post - Dashboard'></PageTitle>
        <div className='w-full flex justify-center'>
            <div className='sm:w-4/5 w-11/12 mx-auto'>
                <h1 className='text-2xl font-medium text-accent sm:text-left text-center mt-5 mb-3'>My posted jobs</h1>
                {myPost.length === 0 ?
                    <div className='h-96 w-11/12 mx-auto flex flex-col justify-center gap-5 items-center'>
                        <h1 className='md:text-4xl sm:text-3xl text-2xl text-center text-gray-500'>You don't have posted job</h1>
                        <button onClick={() => navigate('/employer-form/contact')} className='btn btn-primary hover:text-white min-h-0 sm:h-11 h-10 normal-case text-lg tracking-wide'>Post a job</button>
                    </div> :
                    myPost.map(post => <AdminPostList key={post._id} post={post}></AdminPostList>)
                }
            </div>
        </div>
    </>
    );
};

export default AdminPost;