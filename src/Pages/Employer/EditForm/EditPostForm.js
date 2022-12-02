import { ArrowLeftIcon, PencilAltIcon } from '@heroicons/react/solid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../../Shared/Spinner';
import AddQuestionsForm from './AddQuestionsForm';
import DescriptionForm from './DescriptionForm';
import PostAppSettingForm from './PostAppSettingForm';
import PostInfoForm from './PostInfoForm';
import TermsForm from './TermsForm';

const EditPostForm = () => {
    const jobId = useLocation();
    const id = jobId?.state;

    const [openInfoForm, setOpenInfoForm] = useState(false);
    const [openDesForm, setOpenDesForm] = useState(false);
    const [openSettingForm, setOpenSettingForm] = useState(false);
    const [openTermsForm, setOpenTermsForm] = useState(false);
    const [openQuesForm, setOpenQuesForm] = useState(false);
    const [jobData, setJobData] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            axios.get(`https://api.enlistco.co.in/post/get_single_post/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': localStorage.getItem('user_token')
                }
            })
                .then(res => {
                    setJobData(res.data);
                    setLoading(false)
                })
                .catch(err => {
                    err && setLoading(false);
                });
        }
    }, [id, jobData]);

    if (loading) {
        return <div className='w-full h-screen flex items-center justify-center'>
            <Spinner></Spinner>
        </div>
    };

    const {
        _id,
        permission,
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
        applyType,
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
    } = jobData;

    return (
        <div className='w-full'>
            <div className='relative'>
                <button
                    onClick={() => navigate(-1)}
                    className='absolute top-0 left-5 text-lg font-medium flex items-center gap-2 text-gray-500 hover:bg-gray-200 px-3 py-1 rounded-md'
                >
                    <ArrowLeftIcon className='w-4 h-4'></ArrowLeftIcon>
                    Back
                </button>
                <h1 className='sm:text-2xl text-xl font-bold text-center my-5'>
                    Edit Job
                </h1>
            </div>
            <div className='lg:w-9/12 sm:w-4/5 w-full sm:mx-auto mx-1 mt-5 bg-white rounded-lg border shadow-md mb-20'>
                <div className="sm:p-8 p-5">

                    {/* ======================
                        Job Info
                    ====================== */}
                    <div>
                        <h1 className="sm:text-3xl text-2xl font-medium text-center mb-5">{jobTitle}</h1>
                        <div className='flex justify-between items-center mb-2'>
                            <span className='text-accent text-sm tracking-wide'>Published: {publish}</span>
                            <button
                                title='Edit'
                                onClick={() => setOpenInfoForm(true)}
                                className='text-accent hover:text-gray-500 duration-300'
                            >
                                <PencilAltIcon className='w-6 h-6' />
                            </button>
                        </div>
                        <h5 className='font-medium mb-2'>
                            {company}
                        </h5>
                        <h5 className='font-medium mb-2'>
                            Workplace :
                            <span className='text-base font-normal ml-2'>{workplace}</span>
                        </h5>
                        <h5 className='font-medium mb-2'>Location :
                            <span className='text-base font-normal ml-2'>{jobLocation}</span>
                        </h5>
                        <h5 className='font-medium mb-2'>Job Type :
                            <span className='text-base font-normal ml-2'>{empType}</span>
                        </h5>
                        <h5 className='font-medium mb-2'>Employees Quantity :
                            <span className='text-base font-normal ml-2'>{empQuantity}</span>
                        </h5>
                        <h5 className='font-medium mb-2'>Salary :
                            {
                                salary && <span className='text-base font-normal ml-2'>${salary}</span>
                            }
                        </h5>
                        {/* <h5 className='font-medium mb-2'>Receive email :
                            <span className='text-base font-normal ml-2'>{receiveEmail}</span>
                        </h5>{
                            skillTags?.length !== 0 &&
                            <h5 className='font-medium mb-2'>Tags :
                                {
                                    skillTags?.map(tag => <span key={tag} className='text-base font-normal ml-2'>{tag}</span>)
                                }
                            </h5>
                        } */}
                    </div>
                    {
                        openInfoForm &&
                        <PostInfoForm
                            setOpenInfoForm={setOpenInfoForm}
                            data={jobData}
                        />
                    }


                    {/* ======================
                        Post Description
                    ====================== */}
                    <div className='mt-10'>
                        <div className='flex items-start justify-between mt-5 mb-1'>
                            <h1 className='text-2xl font-medium mb-2'>Description :</h1>
                            <button
                                title='Edit'
                                onClick={() => setOpenDesForm(true)}
                                className='text-accent hover:text-gray-500 duration-300 mt-2'
                            >
                                <PencilAltIcon className='w-6 h-6' />
                            </button>
                        </div>
                        <hr />
                        <div
                            className='pl-3 mt-1'
                            dangerouslySetInnerHTML={{ __html: jobDescription }}
                        ></div>
                    </div>
                    {
                        openDesForm &&
                        <DescriptionForm
                            setOpenDesForm={setOpenDesForm}
                            data={jobData}
                        />
                    }

                    {/* ======================
                        Application settings
                    ====================== */}
                    <div className='mt-12 relative'>
                        <button
                            onClick={() => setOpenSettingForm(!openSettingForm)}
                            className='absolute top-2 right-0 text-accent hover:text-gray-600 duration-300 cursor-pointer'
                            title='Edit'
                        >
                            <PencilAltIcon className='w-6 h-6' />
                        </button>
                        <h5 className='font-medium text-2xl mb-2'>
                            Application settings
                        </h5>
                        <p className='text-base mb-2'>The following information will not be showing on your job post.</p>
                        <hr />

                        <h5 className='font-medium my-2'>
                            Application Types :
                            <span className='text-base font-normal ml-2'>{
                                applyType === 'easyApply' ?
                                    'Easy Apply' :
                                    <a
                                        className='text-blue-600'
                                        href={applyType}
                                        target='blank'
                                    >{applyType}
                                    </a>
                            }</span>
                        </h5>
                        <h5 className='font-medium mb-2'>
                            Receiving applicants update to :
                            <span className='text-base font-normal ml-2'>
                                {receiveEmail}
                            </span>
                        </h5>
                        {
                            skillTags &&
                            <h5 className='font-medium mb-2'>Providing skill tags :
                                {skillTags?.map((tag, index) =>
                                    <span key={index} className='text-base font-normal ml-2'>
                                        {tag}
                                    </span>
                                )}
                            </h5>
                        }
                    </div>
                    {
                        openSettingForm &&
                        <PostAppSettingForm
                            setOpenSettingForm={setOpenSettingForm}
                            data={jobData}
                        />
                    }


                    {/* ======================
                        Post Terms and Conditions
                    ====================== */}
                    <div className='mt-10'>
                        <div className='flex items-start justify-between mt-5 mb-1'>
                            <h1 className='text-2xl font-medium mb-2'>Terms and Conditions :</h1>
                            <button
                                title='Edit'
                                onClick={() => setOpenTermsForm(true)}
                                className='text-accent hover:text-gray-500 duration-300 mt-2'>
                                <PencilAltIcon className='w-6 h-6' />
                            </button>
                        </div>
                        <hr />
                        <div className='pl-3 mt-1' dangerouslySetInnerHTML={{ __html: terms }}></div>
                    </div>
                    {
                        openTermsForm &&
                        <TermsForm
                            setOpenTermsForm={setOpenTermsForm}
                            data={jobData}
                        />
                    }


                    {/* ======================
                    Additional Questions
                ====================== */}
                    <div className='mt-12 relative'>
                        <div
                            onClick={() => setOpenQuesForm(!openQuesForm)}
                            className='absolute top-2 right-0 text-accent hover:text-gray-600 duration-300 cursor-pointer'
                            title='Edit'
                        >
                            <PencilAltIcon className='w-6 h-6' />
                        </div>
                        <h1 className='text-2xl font-medium mb-2'>Additional Questions</h1>
                        <hr />
                        {(bgCheck || certification || drivingLicense || drugTest || education || gpa || hybridWork || remoteWork || workExperience || urgentHiring || customQuestion) &&
                            <div>
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
                        }
                        {
                            openQuesForm &&
                            <AddQuestionsForm
                                setOpenQuesForm={setOpenQuesForm}
                                data={jobData}
                            />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPostForm;