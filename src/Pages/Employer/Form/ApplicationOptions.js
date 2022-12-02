import { ChevronLeftIcon, ExclamationCircleIcon } from '@heroicons/react/solid';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import useGetUsers from '../../../hooks/useGetUsers';
import PageTitle from '../../Shared/PageTitle';
import AdditionalQuestions from './AdditionalQuestions';

const ApplicationOptions = () => {
    const setStep = useOutletContext();
    setStep(2);
    const [usersData] = useGetUsers();
    const navigate = useNavigate();
    const [openApply, setOpenApply] = useState(false);
    const skillRef = useRef();
    const [errEmail, setErrEmail] = useState(false);

    const [applyTypeState, setApplyTypeState] = useState('');
    const emailRef = useRef();
    const redirectLinkRef = useRef();
    const salaryRef = useRef();
    const upRef = useRef();


    // ===================Scrolling top===================
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);


    // ==================Get localStorage data==================
    const [storeData, setStoreData] = useState();
    useEffect(() => {
        const appOptions = JSON.parse(localStorage.getItem('appOptions'));
        setStoreData(appOptions);
    }, []);


    // ==================Add skill==================
    const [skillTags, setSkillTags] = useState([]);
    const addSkillTags = () => {
        if (skillRef.current.value) {
            setSkillTags([...skillTags, skillRef.current.value])
        }
    };
    const removeSkillTags = indexToRemove => {
        setSkillTags(skillTags.filter((_, index) => index !== indexToRemove))
    };


    // ==================Add additional questions==================
    const [addQuestions, setAddQuestions] = useState([]);
    const handleQuestion = text => {
        setAddQuestions([...addQuestions, text]);
    };
    const removeQuestion = remove => {
        setAddQuestions(addQuestions.filter(q => q !== remove))
    };

    // ==================Add additional Custom Question==================
    const [addCTQuestion, setAddCTQuestion] = useState([]);
    const handleCustomQuestion = text => {
        setAddCTQuestion([...addCTQuestion, text]);
    };
    const removeCustomQuestion = removeIndex => {
        setAddCTQuestion(addCTQuestion.filter((_, index) => index !== removeIndex))
    };


    const jobContact = JSON.parse(localStorage.getItem('jobContact'));
    const jobDescription = JSON.parse(localStorage.getItem('jobDescription'));

    if (!jobContact && !jobDescription) {
        return navigate('/job-form/contact')
    }


    // ==================Handle form==================
    const handleApplication = async (e) => {
        e.preventDefault();

        const receiveEmail = emailRef.current.value;
        const applicationTypes = e.target.applicationTypes.value;
        const applyType = applicationTypes === 'easyApply' ? 'easyApply' : redirectLinkRef.current.value;
        const salary = salaryRef.current.value;
        const email = await usersData?.email;

        // Add additional questions
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
            localStorage.setItem('appOptions', JSON.stringify({
                receiveEmail, salary, skillTags, email, applyType, bgCheck, certification, drivingLicense, drugTest, education, gpa, hybridWork, remoteWork, workExperience, urgentHiring, customQuestion
            }));

            navigate('/job-form/review');
        }
        else {
            upRef.current.scrollIntoView()
            setErrEmail(true);
        }
    };


    return (<>
        <PageTitle title='Submit Form - Dashboard'></PageTitle>
        <form
            onSubmit={handleApplication}
            onClick={() => {
                openApply && setOpenApply(false)
            }}
            className='2xl:w-[920px] xl:w-55 lg:w-3/5 md:w-4/5 sm:w-11/12 w-full mx-2 bg-white my-10 sm:px-10 px-5 sm:py-8 py-5 h-max rounded-xl border shadow-lg'
        >
            <div>
                <div ref={upRef}>
                    <label
                        htmlFor='jobTitle'
                        className='font-medium sm:text-lg text-base'
                    >
                        Provide an email to receive your applicants.
                        <span className='text-orange-600 ml-1'>*</span>
                    </label>
                    <input
                        id='jobTitle'
                        ref={emailRef}
                        defaultValue={storeData?.receiveEmail}
                        type="email" required
                        placeholder="Enter an email"
                        className={`input h-11 text-base w-full mt-2 border ${errEmail ? 'border-red-500' : 'border-gray-200'} focus:outline-0 focus:shadow-md`}
                    />
                    {errEmail &&
                        <span className='text-sm text-red-500 flex items-center mt-1'>
                            <ExclamationCircleIcon className='w-4 h-4 mr-1'></ExclamationCircleIcon>
                            Invalid email
                        </span>
                    }
                </div>
                <div className='mt-5'>
                    <h3 className='font-medium sm:text-lg text-base'>
                        Application Types
                        <span className='text-orange-600 ml-1'>*</span>
                        <span
                            onClick={() => setOpenApply(!openApply)}
                            className='w-5 h-5 ml-2 cursor-pointer relative'
                        >
                            <svg className="w-5 h-5 inline-block"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24"
                                strokeWidth="1.5" stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                            </svg>
                            {
                                openApply && <div
                                    className='absolute top-7 sm:left-auto -left-36 right-auto sm:w-96 w-72 h-max p-4 bg-white shadow-xl border-2 border-accent rounded cursor-default'
                                >
                                    <h3 className='text-sm mb-4'>There are two types of job apply on Enlistco :</h3>
                                    <p className='font-normal text-sm mb-2'>
                                        <span className='font-semibold mr-2'>Easy Apply :</span>
                                        This allows candidates to apply for the job on Enlistco.
                                    </p>
                                    <p className='font-normal text-sm'>
                                        <span className='font-semibold mr-2'>Apply :</span>
                                        Candidates will be redirected to the company or third-party website where they can apply for the job externally.
                                    </p>
                                </div>
                            }
                        </span>
                    </h3>
                    <label htmlFor="easyApply" className='text-base text-gray-500 font-medium cursor-pointer flex items-center gap-2 w-max ml-4 my-2'>
                        <input
                            required
                            type="radio"
                            defaultChecked={storeData && storeData.applyType === 'easyApply'}
                            name="applicationTypes"
                            id="easyApply"
                            value="easyApply"
                            className="radio radio-sm radio-accent"
                            onChange={(e) => {
                                setApplyTypeState(e.target.value);
                            }}
                        />
                        Easy Apply
                    </label>
                    <label htmlFor="redirectSite" className='text-base text-gray-500 font-medium cursor-pointer flex items-center gap-2 w-max ml-4 my-2'>
                        <input
                            required
                            type="radio"
                            name="applicationTypes"
                            defaultChecked={storeData && storeData.applyType !== 'easyApply'}
                            id="redirectSite"
                            value="redirectSite"
                            className="radio radio-sm radio-accent"
                            onChange={(e) => {
                                setApplyTypeState(e.target.value);
                            }}
                        />
                        Redirect to our site
                    </label>
                    {
                        applyTypeState === 'redirectSite' &&
                        <input
                            required
                            ref={redirectLinkRef}
                            defaultValue={
                                (storeData && storeData.applyType !== 'easyApply') ?
                                    storeData?.applyType : ""
                            }
                            id='companyLink' type="text"
                            placeholder="Enter company site link. ex: www.example.com"
                            className="input h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md"
                        />
                    }
                </div>
                <div className='mt-5'>
                    <label
                        htmlFor='salary'
                        className='font-medium sm:text-lg text-base'
                    >
                        Salary<span className='ml-1 font-normal'>(optional)</span>
                    </label>
                    <input
                        ref={salaryRef}
                        defaultValue={storeData?.salary}
                        id='salary' type="text"
                        placeholder="Enter amount as per year/month/day/hours"
                        className="input h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md"
                    />
                </div>
                <div className='mt-5'>
                    <h1 className='font-medium sm:text-lg text-base'>
                        Add skillTags<span className='ml-1 font-normal'>(optional)</span>
                    </h1>
                    <p className='text-gray-600 text-base'>
                        Add skill keywords or tags so your job can reach more accurate candidates.
                    </p>
                    <ul className='list-none flex items-center flex-wrap gap-1 w-full'>
                        {
                            skillTags.map((skill, index) =>
                                <li key={index} className='flex items-center justify-between bg-secondary text-white rounded-md px-1 cursor-pointer' onClick={() => removeSkillTags(index)}>
                                    <span className='mr-1'>{skill}</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor" strokeWidth="2"
                                    >
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
                        <div
                            onClick={addSkillTags}
                            className='bg-accent text-white rounded-tr-md rounded-br-md py-3 px-5 cursor-pointer'
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/*==================== 
                    Additional Questions
                    ====================*/}
            <AdditionalQuestions
                addQuestions={addQuestions}
                removeQuestion={removeQuestion}
                addCTQuestion={addCTQuestion}
                removeCustomQuestion={removeCustomQuestion}
                handleQuestion={handleQuestion}
                handleCustomQuestion={handleCustomQuestion}
            />

            <div className='flex sm:flex-row flex-col-reverse justify-between gap-4 mt-10'>
                <div
                    onClick={() => navigate(-1)}
                    className='sm:w-max w-full btn btn-outline btn-accent hover:text-white normal-case text-lg gap-2 px-5 h-11 min-h-0'
                >
                    <ChevronLeftIcon className='w-6 h-6 inline-block' /> Back
                </div>
                <button
                    type='submit'
                    className='sm:w-max w-full btn btn-accent sm:px-10 px-5 normal-case text-lg text-white h-11 min-h-0'
                >
                    Save and continue
                </button>
            </div>
        </form>
    </>
    );
};

export default ApplicationOptions;