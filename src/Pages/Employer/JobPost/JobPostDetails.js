import { ArrowLeftIcon, PencilAltIcon } from '@heroicons/react/solid';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const JobPostDetails = () => {
    const jobId = useLocation();
    const post = jobId?.state;
    const navigate = useNavigate();

    const {
        _id,
        jobTitle,
        company,
        publish,
        jobLocation,
        salary,
        empType,
        jobDescription,
        workplace,
        empQuantity,
        employerEmail,
        receiveEmail,
        skillTags,
        terms,
        // Screening question
        bgCheck,
        certification,
        drivingLicense,
        drugTest,
        education,
        gpa,
        hybridWork,
        remoteWork,
        workExperience,
        urgentHiring,
        customQuestion
    } = post;

    return (
        <div className='text-gray-600'>
            <div className='relative'>
                <button
                    onClick={() => navigate(-1)}
                    className='absolute top-0 left-5 text-lg font-medium flex items-center gap-2 text-gray-500 hover:bg-gray-200 px-3 py-1 rounded-md'
                >
                    <ArrowLeftIcon className='w-4 h-4'></ArrowLeftIcon>
                    Back
                </button>
                <h1 className='sm:text-2xl text-xl font-bold text-center my-5'>Job Details</h1>
            </div>
            <div className='flex justify-center'>
                <div className='lg:w-9/12 md:w-4/5 sm:w-11/12 w-full mx-1'>
                    <div className="bg-white rounded-lg border shadow-md mb-10">
                        <div className="card-body sm:p-8 p-5">

                            {/* ======================Job Info====================== */}
                            <div>
                                <h1 className="sm:text-3xl text-2xl font-medium text-center mb-2">{jobTitle}</h1>
                                <div className='flex justify-between items-center mb-2'>
                                    <span className='text-accent text-sm tracking-wide'>Published: {publish}</span>
                                    <button
                                        onClick={() => navigate(`/dashboard/job/edit/${_id}`, {
                                            state: _id
                                        })}
                                        className='text-lg flex items-center gap-1 font-medium text-primary hover:text-gray-500 duration-300'>
                                        Edit
                                        <PencilAltIcon className='w-5 h-5' />
                                    </button>
                                </div>
                                <h5 className='font-medium mb-2'>
                                    {company} - <span className='bg-slate-200 px-2 py-1 rounded w-max'>{workplace}</span>
                                </h5>
                                <h5 className='font-medium mb-2'>Location :
                                    <span className='text-base font-normal ml-2'>{jobLocation}</span>
                                </h5>
                                <h5 className='font-medium mb-2'>Salary :
                                    {
                                        salary && <span className='text-base font-normal ml-2'>${salary}</span>
                                    }
                                </h5>
                                <h5 className='font-medium mb-2'>Job Type :
                                    <span className='text-base font-normal ml-2'>{empType}</span>
                                </h5>
                                <h5 className='font-medium mb-2'>Employees Quantity :
                                    <span className='text-base font-normal ml-2'>{empQuantity}</span>
                                </h5>
                                <h5 className='font-medium mb-2'>Your email :
                                    <span className='text-base font-normal ml-2'>{employerEmail}</span>
                                </h5>
                                <h5 className='font-medium mb-2'>Receive email :
                                    <span className='text-base font-normal ml-2'>{receiveEmail}</span>
                                </h5>{
                                    skillTags?.length !== 0 &&
                                    <h5 className='font-medium mb-2'>Tags :
                                        {
                                            skillTags?.map(tag => <span key={tag} className='text-base font-normal ml-2'>{tag}</span>)
                                        }
                                    </h5>
                                }
                            </div>

                            {/* ======================Job description====================== */}
                            <div>
                                <h1 className='text-2xl font-medium mt-5'>Job description</h1>
                                <hr />
                                <div className='mb-10 pl-3 mt-1' dangerouslySetInnerHTML={{ __html: jobDescription }}></div>
                            </div>

                            {/* ======================Terms and Conditions====================== */}
                            {terms &&
                                <div>
                                    <h1 className='text-2xl font-medium'>Terms and Conditions</h1>
                                    <hr />
                                    <div className='mb-10 pl-3 mt-1' dangerouslySetInnerHTML={{ __html: terms }}></div>
                                </div>
                            }

                            {/* ======================Additional Questions====================== */}
                            <div>
                                <h1 className='text-2xl font-medium'>Additional Questions</h1>
                                <hr />
                                {
                                    bgCheck && <div className='bg-accent/10 px-3 rounded mt-2'>
                                        <div className='flex items-center gap-3 font-medium'>
                                            <span>Q :</span>
                                            <span>{bgCheck.bgCheckQ}</span>
                                        </div>
                                        <div className='flex items-center gap-3 text-sm'>
                                            <span>A :</span>
                                            <span>{bgCheck.idealAns}</span>
                                        </div>
                                    </div>
                                }
                                {
                                    certification && <div className='bg-accent/10 px-3 rounded mt-2'>
                                        <div className='flex items-center gap-3 font-medium'>
                                            <span>Q :</span>
                                            <span>{certification.certificationQ}</span>
                                        </div>
                                        <div className='flex items-center gap-3 text-sm'>
                                            <span>A :</span>
                                            <span>{certification.idealAns}</span>
                                        </div>
                                    </div>
                                }
                                {
                                    drivingLicense && <div className='bg-accent/10 px-3 rounded mt-2'>
                                        <div className='flex items-center gap-3 font-medium'>
                                            <span>Q :</span>
                                            <span>{drivingLicense.drivingLicenseQ}</span>
                                        </div>
                                        <div className='flex items-center gap-3 text-sm'>
                                            <span>A :</span>
                                            <span>{drivingLicense.idealAns}</span>
                                        </div>
                                    </div>
                                }
                                {
                                    drugTest && <div className='bg-accent/10 px-3 rounded mt-1'>
                                        <div className='flex items-center gap-3 font-medium'>
                                            <span>Q :</span>
                                            <span>{drugTest.drugTestQ}</span>
                                        </div>
                                        <div className='flex items-center gap-3 text-sm'>
                                            <span>A :</span>
                                            <span>{drugTest.idealAns}</span>
                                        </div>
                                    </div>
                                }
                                {
                                    education && <div className='bg-accent/10 px-3 rounded mt-1'>
                                        <div className='flex items-center gap-3 font-medium'>
                                            <span>Q :</span>
                                            <span>{education.educationQ}</span>
                                        </div>
                                        <div className='flex items-center gap-3 text-sm'>
                                            <span>A :</span>
                                            <span>{education.idealAns}</span>
                                        </div>
                                    </div>
                                }
                                {
                                    gpa && <div className='bg-accent/10 px-3 rounded mt-1'>
                                        <div className='flex items-center gap-3 font-medium'>
                                            <span>Q :</span>
                                            <span>{gpa.gpaQ}</span>
                                        </div>
                                        <div className='flex items-center gap-3 text-sm'>
                                            <span>A :</span>
                                            <span>{gpa.gpaPoint}</span>
                                        </div>
                                    </div>
                                }
                                {
                                    hybridWork && <div className='bg-accent/10 px-3 rounded mt-1'>
                                        <div className='flex items-center gap-3 font-medium'>
                                            <span>Q :</span>
                                            <span>{hybridWork.hybridWorkQ}</span>
                                        </div>
                                        <div className='flex items-center gap-3 text-sm'>
                                            <span>A :</span>
                                            <span>{hybridWork.idealAns}</span>
                                        </div>
                                    </div>
                                }
                                {
                                    remoteWork && <div className='bg-accent/10 px-3 rounded mt-1'>
                                        <div className='flex items-center gap-3 font-medium'>
                                            <span>Q :</span>
                                            <span>{remoteWork.remoteWorkQ}</span>
                                        </div>
                                        <div className='flex items-center gap-3 text-sm'>
                                            <span>A :</span>
                                            <span>{remoteWork.idealAns}</span>
                                        </div>
                                    </div>
                                }
                                {
                                    workExperience && <div className='bg-accent/10 px-3 rounded mt-1'>
                                        <div className='flex items-center gap-3 font-medium'>
                                            <span>Q :</span>
                                            <span>{workExperience.workExperienceQ}</span>
                                        </div>
                                        <div className='flex items-center gap-3 text-sm'>
                                            <span>A :</span>
                                            <span>{workExperience.idealAns}</span>
                                        </div>
                                    </div>
                                }
                                {
                                    urgentHiring && <div className='bg-accent/10 px-3 rounded mt-1'>
                                        <div className='flex items-center gap-3 font-medium'>
                                            <span>Q :</span>
                                            <span>{urgentHiring.urgentHiringQ}</span>
                                        </div>
                                        <div className='flex items-center gap-3 text-sm'>
                                            <span>A :</span>
                                            <span>{urgentHiring.idealAns}</span>
                                        </div>
                                    </div>
                                }
                                {
                                    customQuestion.length !== 0 &&
                                    customQuestion.map((q, index) => <div key={index} className='bg-accent/10 px-3 rounded mt-1'>
                                        {q.customQ &&
                                            <div className='flex items-center gap-3 font-medium'>
                                                <span>Q :</span>
                                                <span>{q.customQ}</span>
                                            </div>
                                        }
                                        {q.idealAns || q.nbCTQ ?
                                            <div className='flex items-center gap-3 text-sm'>
                                                <span>A :</span>
                                                <span>{q.idealAns}</span>
                                                {q.nbCTQ && <>
                                                    <span>or</span>
                                                    <span>{q.nbCTQ}</span>
                                                </>
                                                }
                                            </div> : ""
                                        }
                                    </div>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobPostDetails;