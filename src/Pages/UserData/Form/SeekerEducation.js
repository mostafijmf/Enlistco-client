import { ChevronLeftIcon } from '@heroicons/react/solid';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import PageTitle from '../../Shared/PageTitle';

const SeekerEducation = () => {
    const setStep = useOutletContext();
    setStep(3);
    const [studying, setStudying] = useState(false);
    const navigate = useNavigate();

    const degreeRef = useRef();
    const institutionRef = useRef();
    const groupRef = useRef();
    const startDateRef = useRef();
    const studyingRef = useRef();

    useEffect(() => {
        const userContact = JSON.parse(localStorage.getItem('userContact'));
        const seekerAbout = JSON.parse(localStorage.getItem('seekerAbout'));

        if (!userContact || !seekerAbout) {
            return navigate('/form/seeker-contact');
        }
    }, [navigate]);


    // Handle submit
    const handleEducation = async event => {
        event.preventDefault();

        const degree = degreeRef.current.value;
        const institution = institutionRef.current.value;
        const edugroup = groupRef.current.value;
        const eduStartDate = startDateRef.current.value;
        const studying = studyingRef.current.checked;

        let eduEndDate;
        let eduStudying;
        if (!studying) {
            eduEndDate = event.target.endDate.value;
            eduStudying = '';
        }
        else {
            eduStudying = 'Currently Studying';
            eduEndDate = ''
        };

        localStorage.setItem('education', JSON.stringify({ degree, institution, edugroup, eduStartDate, eduEndDate, eduStudying }));
        navigate('/form/upload-resume');
    };

    return (<>
        <PageTitle title='Education Form - Dashboard'></PageTitle>
        <div className='lg:w-1/2 md:w-3/5 sm:w-4/5 w-11/12 bg-white sm:px-10 px-5 sm:py-8 py-5 h-max sm:mt-8 mt-6 mb-10 rounded-xl border shadow-lg'>
            <h1 className='text-center sm:text-3xl text-2xl font-semibold mb-5'>
                Add Education
            </h1>
            <form onSubmit={handleEducation}>
                <div>
                    <div>
                        <label
                            htmlFor='degree'
                            className='font-medium sm:text-lg text-base'
                        >
                            Degree<span className='text-orange-600 ml-1'>*</span>
                            <input
                                id='degree'
                                ref={degreeRef}
                                required type="text"
                                placeholder="Ex: Bachelor's"
                                className="input font-normal h-11 text-base bg-slate-100 w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md"
                            />
                        </label>
                    </div>
                    <div className='mt-5'>
                        <label htmlFor='institution' className='font-medium sm:text-lg text-base'>Institution<span className='text-orange-600 ml-1'>*</span></label>
                        <input
                            id='institution'
                            ref={institutionRef}
                            required type="text"
                            placeholder="Ex: Oxford University"
                            className="input h-11 text-base bg-slate-100 w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md"
                        />
                    </div>
                    <div className='mt-5'>
                        <label htmlFor='group' className='font-medium sm:text-lg text-base'>Subject or Group<span className='text-orange-600 ml-1'>*</span>
                        </label>
                        <input id='group' ref={groupRef} required type="text" placeholder="Ex: Business" className="input h-11 text-base bg-slate-100 w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                    </div>
                    <div className='flex sm:flex-row flex-col justify-between sm:gap-4'>
                        <div className='mt-5'>
                            <label htmlFor='startDate' className='font-medium sm:text-lg text-base'>Start date<span className='text-orange-600 ml-1'>*</span></label>
                            <input id='startDate' ref={startDateRef} required type="date" className="input h-11 text-base bg-slate-100 w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                        </div>
                        {
                            studying ? '' :
                                <div className='mt-5'>
                                    <label htmlFor='endDate' className='font-medium sm:text-lg text-base'>End date</label>
                                    <input name='endDate' id='endDate' type='date' className="input h-11 text-base bg-slate-100 w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                                </div>
                        }
                    </div>
                    <div className='md:mt-5 mt-3 flex items-center'>
                        <input
                            id='checkbox'
                            ref={studyingRef}
                            onChange={() => setStudying(!studying)}
                            type="checkbox" className="checkbox bg-slate-100"
                        />
                        <label className='text-base ml-3 cursor-pointer' htmlFor="checkbox">Currently studying</label>
                    </div>
                </div>
                <div className='mt-8 flex sm:flex-row flex-col-reverse justify-between gap-4'>
                    <div className='w-full flex items-center justify-between gap-4'>
                        <button
                            onClick={() => navigate(-1)}
                            className='sm:w-max w-1/2 btn btn-outline btn-primary px-6 gap-2 normal-case sm:text-lg text-base hover:text-white h-11 min-h-0'
                        >
                            <ChevronLeftIcon className='w-6 h-6 inline-block' /> Back
                        </button>
                        <button
                            onClick={() => navigate('/form/upload-resume')}
                            className='sm:w-max w-1/2 btn btn-link normal-case sm:text-lg text-base h-11 min-h-0'
                        >
                            Skip
                        </button>
                    </div>

                    <button
                        className='sm:w-max w-full btn btn-primary px-6 normal-case sm:text-lg text-base text-white h-11 min-h-0'
                        type="submit"
                    >
                        Save and continue
                    </button>
                </div>
            </form>
        </div>
    </>
    );
};

export default SeekerEducation;