import React from 'react';
import { Link } from 'react-router-dom';
import JobDetails from './JobDetails';

const   AllJobs = () => {
    
    return (
        <section>
            <h1 className='text-center md:text-5xl sm:text-4xl text-3xl my-10 relative'>All Jobs
                <span className='sm:text-base text-sm bg-accent text-white md:px-2 px-1 md:py-1 absolute top-3 ml-3 rounded-md'>1000</span>
            </h1>
            <div className='md:w-4/5 sm:w-10/12 w-11/12 mx-auto flex justify-between gap-5 mb-10'>
                <div className='w-full'>
                    <div className="w-full rounded-lg border shadow-md mb-5">
                        <Link to='/' className="flex flex-col sm:p-8 p-5 gap-2 flex-auto">
                            <span className='text-accent text-sm tracking-wide'>Published: 01/02/20</span>
                            <h2 className="text-2xl font-medium">Web Developer</h2>
                            <h5 className='font-medium'>Google</h5>
                            <h5 className='font-medium'>New york, USA</h5>
                            <div className='flex items-center sm:gap-5 gap-3'>
                                <div className='flex items-center gap-1 bg-slate-200 px-2 py-1 rounded'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className='sm:font-bold font-medium text-base'>25000 a year</p>
                                </div>
                                <div className='flex items-center gap-1 bg-slate-200 px-2 py-1 rounded'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <p className='sm:font-bold font-medium text-base'>Full-time</p>
                                </div>
                            </div>
                            <p className='my-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, alias atque. Sapiente necessitatibus ullam voluptatum id. Odio, quos officiis ad id nam delectus nesciunt illum, beatae labore, totam corporis ea. Temporibus fugiat, nobis minus, esse sit ad molestias quibusdam sint reiciendis veniam alias reprehenderit numquam impedit vero minima veritatis consectetur dolorum? Sunt magni earum molestias veritatis dolorum omnis consectetur ut?</p>
                            <span className='bg-slate-200 px-2 py-1 rounded w-max'>Remote</span>
                        </Link>
                    </div>
                    <div className="w-full rounded-lg border shadow-md mb-5">
                        <Link to='/' className="card-body">
                            <span className='text-accent text-sm tracking-wide'>Published: 01/02/20</span>
                            <h2 className="text-2xl font-medium">Web Developer</h2>
                            <h5 className='font-medium'>Google</h5>
                            <h5 className='font-medium'>New york, USA</h5>
                            <div className='flex items-center gap-5'>
                                <div className='flex items-center gap-1 bg-slate-200 px-2 py-1 rounded'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className='font-bold'>25000 a year</p>
                                </div>
                                <div className='flex items-center gap-1 bg-slate-200 px-2 py-1 rounded'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <p className='font-bold'>Full-time</p>
                                </div>
                            </div>
                            <p className='my-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, alias atque. Sapiente necessitatibus ullam voluptatum id. Odio, quos officiis ad id nam delectus nesciunt illum, beatae labore, totam corporis ea. Temporibus fugiat, nobis minus, esse sit ad molestias quibusdam sint reiciendis veniam alias reprehenderit numquam impedit vero minima veritatis consectetur dolorum? Sunt magni earum molestias veritatis dolorum omnis consectetur ut?</p>
                            <span className='bg-slate-200 px-2 py-1 rounded w-max'>Remote</span>
                        </Link>
                    </div>
                    <div className="w-full rounded-lg border shadow-md mb-5">
                        <Link to='/' className="card-body">
                            <span className='text-accent text-sm tracking-wide'>Published: 01/02/20</span>
                            <h2 className="text-2xl font-medium">Web Developer</h2>
                            <h5 className='font-medium'>Google</h5>
                            <h5 className='font-medium'>New york, USA</h5>
                            <div className='flex items-center gap-5'>
                                <div className='flex items-center gap-1 bg-slate-200 px-2 py-1 rounded'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className='font-bold'>25000 a year</p>
                                </div>
                                <div className='flex items-center gap-1 bg-slate-200 px-2 py-1 rounded'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <p className='font-bold'>Full-time</p>
                                </div>
                            </div>
                            <p className='my-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, alias atque. Sapiente necessitatibus ullam voluptatum id. Odio, quos officiis ad id nam delectus nesciunt illum, beatae labore, totam corporis ea. Temporibus fugiat, nobis minus, esse sit ad molestias quibusdam sint reiciendis veniam alias reprehenderit numquam impedit vero minima veritatis consectetur dolorum? Sunt magni earum molestias veritatis dolorum omnis consectetur ut?</p>
                            <span className='bg-slate-200 px-2 py-1 rounded w-max'>Remote</span>
                        </Link>
                    </div>
                    <div className="w-full rounded-lg border shadow-md mb-5">
                        <Link to='/' className="card-body">
                            <span className='text-accent text-sm tracking-wide'>Published: 01/02/20</span>
                            <h2 className="text-2xl font-medium">Web Developer</h2>
                            <h5 className='font-medium'>Google</h5>
                            <h5 className='font-medium'>New york, USA</h5>
                            <div className='flex items-center gap-5'>
                                <div className='flex items-center gap-1 bg-slate-200 px-2 py-1 rounded'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className='font-bold'>25000 a year</p>
                                </div>
                                <div className='flex items-center gap-1 bg-slate-200 px-2 py-1 rounded'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <p className='font-bold'>Full-time</p>
                                </div>
                            </div>
                            <p className='my-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, alias atque. Sapiente necessitatibus ullam voluptatum id. Odio, quos officiis ad id nam delectus nesciunt illum, beatae labore, totam corporis ea. Temporibus fugiat, nobis minus, esse sit ad molestias quibusdam sint reiciendis veniam alias reprehenderit numquam impedit vero minima veritatis consectetur dolorum? Sunt magni earum molestias veritatis dolorum omnis consectetur ut?</p>
                            <span className='bg-slate-200 px-2 py-1 rounded w-max'>Remote</span>
                        </Link>
                    </div>
                    <div className="w-full rounded-lg border shadow-md mb-5">
                        <Link to='/' className="card-body">
                            <span className='text-accent text-sm tracking-wide'>Published: 01/02/20</span>
                            <h2 className="text-2xl font-medium">Web Developer</h2>
                            <h5 className='font-medium'>Google</h5>
                            <h5 className='font-medium'>New york, USA</h5>
                            <div className='flex items-center gap-5'>
                                <div className='flex items-center gap-1 bg-slate-200 px-2 py-1 rounded'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className='font-bold'>25000 a year</p>
                                </div>
                                <div className='flex items-center gap-1 bg-slate-200 px-2 py-1 rounded'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <p className='font-bold'>Full-time</p>
                                </div>
                            </div>
                            <p className='my-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, alias atque. Sapiente necessitatibus ullam voluptatum id. Odio, quos officiis ad id nam delectus nesciunt illum, beatae labore, totam corporis ea. Temporibus fugiat, nobis minus, esse sit ad molestias quibusdam sint reiciendis veniam alias reprehenderit numquam impedit vero minima veritatis consectetur dolorum? Sunt magni earum molestias veritatis dolorum omnis consectetur ut?</p>
                            <span className='bg-slate-200 px-2 py-1 rounded w-max'>Remote</span>
                        </Link>
                    </div>
                    <div className="w-full rounded-lg border shadow-md mb-5">
                        <Link to='/' className="card-body">
                            <span className='text-accent text-sm tracking-wide'>Published: 01/02/20</span>
                            <h2 className="text-2xl font-medium">Web Developer</h2>
                            <h5 className='font-medium'>Google</h5>
                            <h5 className='font-medium'>New york, USA</h5>
                            <div className='flex items-center gap-5'>
                                <div className='flex items-center gap-1 bg-slate-200 px-2 py-1 rounded'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className='font-bold'>25000 a year</p>
                                </div>
                                <div className='flex items-center gap-1 bg-slate-200 px-2 py-1 rounded'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <p className='font-bold'>Full-time</p>
                                </div>
                            </div>
                            <p className='my-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, alias atque. Sapiente necessitatibus ullam voluptatum id. Odio, quos officiis ad id nam delectus nesciunt illum, beatae labore, totam corporis ea. Temporibus fugiat, nobis minus, esse sit ad molestias quibusdam sint reiciendis veniam alias reprehenderit numquam impedit vero minima veritatis consectetur dolorum? Sunt magni earum molestias veritatis dolorum omnis consectetur ut?</p>
                            <span className='bg-slate-200 px-2 py-1 rounded w-max'>Remote</span>
                        </Link>
                    </div>
                </div>
                <div className='w-full lg:block hidden relative'>
                    <JobDetails></JobDetails>
                </div>
            </div>
        </section>
    );
};

export default AllJobs;