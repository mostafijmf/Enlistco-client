import { ArrowRightIcon, XIcon } from '@heroicons/react/solid';
import React from 'react';
import { useState } from 'react';

const AppliedList = ({ appliedJob, allPost }) => {
    const {
        postID,
        applied,
        resume,
        subject,
        coverLetter
    } = appliedJob;
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
                    <div className="bg-white rounded-lg border shadow-md mb-8 sm:mx-0 mx-2">
                        <div className="card-body sm:p-8 p-5">
                            <h1 className='sm:text-2xl text-xl font-bold text-center'>Job Details</h1>
                            <div className='flex justify-between items-center'>
                                <span className='text-accent text-sm tracking-wide'>Published: {aj.publish}</span>
                                <button
                                    onClick={() => setOpenPost('')}
                                    className='btn btn-link sm:text-lg text-base min-h-0 h-8 p-0 normal-case'>
                                    Back
                                    <ArrowRightIcon className='w-4 h-4 sm:ml-2 ml-1'></ArrowRightIcon>
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
                        <div className='bg-white w-full shadow-md p-5 border mb-3 sm:mx-0 mx-2 relative'>
                            <ul className='list-none grid sm:grid-cols-2 sm:grid-rows-1 grid-rows-2 items-center'>
                                <li>
                                    <h1 className='text-xl text-left font-medium'>{aj.jobTitle}</h1>
                                    <p className='sm:text-lg text-base'>{aj.company}</p>
                                </li>
                                <li className='flex justify-between items-center'>
                                    <div>
                                        <h5 className='text-base font-medium text-gray-500'>Applied</h5>
                                        <h4>{applied}</h4>
                                    </div>
                                    <div className='flex items-center justify-center gap-5'>
                                        <button
                                            onClick={() => handlePostView(aj)}
                                            className="btn btn-link normal-case text-base min-h-0 h-max px-0"
                                        >View
                                        </button>
                                        <button
                                            onClick={() => setOpenModal(!openModal)}
                                            className="btn btn-link text-accent normal-case text-base min-h-0 h-max px-0"
                                        >Cover letter
                                        </button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        {
                            openModal && 
                            <div className='w-full h-full overflow-y-auto scrollBar-sm bg-black/60 fixed z-30 top-0 left-0 flex justify-center'>
                                <div className='lg:w-1/2 md:w-4/6 sm:w-11/12 w-full mx-2 h-max md:mt-5 my-10 bg-white rounded-md shadow-md relative'>
                                    <button
                                        onClick={() => setOpenModal(!openModal)}
                                        className='absolute top-5 sm:right-5 right-3 w-9 h-9 hover:bg-gray-100 hover:rounded-full duration-300 p-1'>
                                        <XIcon></XIcon>
                                    </button>
                                    <div className='pt-5 pb-3 border-b sm:px-8 px-5'>
                                        <h1 className='sm:text-2xl text-xl font-medium'>Applied to {aj.jobTitle}</h1>
                                    </div>
                                    <div className='py-3 sm:px-8 px-5'>
                                        <h2 className='sm:text-lg text-base font-medium'>CV / Resume</h2>
                                        <iframe title='Resume' className='mt-2' src={resume}></iframe>
                                    </div>
                                    <div className='pb-8 sm:px-8 px-5 border-t'>
                                        <h2 className='sm:text-lg base mt-2 font-medium'>Cover letter</h2>
                                        <h2 className='text-base mb-1 font-medium'>Subject :
                                            <span className='font-normal ml-2'>{subject}</span>
                                        </h2>
                                        <div className='ml-3 h-max sm:text-base text-sm' dangerouslySetInnerHTML={{ __html: coverLetter }}></div>
                                    </div>
                                </div>
                            </div>
                        }</>
            }</div>)
        }
    </>);
};

export default AppliedList;