import React from 'react';
import './JobDetails.css';

const JobDetails = ({ open }) => {
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
        empQuantity,
        employerEmail,
        receiveEmail,
        skillTags
    } = open;

    const handleApply = async (open) =>{
        console.log(open)
    };

    return (
        <div className="rounded-lg border shadow-md sticky top-6 h-screen overflow-y-auto scrollBar">
            <div className="card-body">
                <h1 className='text-2xl font-bold text-center'>Job Details</h1>
                <div className='flex justify-between'>
                    <span className='text-accent text-sm tracking-wide'>Published: {publish}</span>
                    <button
                        onClick={()=>handleApply(open)}
                        className='btn btn-primary text-white px-6 tracking-wider'>
                        Apply
                    </button>
                </div>
                <h2 className="text-2xl font-medium">{jobTitle}</h2>
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
                <span className='bg-slate-200 px-2 py-1 rounded w-max'>{workplace}</span>
                <hr />
                <div className='mb-10' dangerouslySetInnerHTML={{ __html: jobDescription }}></div>
            </div>
        </div>
    );
};

export default JobDetails;