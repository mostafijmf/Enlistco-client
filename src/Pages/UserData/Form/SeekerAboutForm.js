import { ChevronLeftIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import PageTitle from '../../Shared/PageTitle';

const SeekerAboutForm = () => {
    const setStep = useOutletContext();
    setStep(1);
    const navigate = useNavigate();
    const [seekerInfo, setSeekerInfo] = useState({});

    useEffect(() => {
        const userContact = JSON.parse(localStorage.getItem('userContact'));
        const seekerAbout = JSON.parse(localStorage.getItem('seekerAbout'));

        if (!userContact) {
            return navigate('/form/seeker-contact');
        }
        else if (seekerAbout) {
            setSeekerInfo(seekerAbout)
        }
    }, [navigate]);

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        const seekerTitle = e.target.seekerTitle.value;
        const seekerAbout = e.target.seekerAbout.value || '';
        localStorage.setItem('seekerAbout', JSON.stringify({ seekerTitle, seekerAbout }));
        navigate('/form/job-experience');
    };

    return (<>
        <PageTitle title='Tell Us About Yourself - Dashboard'></PageTitle>
        <div className='w-full h-screen flex justify-center items-start overflow-y-auto scrollBar-none'>
            <div
                className='lg:w-1/2 md:w-3/5 sm:w-11/12 w-full sm:mx-auto mx-2 bg-white sm:px-10 px-5 sm:py-8 py-5 h-max sm:mt-8 mt-6 mb-10 rounded-lg shadow-lg'
            >
                <h1 className='text-center sm:text-3xl text-2xl font-semibold mb-10'>
                    Tell us about yourself
                </h1>

                <form onSubmit={handleSubmitForm}>
                    <div className='mt-5'>
                        <label
                            htmlFor='seekerTitle'
                            className='font-medium sm:text-lg text-base'
                        >
                            What is your desired job title?<span className='text-orange-600 ml-1'>*</span>
                            <input
                                defaultValue={seekerInfo?.seekerTitle}
                                id='seekerTitle'
                                type="text" required
                                placeholder="Your desired job title"
                                className="input font-normal h-11 text-base bg-slate-100 w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md"
                            />
                        </label>
                    </div>
                    <div className='mt-5'>
                        <label
                            htmlFor='seekerAbout'
                            className='font-medium sm:text-lg text-base'
                        >About
                            <textarea
                                defaultValue={seekerInfo?.seekerAbout}
                                rows="7" cols=""
                                id='seekerAbout'
                                placeholder='Describe yourself'
                                className='text-base font-normal bg-slate-100 w-full mt-2 p-2 border rounded-md border-gray-200 focus:outline-0 focus:shadow-md'
                            ></textarea>
                        </label>
                    </div>
                    <div className='mt-10 flex sm:flex-row flex-col-reverse justify-between gap-4'>
                        <div
                            onClick={() => navigate(-1)}
                            className='sm:w-max w-full btn btn-outline btn-primary px-6 gap-2 normal-case sm:text-lg text-base hover:text-white h-11 min-h-0'
                        >
                            <ChevronLeftIcon className='w-6 h-6 inline-block' /> Back
                        </div>
                        <button
                            type='submit'
                            className='sm:w-max w-full btn btn-primary px-6 normal-case sm:text-lg text-base text-white h-11 min-h-0'
                        >
                            Save and continue
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </>);
};

export default SeekerAboutForm;