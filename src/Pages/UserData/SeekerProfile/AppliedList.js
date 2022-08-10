import { ArrowRightIcon, XIcon } from '@heroicons/react/solid';
import React from 'react';
import { useState } from 'react';

const AppliedList = ({ appliedJob, allPost }) => {
    const { postID, applied, receiveEmail, resume, seekerEmail, seekerName, subject, coverLetter } = appliedJob;
    const allJobPost = allPost.filter(post => post._id === postID);
    const [openModal, setOpenModal] = useState(false);
    const [openPost, setOpenPost] = useState();
    const handlePostView = (aj) => {
        setOpenPost(aj);
    };
    return (<>
        {
            allJobPost.map(aj => <div key={aj._id}>{
                openPost ?
                    <div className="rounded-lg border shadow-md mb-10">
                        <div className="card-body sm:p-8 p-5">
                            <h1 className='sm:text-2xl text-xl font-bold text-center'>Job Details</h1>
                            <div className='flex justify-between items-center'>
                                <span className='text-accent text-sm tracking-wide'>Published: {aj.publish}</span>
                                <button
                                    onClick={() => setOpenPost('')}
                                    className='btn btn-link sm:text-lg text-base min-h-0 h-8 p-0 tracking-wider normal-case'>
                                    Back
                                    <ArrowRightIcon className='sm:w-5 sm:h-5 w-4 h-4 sm:ml-2 ml-1'></ArrowRightIcon>
                                </button>
                            </div>
                            <h2 className="sm:text-2xl text-xl font-medium">{aj.jobTitle}</h2>
                            <h5 className='font-medium'>{aj.company}</h5>
                            <h5 className='font-medium'>Location :
                                <span className='text-base font-normal ml-2'>{aj.jobLocation}</span>
                            </h5>
                            <h5 className='font-medium'>Salary :
                                <span className='text-base font-normal ml-2'>${aj.salary}</span>
                            </h5>
                            <h5 className='font-medium'>Job Type :
                                <span className='text-base font-normal ml-2'>{aj.empType}</span>
                            </h5>
                            <h5 className='font-medium'>Employees Quantity :
                                <span className='text-base font-normal ml-2'>{aj.empQuantity}</span>
                            </h5>
                            <span className='bg-slate-200 px-2 py-1 rounded w-max'>{aj.workplace}</span>
                            <hr />
                            <div className='mb-10' dangerouslySetInnerHTML={{ __html: aj.jobDescription }}></div>
                        </div>
                    </div>
                    : <>
                        <div className='w-full border-t-2 mb-3 relative'>
                            <div>
                                <h1 className='text-xl text-left font-medium'>{aj.jobTitle}</h1>
                                <p className='sm:text-lg text-base'>{aj.company}</p>
                                <div className='flex items-center'>
                                    <p className='sm:text-base text-sm mr-5'>{aj.jobLocation}</p>
                                    <span className='sm:text-base text-sm font-medium bg-slate-200 px-2 py-1 rounded w-max'>{aj.workplace}</span>
                                </div>
                                <h5 className='sm:text-base text-sm text-accent'><span className='mr-2'>Applied</span>{applied}</h5>
                            </div>
                            <div className='absolute sm:top-12 -bottom-1 right-0 flex items-center justify-center gap-5'>
                                <button  onClick={() => handlePostView(aj)} className="btn btn-outline btn-accent normal-case text-base min-h-0 sm:h-8 h-9 px-6">View</button>
                                <button onClick={() => setOpenModal(!openModal)} className="btn btn-outline normal-case text-base min-h-0 sm:h-8 h-9 px-6">See cover letter</button>
                            </div>
                        </div>
                        {
                            openModal && <div className='w-full pt-10 pb-40 flex items-center justify-center absolute z-10 top-0 left-0 glass'>
                                <div className='lg:w-9/12 md:w-4/5 w-11/12 h-max bg-white rounded-md shadow-2xl relative z-50'>
                                    <button
                                        onClick={() => setOpenModal(!openModal)}
                                        className='absolute top-5 sm:right-5 right-3 w-10 h-10 hover:bg-gray-200 hover:rounded-full duration-300 p-1'>
                                        <XIcon></XIcon>
                                    </button>
                                    <div className='pt-5 pb-3 border-b-2 sm:px-8 px-5'>
                                        <h1 className='sm:text-2xl text-xl font-medium'>Applied to {aj.jobTitle}</h1>
                                    </div>
                                    <div className='py-3 sm:px-8 px-5'>
                                        <h2 className='sm:text-lg text-base font-medium'>CV / Resume</h2>
                                        <iframe title='Resume' className='mt-2' src={resume}></iframe>
                                    </div>
                                    <div className='pb-8 sm:px-8 px-5 border-t-2'>
                                        <h2 className='sm:text-lg base mt-2 font-medium'>Cover letter</h2>
                                        <h2 className='text-base mb-1 font-medium'>Subject :
                                            <span className='font-normal ml-2'>{subject}</span>
                                        </h2>
                                        <div className='ml-3 sm:h-80 sm:overflow-y-auto scrollBar sm:text-base text-sm' dangerouslySetInnerHTML={{ __html: coverLetter }}></div>
                                    </div>
                                </div>
                            </div>
                        }</>
            }</div>)
        }
    </>);
};

export default AppliedList;