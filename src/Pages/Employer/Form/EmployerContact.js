import axios from 'axios';
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useGetUsers from '../../../hooks/useGetUsers';
import PageTitle from '../../Shared/PageTitle';
import Spinner from '../../Shared/Spinner';

const EmployerContact = () => {
    const [usersData] = useGetUsers();
    const navigate = useNavigate();
    const jobTitleRef = useRef();
    const companyRef = useRef();
    const workplaceRef = useRef();
    const jobLocationRef = useRef();
    const empQuantityRef = useRef();
    const empTypeRef = useRef();

    const [loading, setLoading] = useState(false);


    // Submit button
    const handleContact = async event => {
        event.preventDefault();
        setLoading(true)
        const jobTitle = jobTitleRef.current.value;
        const company = companyRef.current.value;
        const workplace = workplaceRef.current.value;
        const jobLocation = jobLocationRef.current.value;
        const empQuantity = empQuantityRef.current.value || '';
        const empType = empTypeRef.current.value;

        localStorage.setItem('employerContact', JSON.stringify({ jobTitle, company, workplace, jobLocation, empQuantity, empType }));
        const employer = true;
        const email = usersData?.email;

        await axios.put('https://api.enlistco.co.in/employer_data/update', { email, employer },
            {
                method: 'PUT',
                headers: {
                    'Authorization': localStorage.getItem('user_token')
                }
            })
            .then(res => {
                if (res.data) {
                    setLoading(false);
                    navigate('/employer-form/job-description');
                }
            })
            .catch(err => {
                const { logout, message } = err.response.data;
                setLoading(false);
                if (logout) {
                    setLoading(false);
                    localStorage.removeItem('user_token');
                    return navigate('/login');
                }
            });
    };
    return (<>
        <PageTitle title='Contact Form - Dashboard'></PageTitle>
        <div className="flex justify-center bg-accent py-5">
            <div className='w-full'>
                <h1 className='text-center md:text-4xl sm:text-3xl text-2xl font-semibold my-5 text-white'>Find a great hire, fast</h1>
                <div className='xl:w-2/5 lg:w-1/2 md:w-2/3 sm:w-4/5 w-11/12 mx-auto glass sm:px-10 px-5 sm:py-8 py-5 h-max sm:mt-8 mb-10 rounded-xl border shadow-lg'>
                    <form onSubmit={handleContact}>
                        <div>
                            <div>
                                <label
                                    htmlFor='jobTitle'
                                    className='font-medium sm:text-lg text-base'>
                                    Job Title
                                    <span className='text-orange-600 ml-1'>*</span>
                                </label>
                                <input
                                    required
                                    ref={jobTitleRef}
                                    id='jobTitle'
                                    type="text"
                                    placeholder="Enter job title"
                                    className="input h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md"
                                />
                            </div>
                            <div className='mt-5'>
                                <label
                                    htmlFor='company'
                                    className='font-medium sm:text-lg text-base'>
                                    Company Name
                                    <span className='text-orange-600 ml-1'>*</span>
                                </label>
                                <input
                                    required
                                    ref={companyRef}
                                    id='company'
                                    type="text"
                                    placeholder="Enter company name"
                                    className="input h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md"
                                />
                            </div>
                            <div className='mt-5'>
                                <label
                                    htmlFor='workplace'
                                    className='font-medium sm:text-lg text-base'
                                >
                                    Workplace type
                                    <span className='text-orange-600 ml-1'>*</span>
                                </label>
                                <select
                                    required
                                    ref={workplaceRef}
                                    id='workplace'
                                    className="select w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md"
                                >
                                    <option value="">Select type</option>
                                    <option title='Employees come to work in-person.' value='On-site'>On-site</option>
                                    <option title='Employees work on-site and off-site.' value='Hybrid'>Hybrid</option>
                                    <option title='Employees work off-site.' value='Remote'>Remote</option>
                                </select>
                            </div>
                            <div className='mt-5'>
                                <label
                                    htmlFor='jobLocation'
                                    className='font-medium sm:text-lg text-base'>
                                    Job Location
                                    <span className='text-orange-600 ml-1'>*</span>
                                </label>
                                <input
                                    ref={jobLocationRef}
                                    id='jobLocation'
                                    required
                                    type="text"
                                    placeholder="Job Location"
                                    className="input h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md"
                                />
                            </div>
                            <div className='mt-5'>
                                <label htmlFor='quantity' className='font-medium sm:text-lg text-base'>Employees quantity</label>
                                <input
                                    ref={empQuantityRef}
                                    id='quantity'
                                    type="number"
                                    placeholder="How many employees want to hire?"
                                    className="input h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md"
                                />
                            </div>
                            <div className='mt-5'>
                                <label
                                    htmlFor='employment'
                                    className='font-medium sm:text-lg text-base'
                                >
                                    Employment type
                                    <span className='text-orange-600 ml-1'>*</span>
                                </label>
                                <select
                                    required
                                    ref={empTypeRef}
                                    id='employment'
                                    className="select w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md"
                                >
                                    <option value="">Select type</option>
                                    <option value='Full-time'>Full-time</option>
                                    <option value='Part-time'>Part-time</option>
                                    <option value='Internship'>Internship</option>
                                    <option value='Contract'>Contract</option>
                                </select>
                            </div>
                        </div>
                        <div className='mt-8 flex sm:justify-center'>
                            <button
                                type='submit'
                                disabled={loading}
                                className='w-full btn btn-outline hover:btn-accent sm:px-10 px-6 normal-case sm:text-lg text-base text-white'>{
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