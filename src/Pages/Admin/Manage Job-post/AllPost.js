import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ViewApplicants from './ViewApplicants';

const AllPost = ({ posts }) => {
    const [open, setOpen] = useState(false);
    const [deletePost, setDeletePost] = useState(false);
    const {
        _id,
        jobTitle,
        company,
        jobLocation,
        salary,
        empType,
        jobDescription,
        workplace,
        empQuantity,
        employerEmail,
        receiveEmail,
        skillTags,
        permission
    } = posts;

    const navigate = useNavigate();

    const handlePermission = id => {
        const permission = true;
        const date = new Date();
        const publish = date.getDate() + '-' + date.toLocaleString('default', { month: 'long' }) + '-' + date.getFullYear();

        const url = `https://boiling-beach-14928.herokuapp.com/post/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ permission, publish })
        })
            .then(res => res.json())
            .then(data => { });
    };

    const handleDelete = id => {
        const url = `https://boiling-beach-14928.herokuapp.com/post/${id}`;
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => { });
        setDeletePost(!deletePost)
    };

    return (
        <div className={`${open ? 'h-auto' : 'h-32'} overflow-hidden sm:py-6 sm:px-8 p-3 w-full border mb-6 shadow-lg relative`}>
            {
                !permission && <span className='absolute text-sm bg-success text-white sm:px-3 px-1 py-1 sm:top-6 top-0 left-0 rounded-r-full'>Pending...</span>
            }
            <div className="">
                <h2 className="text-center text-xl font-medium">{jobTitle}</h2>
                <h5 className='text-center font-medium text-base'>{company}</h5>
                <span className='bg-slate-200 px-2 py-1 rounded w-max sm:block hidden'>{workplace}</span>
                <h5 className={`font-medium ${open ? 'mt-2' : 'mt-14'}`}>Location :
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
                <h5 className='font-medium'>Employer Email :
                    <span className='text-base font-normal ml-2'>{employerEmail}</span>
                </h5>
                <h5 className='font-medium'>Job Receive Email :
                    <span className='text-base font-normal ml-2'>{receiveEmail}</span>
                </h5>
                <h5 className='font-medium'>Provide tags :
                    {
                        skillTags.map((tag, index) => <span key={index} className='text-base font-normal ml-2'>'{tag}'</span>)
                    }
                </h5>
                <hr className='my-6' />
                <div className='mb-10' dangerouslySetInnerHTML={{ __html: jobDescription }}></div>
            </div>
            <div className="absolute md:bottom-5 bottom-2 right-5">
                <button
                    onClick={() => setOpen(!open)}
                    className="btn btn-link text-accent normal-case text-base min-h-0 h-9 px-2">{open ? 'Less' : 'View'}
                </button>
                {
                    !permission ?
                        <button
                            onClick={() => handlePermission(_id)}
                            className="btn btn-outline btn-primary normal-case text-base min-h-0 h-9 ml-5 px-2">
                            Approve
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
                <button
                    onClick={() => setDeletePost(!deletePost)}
                    className="btn btn-outline normal-case text-base min-h-0 h-9 ml-5 px-2">
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

                            <button onClick={() => setDeletePost(!deletePost)} className="btn btn-primary text-white min-h-0 h-10 px-8 tracking-wider">No</button>

                            <button onClick={() => handleDelete(_id)} className="btn btn-outline text-white min-h-0 h-10 px-8 tracking-wider">Yes</button>

                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default AllPost;