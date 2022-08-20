import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import PageTitle from '../../Shared/PageTitle';
import Spinner from '../../Shared/Spinner';

const UserEducation = () => {
    const [user] = useAuthState(auth);
    const [studying, setStudying] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const degreeRef = useRef('');
    const institutionRef = useRef('');
    const groupRef = useRef('');
    const startDateRef = useRef('');
    const studyingRef = useRef('');
    const resumeRef = useRef('');

    const hanleEducation = async event => {
        event.preventDefault();
        setLoading(true)
        const degree = degreeRef.current.value;
        const institution = institutionRef.current.value;
        const edugroup = groupRef.current.value;
        const eduStartDate = startDateRef.current.value;
        const studying = studyingRef.current.checked;
        const resumeFile = resumeRef.current.files[0];
        const seekerAbout = event.target.about.value;


        // ---------resume url generate----------
        let resumeURL;
        if (resumeFile) {
            const pdf = new FormData();
            pdf.append('file', resumeFile);
            pdf.append('upload_preset', 'resume');

            resumeURL = await axios.post("https://api.cloudinary.com/v1_1/job-portal/upload", pdf);
        };
        const resume = resumeURL.data.secure_url;

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
        const education = { degree, institution, edugroup, eduStartDate, eduEndDate, eduStudying, resume, seekerAbout };
        const userContact = JSON.parse(localStorage.getItem('userContact'));
        const jobExp = JSON.parse(localStorage.getItem('jobExp'));

        // Send data to database
        const email = user?.email;
        const url = `https://boiling-beach-14928.herokuapp.com/seeker/${email}`;
        await fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ userContact, jobExp, education })
        })
            .then(res => res.json())
            .then(data => { });
        localStorage.removeItem('userContact');
        localStorage.removeItem('jobExp');
        navigate('/');
        setLoading(false)
    };

    return (<>
        <PageTitle title='Education Form - Dashboard'></PageTitle>
        <div className="flex justify-center items-center bg-slate-100">
            <div className='lg:w-1/2 md:w-3/5 sm:w-4/5 w-11/12 bg-white sm:px-10 px-5 sm:py-8 py-5 h-max my-10 rounded-xl border shadow-lg'>
                <h1 className='text-center md:text-4xl sm:text-3xl text-2xl font-semibold mb-5'>Add Education</h1>
                <form onSubmit={hanleEducation}>
                    <div>
                        <div>
                            <label htmlFor='degree' className='font-medium sm:text-lg text-base'>Degree<span className='text-orange-600 ml-1'>*</span></label>
                            <input
                                id='degree'
                                ref={degreeRef}
                                required type="text"
                                placeholder="Ex: Bachelor's"
                                className="input h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md"
                            />
                        </div>
                        <div className='mt-5'>
                            <label htmlFor='institution' className='font-medium sm:text-lg text-base'>Institution<span className='text-orange-600 ml-1'>*</span></label>
                            <input id='institution' ref={institutionRef} required type="text" placeholder="Ex: Oxford University" className="input h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                        </div>
                        <div className='mt-5'>
                            <label htmlFor='group' className='font-medium sm:text-lg text-base'>Subject or Group<span className='text-orange-600 ml-1'>*</span>
                            </label>
                            <input id='group' ref={groupRef} required type="text" placeholder="Ex: Business" className="input h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                        </div>
                        <div className='flex sm:flex-row flex-col justify-between sm:gap-4'>
                            <div className='mt-5'>
                                <label htmlFor='startDate' className='font-medium sm:text-lg text-base'>Start date<span className='text-orange-600 ml-1'>*</span></label>
                                <input id='startDate' ref={startDateRef} required type="date" className="input h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                            </div>
                            {
                                studying ? '' :
                                    <div className='mt-5'>
                                        <label htmlFor='endDate' className='font-medium sm:text-lg text-base'>End date</label>
                                        <input name='endDate' id='endDate' type='date' className="input h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                                    </div>
                            }
                        </div>
                        <div className='md:mt-5 mt-3 flex items-center'>
                            <input id='checkbox' ref={studyingRef} onChange={() => setStudying(!studying)} type="checkbox" className="checkbox bg-white" />
                            <label className='text-base ml-3 cursor-pointer' htmlFor="checkbox">Currently studying</label>
                        </div>
                        <div className='mt-5'>
                            <label htmlFor='file' className='font-medium sm:text-lg text-base'>Upload your resume or cv</label>
                            <input
                                id='file'
                                ref={resumeRef}
                                type="file"
                                required
                                className="input h-10 text-base w-full mt-2 p-1 border border-gray-200 focus:outline-0 focus:shadow-md" />
                        </div>
                        <div className='mt-5'>
                            <label htmlFor='about' className='font-medium sm:text-lg text-base'>About</label>
                            <textarea
                                rows="6" cols=""
                                id='about'
                                placeholder='Describe yourself'
                                className='text-base w-full mt-2 p-2 border rounded-md border-gray-200 focus:outline-0 focus:shadow-md'
                            ></textarea>
                        </div>
                    </div>
                    <div className='mt-6 flex sm:flex-row flex-col-reverse justify-between gap-4'>
                        <button
                            onClick={() => navigate('/')}
                            className='sm:w-max w-full btn btn-outline btn-primary px-10 normal-case sm:text-lg text-base hover:text-white h-11 min-h-0'>
                            Later
                        </button>
                        <button
                            className='sm:w-max w-full btn btn-primary px-6 normal-case sm:text-lg text-base text-white h-11 min-h-0'
                            type="submit">
                            {
                                loading ? <Spinner></Spinner> : 'Submit'
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </>
    );
};

export default UserEducation;