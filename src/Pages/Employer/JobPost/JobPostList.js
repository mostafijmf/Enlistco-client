import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useGetSeekerApply from '../../../hooks/useGetSeekerApply';
import Spinner from '../../Shared/Spinner';

const JobPostList = ({ post }) => {
    const [deletePost, setDeletePost] = useState(false);
    const [openJStatus, setOpenJStatus] = useState(false);
    const [dLoading, setDLoading] = useState(false);
    const [statusLoading, setStatusLoading] = useState(false);
    const [seekerApplied] = useGetSeekerApply();
    const navigate = useNavigate();
    const {
        _id,
        permission,
        jobTitle,
        company,
        publish,
        workplace,
        jobStatus,
    } = post;

    const applicants = seekerApplied.filter(f => f.postID === _id);

    // Delete post button
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
                    setDeletePost(!deletePost);
                    setDLoading(false);
                }
            })
            .catch(err => {
                setDeletePost(!deletePost);
                setDLoading(false);
                if (err?.response?.data?.logout) {
                    localStorage.removeItem('user_token');
                    return navigate('/login');
                }
            });
    };

    // Job Status button
    const handleJobStatus = async (status, id) => {
        setStatusLoading(true);
        await axios.put(`https://api.enlistco.co.in/job_status/${id}`, { jobStatus: status },
            {
                method: 'PUT',
                headers: {
                    'Authorization': localStorage.getItem('user_token')
                }
            })
            .then(res => {
                if (res) {
                    setStatusLoading(false);
                }
            })
            .catch(err => {
                setStatusLoading(false);
                if (err?.response?.data?.logout) {
                    localStorage.removeItem('user_token');
                    return navigate('/login');
                }
            });
    };

    return (<>
        <div className='bg-white w-full shadow-md p-5 border mb-3 sm:mx-0 mx-2 relative'>
            <ul className='hidden md:grid md:grid-cols-6 items-center list-none'>
                <li className='md:col-span-2'>
                    <button
                        onClick={() =>
                            navigate(`/dashboard/job/details/${_id}`,
                                { state: post }
                            )}
                        className='text-lg font-medium text-left text-primary hover:underline cursor-pointer'
                    >
                        {jobTitle}
                    </button>
                    <p className='text-sm'>{workplace}</p>
                </li>
                <li className='md:col-span-1'>
                    <h5 className='text-base font-medium text-gray-500'>Published</h5>
                    <p className='text-sm'>{publish}</p>
                </li>
                <li className='md:col-span-1 text-center'>
                    <h5 className='text-base font-medium text-gray-500'>Applicants</h5>
                    <Link
                        to={`/dashboard/seeker-applications?id=${_id}`}
                        className='text-sm font-medium hover:text-primary duration-200 px-4'
                    >
                        {applicants.length}
                    </Link>
                </li>
                <li className='md:col-span-1 text-center'>
                    <h5 className='text-base font-medium text-gray-500'>Job Status</h5>
                    {!permission ?
                        <div className='w-max mx-auto px-2 mt-1 rounded-xl bg-primary text-white text-sm'>
                            Under review
                        </div>
                        :
                        <div
                            onClick={() => setOpenJStatus(!openJStatus)}
                            className='relative w-max mx-auto border rounded text-base text-start px-4 py-1 mt-1 cursor-pointer'
                        >
                            <div className='flex items-center justify-between gap-5'>
                                {jobStatus}
                                {
                                    openJStatus ?
                                        <ChevronUpIcon className='w-6 h-6 inline-block' />
                                        :
                                        <ChevronDownIcon className='w-6 h-6 inline-block' />
                                }
                            </div>
                            {
                                openJStatus &&
                                <div className='absolute top-9 left-0 w-full bg-white z-30 border rounded shadow-xl'>
                                    <p
                                        onClick={() => handleJobStatus('Open', _id)}
                                        className='hover:bg-slate-100 duration-300 py-2 px-5 flex justify-between'
                                    >
                                        Open {
                                            jobStatus === 'Open' &&
                                            <CheckIcon className='inline-block w-5 h-5' />
                                        }
                                    </p>
                                    <p
                                        onClick={() => handleJobStatus('Paused', _id)}
                                        className='hover:bg-slate-100 duration-300 py-2 px-5 flex justify-between'
                                    >
                                        Paused {
                                            jobStatus === 'Paused' &&
                                            <CheckIcon className='inline-block w-5 h-5' />
                                        }
                                    </p>
                                    <p
                                        onClick={() => setDeletePost(true)}
                                        className='hover:bg-slate-100 duration-300 py-2 px-5 flex justify-between'
                                    >
                                        Delete {
                                            jobStatus === 'Delete' &&
                                            <CheckIcon className='inline-block w-5 h-5' />
                                        }
                                    </p>
                                </div>
                            }
                        </div>
                    }
                </li>
                <li className='md:col-span-1 text-center'>
                    <button
                        onClick={() => navigate(`/dashboard/job/edit/${_id}`, {
                            state: _id
                        })}
                        className='btn btn-outline btn-primary rounded min-h-0 h-10 normal-case hover:text-white text-base'>
                        Edit Job
                    </button>
                </li>
            </ul>

            <ul className='md:hidden hidden sm:grid sm:grid-cols-7 items-center list-none'>
                <li className='sm:col-span-3'>
                    <button
                        onClick={() =>
                            navigate(`/dashboard/job/details/${_id}`,
                                { state: post }
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
                        Published: <span className='font-normal'>{publish}</span>
                    </h5>
                </li>
                <li className='sm:col-span-1 text-center'>
                    <h5 className='text-base font-medium text-gray-500'>Applicants</h5>
                    <Link
                        to={`/dashboard/seeker-applications?id=${_id}`}
                        className='text-sm font-medium hover:text-primary duration-200 px-4'
                    >
                        {applicants.length}
                    </Link>
                </li>
                <li className='sm:col-span-3 text-center flex items-end justify-between'>
                    <div className='ml-2'>
                        <h5 className='text-base font-medium text-gray-500'>Job Status</h5>
                        {!permission ?
                            <div className='w-max mx-auto px-2 mt-1 rounded-xl bg-primary text-white text-sm'>
                                Under review
                            </div>
                            :
                            <div
                                onClick={() => setOpenJStatus(!openJStatus)}
                                className='relative w-max mx-auto border rounded text-base text-start px-4 py-1 mt-1 cursor-pointer'
                            >
                                <div className='flex items-center justify-between gap-5'>
                                    {jobStatus}
                                    {
                                        openJStatus ?
                                            <ChevronUpIcon className='w-6 h-6 inline-block' />
                                            :
                                            <ChevronDownIcon className='w-6 h-6 inline-block' />
                                    }
                                </div>
                                {
                                    openJStatus &&
                                    <div className='absolute top-9 left-0 w-full bg-white z-30 border rounded shadow-xl'>
                                        <p
                                            onClick={() => handleJobStatus('Open', _id)}
                                            className='hover:bg-slate-100 duration-300 py-2 px-5 flex justify-between'
                                        >
                                            Open {
                                                jobStatus === 'Open' &&
                                                <CheckIcon className='inline-block w-5 h-5' />
                                            }
                                        </p>
                                        <p
                                            onClick={() => handleJobStatus('Paused', _id)}
                                            className='hover:bg-slate-100 duration-300 py-2 px-5 flex justify-between'
                                        >
                                            Paused {
                                                jobStatus === 'Paused' &&
                                                <CheckIcon className='inline-block w-5 h-5' />
                                            }
                                        </p>
                                        <p
                                            onClick={() => setDeletePost(true)}
                                            className='hover:bg-slate-100 duration-300 py-2 px-5 flex justify-between'
                                        >
                                            Delete {
                                                jobStatus === 'Delete' &&
                                                <CheckIcon className='inline-block w-5 h-5' />
                                            }
                                        </p>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                    <button
                        onClick={() => navigate(`/dashboard/job/edit/${_id}`, {
                            state: _id
                        })}
                        className='btn btn-outline btn-primary rounded min-h-0 h-10 normal-case hover:text-white text-base'>
                        Edit Job
                    </button>
                </li>
            </ul>


            {/* ======================
                Responsive for Mobile
                ====================== */}
            <div className='sm:hidden w-full'>
                <h1 className='text-center'>
                    <button
                        onClick={() =>
                            navigate(`/dashboard/job/details/${_id}`,
                                { state: post }
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
                    <p>Published :</p>
                    <span className='font-normal'>{publish}</span>
                </h5>
                <h5 className='mt-2 text-base font-medium text-gray-500 flex justify-between items-center'>
                    <p className='text-base font-medium text-gray-500'>Applicants :</p>
                    <Link
                        to={`/dashboard/seeker-applications?id=${_id}`}
                        className='text-sm font-medium hover:text-primary duration-200 px-4'
                    >
                        {applicants.length}
                    </Link>
                </h5>
                <h5 className='mt-2 text-base font-medium text-gray-500 flex justify-between items-center'>
                    <p className='text-base font-medium text-gray-500'>Job Status</p>
                    {!permission ?
                        <div className='w-max px-2 mt-1 rounded-xl bg-primary text-white text-sm'>
                            Under review
                        </div>
                        :
                        <div
                            onClick={() => setOpenJStatus(!openJStatus)}
                            className='relative w-max border rounded text-base text-start px-4 py-1 mt-1 cursor-pointer'
                        >
                            <div className='flex items-center justify-between gap-5'>
                                {jobStatus}
                                {
                                    openJStatus ?
                                        <ChevronUpIcon className='w-6 h-6 inline-block' />
                                        :
                                        <ChevronDownIcon className='w-6 h-6 inline-block' />
                                }
                            </div>
                            {
                                openJStatus &&
                                <div className='absolute top-9 left-0 w-full bg-white z-30 border rounded shadow-xl'>
                                    <p
                                        onClick={() => handleJobStatus('Open', _id)}
                                        className='hover:bg-slate-100 duration-300 py-2 px-5 flex justify-between'
                                    >
                                        Open {
                                            jobStatus === 'Open' &&
                                            <CheckIcon className='inline-block w-5 h-5' />
                                        }
                                    </p>
                                    <p
                                        onClick={() => handleJobStatus('Paused', _id)}
                                        className='hover:bg-slate-100 duration-300 py-2 px-5 flex justify-between'
                                    >
                                        Paused {
                                            jobStatus === 'Paused' &&
                                            <CheckIcon className='inline-block w-5 h-5' />
                                        }
                                    </p>
                                    <p
                                        onClick={() => setDeletePost(true)}
                                        className='hover:bg-slate-100 duration-300 py-2 px-5 flex justify-between'
                                    >
                                        Delete {
                                            jobStatus === 'Delete' &&
                                            <CheckIcon className='inline-block w-5 h-5' />
                                        }
                                    </p>
                                </div>
                            }
                        </div>
                    }
                </h5>
                <h5 className='mt-4 text-base font-medium text-gray-500 flex justify-center'>
                    <button
                        onClick={() => navigate(`/dashboard/job/edit/${_id}`, {
                            state: _id
                        })}
                        className='btn btn-outline btn-primary rounded min-h-0 h-11 w-full normal-case hover:text-white text-base'>
                        Edit Job
                    </button>
                </h5>
            </div>


            {/* =========================Delete modal========================= */}
            {
                deletePost &&
                <div className="fixed w-screen h-screen bg-black/60 top-0 left-0 z-30 flex items-center justify-center">
                    <div className="modal-box text-center bg-secondary">
                        <h3 className="font-medium text-2xl text-white">Are you sure!</h3>
                        <p className="text-lg py-4 text-gray-300">Do you want to delete it?</p>
                        <div className="flex justify-center gap-10 mt-5">
                            <button
                                onClick={() => setDeletePost(!deletePost)}
                                className="btn btn-primary text-white min-h-0 h-11 px-10 ">
                                No
                            </button>
                            <button
                                onClick={() => handleDelete(_id)}
                                className="btn btn-outline text-white min-h-0 h-11 px-10 hover:bg-white hover:text-secondary hover:border-white">
                                {dLoading ? <Spinner></Spinner> : 'Yes'}
                            </button>
                        </div>
                    </div>
                </div>
            }

        </div>

        {
            statusLoading &&
            <div className='fixed top-0 left-0 z-40 w-full h-screen flex items-center justify-center bg-white/40'>
                <Spinner></Spinner>
            </div>
        }
    </>);
};

export default JobPostList;