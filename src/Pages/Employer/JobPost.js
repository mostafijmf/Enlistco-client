import React from 'react';
import MyPost from './MyPost';
import { useNavigate } from 'react-router-dom';
import useGetPost from '../../hooks/useGetPost';

const JobPost = () => {
    const [myPost] = useGetPost();
    const navigate = useNavigate();

    return (
        <div className='w-full flex justify-center'>
            <div className='w-4/5 mx-auto'>
                <h1 className='text-3xl my-5 text-accent font-medium'>My posted jobs</h1>
                {myPost.length === 0 ?
                    <div className='h-96 w-full flex flex-col justify-center gap-5 items-center'>
                        <h1 className='text-4xl text-gray-500'>You don't have posted job</h1>
                        <button onClick={()=>navigate('/employer/contact')} className='btn btn-primary hover:text-white normal-case text-xl tracking-wide'>Post a job</button>
                    </div> :
                    myPost.map(post => <MyPost key={post._id} post={post}></MyPost>)
                }
            </div>
        </div>
    );
};

export default JobPost;