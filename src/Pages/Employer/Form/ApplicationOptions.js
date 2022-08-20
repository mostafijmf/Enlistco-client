import { CheckIcon, ExclamationCircleIcon, PlusIcon, XIcon } from '@heroicons/react/solid';
import axios from 'axios';
import React, { useState } from 'react';
import { useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import PageTitle from '../../Shared/PageTitle';
import Spinner from '../../Shared/Spinner';

const ApplicationOptions = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const skillRef = useRef();
    const [errEmail, setErrEmail] = useState(false);

    const emailRef = useRef();
    const salaryRef = useRef();
    const upRef = useRef();


    // Add skill
    const [skillTags, setskillTags] = useState([]);

    const addskillTags = () => {
        if (skillRef.current.value) {
            setskillTags([...skillTags, skillRef.current.value])
        }
    };
    const removeskillTags = indexToRemove => {
        setskillTags(skillTags.filter((_, index) => index !== indexToRemove))
    };


    // Add screening questions
    const [addQuestions, setAddQuestions] = useState([]);

    const handleQuestion = text => {
        setAddQuestions([...addQuestions, text]);
    };

    const removeQuestion = remove => {
        setAddQuestions(addQuestions.filter(q => q !== remove))
    };

    // Add screening Custom Question
    const [addCTQuestion, setAddCTQuestion] = useState([]);

    const handleCustomQuestion = text => {
        setAddCTQuestion([...addCTQuestion, text]);
    };
    const removeCustomQuestion = removeIndex => {
        setAddCTQuestion(addCTQuestion.filter((_, index) => index !== removeIndex))
    };


    const employerContact = JSON.parse(localStorage.getItem('employerContact'));
    const jobDescription = JSON.parse(localStorage.getItem('jobDescription'));

    if (!employerContact && !jobDescription) {
        return navigate('/employer-form/contact')
    }


    // Handle form
    const handleApplication = async (e) => {
        e.preventDefault();
        setLoading(true);

        const receiveEmail = emailRef.current.value;
        const salary = salaryRef.current.value;
        const postOptions = { receiveEmail, salary, skillTags };
        const email = user.email;

        // Add screening questions
        const bgCheck = addQuestions.find(q => q === 'bgCheck') ? {
            bgCheckQ: `How many years of work experience do you have using ${e.target.technology.value} ?`,
            idealAns: e.target.nbTechnology.value,
            qualificationMust: e.target.checkbox1.checked
        } : '';
        const certification = addQuestions.find(q => q === 'certification') ? {
            certificationQ: `Do you have the following certification ${e.target.certification.value} ?`,
            idealAns: 'Yes',
            qualificationMust: e.target.checkbox2.checked
        } : '';
        const drivingLicense = addQuestions.find(q => q === 'drivingLicense') ? {
            drivingLicenseQ: 'Do you have a valid driving license ?',
            idealAns: 'Yes',
            qualificationMust: e.target.checkbox3.checked
        } : '';
        const drugTest = addQuestions.find(q => q === 'drugTest') ? {
            drugTestQ: 'Are you willing to take a drug test, in accordance with local law/regulations ?',
            idealAns: 'Yes',
            qualificationMust: e.target.checkbox4.checked
        } : '';
        const education = addQuestions.find(q => q === 'education') ? {
            educationQ: `Have you completed the following level of education: ${e.target.degree.value} ?`,
            idealAns: 'Yes',
            qualificationMust: e.target.checkbox5.checked
        } : '';
        const gpa = addQuestions.find(q => q === 'gpa') ? {
            gpaQ: 'What is your university result ?',
            gpaPoint: e.target.gpaPoint.value,
            qualificationMust: e.target.checkbox6.checked
        } : '';
        const hybridWork = addQuestions.find(q => q === 'hybridWork') ? {
            hybridWorkQ: 'Are you comfortable working in a hybrid work?',
            idealAns: 'Yes',
            qualificationMust: e.target.checkbox7.checked
        } : '';
        const remoteWork = addQuestions.find(q => q === 'remoteWork') ? {
            remoteWorkQ: 'Are you comfortable working in a remote work?',
            idealAns: 'Yes',
            qualificationMust: e.target.checkbox8.checked
        } : '';
        const workExperience = addQuestions.find(q => q === 'workExperience') ? {
            workExperienceQ: `How many years of ${e.target.workExperience.value} experience do you have ?`,
            idealAns: e.target.nbExperience.value,
            qualificationMust: e.target.checkbox9.checked
        } : '';
        const urgentHiring = addQuestions.find(q => q === 'urgentHiring') ? {
            urgentHiringQ: 'We are hiring urgently, can you join immediately?',
            idealAns: 'Yes',
            qualificationMust: e.target.checkbox10.checked
        } : '';

        const customQuestion = addCTQuestion.find(q => q === 'customQuestion') ? [
            {
                customQ: e.target.customQ1?.value ? e.target.customQ1?.value : '',
                idealAns: e.target.select1?.value ? e.target.select1?.value : '',
                nbCTQ: e.target.nbCTQ1?.value ? e.target.nbCTQ1?.value : '',
                qualificationMust: e.target.checkboxCTQ1?.checked ? e.target.checkboxCTQ1?.checked : '',
            },
            {
                customQ: e.target.customQ2?.value ? e.target.customQ2?.value : '',
                idealAns: e.target.select2?.value ? e.target.select2?.value : '',
                nbCTQ: e.target.nbCTQ2?.value ? e.target.nbCTQ2?.value : '',
                qualificationMust: e.target.checkboxCTQ2?.checked ? e.target.checkboxCTQ2?.checked : '',
            },
            {
                customQ: e.target.customQ3?.value ? e.target.customQ3?.value : '',
                idealAns: e.target.select3?.value ? e.target.select3?.value : '',
                nbCTQ: e.target.nbCTQ3?.value ? e.target.nbCTQ3?.value : '',
                qualificationMust: e.target.checkboxCTQ3?.checked ? e.target.checkboxCTQ3?.checked : '',
            },
            {
                customQ: e.target.customQ4?.value ? e.target.customQ4?.value : '',
                idealAns: e.target.select4?.value ? e.target.select4?.value : '',
                nbCTQ: e.target.nbCTQ4?.value ? e.target.nbCTQ4?.value : '',
                qualificationMust: e.target.checkboxCTQ4?.checked ? e.target.checkboxCTQ4?.checked : '',
            },
            {
                customQ: e.target.customQ5?.value ? e.target.customQ5?.value : '',
                idealAns: e.target.select5?.value ? e.target.select5?.value : '',
                nbCTQ: e.target.nbCTQ5?.value ? e.target.nbCTQ5?.value : '',
                qualificationMust: e.target.checkboxCTQ5?.checked ? e.target.checkboxCTQ5?.checked : '',
            }
        ] : '';

        if (receiveEmail.includes('@' && '.')) {
            await axios.post('https://boiling-beach-14928.herokuapp.com/post', {
                postOptions, employerContact, jobDescription, email, bgCheck, certification, drivingLicense, drugTest, education, gpa, hybridWork, remoteWork, workExperience, urgentHiring, customQuestion
            })
                .then(res => {
                    setLoading(false);
                })
                .catch(err => {
                    setLoading(false);
                });
            setOpenModal(true);
        }
        else {
            setLoading(false);
            upRef.current.scrollIntoView()
            setErrEmail(true);
        }
    };

    return (<>
        <PageTitle title='Submit Form - Dashboard'></PageTitle>
        <form onSubmit={handleApplication} className="w-full flex justify-center items-center bg-slate-100 h-auto py-10">
            <div className='lg:w-3/5 md:w-4/5 w-11/12 mx-auto bg-white sm:px-10 px-5 sm:py-8 py-5 h-max rounded-xl border shadow-lg'>
                <div>
                    <div ref={upRef}>
                        <label htmlFor='jobTitle' className='font-medium sm:text-lg text-base'>Provide an email to receive your applicants.<span className='text-orange-600 ml-1'>*</span></label>
                        <input
                            ref={emailRef}
                            id='jobTitle'
                            type="email"
                            placeholder="Enter an email"
                            className={`input h-11 text-base w-full mt-2 border ${errEmail ? 'border-red-500' : 'border-gray-200'} focus:outline-0 focus:shadow-md`}
                        />
                        {errEmail && <span className='text-sm text-red-500 flex items-center mt-1'>
                            <ExclamationCircleIcon className='w-4 h-4 mr-1'></ExclamationCircleIcon>
                            Invalid email
                        </span>}
                    </div>
                    <div className='mt-5'>
                        <label htmlFor='salary' className='font-medium sm:text-lg text-base'>Salary<span className='ml-1 font-normal'>(optional)</span></label>
                        <input ref={salaryRef} id='salary' type="text" placeholder="Enter amount as per year/month/day/hours" className="input h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                    </div>
                    <div className='mt-5'>
                        <h1 className='font-medium sm:text-lg text-base'>Add skillTags</h1>
                        <p className='text-gray-600 text-base'>Add skill keywords or tags so your job can reach more accurate candidates.</p>
                        <ul className='flex items-center flex-wrap gap-1 w-full'>
                            {
                                skillTags.map((skill, index) =>
                                    <li key={index} className='flex items-center justify-between bg-secondary text-white rounded-md px-1 cursor-pointer' onClick={() => removeskillTags(index)}>
                                        <span className='mr-1'>{skill}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </li>)
                            }
                        </ul>
                        <div className='flex items-center border hover:shadow mt-2 pl-2 rounded-lg'>
                            <input
                                type="text"
                                placeholder="Add skill"
                                className="h-11 w-full rounded-lg text-base pl-2 border-none focus:outline-0"
                                ref={skillRef}
                            />
                            <div onClick={addskillTags} className='bg-accent text-white rounded-tr-md rounded-br-md py-3 px-5 cursor-pointer'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/*==================== 
                    Screening Question
                    ====================*/}
                <div className='mt-8 pt-5 border-t'>
                    <div className='mb-2'>
                        <h2 className='font-medium sm:text-lg text-base'>Add screening questions</h2>
                        <p className='text-gray-600 text-base'>Your job post reaches those people who match your requirements.</p>
                    </div>

                    {/*==================== 
                        Question options 
                        ====================*/}
                    {
                        addQuestions.find(q => q === 'bgCheck') && <div className='w-full my-5 border rounded-md'>
                            <div className='flex justify-between bg-slate-100 p-3'>
                                <input
                                    id='bgCheck'
                                    className='text-base font-medium w-full bg-transparent'
                                    defaultValue='How many years of work experience do you have using [Tool or Technology] ?'
                                ></input>
                                <XIcon
                                    onClick={() => removeQuestion('bgCheck')}
                                    className='w-8 h-8 cursor-pointer p-1 rounded-full duration-300 hover:bg-slate-300'
                                ></XIcon>
                            </div>
                            <div className='p-3 flex sm:flex-row sm:items-center flex-col items-start justify-between gap-3'>
                                <div>
                                    <label htmlFor='technology' className='text-base block'>Tool or Technology</label>
                                    <input
                                        id='technology'
                                        type="text"
                                        required
                                        placeholder="Tool or Technology"
                                        className="px-2 h-9 rounded-none text-base w-full mt-1 border border-gray-200 focus:outline-0 focus:shadow-md"
                                    />
                                </div>
                                <div>
                                    <label htmlFor='nbTechnology' className='text-base'>Ideal Answer</label>
                                    <div className='flex items-center'>
                                        <input
                                            id='nbTechnology'
                                            type="number"
                                            placeholder='1'
                                            min={1} required
                                            className="px-2 h-9 rounded-none text-base w-full mt-1 border border-gray-200 focus:outline-0 focus:shadow-md"
                                        />
                                        <p className='text-sm ml-2'>minimum</p>
                                    </div>
                                </div>
                                <div className='flex items-center'>
                                    <input id='checkbox1' type="checkbox" className="checkbox rounded bg-white" />
                                    <label className='text-sm ml-2 cursor-pointer' htmlFor="checkbox1">Must-have qualification</label>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        addQuestions.find(q => q === 'certification') && <div className='w-full my-5 border rounded-md'>
                            <div className='flex justify-between bg-slate-100 p-3'>
                                <input
                                    id='certificationQ'
                                    className='text-base font-medium w-full bg-transparent'
                                    defaultValue='Do you have the following certification: [Certification] ?'
                                ></input>
                                <XIcon
                                    onClick={() => removeQuestion('certification')}
                                    className='w-8 h-8 cursor-pointer p-1 rounded-full duration-300 hover:bg-slate-300'
                                ></XIcon>
                            </div>
                            <div className='p-3 flex sm:flex-row sm:items-center flex-col items-start justify-between gap-3'>
                                <div>
                                    <label htmlFor='certification' className='text-base block'>Certification</label>
                                    <input
                                        id='certification'
                                        type="text"
                                        required
                                        placeholder="Certification"
                                        className="px-2 h-9 rounded-none text-base w-full mt-1 border border-gray-200 focus:outline-0 focus:shadow-md"
                                    />
                                </div>
                                <div>
                                    <label htmlFor='nbCertification' className='text-base'>Ideal Answer</label>
                                    <p className='text-base mt-2'>Yes</p>
                                </div>
                                <div className='flex items-center'>
                                    <input id='checkbox2' type="checkbox" className="checkbox rounded bg-white" />
                                    <label className='text-sm ml-2 cursor-pointer' htmlFor="checkbox2">Must-have qualification</label>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        addQuestions.find(q => q === 'drivingLicense') && <div className='w-full my-5 border rounded-md'>
                            <div className='flex justify-between bg-slate-100 p-3'>
                                <input
                                    id='drivingLicenseQ'
                                    className='text-base font-medium w-full bg-transparent'
                                    defaultValue='Do you have a valid driving license?'
                                ></input>
                                <XIcon
                                    onClick={() => removeQuestion('drivingLicense')}
                                    className='w-8 h-8 cursor-pointer p-1 rounded-full duration-300 hover:bg-slate-300'
                                ></XIcon>
                            </div>
                            <div className='p-3 flex sm:flex-row sm:items-center flex-col items-start justify-between gap-3'>
                                <div>
                                    <h2 className='text-base'>Ideal Answer</h2>
                                    <p className='text-base mt-2'>Yes</p>
                                </div>
                                <div className='flex items-center'>
                                    <input id='checkbox3' type="checkbox" className="checkbox rounded bg-white" />
                                    <label className='text-sm ml-2 cursor-pointer' htmlFor="checkbox3">Must-have qualification</label>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        addQuestions.find(q => q === 'drugTest') && <div className='w-full my-5 border rounded-md'>
                            <div className='flex justify-between bg-slate-100 p-3'>
                                <input
                                    id='drugTestQ'
                                    className='text-base font-medium w-full bg-transparent'
                                    defaultValue='Are you willing to take a drug test, in accordance with local law/regulations?'
                                ></input>
                                <XIcon
                                    onClick={() => removeQuestion('drugTest')}
                                    className='w-8 h-8 cursor-pointer p-1 rounded-full duration-300 hover:bg-slate-300'
                                ></XIcon>
                            </div>
                            <div className='p-3 flex sm:flex-row sm:items-center flex-col items-start justify-between gap-3'>
                                <div>
                                    <h2 className='text-base'>Ideal Answer</h2>
                                    <p className='text-base mt-2'>Yes</p>
                                </div>
                                <div className='flex items-center'>
                                    <input id='checkbox4' type="checkbox" className="checkbox rounded bg-white" />
                                    <label className='text-sm ml-2 cursor-pointer' htmlFor="checkbox4">Must-have qualification</label>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        addQuestions.find(q => q === 'education') && <div className='w-full my-5 border rounded-md'>
                            <div className='flex justify-between bg-slate-100 p-3'>
                                <input
                                    id='educationQ'
                                    className='text-base font-medium w-full bg-transparent'
                                    defaultValue='Have you completed the following level of education: [Degree] ?'
                                ></input>
                                <XIcon
                                    onClick={() => removeQuestion('education')}
                                    className='w-8 h-8 cursor-pointer p-1 rounded-full duration-300 hover:bg-slate-300'
                                ></XIcon>
                            </div>
                            <div className='p-3 flex sm:flex-row sm:items-center flex-col items-start justify-between gap-3'>
                                <div>
                                    <label htmlFor='degree' className='text-base block'>Degree</label>
                                    <input
                                        id='degree'
                                        type="text"
                                        required
                                        placeholder="Degree"
                                        className="px-2 h-9 rounded-none text-base w-full mt-1 border border-gray-200 focus:outline-0 focus:shadow-md"
                                    />
                                </div>
                                <div>
                                    <h2 className='text-base'>Ideal Answer</h2>
                                    <p className='text-base mt-2'>Yes</p>
                                </div>
                                <div className='flex items-center'>
                                    <input id='checkbox5' type="checkbox" className="checkbox rounded bg-white" />
                                    <label className='text-sm ml-2 cursor-pointer' htmlFor="checkbox5">Must-have qualification</label>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        addQuestions.find(q => q === 'gpa') && <div className='w-full my-5 border rounded-md'>
                            <div className='flex justify-between bg-slate-100 p-3'>
                                <input
                                    id='gpaQ'
                                    className='text-base font-medium w-full bg-transparent'
                                    defaultValue='What is your university result [GPA] ?'
                                ></input>
                                <XIcon
                                    onClick={() => removeQuestion('gpa')}
                                    className='w-8 h-8 cursor-pointer p-1 rounded-full duration-300 hover:bg-slate-300'
                                ></XIcon>
                            </div>
                            <div className='p-3 flex sm:flex-row sm:items-center flex-col items-start justify-between gap-3'>
                                <div>
                                    <label htmlFor='gpaPoint' className='text-base'>Ideal Answer</label>
                                    <div className='flex items-center'>
                                        <input
                                            id='gpaPoint'
                                            type="number"
                                            placeholder='1'
                                            min={1} required
                                            className="px-2 h-9 rounded-none text-base w-full mt-1 border border-gray-200 focus:outline-0 focus:shadow-md"
                                        />
                                        <p className='text-sm ml-2'>minimum</p>
                                    </div>
                                </div>
                                <div className='flex items-center'>
                                    <input id='checkbox6' type="checkbox" className="checkbox rounded bg-white" />
                                    <label className='text-sm ml-2 cursor-pointer' htmlFor="checkbox6">Must-have qualification</label>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        addQuestions.find(q => q === 'hybridWork') && <div className='w-full my-5 border rounded-md'>
                            <div className='flex justify-between bg-slate-100 p-3'>
                                <input
                                    id='hybridWorkQ'
                                    className='text-base font-medium w-full bg-transparent'
                                    defaultValue='Are you comfortable working in a hybrid work?'
                                ></input>
                                <XIcon
                                    onClick={() => removeQuestion('hybridWork')}
                                    className='w-8 h-8 cursor-pointer p-1 rounded-full duration-300 hover:bg-slate-300'
                                ></XIcon>
                            </div>
                            <div className='p-3 flex sm:flex-row sm:items-center flex-col items-start justify-between gap-3'>
                                <div>
                                    <h2 className='text-base'>Ideal Answer</h2>
                                    <p className='text-base mt-2'>Yes</p>
                                </div>
                                <div className='flex items-center'>
                                    <input id='checkbox7' type="checkbox" className="checkbox rounded bg-white" />
                                    <label className='text-sm ml-2 cursor-pointer' htmlFor="checkbox7">Must-have qualification</label>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        addQuestions.find(q => q === 'remoteWork') && <div className='w-full my-5 border rounded-md'>
                            <div className='flex justify-between bg-slate-100 p-3'>
                                <input
                                    id='remoteWorkQ'
                                    className='text-base font-medium w-full bg-transparent'
                                    defaultValue='Are you comfortable working in a remote work?'
                                ></input>
                                <XIcon
                                    onClick={() => removeQuestion('remoteWork')}
                                    className='w-8 h-8 cursor-pointer p-1 rounded-full duration-300 hover:bg-slate-300'
                                ></XIcon>
                            </div>
                            <div className='p-3 flex sm:flex-row sm:items-center flex-col items-start justify-between gap-3'>
                                <div>
                                    <h2 className='text-base'>Ideal Answer</h2>
                                    <p className='text-base mt-2'>Yes</p>
                                </div>
                                <div className='flex items-center'>
                                    <input id='checkbox8' type="checkbox" className="checkbox rounded bg-white" />
                                    <label className='text-sm ml-2 cursor-pointer' htmlFor="checkbox8">Must-have qualification</label>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        addQuestions.find(q => q === 'workExperience') && <div className='w-full my-5 border rounded-md'>
                            <div className='flex justify-between bg-slate-100 p-3'>
                                <input
                                    id='workExperienceQ'
                                    className='text-base font-medium w-full bg-transparent'
                                    defaultValue='How many years of [Job title] experience do you have ?'
                                ></input>
                                <XIcon
                                    onClick={() => removeQuestion('workExperience')}
                                    className='w-8 h-8 cursor-pointer p-1 rounded-full duration-300 hover:bg-slate-300'
                                ></XIcon>
                            </div>
                            <div className='p-3 flex sm:flex-row sm:items-center flex-col items-start justify-between gap-3'>
                                <div>
                                    <label htmlFor='workExperience' className='text-base block'>Job Title</label>
                                    <input
                                        id='workExperience'
                                        type="text"
                                        required
                                        placeholder="Job Title"
                                        className="px-2 h-9 rounded-none text-base w-full mt-1 border border-gray-200 focus:outline-0 focus:shadow-md"
                                    />
                                </div>
                                <div>
                                    <label htmlFor='nbExperience' className='text-base'>Ideal Answer</label>
                                    <div className='flex items-center'>
                                        <input
                                            id='nbExperience'
                                            type="number"
                                            placeholder='1'
                                            min={1} required
                                            className="px-2 h-9 rounded-none text-base w-full mt-1 border border-gray-200 focus:outline-0 focus:shadow-md"
                                        />
                                        <p className='text-sm ml-2'>minimum</p>
                                    </div>
                                </div>
                                <div className='flex items-center'>
                                    <input id='checkbox9' type="checkbox" className="checkbox rounded bg-white" />
                                    <label className='text-sm ml-2 cursor-pointer' htmlFor="checkbox9">Must-have qualification</label>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        addQuestions.find(q => q === 'urgentHiring') && <div className='w-full my-5 border rounded-md'>
                            <div className='flex justify-between bg-slate-100 p-3'>
                                <input
                                    id='urgentHiringQ'
                                    className='text-base font-medium w-full bg-transparent'
                                    defaultValue='We are hiring urgently, can you join immediately?'
                                ></input>
                                <XIcon
                                    onClick={() => removeQuestion('urgentHiring')}
                                    className='w-8 h-8 cursor-pointer p-1 rounded-full duration-300 hover:bg-slate-300'
                                ></XIcon>
                            </div>
                            <div className='p-3 flex sm:flex-row sm:items-center flex-col items-start justify-between gap-3'>
                                <div>
                                    <h2 className='text-base'>Ideal Answer</h2>
                                    <p className='text-base mt-2'>Yes</p>
                                </div>
                                <div className='flex items-center'>
                                    <input id='checkbox10' type="checkbox" className="checkbox rounded bg-white" />
                                    <label className='text-sm ml-2 cursor-pointer' htmlFor="checkbox10">Must-have qualification</label>
                                </div>
                            </div>
                        </div>
                    }


                    {/*==================== 
                        Custom Question 
                        ====================*/}
                    {addCTQuestion.map((items, index) =>
                        <div key={index} className='w-full my-5 border rounded-md'>
                            <div className='flex justify-between bg-slate-100 p-3'>
                                <h3 className='text-base font-medium'>Write a custom screening question.</h3>
                                <XIcon
                                    onClick={() => removeCustomQuestion(index)}
                                    className='w-8 h-8 cursor-pointer p-1 rounded-full duration-300 hover:bg-slate-300'
                                ></XIcon>
                            </div>
                            <div className='px-3 pt-3'>
                                <textarea
                                    required
                                    id={`customQ${index + 1}`}
                                    className='border w-full p-2 border-gray-200 focus:outline-0 focus:shadow-md'
                                    placeholder='Ask something here'
                                    rows="2"
                                />
                            </div>
                            <div className='p-3'>
                                <label className='text-base'>Ideal Answer</label>
                                <div className='flex sm:flex-row sm:items-center flex-col items-start justify-between gap-3'>
                                    <select
                                        id={`select${index + 1}`}
                                        className="px-2 h-9 rounded-none text-base mt-1 border border-gray-200 focus:outline-0 focus:shadow-md"
                                    >
                                        <option disabled selected defaultValue="Yes/No">Yes / No</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                    <p className='text-base'>or</p>
                                    <div className='flex items-center'>
                                        <input
                                            id={`nbCTQ${index + 1}`}
                                            type="number"
                                            placeholder='1'
                                            min={1}
                                            className="px-2 h-9 rounded-none text-base mt-1 border border-gray-200 focus:outline-0 focus:shadow-md"
                                        />
                                        <p className='text-sm ml-2'>minimum</p>
                                    </div>
                                    <div className='flex items-center'>
                                        <input id={`checkboxCTQ${index + 1}`} type="checkbox" className="checkbox rounded bg-white" />
                                        <label className='text-sm ml-2 cursor-pointer' htmlFor={`checkboxCTQ${index + 1}`}>Must-have qualification</label>
                                    </div>
                                </div>
                            </div>
                        </div>)}


                    {/*==================== 
                        Add Question button 
                    ====================*/}
                    <div className='flex flex-wrap gap-3'>
                        <div onClick={() => handleQuestion('bgCheck')} className='flex items-center gap-2 border-2 w-max px-3 py-2 cursor-pointer'>
                            <p>Background Check</p>
                            {addQuestions.find(q => q === 'bgCheck') ?
                                <CheckIcon className='w-5 h-5 text-success'></CheckIcon>
                                :
                                <PlusIcon className='w-5 h-5'></PlusIcon>
                            }
                        </div>
                        <div onClick={() => handleQuestion('certification')} className='flex items-center gap-2 border-2 w-max px-3 py-2 cursor-pointer'>
                            <p>Certification</p>
                            {addQuestions.find(q => q === 'certification') ?
                                <CheckIcon className='w-5 h-5 text-success'></CheckIcon>
                                :
                                <PlusIcon className='w-5 h-5'></PlusIcon>
                            }
                        </div>
                        <div onClick={() => handleQuestion('drivingLicense')} className='flex items-center gap-2 border-2 w-max px-3 py-2 cursor-pointer'>
                            <p>Driving license</p>
                            {addQuestions.find(q => q === 'drivingLicense') ?
                                <CheckIcon className='w-5 h-5 text-success'></CheckIcon>
                                :
                                <PlusIcon className='w-5 h-5'></PlusIcon>
                            }
                        </div>
                        <div onClick={() => handleQuestion('drugTest')} className='flex items-center gap-2 border-2 w-max px-3 py-2 cursor-pointer'>
                            <p>Drug test</p>
                            {addQuestions.find(q => q === 'drugTest') ?
                                <CheckIcon className='w-5 h-5 text-success'></CheckIcon>
                                :
                                <PlusIcon className='w-5 h-5'></PlusIcon>
                            }
                        </div>
                        <div onClick={() => handleQuestion('education')} className='flex items-center gap-2 border-2 w-max px-3 py-2 cursor-pointer'>
                            <p>Education</p>
                            {addQuestions.find(q => q === 'education') ?
                                <CheckIcon className='w-5 h-5 text-success'></CheckIcon>
                                :
                                <PlusIcon className='w-5 h-5'></PlusIcon>
                            }
                        </div>
                        <div onClick={() => handleQuestion('gpa')} className='flex items-center gap-2 border-2 w-max px-3 py-2 cursor-pointer'>
                            <p>GPA</p>
                            {addQuestions.find(q => q === 'gpa') ?
                                <CheckIcon className='w-5 h-5 text-success'></CheckIcon>
                                :
                                <PlusIcon className='w-5 h-5'></PlusIcon>
                            }
                        </div>
                        <div onClick={() => handleQuestion('hybridWork')} className='flex items-center gap-2 border-2 w-max px-3 py-2 cursor-pointer'>
                            <p>Hybrid work</p>
                            {addQuestions.find(q => q === 'hybridWork') ?
                                <CheckIcon className='w-5 h-5 text-success'></CheckIcon>
                                :
                                <PlusIcon className='w-5 h-5'></PlusIcon>
                            }
                        </div>
                        <div onClick={() => handleQuestion('remoteWork')} className='flex items-center gap-2 border-2 w-max px-3 py-2 cursor-pointer'>
                            <p>Remote work</p>
                            {addQuestions.find(q => q === 'remoteWork') ?
                                <CheckIcon className='w-5 h-5 text-success'></CheckIcon>
                                :
                                <PlusIcon className='w-5 h-5'></PlusIcon>
                            }
                        </div>
                        <div onClick={() => handleQuestion('workExperience')} className='flex items-center gap-2 border-2 w-max px-3 py-2 cursor-pointer'>
                            <p>Work experience</p>
                            {addQuestions.find(q => q === 'workExperience') ?
                                <CheckIcon className='w-5 h-5 text-success'></CheckIcon>
                                :
                                <PlusIcon className='w-5 h-5'></PlusIcon>
                            }
                        </div>
                        <div onClick={() => handleQuestion('urgentHiring')} className='flex items-center gap-2 border-2 w-max px-3 py-2 cursor-pointer'>
                            <p>Urgent hiring</p>
                            {addQuestions.find(q => q === 'urgentHiring') ?
                                <CheckIcon className='w-5 h-5 text-success'></CheckIcon>
                                :
                                <PlusIcon className='w-5 h-5'></PlusIcon>
                            }
                        </div>
                        {
                            addCTQuestion.length < 5 ?
                                <div onClick={() => handleCustomQuestion('customQuestion')} className='bg-accent/30 flex items-center gap-2 border-2 w-max px-3 py-2 cursor-pointer'>
                                    <p>Custom question</p>
                                    {addCTQuestion.find(q => q === 'customQuestion') ?
                                        <CheckIcon className='w-5 h-5 text-success'></CheckIcon>
                                        :
                                        <PlusIcon className='w-5 h-5'></PlusIcon>
                                    }
                                </div>
                                :
                                <div className='bg-accent/30 text-gray-400 flex items-center gap-2 border-2 w-max px-3 py-2'>
                                    <p>Custom question</p>
                                    {addCTQuestion.find(q => q === 'customQuestion') ?
                                        <CheckIcon className='w-5 h-5 text-gray-400'></CheckIcon>
                                        :
                                        <PlusIcon className='w-5 h-5'></PlusIcon>
                                    }
                                </div>
                        }

                    </div>
                </div>

                <div className='mt-10 flex sm:justify-center'>
                    <button
                        type='submit'
                        disabled={loading}
                        className='sm:w-max w-full btn btn-accent sm:px-10 px-5 normal-case sm:text-lg text-base text-white h-11 min-h-0'>
                        {
                            loading ? <Spinner></Spinner> : 'Submit'
                        }
                    </button>
                </div>
            </div>
        </form>
        {
            openModal &&
            <div className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center bg-black/50">
                <div className="modal-box">
                    <h3 className="font-medium text-2xl text-green-500">Congratulations for your job post!</h3>
                    <p className="text-lg py-4">This post has gone under review.</p>
                    <div className="modal-action">
                        <button
                            onClick={() => {
                                localStorage.removeItem('employerContact');
                                localStorage.removeItem('jobDescription');
                                navigate('/')
                            }}
                            className="btn text-white capitalize"
                        >Go to home
                        </button>
                    </div>
                </div>
            </div>
        }
    </>
    );
};

export default ApplicationOptions;