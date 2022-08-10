import React, { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import PageTitle from '../../Shared/PageTitle';
import Spinner from '../../Shared/Spinner';

const EmployerContact = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const jobTitleRef = useRef();
    const companyRef = useRef();
    const workplaceRef = useRef();
    const jobLocationRef = useRef();
    const empQuantityRef = useRef();
    const empTypeRef = useRef();

    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (token) {
            navigate('/employer-form/job-description');
        }
    }, [token, navigate]);


    const hanleContact = async event => {
        event.preventDefault();
        setLoading(true)
        const jobTitle = jobTitleRef.current.value;
        const company = companyRef.current.value;
        const workplace = workplaceRef.current.value;
        const jobLocation = jobLocationRef.current.value;
        const empQuantity = empQuantityRef.current.value;
        const empType = empTypeRef.current.value;

        localStorage.setItem('employerContact', JSON.stringify({ jobTitle, company, workplace, jobLocation, empQuantity, empType }));
        const employer = true;
        const email = user.email;

        await fetch(`https://boiling-beach-14928.herokuapp.com/users/${email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email, employer })
        })
            .then(res => res.json())
            .then(data => {
                const accessToken = data.token;
                localStorage.setItem('accessToken', accessToken);
                setToken(accessToken)
            });
        setLoading(false);
    };
    return (<>
        <PageTitle title='Contact Form - Dashboard'></PageTitle>
        <div className="flex justify-center bg-accent py-5">
            <div className='w-full'>
                <h1 className='text-center md:text-4xl sm:text-3xl text-2xl font-semibold my-5 text-white'>Find a great hire, fast</h1>
                <div className='xl:w-2/5 lg:w-1/2 md:w-2/3 sm:w-4/5 w-11/12 mx-auto glass sm:px-10 px-5 sm:py-8 py-5 h-max sm:mt-8 mb-10 rounded-xl border shadow-lg'>
                    <form onSubmit={hanleContact}>
                        <div>
                            <div>
                                <label htmlFor='jobTitle' className='font-medium sm:text-lg text-base'>Job Title<span className='text-orange-600 ml-1'>*</span></label>
                                <input ref={jobTitleRef} id='jobTitle' required type="text" placeholder="Enter job title" className="input h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                            </div>
                            <div className='mt-5'>
                                <label htmlFor='company' className='font-medium sm:text-lg text-base'>Company Name<span className='text-orange-600 ml-1'>*</span></label>
                                <input ref={companyRef} id='company' required type="text" placeholder="Enter company name" className="input h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                            </div>
                            <div className='mt-5'>
                                <label htmlFor='workplace' className='font-medium sm:text-lg text-base'>Workplace type<span className='text-orange-600 ml-1'>*</span></label>
                                <select ref={workplaceRef} id='workplace' className="select w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md">
                                    <option selected defaultValue disabled>Select type</option>
                                    <option title='Employees come to work in-person.'>On-site</option>
                                    <option title='Employees work on-site and off-site.'>Hybrid</option>
                                    <option title='Employees work off-site.'>Remote</option>
                                </select>
                            </div>
                            <div className='mt-5'>
                                <label htmlFor='jobLocation' className='font-medium sm:text-lg text-base'>Job Location<span className='text-orange-600 ml-1'>*</span></label>
                                <input ref={jobLocationRef} id='jobLocation' required type="text" placeholder="Job Location" className="input h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                            </div>
                            <div className='mt-5'>
                                <label htmlFor='quantity' className='font-medium sm:text-lg text-base'>Employees quantity<span className='text-orange-600 ml-1'>*</span></label>
                                <input ref={empQuantityRef} id='quantity' required type="number" placeholder="How many employees want to hire?" className="input h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                            </div>
                            <div className='mt-5'>
                                <label htmlFor='employment' className='font-medium sm:text-lg text-base'>Employment type<span className='text-orange-600 ml-1'>*</span></label>
                                <select ref={empTypeRef} id='employment' className="select w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md">
                                    <option selected defaultValue disabled>Select type</option>
                                    <option>Full-time</option>
                                    <option>Part-time</option>
                                    <option>Internship</option>
                                    <option>Contract</option>
                                </select>
                            </div>
                        </div>
                        <div className='mt-6 flex sm:justify-center'>
                            <button
                                type='submit'
                                disabled={loading}
                                className='sm:w-max w-full btn btn-outline hover:btn-accent sm:px-10 px-6 normal-case sm:text-lg text-base text-white'>{
                                    loading ? <Spinner></Spinner> : 'Save and continue'
                                }</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
    );
};

export default EmployerContact;