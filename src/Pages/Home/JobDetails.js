import React from 'react';
import './JobDetails.css';

const JobDetails = () => {
    return (
        <div className="rounded-lg border shadow-md sticky top-8 h-screen overflow-y-auto scrollBar">
            <div className="card-body">
                <h1 className='text-2xl font-bold text-center'>Job Details</h1>
                <div className='flex justify-between'>
                    <span className='text-accent text-sm tracking-wide'>Published: 01/02/20</span>
                    <button className='btn btn-primary text-white px-6 tracking-wider'>Apply</button>
                </div>
                <h2 className="text-2xl font-medium">Web Developer</h2>
                <span className='bg-slate-200 px-2 py-1 rounded w-max'>Remote</span>
                <h5 className='font-medium'>Salary :
                    <span className='text-base font-normal ml-2'>$25000 a year</span>
                </h5>
                <h5 className='font-medium'>Location :
                    <span className='text-base font-normal ml-2'>New york, USA</span>
                </h5>
                <h5 className='font-medium'>Job Type :
                    <span className='text-base font-normal ml-2'>Full-time</span>
                    <span className='text-base font-normal ml-2'>, Internship</span>
                </h5>
                <hr />
                <div className='mb-10'>
                    <div>
                        <h2 className="text-xl font-medium">Description</h2>
                        <p className='mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, alias atque. Sapiente necessitatibus ullam voluptatum id. Odio, quos officiis ad id nam delectus nesciunt illum, beatae labore, totam corporis ea. Temporibus fugiat, nobis minus, esse sit ad molestias quibusdam sint reiciendis veniam alias reprehenderit numquam impedit vero minima veritatis consectetur dolorum? Sunt magni earum molestias veritatis dolorum omnis consectetur ut?</p>
                    </div>
                    <div>
                        <h2 className="text-lg font-medium">Responsibilities</h2>
                        <ul className='list-disc ml-6'>
                            <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</li>
                            <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-lg font-medium">Requirements</h2>
                        <ul className='list-disc ml-6'>
                            <li>BS/BE in Computer Science/Computer Engineering.</li>
                            <li>Knowledge of front-end technologies including CSS3, JavaScript, HTML5</li>
                            <li>Strong content management skills</li>
                            <li>Strong content management skills</li>
                            <li>Strong content management skills</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-lg font-medium">Benefits</h2>
                        <ul className='list-disc ml-6'>
                            <li>Lorem ipsum dolor sit amet consectetur</li>
                            <li>Lorem ipsum dolor sit amet consectetur</li>
                            <li>Lorem ipsum dolor sit amet consectetur</li>
                            <li>Lorem ipsum dolor sit amet consectetur</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;