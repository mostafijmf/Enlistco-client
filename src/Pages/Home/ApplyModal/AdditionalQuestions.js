import React, { useRef, useState } from 'react';

const AdditionalQuestions = ({ questions, setProgress }) => {

    const {
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
    } = questions;

    const [invalid, setInvalid] = useState('');

    const bgCheckRef = useRef();
    const certificationRef = useRef();
    const drivingLicenseRef = useRef();
    const drugTestRef = useRef();
    const educationRef = useRef();
    const gpaRef = useRef();
    const hybridWorkRef = useRef();
    const remoteWorkRef = useRef();
    const workExperienceRef = useRef();
    const urgentHiringRef = useRef();
    const customQRef = useRef([]);

    const handleNext = event => {
        event.preventDefault();

        let qBgCheck = {};
        if (bgCheck) {
            if (bgCheck?.qualificationMust) {
                if (event.target.bgCheck.value >= bgCheck?.idealAns) {
                    qBgCheck = {
                        bgCheckQ: bgCheck?.bgCheckQ,
                        idealAns: event.target.bgCheck.value,
                    };
                } else {
                    bgCheckRef.current.scrollIntoView();
                    return setInvalid('bgCheck');
                }
            } else {
                qBgCheck = {
                    bgCheckQ: bgCheck?.bgCheckQ,
                    idealAns: event.target.bgCheck.value,
                };
            }
        } else {
            qBgCheck = {};
        }

        let qCertification = {};
        if (certification) {
            if (event.target.certification.value === 'Yes / No') {
                certificationRef.current.scrollIntoView();
                return setInvalid('certification');
            } else {
                qCertification = {
                    certificationQ: certification?.certificationQ,
                    idealAns: event.target.certification.value,
                }
            };
        } else {
            qCertification = {};
        };

        let qDrivingLicense = {};
        if (drivingLicense) {
            if (event.target.drivingLicense.value === 'Yes / No') {
                drivingLicenseRef.current.scrollIntoView();
                return setInvalid('drivingLicense');
            } else {
                qDrivingLicense = {
                    drivingLicenseQ: drivingLicense?.drivingLicenseQ,
                    idealAns: event.target.drivingLicense.value,
                }
            };
        } else {
            qDrivingLicense = {}
        };

        let qDrugTest = {};
        if (drugTest) {
            if (event.target.drugTest.value === 'Yes / No') {
                drugTestRef.current.scrollIntoView();
                return setInvalid('drugTest');
            } else {
                qDrugTest = {
                    drugTestQ: drugTest?.drugTestQ,
                    idealAns: event.target.drugTest.value
                };
            };
        } else {
            qDrugTest = {}
        };

        let qEducation = {};
        if (education) {
            if (event.target.education.value === 'Yes / No') {
                educationRef.current.scrollIntoView();
                return setInvalid('education');
            } else {
                qEducation = {
                    educationQ: education?.educationQ,
                    idealAns: event.target.education.value
                };
            };
        } else {
            qEducation = {}
        };


        let qGpa = {};
        if (gpa) {
            if (gpa?.qualificationMust) {
                if (event.target.gpa.value >= gpa?.gpaPoint) {
                    qGpa = {
                        gpaQ: gpa?.gpaQ,
                        idealAns: event.target.gpa.value
                    };
                } else {
                    gpaRef.current.scrollIntoView();
                    return setInvalid('gpa');
                }
            } else {
                qGpa = {
                    gpaQ: gpa?.gpaQ,
                    idealAns: event.target.gpa.value
                };
            }
        } else {
            qGpa = {};
        }

        let qHybridWork = {};
        if (hybridWork) {
            if (event.target.hybridWork.value === 'Yes / No') {
                hybridWorkRef.current.scrollIntoView();
                return setInvalid('hybridWork');
            } else {
                qHybridWork = {
                    hybridWorkQ: hybridWork?.hybridWorkQ,
                    idealAns: event.target.hybridWork.value
                }
            };
        } else {
            qHybridWork = {}
        };

        let qRemoteWork = {};
        if (remoteWork) {
            if (event.target.remoteWork.value === 'Yes / No') {
                remoteWorkRef.current.scrollIntoView();
                return setInvalid('remoteWork');
            } else {
                qRemoteWork = {
                    remoteWorkQ: remoteWork?.remoteWorkQ,
                    idealAns: event.target.remoteWork.value
                }
            };
        } else {
            qRemoteWork = {}
        };


        let qWorkExperience = {};
        if (workExperience) {
            if (workExperience?.qualificationMust) {
                if (event.target.workExperience.value >= workExperience?.idealAns) {
                    qWorkExperience = {
                        workExperienceQ: workExperience?.workExperienceQ,
                        idealAns: event.target.workExperience.value
                    }
                } else {
                    workExperienceRef.current.scrollIntoView();
                    return setInvalid('workExperience');
                }
            } else {
                qWorkExperience = {
                    workExperienceQ: workExperience?.workExperienceQ,
                    idealAns: event.target.workExperience.value
                }
            }
        } else {
            qWorkExperience = {}
        }

        let qUrgentHiring = {};
        if (urgentHiring) {
            if (event.target.urgentHiring.value === 'Yes / No') {
                urgentHiringRef.current.scrollIntoView();
                return setInvalid('urgentHiring');
            } else {
                qUrgentHiring = {
                    urgentHiringQ: urgentHiring?.urgentHiringQ,
                    idealAns: event.target.urgentHiring.value
                }
            };
        } else {
            qUrgentHiring = {}
        };

        // // custom questions
        let ctQuestion = [];
        if (customQuestion[0]?.customQ) {
            if (customQuestion[0].nbCTQ) {
                if (customQuestion[0].qualificationMust) {
                    if (event.target.customQ0.value >= customQuestion[0].nbCTQ) {
                        ctQuestion = [...ctQuestion, {
                            customQ: customQuestion[0]?.customQ,
                            idealAns: event.target.customQ0.value
                        }]
                    } else {
                        customQRef.current[0].scrollIntoView();
                        return setInvalid(0);
                    }
                } else {
                    ctQuestion = [...ctQuestion, {
                        customQ: customQuestion[0]?.customQ,
                        idealAns: event.target.customQ0.value
                    }]
                }
            } else {
                if (event.target.customQ0.value === 'Yes / No') {
                    customQRef.current[0].scrollIntoView();
                    return setInvalid(0);
                } else {
                    ctQuestion = [...ctQuestion, {
                        customQ: customQuestion[0]?.customQ,
                        idealAns: event.target.customQ0.value
                    }]
                };
            }
        } else {
            ctQuestion = [...ctQuestion, {
                customQ: '',
                idealAns: ''
            }]
        };


        if (customQuestion[1]?.customQ) {
            if (customQuestion[1].nbCTQ) {
                if (customQuestion[1].qualificationMust) {
                    if (event.target.customQ1.value >= customQuestion[1].nbCTQ) {
                        ctQuestion = [...ctQuestion, {
                            customQ: customQuestion[1]?.customQ,
                            idealAns: event.target.customQ1.value
                        }]
                    } else {
                        customQRef.current[1].scrollIntoView();
                        return setInvalid(1);
                    }
                } else {
                    ctQuestion = [...ctQuestion, {
                        customQ: customQuestion[1]?.customQ,
                        idealAns: event.target.customQ1.value
                    }]
                }
            } else {
                if (event.target.customQ1.value === 'Yes / No') {
                    customQRef.current[1].scrollIntoView();
                    return setInvalid(1);
                } else {
                    ctQuestion = [...ctQuestion, {
                        customQ: customQuestion[1]?.customQ,
                        idealAns: event.target.customQ1.value
                    }]
                };
            }
        } else {
            ctQuestion = [...ctQuestion, {
                customQ: '',
                idealAns: ''
            }];
        };


        if (customQuestion[2]?.customQ) {
            if (customQuestion[2].nbCTQ) {
                if (customQuestion[2].qualificationMust) {
                    if (event.target.customQ2.value >= customQuestion[2].nbCTQ) {
                        ctQuestion = [...ctQuestion, {
                            customQ: customQuestion[2]?.customQ,
                            idealAns: event.target.customQ2.value
                        }]
                    } else {
                        customQRef.current[2].scrollIntoView();
                        return setInvalid(2);
                    }
                } else {
                    ctQuestion = [...ctQuestion, {
                        customQ: customQuestion[2]?.customQ,
                        idealAns: event.target.customQ2.value
                    }]
                }
            } else {
                if (event.target.customQ2.value === 'Yes / No') {
                    customQRef.current[2].scrollIntoView();
                    return setInvalid(2);
                } else {
                    ctQuestion = [...ctQuestion, {
                        customQ: customQuestion[2]?.customQ,
                        idealAns: event.target.customQ2.value
                    }]
                };
            }
        } else {
            ctQuestion = [...ctQuestion, {
                customQ: '',
                idealAns: ''
            }];
        };


        if (customQuestion[3]?.customQ) {
            if (customQuestion[3].nbCTQ) {
                if (customQuestion[3].qualificationMust) {
                    if (event.target.customQ3.value >= customQuestion[3].nbCTQ) {
                        ctQuestion = [...ctQuestion, {
                            customQ: customQuestion[3]?.customQ,
                            idealAns: event.target.customQ3.value
                        }]
                    } else {
                        customQRef.current[3].scrollIntoView();
                        return setInvalid(3);
                    }
                } else {
                    ctQuestion = [...ctQuestion, {
                        customQ: customQuestion[3]?.customQ,
                        idealAns: event.target.customQ3.value
                    }]
                }
            } else {
                if (event.target.customQ3.value === 'Yes / No') {
                    customQRef.current[3].scrollIntoView();
                    return setInvalid(3);
                } else {
                    ctQuestion = [...ctQuestion, {
                        customQ: customQuestion[3]?.customQ,
                        idealAns: event.target.customQ3.value
                    }]
                };
            }
        } else {
            ctQuestion = [...ctQuestion, {
                customQ: '',
                idealAns: ''
            }];
        };


        if (customQuestion[4]?.customQ) {
            if (customQuestion[4].nbCTQ) {
                if (customQuestion[4].qualificationMust) {
                    if (event.target.customQ4.value >= customQuestion[4].nbCTQ) {
                        ctQuestion = [...ctQuestion, {
                            customQ: customQuestion[4]?.customQ,
                            idealAns: event.target.customQ4.value
                        }]
                    } else {
                        customQRef.current[4].scrollIntoView();
                        return setInvalid(4);
                    }
                } else {
                    ctQuestion = [...ctQuestion, {
                        customQ: customQuestion[4]?.customQ,
                        idealAns: event.target.customQ4.value
                    }]
                }
            } else {
                if (event.target.customQ4.value === 'Yes / No') {
                    customQRef.current[4].scrollIntoView();
                    return setInvalid(4);
                } else {
                    ctQuestion = [...ctQuestion, {
                        customQ: customQuestion[4]?.customQ,
                        idealAns: event.target.customQ4.value
                    }]
                };
            }
        } else {
            ctQuestion = [...ctQuestion, {
                customQ: '',
                idealAns: ''
            }];
        };

        localStorage.setItem('screeningQuestions', JSON.stringify({
            qBgCheck, qCertification, qDrivingLicense, qDrugTest, qEducation, qGpa, qHybridWork, qRemoteWork, qWorkExperience, qUrgentHiring, ctQuestion
        }));

        setProgress(50);
    };

    return (
        <div
            style={{ height: '30rem' }}
            className='scrollBar overflow-y-auto'
        >
            <h1 className='text-xl sm:px-8 px-5'>Additional Questions</h1>
            <form onSubmit={handleNext} className='w-full sm:px-8 px-5 my-5'>
                {
                    bgCheck &&
                    <div ref={bgCheckRef} className='mb-5'>
                        <label htmlFor='bgCheck' className='text-base'>{bgCheck?.bgCheckQ}</label>
                        <input
                            id='bgCheck'
                            type="number"
                            placeholder="Years"
                            className={`${invalid === 'bgCheck' ? 'border-red-600' : 'border-gray-200'} input h-9 text-base w-full mt-1 border focus:outline-0 focus:shadow-md`}
                        />
                        {
                            invalid === 'bgCheck' &&
                            <p className='mt-1 text-sm text-red-600'>Minimum {
                                bgCheck?.idealAns < 2 ? bgCheck?.idealAns + ' year' : bgCheck?.idealAns + ' years'
                            } experience required</p>
                        }
                    </div>
                }
                {
                    certification &&
                    <div ref={certificationRef} className='mb-5'>
                        <label htmlFor='certification' className='text-base'>{certification?.certificationQ}</label>
                        <select
                            id='certification'
                            required
                            className={`${invalid === 'certification' ? 'border-red-600' : 'border-gray-200'} w-full px-2 h-9 rounded-lg text-base mt-1 border focus:outline-0 focus:shadow-md`}
                        >
                            <option disabled selected defaultValue="Yes/No">Yes / No</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                        {
                            invalid === 'certification' &&
                            <p className='mt-1 text-sm text-red-600'>Please select a valid option</p>
                        }
                    </div>
                }
                {
                    drivingLicense &&
                    <div ref={drivingLicenseRef} className='mb-5'>
                        <label htmlFor='drivingLicense' className='text-base'>{drivingLicense?.drivingLicenseQ}</label>
                        <select
                            id='drivingLicense'
                            className={`${invalid === 'drivingLicense' ? 'border-red-600' : 'border-gray-200'} w-full px-2 h-9 rounded-lg text-base mt-1 border focus:outline-0 focus:shadow-md`}
                        >
                            <option disabled selected defaultValue="Yes/No">Yes / No</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                        {
                            invalid === 'drivingLicense' &&
                            <p className='mt-1 text-sm text-red-600'>Please select a valid option</p>
                        }
                    </div>
                }
                {
                    drugTest &&
                    <div ref={drugTestRef} className='mb-5'>
                        <label htmlFor='drugTest' className='text-base'>{drugTest?.drugTestQ}</label>
                        <select
                            id='drugTest'
                            className={`${invalid === 'drugTest' ? 'border-red-600' : 'border-gray-200'} w-full px-2 h-9 rounded-lg text-base mt-1 border focus:outline-0 focus:shadow-md`}
                        >
                            <option disabled selected defaultValue="Yes/No">Yes / No</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                        {
                            invalid === 'drugTest' &&
                            <p className='mt-1 text-sm text-red-600'>Please select a valid option</p>
                        }
                    </div>
                }
                {
                    education &&
                    <div ref={educationRef} className='mb-5'>
                        <label htmlFor='education' className='text-base'>
                            {education?.educationQ}
                        </label>
                        <select
                            id='education'
                            className={`${invalid === 'education' ? 'border-red-600' : 'border-gray-200'} w-full px-2 h-9 rounded-lg text-base mt-1 border focus:outline-0 focus:shadow-md`}
                        >
                            <option disabled selected defaultValue="Yes/No">Yes / No</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                        {
                            invalid === 'education' &&
                            <p className='mt-1 text-sm text-red-600'>Please select a valid option</p>
                        }
                    </div>
                }
                {
                    gpa &&
                    <div ref={gpaRef} className='mb-5'>
                        <label htmlFor='gpa' className='text-base'>
                            {gpa?.gpaQ}
                        </label>
                        <input
                            id='gpa'
                            type="number"
                            placeholder="Years"
                            className={`${invalid === 'gpa' ? 'border-red-600' : 'border-gray-200'} input h-9 text-base w-full mt-1 border focus:outline-0 focus:shadow-md`}
                        />
                        {
                            invalid === 'gpa' &&
                            <p className='mt-1 text-sm text-red-600'>
                                Minimum {gpa?.gpaPoint} point required
                            </p>
                        }
                    </div>
                }
                {
                    hybridWork &&
                    <div ref={hybridWorkRef} className='mb-5'>
                        <label htmlFor='hybridWork' className='text-base'>
                            {hybridWork?.hybridWorkQ}
                        </label>
                        <select
                            id='hybridWork'
                            className={`${invalid === 'hybridWork' ? 'border-red-600' : 'border-gray-200'} w-full px-2 h-9 rounded-lg text-base mt-1 border focus:outline-0 focus:shadow-md`}
                        >
                            <option disabled selected defaultValue="Yes/No">Yes / No</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                        {
                            invalid === 'hybridWork' &&
                            <p className='mt-1 text-sm text-red-600'>Please select a valid option</p>
                        }
                    </div>
                }
                {
                    remoteWork &&
                    <div ref={remoteWorkRef} className='mb-5'>
                        <label htmlFor='remoteWork' className='text-base'>
                            {remoteWork?.remoteWorkQ}
                        </label>
                        <select
                            id='remoteWork'
                            className={`${invalid === 'remoteWork' ? 'border-red-600' : 'border-gray-200'} w-full px-2 h-9 rounded-lg text-base mt-1 border focus:outline-0 focus:shadow-md`}
                        >
                            <option disabled selected defaultValue="Yes/No">Yes / No</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                        {
                            invalid === 'remoteWork' &&
                            <p className='mt-1 text-sm text-red-600'>Please select a valid option</p>
                        }
                    </div>
                }
                {
                    workExperience &&
                    <div ref={workExperienceRef} className='mb-5'>
                        <label htmlFor='workExperience' className='text-base'>
                            {workExperience?.workExperienceQ}
                        </label>
                        <input
                            id='workExperience'
                            type="number"
                            placeholder="Years"
                            className={`${invalid === 'workExperience' ? 'border-red-600' : 'border-gray-200'} input h-9 text-base w-full mt-1 border focus:outline-0 focus:shadow-md`}
                        />
                        {
                            invalid === 'workExperience' &&
                            <p className='mt-1 text-sm text-red-600'>
                                Minimum {
                                    workExperience?.idealAns < 2 ? workExperience?.idealAns + ' year' : workExperience?.idealAns + ' years'
                                } experience required
                            </p>
                        }
                    </div>
                }
                {
                    urgentHiring &&
                    <div ref={urgentHiringRef} className='mb-5'>
                        <label htmlFor='urgentHiring' className='text-base'>
                            {urgentHiring?.urgentHiringQ}
                        </label>
                        <select
                            id='urgentHiring'
                            className={`${invalid === 'urgentHiring' ? 'border-red-600' : 'border-gray-200'} w-full px-2 h-9 rounded-lg text-base mt-1 border focus:outline-0 focus:shadow-md`}
                        >
                            <option disabled selected defaultValue="Yes/No">Yes / No</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                        {
                            invalid === 'urgentHiring' &&
                            <p className='mt-1 text-sm text-red-600'>Please select a valid option</p>
                        }
                    </div>
                }

                {customQuestion &&
                    customQuestion.map((items, index) => <div
                        key={index}
                        ref={el => { customQRef.current[index] = el }}
                        className='mb-5'
                    >
                        <label htmlFor='urgentHiring' className='text-base'>
                            {items?.customQ}
                        </label>
                        {items.nbCTQ ? <>
                            <input
                                id={`customQ${index}`}
                                type="number"
                                placeholder="Answer"
                                className={`${invalid === index ? 'border-red-600' : 'border-gray-200'} input h-9 text-base w-full mt-1 border focus:outline-0 focus:shadow-md`}
                            />
                            {
                                invalid === index &&
                                <p className='mt-1 text-sm text-red-600'>
                                    Please provide a valid answer
                                </p>
                            }
                        </> :
                            items.idealAns && <>
                                <select
                                    id={`customQ${index}`}
                                    className={`${invalid === index ? 'border-red-600' : 'border-gray-200'} w-full px-2 h-9 rounded-lg text-base mt-1 border focus:outline-0 focus:shadow-md`}
                                >
                                    <option disabled selected defaultValue="Yes/No">Yes / No</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                                {
                                    invalid === index &&
                                    <p className='mt-1 text-sm text-red-600'>Please select a valid option</p>
                                }
                            </>
                        }
                    </div>)
                }
                <div className='text-right'>
                    <button
                        type='submit'
                        className='btn btn-primary text-white md:w-max w-full my-5 min-h-0 h-10 normal-case text-lg tracking-wider px-10'>
                        Next
                    </button>
                </div>
            </form>
        </div>);
};

export default AdditionalQuestions;