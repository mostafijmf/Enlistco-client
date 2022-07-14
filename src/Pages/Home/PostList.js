import React from 'react';

const PostList = ({ post, setOpen }) => {
    const {
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
    return (<>
        {
            permission && <div onClick={() => setOpen(post)} className="w-full rounded-lg border shadow-md mb-5 cursor-pointer">
                <div className="flex flex-col sm:p-8 p-5 gap-2 flex-auto">
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
        }
    </>);
};

export default PostList;