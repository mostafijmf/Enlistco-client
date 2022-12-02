import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../Shared/Spinner';

const ManageJobPostList = ({ posts }) => {
    const [deletePost, setDeletePost] = useState(false);
    const [dLoading, setDLoading] = useState(false);
    const [pLoading, setPLoading] = useState(false);
    const {
        _id,
        publish,
        employerEmail,
        jobTitle,
        company,
        workplace,
        permission,
        postEdited
    } = posts;

    const navigate = useNavigate();

    // ==============Permission granted button==============
    const handlePermission = async (id, employerEmail, postEdited) => {
        setPLoading(true);
        const permission = true;
        const isEdited = postEdited ? postEdited : '';
        const date = new Date();
        const publish = date.getDate() + '-' + date.toLocaleString('default', { month: 'long' }) + '-' + date.getFullYear();

        await axios.put(`https://api.enlistco.co.in/post/permission/${id}?isEdited=${isEdited}`, { permission, publish, employerEmail }, {
            method: 'PUT',
            headers: {
                'Authorization': localStorage.getItem('user_token')
            }
        })
            .then(res => {
                res && setPLoading(false);
            })
            .catch(err => {
                setPLoading(false);
                if (err?.response?.data?.logout) {
                    localStorage.removeItem('user_token');
                    return navigate('/login');
                }
            });
    };

    // ==============Delete post button==============
    const handleDelete = async (id) => {
        setDLoading(true);
        await axios.delete(`https://api.enlistco.co.in/post/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': localStorage.getItem('user_token')
            }
        })
            .then(res => {
                if (res) {
                    setDLoading(false);
                    setDeletePost(!deletePost)
                }
            })
            .catch(err => {
                setDLoading(false);
                setDeletePost(!deletePost);
                if (err?.response?.data?.logout) {
                    localStorage.removeItem('user_token');
                    return navigate('/login');
                }
            });
    };

    return (
        <div
            className='bg-white overflow-hidden md:py-6 lg:px-7 p-5 w-full border mb-4 shadow-md'
        >
            {/* ======================
                Responsive for Desktop
                ====================== */}
            <ul className='hidden md:grid md:grid-cols-6 items-center list-none'>
                <li className='md:col-span-2'>
                    <button
                        onClick={() =>
                            navigate(`/dashboard/manage-job/details/${_id}`,
                                { state: posts }
                            )}
                        className='text-lg font-medium text-left text-primary hover:underline cursor-pointer'
                    >
                        {jobTitle}
                    </button>
                    <h5 className='font-medium'>
                        {company}
                    </h5>
                    <h5 className='text-sm'>
                        {workplace}
                    </h5>
                </li>
                <li className='md:col-span-1'>
                    <h5 className='text-base font-medium text-gray-500'>Published</h5>
                    <p className='text-sm'>{publish ? publish : '___ ___ ___'}</p>
                </li>
                <li className='md:col-span-1 text-center'>
                    <h5 className='text-base font-medium text-gray-500'>Job status</h5>
                    {
                        !permission || postEdited ?
                            <p className='text-sm w-max mx-auto bg-success text-white mt-2 px-3 py-1 rounded-full'>
                                Pending...
                            </p>
                            :
                            <p>
                                Live
                            </p>
                    }
                </li>
                <li className='md:col-span-1 text-center'>
                    {
                        !permission ?
                            <button
                                disabled={pLoading}
                                onClick={() => handlePermission(_id, employerEmail, postEdited)}
                                className="btn btn-outline btn-primary normal-case text-base hover:text-white min-h-0 h-9 ml-5 px-2 rounded">
                                {pLoading ? 'Loading...' : 'Approve'}
                            </button>
                            :
                            <button
                                onClick={() => {
                                    navigate('/dashboard/manage-job-post/view-applicants', {
                                        state: _id
                                    })
                                }}
                                className="btn btn-link normal-case text-base min-h-0 h-9 px-2">View applicants
                            </button>
                    }
                </li>
                <li className='md:col-span-1'>
                    <svg
                        onClick={() => setDeletePost(!deletePost)}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24"
                        strokeWidth="2" stroke="currentColor"
                        className='w-6 h-6 text-gray-500 hover:text-red-600 duration-300 cursor-pointer mx-auto'
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </li>
            </ul>


            {/* ======================
                Responsive for Tablet
                ====================== */}
            <ul className='md:hidden hidden sm:grid sm:grid-cols-7 items-center list-none'>
                <li className='sm:col-span-3'>
                    <button
                        onClick={() =>
                            navigate(`/dashboard/manage-job/details/${_id}`,
                                { state: posts }
                            )}
                        className='text-lg font-medium text-left text-primary hover:underline cursor-pointer'
                    >
                        {jobTitle}
                    </button>
                    <h5 className='font-medium my-1.5'>
                        {company} -
                        <span className='ml-2 font-normal text-sm'>{workplace}</span>
                    </h5>
                    <h5 className='text-sm font-medium text-gray-500'>
                        Published: <span className='font-normal'>{publish ? publish : ' ___ ___ ___'}</span>
                    </h5>
                </li>
                <li className='sm:col-span-2 text-center'>
                    <h5 className='text-base font-medium text-gray-500'>Job status</h5>
                    {
                        !permission ?
                            <p className='text-sm w-max mx-auto bg-success text-white mt-2 px-3 py-1 rounded-full'>
                                Pending...
                            </p>
                            :
                            <p>
                                Live
                            </p>
                    }
                </li>
                <li className='sm:col-span-2 text-center flex items-center justify-between'>
                    {
                        !permission ?
                            <button
                                disabled={pLoading}
                                onClick={() => handlePermission(_id, employerEmail)}
                                className="btn btn-outline btn-primary normal-case text-base hover:text-white min-h-0 h-9 ml-5 px-2 rounded">
                                {pLoading ? 'Loading...' : 'Approve'}
                            </button>
                            :
                            <button
                                onClick={() => {
                                    navigate('/dashboard/manage-job-post/view-applicants', {
                                        state: _id
                                    })
                                }}
                                className="btn btn-link normal-case text-base min-h-0 h-9 px-2">View applicants
                            </button>
                    }
                    <svg
                        onClick={() => setDeletePost(!deletePost)}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24"
                        strokeWidth="2" stroke="currentColor"
                        className='w-6 h-6 text-gray-500 hover:text-red-600 duration-300 cursor-pointer'
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </li>
            </ul>


            {/* ======================
                Responsive for Mobile
                ====================== */}
            <div className='sm:hidden'>
                <h1 className='text-center'>
                    <button
                        onClick={() =>
                            navigate(`/dashboard/manage-job/details/${_id}`,
                                { state: posts }
                            )}
                        className='text-xl font-medium text-left text-primary hover:underline cursor-pointer'
                    >
                        {jobTitle}
                    </button>
                </h1>
                <h5 className='mt-1 text-base font-medium text-center'>
                    {company} -
                    <span className='ml-2 font-normal text-sm'>{workplace}</span>
                </h5>
                <h5 className='mt-2 text-base font-medium text-gray-500 flex justify-between items-center'>
                    <span>Published:</span>
                    <span className='font-normal'>{publish ? publish : '___ ___ ___'}</span>
                </h5>
                <h5 className='mt-2 text-base font-medium text-gray-500 flex justify-between items-center'>
                    <span>Job status:</span>
                    {
                        !permission ?
                            <p className='text-sm w-max bg-success text-white mt-2 px-3 py-1 rounded-full'>
                                Pending...
                            </p>
                            :
                            <p>
                                Live
                            </p>
                    }
                </h5>
                <h5 className='mt-2 text-base font-medium text-gray-500 flex justify-between items-center'>
                    {
                        !permission ?
                            <button
                                disabled={pLoading}
                                onClick={() => handlePermission(_id, employerEmail)}
                                className="btn btn-outline btn-primary normal-case text-base hover:text-white min-h-0 h-9 px-10 rounded">
                                {pLoading ? 'Loading...' : 'Approve'}
                            </button>
                            :
                            <button
                                onClick={() => {
                                    navigate('/dashboard/manage-job-post/view-applicants', {
                                        state: _id
                                    })
                                }}
                                className="btn btn-link normal-case text-base min-h-0 h-9 px-0">View applicants
                            </button>
                    }
                    <svg
                        onClick={() => setDeletePost(!deletePost)}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24"
                        strokeWidth="2" stroke="currentColor"
                        className='w-6 h-6 text-gray-500 hover:text-red-600 duration-300 cursor-pointer'
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </h5>
            </div>

            {
                deletePost &&
                <div className="fixed w-screen h-screen bg-black/60 top-0 left-0 z-30 flex items-center justify-center">
                    {
                        dLoading ?
                            <Spinner></Spinner>
                            :
                            <div className="modal-box text-center bg-secondary">
                                <h3 className="font-medium text-2xl text-white">Are you sure!</h3>
                                <p className="text-lg py-4 text-gray-300">Do you want to delete it?</p>
                                <div className="flex justify-center gap-10 mt-5">
                                    <button
                                        onClick={() => setDeletePost(!deletePost)}
                                        className="btn btn-primary text-white min-h-0 h-10 px-10"
                                    >No
                                    </button>

                                    <button
                                        disabled={dLoading}
                                        onClick={() => handleDelete(_id)}
                                        className="btn btn-outline text-white min-h-0 h-10 px-10"
                                    >Yes
                                    </button>
                                </div>
                            </div>
                    }
                </div>
            }
        </div>
    );
};

export default ManageJobPostList;