import { DotsVerticalIcon } from '@heroicons/react/solid';
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const PostList = ({ post }) => {
    const [openClipboard, setOpenClipboard] = useState(false);
    const [copied, setCopied] = useState(false);

    const {
        _id,
        publish,
        jobTitle,
        company,
        jobLocation,
        salary,
        empType,
        jobDescription,
        workplace,
        permission
    } = post;
    const desciption = jobDescription.slice(0, 500);

    const clipboard = id => {
        setCopied(true)
        navigator.clipboard.writeText(`https://job-portal-online.web.app/job/${id.slice(5, 20)}`);
    };

    return (<section className='relative'>{
        permission && <>
            <div className='absolute z-10 sm:top-5 top-3 sm:right-5 right-3'>
                <div onClick={() => {
                    setOpenClipboard(!openClipboard);
                    setCopied(false)
                }} className='absolute right-0 top-0 p-1 w-max h-max border-2 hover:border-accent hover:text-accent duration-200 rounded-md cursor-pointer'>
                    <DotsVerticalIcon className='w-6 h-6'></DotsVerticalIcon>
                </div>
                {
                    openClipboard && <div onClick={() => clipboard(_id)}
                        title='copy'
                        className='absolute right-0 top-9 sm:w-max h-max border hover:border-accent rounded-md shadow-lg bg-white flex justify-between items-center cursor-pointer  text-gray-500 hover:text-accent'>
                        <p className='text-sm p-2'>https://job-portal-online.web.app/job/{_id.slice(5, 20)}</p>
                        <span className='sm:p-2 py-4 px-2 border hover:border-accent rounded-r-md hover'>{
                            copied ?
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg> :
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                        }
                        </span>
                    </div>
                }
            </div>
            <Link to={`/job/${_id.slice(5, 20)}`}>
                <div className="w-full rounded-lg border shadow-md mb-5 cursor-pointer">
                    <div className="flex flex-col sm:p-6 p-3 gap-2 flex-auto">
                        <span className='text-accent text-sm tracking-wide'>Published: {publish}</span>
                        <h2 className="text-2xl font-medium">{jobTitle}</h2>
                        <h5 className='font-medium'>{company}</h5>
                        <h5 className='font-medium'>{jobLocation}</h5>
                        <div className='flex items-center sm:gap-5 gap-3'>
                            <div className='flex items-center gap-1 bg-slate-200 px-2 py-1 rounded'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className='sm:font-bold font-medium text-base'>{salary}</p>
                            </div>
                            <div className='flex items-center gap-1 bg-slate-200 px-2 py-1 rounded'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <p className='sm:font-bold font-medium text-base'>{empType}</p>
                            </div>
                        </div>
                        <div className='my-2' dangerouslySetInnerHTML={{ __html: desciption }}></div>
                        <span className='bg-slate-200 px-2 py-1 rounded w-max'>{workplace}</span>
                    </div>
                </div>
            </Link>
        </>
    }
    </section>);
};

export default PostList;