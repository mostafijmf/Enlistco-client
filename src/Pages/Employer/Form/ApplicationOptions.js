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

    const emailRef = useRef();
    const salaryRef = useRef();

    const [skillTags, setskillTags] = useState([]);

    // Add skill
    const addskillTags = () => {
        if (skillRef.current.value) {
            setskillTags([...skillTags, skillRef.current.value])
        }
    };
    const removeskillTags = indexToRemove => {
        setskillTags(skillTags.filter((_, index) => index !== indexToRemove))
    };

    // Handle form
    const handleApplication = async event => {
        event.preventDefault();
        setLoading(true);

        const receiveEmail = emailRef.current.value;
        const salary = salaryRef.current.value;
        const postOptions = { receiveEmail, salary, skillTags };
        const employerContact = JSON.parse(localStorage.getItem('employerContact'));
        const jobDescription = JSON.parse(localStorage.getItem('jobDescription'));
        const email = user.email;

        await axios.post('https://boiling-beach-14928.herokuapp.com/post', {
            postOptions, employerContact, jobDescription, email
        })
            .then(res => {
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
            });

        localStorage.removeItem('employerContact');
        localStorage.removeItem('jobDescription');
        setOpenModal(true);
    };

    return (<>
        <PageTitle title='Submit Form - Dashboard'></PageTitle>
        <div className="flex justify-center items-center bg-slate-100 h-screen">
            <div className='w-full'>
                <div className='lg:w-2/5 md:w-3/5 sm:w-4/5 w-11/12 mx-auto bg-white sm:px-10 px-5 sm:py-8 py-5 h-max sm:mt-8 mb-10 rounded-xl border shadow-lg'>
                    <form onSubmit={handleApplication}>
                        <div>
                            <div>
                                <label htmlFor='jobTitle' className='font-medium sm:text-lg text-base'>Provide an email to receive your applicants.<span className='text-orange-600 ml-1'>*</span></label>
                                <input ref={emailRef} required id='jobTitle' type="email" placeholder="Enter an email" className="input h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
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
                        <div className='mt-10 flex sm:justify-center'>
                            <button
                                type='submit'
                                disabled={loading}
                                className='sm-w-max w-full btn btn-accent sm:px-10 px-5 normal-case sm:text-lg text-base text-white h-11 min-h-0'>
                                {
                                    loading ? <Spinner></Spinner> : 'Submit'
                                }
                            </button>
                            {
                                openModal &&
                                <div className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center bg-black/50">
                                    <div className="modal-box">
                                        <h3 className="font-medium text-2xl text-green-500">Congratulations for your job post!</h3>
                                        <p className="text-lg py-4">This post has gone under review.</p>
                                        <div className="modal-action">
                                            <button onClick={() => navigate('/')} className="btn text-white capitalize">Go to home</button>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
    );
};

export default ApplicationOptions;