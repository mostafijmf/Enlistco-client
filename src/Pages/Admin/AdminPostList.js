import React, { useState } from 'react';

const AdminPostList = ({ post }) => {
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
        skillTags
    } = post;

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
            <div className="">
                <h2 className="text-center text-xl font-medium">{jobTitle}</h2>
                <h5 className='text-center font-medium text-base'>{company}</h5>
                <span className='bg-slate-200 font-medium px-2 py-1 rounded w-max'>{workplace}</span>
                <h5 className={`font-medium ${open ? 'mt-2' : 'mt-14'}`}>Location :
                    <span className='text-base font-normal ml-2'>{jobLocation}</span>
                </h5>
                <h5 className='text-base font-medium'>Salary :
                    <span className='font-normal ml-2'>${salary}</span>
                </h5>
                <h5 className='text-base font-medium'>Job Type :
                    <span className='font-normal ml-2'>{empType}</span>
                </h5>
                <h5 className='text-base font-medium'>Employees Quantity :
                    <span className='font-normal ml-2'>{empQuantity}</span>
                </h5>
                <hr className='my-6' />
                <div className='mb-10' dangerouslySetInnerHTML={{ __html: jobDescription }}></div>
            </div>
            <div className="absolute md:bottom-5 bottom-2 right-5">
                <button onClick={() => setOpen(!open)} className="btn btn-outline btn-accent normal-case text-base min-h-8 h-0">{open ? 'Less' : 'View'}</button>
                <button onClick={() => setDeletePost(!deletePost)} className="btn btn-outline normal-case text-base min-h-8 h-0 ml-5">Delete</button>
            </div>
            {
                deletePost &&
                <div className="fixed w-screen h-screen top-0 left-0 z-20 flex items-center justify-center">
                    <div className="modal-box text-center bg-secondary">
                        <h3 className="font-medium text-2xl text-white">Are you sure!</h3>
                        <p className="text-lg py-4 text-gray-300">Do you want to delete it?</p>
                        <div className="flex justify-center gap-5 mt-5">

                            <button onClick={() => setDeletePost(!deletePost)} className="btn btn-primary text-white min-h-8 h-0 px-6 tracking-wider">No</button>

                            <button onClick={() => handleDelete(_id)} className="btn btn-outline text-white min-h-8 h-0 px-6 tracking-wider">Yes</button>

                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default AdminPostList;