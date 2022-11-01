import { ArrowRightIcon } from '@heroicons/react/solid';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Shared/Spinner';

const MyPost = ({ post }) => {
    const [openPost, setOpenPost] = useState(false);
    const [deletePost, setDeletePost] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {
        _id,
        permission,
        jobTitle,
        publish,
        company,
        jobLocation,
        salary,
        empType,
        jobDescription,
        workplace,
        empQuantity,
        employerEmail,
        receiveEmail,
        skillTags
    } = post;

    const handleDelete = async (id) => {
        setLoading(true);
        await axios.delete(`https://api.enlistco.co.in/post/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('user_token')
            }
        })
            .then(res => {
                setLoading(false)
                setDeletePost(!deletePost);
            })
            .then(err => {
                setLoading(false);
                if (err?.response?.data?.logout) {
                    localStorage.removeItem('user_token');
                    return navigate('/login');
                }
            })
    };

    return (openPost ?
        <div className="bg-white rounded-lg border shadow-md mb-10">
            <div className="card-body sm:p-8 p-5">
                <h1 className='sm:text-2xl text-xl font-bold text-center'>Job Details</h1>
                <div className='flex justify-between items-center'>
                    <span className='text-accent text-sm tracking-wide'>Published: {publish}</span>
                    <button
                        onClick={() => setOpenPost(false)}
                        className='btn btn-link sm:text-lg text-base min-h-0 h-8 p-0 normal-case'>
                        Back
                        <ArrowRightIcon className='w-4 h-4 sm:ml-2 ml-1'></ArrowRightIcon>
                    </button>
                </div>
                <h2 className="sm:text-2xl text-xl font-medium">{jobTitle}</h2>
                <h5 className='font-medium'>{company}</h5>
                <h5 className='font-medium'>Location :
                    <span className='text-base font-normal ml-2'>{jobLocation}</span>
                </h5>
                <h5 className='font-medium'>Salary :
                    <span className='text-base font-normal ml-2'>${salary}</span>
                </h5>
                <h5 className='font-medium'>Job Type :
                    <span className='text-base font-normal ml-2'>{empType}</span>
                </h5>
                <h5 className='font-medium'>Employees Quantity :
                    <span className='text-base font-normal ml-2'>{empQuantity}</span>
                </h5>
                <h5 className='font-medium'>Your email :
                    <span className='text-base font-normal ml-2'>{employerEmail}</span>
                </h5>
                <h5 className='font-medium'>Receive email :
                    <span className='text-base font-normal ml-2'>{receiveEmail}</span>
                </h5>{
                    skillTags.length !== 0 &&
                    <h5 className='font-medium'>Tags :
                        {
                            skillTags.map(tag => <span key={tag} className='text-base font-normal ml-2'>{tag}</span>)
                        }
                    </h5>
                }
                <span className='bg-slate-200 px-2 py-1 rounded w-max'>{workplace}</span>
                <hr />
                <div className='mb-10' dangerouslySetInnerHTML={{ __html: jobDescription }}></div>
            </div>
        </div>
        :
        <div className='bg-white w-full shadow-md p-5 border mb-3 sm:mx-0 mx-2 relative'>
            {
                !permission &&
                <div className='absolute top-0 right-0 w-max px-2 rounded-l-xl bg-primary text-white text-sm'>
                    Under review
                </div>
            }
            <ul className='list-none grid sm:grid-cols-2 sm:grid-rows-1 grid-rows-2 items-center'>
                <li>
                    <h1 className='text-xl text-left font-medium'>{jobTitle}</h1>
                    <p className='sm:text-lg text-base'>{company}</p>
                </li>
                <li className='flex justify-between items-center'>
                    <div>
                        <h5 className='text-base font-medium text-gray-500'>Published</h5>
                        <h4>{publish}</h4>
                    </div>
                    <div className='flex items-center justify-center gap-5'>
                        <button
                            onClick={() => setOpenPost(true)}
                            className="btn btn-link normal-case text-base min-h-0 h-max px-0"
                        >View
                        </button>
                        <button
                            onClick={() => setDeletePost(!deletePost)}
                            className="btn btn-link text-accent normal-case text-base min-h-0 h-max px-0"
                        >Delete
                        </button>
                    </div>
                </li>
            </ul>
            {
                deletePost &&
                <div className="fixed w-screen h-screen bg-black/60 top-0 left-0 z-30 flex items-center justify-center">
                    <div className="modal-box text-center bg-secondary">
                        <h3 className="font-medium text-2xl text-white">Are you sure!</h3>
                        <p className="text-lg py-4 text-gray-300">Do you want to delete it?</p>
                        <div className="flex justify-center gap-10 mt-5">
                            <button
                                onClick={() => setDeletePost(!deletePost)}
                                className="btn btn-primary text-white min-h-0 h-10 px-10 ">
                                No
                            </button>
                            <button
                                onClick={() => handleDelete(_id)}
                                className="btn btn-outline text-white min-h-0 h-10 px-10 ">
                                {loading ? <Spinner></Spinner> : 'Yes'}
                            </button>

                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default MyPost;