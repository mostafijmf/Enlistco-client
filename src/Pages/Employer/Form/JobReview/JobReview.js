import { ChevronLeftIcon, PencilAltIcon } from '@heroicons/react/solid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import Spinner from '../../../Shared/Spinner';
import JobAddQuestionsForm from './JobAddQuestionsForm';
import JobAppSettingForm from './JobAppSettingForm';
import JobDesForm from './JobDesForm';
import JobInfoForm from './JobInfoForm';
import JobTermsForm from './JobTermsForm';

const JobReview = () => {
    const setStep = useOutletContext();
    setStep(3);
    const navigate = useNavigate();

    const [openInfoForm, setOpenInfoForm] = useState(false);
    const [openDesForm, setOpenDesForm] = useState(false);
    const [openSettingForm, setOpenSettingForm] = useState(false);
    const [openTermsForm, setOpenTermsForm] = useState(false);
    const [openQuesForm, setOpenQuesForm] = useState(false);

    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);


    // ===================Scrolling top===================
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);
    

    const jobContact = JSON.parse(localStorage.getItem('jobContact'));
    const jobDescription = JSON.parse(localStorage.getItem('jobDescription'));
    const terms = JSON.parse(localStorage.getItem('terms'));
    const appOptions = JSON.parse(localStorage.getItem('appOptions'));


    // ===============Confirm Button===============
    const handlePostConfirm = async () => {
        setLoading(true);
        await axios.post('https://api.enlistco.co.in/post', {
            jobContact, jobDescription, terms, appOptions
        }, {
            method: 'POST',
            headers: {
                'Authorization': localStorage.getItem('user_token')
            }
        })
            .then(res => {
                if (res) {
                    localStorage.removeItem('jobContact');
                    localStorage.removeItem('jobDescription');
                    localStorage.removeItem('terms');
                    localStorage.removeItem('appOptions');
                    setLoading(false);
                    setOpenModal(true);
                }
            })
            .catch(err => {
                setLoading(false);
                const { logout } = err.response.data;
                if (logout) {
                    localStorage.removeItem('user_token');
                    return navigate('/login');
                }
            })
    };

    return (
        <div className='2xl:w-[920px] xl:w-55 lg:w-3/5 md:w-2/3 sm:w-4/5 w-full bg-white rounded-lg border shadow-md my-10 mx-2'>
            <div className="card-body sm:p-8 p-5">
                <h1 className="text-3xl font-medium text-center mb-3">
                    Review the job post
                </h1>
                <hr />

                {/* ======================
                    Job Info
                ====================== */}
                <div className='relative'>
                    <div
                        onClick={() => setOpenInfoForm(!openInfoForm)}
                        className='absolute top-2 right-0 text-accent hover:text-gray-600 duration-300 cursor-pointer'
                        title='Edit'
                    >
                        <PencilAltIcon className='w-6 h-6' />
                    </div>
                    <h5 className='font-medium text-2xl my-2'>
                        {jobContact?.jobTitle}
                    </h5>
                    <h5 className='font-medium mb-2'>
                        {jobContact?.company}
                    </h5>
                    <h5 className='font-medium mb-2'>
                        Workplace :
                        <span className='text-base font-normal ml-2'>{jobContact?.workplace}</span>
                    </h5>
                    <h5 className='font-medium mb-2'>Location :
                        <span className='text-base font-normal ml-2'>{jobContact?.jobLocation}</span>
                    </h5>
                    <h5 className='font-medium mb-2'>Job Type :
                        <span className='text-base font-normal ml-2'>
                            {jobContact?.empType}
                        </span>
                    </h5>
                    <h5 className='font-medium mb-2'>Employees Quantity :
                        <span className='text-base font-normal ml-2'>
                            {jobContact?.empQuantity}
                        </span>
                    </h5>
                    {appOptions?.salary &&
                        <h5 className='font-medium mb-2'>Salary :
                            <span className='text-base font-normal ml-2'>
                                ${appOptions?.salary}
                            </span>
                        </h5>
                    }
                </div>
                {
                    openInfoForm &&
                    <JobInfoForm
                        setOpenInfoForm={setOpenInfoForm}
                        jobContact={jobContact}
                        appOptions={appOptions}
                    />
                }

                {/* ======================
                    Job description
                ====================== */}
                <div className='mt-10 relative'>
                    <div
                        onClick={() => setOpenDesForm(!openDesForm)}
                        className='absolute top-2 right-0 text-accent hover:text-gray-600 duration-300 cursor-pointer'
                        title='Edit'
                    >
                        <PencilAltIcon className='w-6 h-6' />
                    </div>
                    <h1 className='text-2xl font-medium mb-2'>Job description</h1>
                    <hr />
                    <div className='pl-3 mt-1' dangerouslySetInnerHTML={{ __html: jobDescription }}></div>
                </div>
                {
                    openDesForm &&
                    <JobDesForm
                        setOpenDesForm={setOpenDesForm}
                        jobDescription={jobDescription}
                    />
                }


                {/* ======================
                    Application settings
                ====================== */}
                <div className='mt-12 relative'>
                    <div
                        onClick={() => setOpenSettingForm(!openSettingForm)}
                        className='absolute top-2 right-0 text-accent hover:text-gray-600 duration-300 cursor-pointer'
                        title='Edit'
                    >
                        <PencilAltIcon className='w-6 h-6' />
                    </div>
                    <h5 className='font-medium text-2xl mb-2'>
                        Application settings
                    </h5>
                    <p className='text-base mb-2'>The following information will not be showing on your job post.</p>
                    <hr />

                    <h5 className='font-medium my-2'>
                        Application Types :
                        <span className='text-base font-normal ml-2'>{
                            appOptions?.applyType === 'easyApply' ?
                                'Easy Apply' :
                                <a
                                    className='text-blue-600'
                                    href={appOptions?.applyType}
                                    target='blank'
                                >{appOptions?.applyType}
                                </a>
                        }</span>
                    </h5>
                    <h5 className='font-medium mb-2'>
                        Receiving applicants update to :
                        <span className='text-base font-normal ml-2'>
                            {appOptions?.receiveEmail}
                        </span>
                    </h5>
                    {
                        appOptions?.skillTags &&
                        <h5 className='font-medium mb-2'>Providing skill tags :
                            {appOptions?.skillTags?.map((tag, index) =>
                                <span key={index} className='text-base font-normal ml-2'>
                                    {tag}
                                </span>
                            )}
                        </h5>
                    }
                </div>
                {
                    openSettingForm &&
                    <JobAppSettingForm
                        setOpenSettingForm={setOpenSettingForm}
                        appOptions={appOptions}
                    />
                }



                {/* ======================
                    Terms and Conditions
                ====================== */}
                <div className='mt-12 relative'>
                    <div
                        onClick={() => setOpenTermsForm(!openTermsForm)}
                        className='absolute top-2 right-0 text-accent hover:text-gray-600 duration-300 cursor-pointer'
                        title='Edit'
                    >
                        <PencilAltIcon className='w-6 h-6' />
                    </div>
                    <h1 className='text-2xl font-medium mb-2'>Terms and Conditions</h1>
                    <hr />
                    {
                        terms &&
                        <div className='pl-3 mt-1' dangerouslySetInnerHTML={{ __html: terms }}></div>
                    }
                </div>
                {
                    openTermsForm &&
                    <JobTermsForm
                        setOpenTermsForm={setOpenTermsForm}
                        terms={terms}
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
                    {(appOptions?.bgCheck || appOptions?.certification || appOptions?.drivingLicense || appOptions?.drugTest || appOptions?.education || appOptions?.gpa || appOptions?.hybridWork || appOptions?.remoteWork || appOptions?.workExperience || appOptions?.urgentHiring || appOptions?.customQuestion) &&
                        <div>
                            {
                                appOptions?.bgCheck && <div className='bg-accent/10 px-3 rounded mt-2'>
                                    <div className='flex items-center gap-3 font-medium'>
                                        <span>Q :</span>
                                        <span>{appOptions?.bgCheck.bgCheckQ}</span>
                                    </div>
                                    <div className='flex items-center gap-3 text-sm'>
                                        <span>A :</span>
                                        <span>{appOptions?.bgCheck.idealAns}</span>
                                    </div>
                                </div>
                            }
                            {
                                appOptions?.certification && <div className='bg-accent/10 px-3 rounded mt-2'>
                                    <div className='flex items-center gap-3 font-medium'>
                                        <span>Q :</span>
                                        <span>{appOptions?.certification.certificationQ}</span>
                                    </div>
                                    <div className='flex items-center gap-3 text-sm'>
                                        <span>A :</span>
                                        <span>{appOptions?.certification.idealAns}</span>
                                    </div>
                                </div>
                            }
                            {
                                appOptions?.drivingLicense && <div className='bg-accent/10 px-3 rounded mt-2'>
                                    <div className='flex items-center gap-3 font-medium'>
                                        <span>Q :</span>
                                        <span>{appOptions?.drivingLicense.drivingLicenseQ}</span>
                                    </div>
                                    <div className='flex items-center gap-3 text-sm'>
                                        <span>A :</span>
                                        <span>{appOptions?.drivingLicense.idealAns}</span>
                                    </div>
                                </div>
                            }
                            {
                                appOptions?.drugTest && <div className='bg-accent/10 px-3 rounded mt-1'>
                                    <div className='flex items-center gap-3 font-medium'>
                                        <span>Q :</span>
                                        <span>{appOptions?.drugTest.drugTestQ}</span>
                                    </div>
                                    <div className='flex items-center gap-3 text-sm'>
                                        <span>A :</span>
                                        <span>{appOptions?.drugTest.idealAns}</span>
                                    </div>
                                </div>
                            }
                            {
                                appOptions?.education && <div className='bg-accent/10 px-3 rounded mt-1'>
                                    <div className='flex items-center gap-3 font-medium'>
                                        <span>Q :</span>
                                        <span>{appOptions?.education.educationQ}</span>
                                    </div>
                                    <div className='flex items-center gap-3 text-sm'>
                                        <span>A :</span>
                                        <span>{appOptions?.education.idealAns}</span>
                                    </div>
                                </div>
                            }
                            {
                                appOptions?.gpa && <div className='bg-accent/10 px-3 rounded mt-1'>
                                    <div className='flex items-center gap-3 font-medium'>
                                        <span>Q :</span>
                                        <span>{appOptions?.gpa.gpaQ}</span>
                                    </div>
                                    <div className='flex items-center gap-3 text-sm'>
                                        <span>A :</span>
                                        <span>{appOptions?.gpa.gpaPoint}</span>
                                    </div>
                                </div>
                            }
                            {
                                appOptions?.hybridWork && <div className='bg-accent/10 px-3 rounded mt-1'>
                                    <div className='flex items-center gap-3 font-medium'>
                                        <span>Q :</span>
                                        <span>{appOptions?.hybridWork.hybridWorkQ}</span>
                                    </div>
                                    <div className='flex items-center gap-3 text-sm'>
                                        <span>A :</span>
                                        <span>{appOptions?.hybridWork.idealAns}</span>
                                    </div>
                                </div>
                            }
                            {
                                appOptions?.remoteWork && <div className='bg-accent/10 px-3 rounded mt-1'>
                                    <div className='flex items-center gap-3 font-medium'>
                                        <span>Q :</span>
                                        <span>{appOptions?.remoteWork.remoteWorkQ}</span>
                                    </div>
                                    <div className='flex items-center gap-3 text-sm'>
                                        <span>A :</span>
                                        <span>{appOptions?.remoteWork.idealAns}</span>
                                    </div>
                                </div>
                            }
                            {
                                appOptions?.workExperience && <div className='bg-accent/10 px-3 rounded mt-1'>
                                    <div className='flex items-center gap-3 font-medium'>
                                        <span>Q :</span>
                                        <span>{appOptions?.workExperience.workExperienceQ}</span>
                                    </div>
                                    <div className='flex items-center gap-3 text-sm'>
                                        <span>A :</span>
                                        <span>{appOptions?.workExperience.idealAns}</span>
                                    </div>
                                </div>
                            }
                            {
                                appOptions?.urgentHiring && <div className='bg-accent/10 px-3 rounded mt-1'>
                                    <div className='flex items-center gap-3 font-medium'>
                                        <span>Q :</span>
                                        <span>{appOptions?.urgentHiring.urgentHiringQ}</span>
                                    </div>
                                    <div className='flex items-center gap-3 text-sm'>
                                        <span>A :</span>
                                        <span>{appOptions?.urgentHiring.idealAns}</span>
                                    </div>
                                </div>
                            }
                            {
                                appOptions?.customQuestion.length !== 0 &&
                                appOptions?.customQuestion.map((q, index) => <div key={index} className='bg-accent/10 px-3 rounded mt-1'>
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
                        <JobAddQuestionsForm
                            setOpenQuesForm={setOpenQuesForm}
                            appOptions={appOptions}
                        />
                    }
                </div>

                <div className='mt-12 flex sm:flex-row flex-col-reverse justify-between gap-4'>
                    <button
                        onClick={() => navigate(-1)}
                        className='sm:w-max w-full btn btn-outline btn-accent hover:text-white normal-case text-lg gap-2 px-5 h-11 min-h-0'
                    >
                        <ChevronLeftIcon className='w-6 h-6 inline-block' /> Back
                    </button>
                    <button
                        type='submit'
                        onClick={handlePostConfirm}
                        disabled={loading}
                        className='sm:w-max w-full btn btn-accent sm:px-10 px-5 normal-case text-lg text-white h-11 min-h-0'
                    >
                        {loading ? <Spinner className={'px-3'} /> : 'Confirm'}
                    </button>
                </div>
            </div>


            {/* ====================
                Response Modal
            ==================== */}
            {
                openModal &&
                <div className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center bg-black/60">
                    <div className="modal-box sm:p-10 p-8">
                        <h3 className="font-medium text-2xl text-green-500">
                            Congratulations for your job post!
                        </h3>
                        <p className="text-lg mt-4 mb-10">This post has gone under review.</p>
                        <div className="block text-end">
                            <button
                                onClick={() => { navigate('/') }}
                                className="btn btn-accent text-lg min-h-0 h-11 text-white normal-case"
                            >
                                Go to home
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default JobReview;