import { CheckCircleIcon, DotsVerticalIcon, LinkIcon, XCircleIcon } from '@heroicons/react/solid';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, TwitterIcon, TwitterShareButton } from 'react-share';

const PostList = ({ post }) => {
    const [openMenu, setOpenMenu] = useState(false);
    const [copied, setCopied] = useState(false);
    useEffect(() => {
        if (copied) {
            setTimeout(() => {
                setCopied(false);
            }, 4000);
        }
    }, [copied]);

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

    // ===================Copy link button===================
    const clipboard = id => {
        setCopied(true);
        navigator.clipboard.writeText(`https://enlistco.co.in/job/${id}`);
        setOpenMenu(false);
    };

    return (<section className='relative'>{
        permission && <>
            <div className='absolute z-10 top-5 right-5'>
                <div
                    onClick={() => {
                        setOpenMenu(!openMenu);
                        setCopied(false)
                    }}
                    className='absolute right-0 top-0 p-1 w-max h-max border-2 hover:border-gray-500 text-gray-500 duration-200 rounded-md cursor-pointer'
                >
                    <DotsVerticalIcon className='w-6 h-6' />
                </div>
                {
                    openMenu &&
                    <div
                        className='absolute top-10 right-0 sm:w-96 w-80 py-2 bg-white border rounded'
                        style={{ boxShadow: '0 5px 20px 1px rgb(0, 0, 0, 0.3)' }}
                    >
                        <p className='px-5 py-3 text-base font-medium flex items-center justify-start gap-4'>
                            Job Id<span className=''>{_id}</span>
                        </p>
                        <button
                            onClick={() => clipboard(_id)}
                            className='px-5 py-3 text-base font-medium w-full flex items-center justify-start gap-5 hover:bg-slate-100 duration-300'
                            title='Copy'
                        >
                            <LinkIcon className='w-6 h-6 mx-2' />
                            <span>Copy link to share</span>
                        </button>
                        <FacebookShareButton
                            url={`https://enlistco.co.in/job/${_id}`}
                            className='px-5 py-2 text-base font-medium w-full flex items-center justify-start gap-5 hover:bg-slate-100 duration-300'
                            title='Click'
                            quote={jobTitle}
                        >
                            <FacebookIcon className='w-8 h-8 mx-1' round={true} />
                            <span className=''>Share to Facebook</span>
                        </FacebookShareButton>
                        <LinkedinShareButton
                            url={`https://enlistco.co.in/job/${_id}`}
                            className='px-5 py-2 text-base font-medium w-full flex items-center justify-start gap-5 hover:bg-slate-100 duration-300'
                            title='Click'
                        >
                            <LinkedinIcon className='w-8 h-8 mx-1' round={true} />
                            <span className=''>Share to Linkedin</span>
                        </LinkedinShareButton>
                        <TwitterShareButton
                            url={`https://enlistco.co.in/job/${_id}`}
                            className='px-5 py-2 text-base font-medium w-full flex items-center justify-start gap-5 hover:bg-slate-100 duration-300'
                            title='Click'
                        >
                            <TwitterIcon className='w-8 h-8 mx-1' round={true} />
                            <span className=''>Share to Twitter</span>
                        </TwitterShareButton>
                        <EmailShareButton
                            url={`https://enlistco.co.in/job/${_id}`}
                            className='px-5 py-2 text-base font-medium w-full flex items-center justify-start gap-5 hover:bg-slate-100 duration-300'
                            title='Click'
                        >
                            <EmailIcon className='w-8 h-8 mx-1' round={true} />
                            <span className=''>Send to Email</span>
                        </EmailShareButton>
                    </div>
                }
            </div>
            <Link to={`/job/${_id}`}>
                <div className="bg-white w-full rounded-lg border shadow-md mb-5 cursor-pointer">
                    <div className="flex flex-col sm:p-6 p-5 gap-2 flex-auto">
                        <span className='text-accent text-sm tracking-wide'>Published: {publish}</span>
                        <h2 className="text-2xl font-medium">{jobTitle}</h2>
                        <h5 className='font-medium'>{company}</h5>
                        <h5 className='font-medium'>{jobLocation}</h5>
                        <div className='flex items-center sm:gap-5 gap-3'>
                            <div className='flex items-center gap-1 bg-slate-200 px-2 py-1 rounded'>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" strokeWidth="2"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className='sm:font-bold font-medium text-base'>{salary}</p>
                            </div>
                            <div className='flex items-center gap-1 bg-slate-200 px-2 py-1 rounded'>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <p className='sm:font-bold font-medium text-base'>
                                    {empType}
                                </p>
                            </div>
                        </div>
                        <div
                            className='my-2'
                            dangerouslySetInnerHTML={{ __html: desciption }}
                        ></div>
                        <span className='bg-slate-200 px-2 py-1 rounded w-max'>
                            {workplace}
                        </span>
                    </div>
                </div>
            </Link>
            <div
                className={`fixed bottom-3 sm:left-8 left-5 z-30 bg-neutral px-5 py-4 rounded-lg duration-300 
                ${copied ? 'translate-y-0' : 'translate-y-32'}
                `}
            >
                <div className='flex items-center'>
                    <CheckCircleIcon className='w-6 h-6 text-success mr-2' />
                    <p className='text-sm text-white mr-20'>Link copied</p>
                    <XCircleIcon
                        onClick={() => setCopied(false)}
                        className='w-7 h-7 text-gray-400 hover:text-gray-300 duration-300 rounded-full cursor-pointer'
                    />
                </div>
            </div>
        </>
    }
    </section>);
};

export default PostList;