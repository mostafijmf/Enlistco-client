import { ArrowRightIcon } from '@heroicons/react/solid';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import Spinner from '../Shared/Spinner';

const MyPost = ({ post }) => {
    const [open, setOpen] = useState(false);
    const [openPost, setOpenPost] = useState(false);
    const [deletePost, setDeletePost] = useState(false);
    const [loading, setLoading] = useState(false);
    const {
        _id,
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
    
    const handleDelete = async id => {
        setLoading(true)
        const url = `https://boiling-beach-14928.herokuapp.com/post/${id}`;

        await axios.delete(url)
            .then(res => {
                setLoading(false)
                setDeletePost(!deletePost);
            })
            .then(err => {
                setLoading(false)
            })
    };

    return (openPost ?
        <div className="rounded-lg border shadow-md mb-10">
            <div className="card-body sm:p-8 p-5">
                <h1 className='sm:text-2xl text-xl font-bold text-center'>Job Details</h1>
                <div className='flex justify-between items-center'>
                    <span className='text-accent text-sm tracking-wide'>Published: {publish}</span>
                    <button
                        onClick={() => setOpenPost(false)}
                        className='btn btn-link sm:text-lg text-base min-h-0 h-8 p-0 tracking-wider normal-case'>
                        Back
                        <ArrowRightIcon className='sm:w-5 sm:h-5 w-4 h-4 sm:ml-2 ml-1'></ArrowRightIcon>
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
        <div className='w-full border-t-2 mb-3 relative'>
            {
                !publish &&
                <div className='absolute top-0 right-0 w-max px-2 rounded-l-xl bg-primary text-white text-sm'>
                    Under review
                </div>
            }
            <div>
                <h1 className='text-xl text-left font-medium'>{jobTitle}</h1>
                <p className='sm:text-lg text-base'>{company}</p>
                <div className='flex items-center'>
                    <p className='sm:text-base text-sm mr-5'>{jobLocation}</p>
                    <span className='sm:text-base text-sm font-medium bg-slate-200 px-2 py-1 rounded w-max'>{workplace}</span>
                </div>
                <h5 className='sm:text-base text-sm text-accent'><span className='mr-2'>Published:</span> {publish}</h5>
            </div>
            <div className="absolute flex items-center justify-end gap-5 bottom-0 right-0 w-full">
                <button
                    onClick={() => setOpenPost(true)}
                    className="btn btn-outline btn-accent normal-case text-base min-h-0 sm:h-8 h-9 px-6">
                    View
                </button>
                <button
                    onClick={() => setDeletePost(!deletePost)}
                    className="btn btn-outline normal-case text-base min-h-0 sm:h-8 h-9 px-6">
                    Delete
                </button>
            </div>
            {
                deletePost &&
                <div className="fixed w-screen h-screen top-0 left-0 z-20 flex items-center justify-center">
                    <div className="modal-box text-center bg-secondary">
                        <h3 className="font-medium text-2xl text-white">Are you sure!</h3>
                        <p className="text-lg py-4 text-gray-300">Do you want to delete it?</p>
                        <div className="flex justify-center gap-10 mt-5">

                            <button
                                onClick={() => setDeletePost(!deletePost)}
                                className="btn btn-primary text-white min-h-0 h-10 px-10 tracking-wider">
                                No
                            </button>

                            <button
                                onClick={() => handleDelete(_id)}
                                className="btn btn-outline text-white min-h-0 h-10 px-10 tracking-wider">
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