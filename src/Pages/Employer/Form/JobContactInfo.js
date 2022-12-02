import { ChevronLeftIcon } from '@heroicons/react/solid';
import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import useGetUsers from '../../../hooks/useGetUsers';
import PageTitle from '../../Shared/PageTitle';
import Spinner from '../../Shared/Spinner';

const JobContactInfo = () => {
    const setStep = useOutletContext();
    setStep(0);
    const [usersData] = useGetUsers();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [storeData, setStoreData] = useState({});

    const jobTitleRef = useRef();
    const companyRef = useRef();
    const workplaceRef = useRef();
    const jobLocationRef = useRef();
    const empQuantityRef = useRef();
    const empTypeRef = useRef();

    useEffect(() => {
        const jobContact = JSON.parse(localStorage.getItem('jobContact'));
        setStoreData(jobContact);
    }, []);


    // ===================Scrolling top===================
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);


    // =======================Submit button=======================
    const handleContact = async event => {
        event.preventDefault();
        setLoading(true)
        const jobTitle = jobTitleRef.current.value;
        const company = companyRef.current.value;
        const workplace = workplaceRef.current.value;
        const jobLocation = jobLocationRef.current.value;
        const empQuantity = empQuantityRef.current.value || '';
        const empType = empTypeRef.current.value;

        localStorage.setItem('jobContact', JSON.stringify({
            jobTitle,
            company,
            workplace,
            jobLocation,
            empQuantity,
            empType
        }));

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
                    navigate('/job-form/description');
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
        <div className='w-full bg-accent'>
            <h1 className='text-center md:text-4xl sm:text-3xl text-2xl font-semibold my-5 text-white'>Find a great hire, fast</h1>
            <div className='2xl:w-[900px] lg:w-1/2 md:w-2/3 sm:w-4/5 w-11/12 mx-auto glass sm:px-10 px-5 sm:py-8 py-5 h-max sm:mt-8 mb-10 rounded-xl border shadow-lg'>
                <form onSubmit={handleContact}>
                    <div>
                        <div>
                            <label
                                htmlFor='jobTitle'
                                className='font-medium sm:text-lg text-base'
                            >
                                Job Title
                                <span className='text-orange-600 ml-1'>*</span>
                            </label>
                            <input
                                required
                                ref={jobTitleRef}
                                defaultValue={storeData?.jobTitle}
                                type="text" id='jobTitle'
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
                                defaultValue={storeData?.company}
                                id='company' type="text"
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
                                className="select w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md h-11 min-h-0"
                            >
                                <option value="" >Select type</option>
                                <option
                                    title='Employees come to work in-person.'
                                    value='On-site'
                                    selected={storeData?.workplace === 'On-site'}
                                >
                                    On-site
                                </option>
                                <option
                                    title='Employees work on-site and off-site.'
                                    value='Hybrid'
                                    selected={storeData?.workplace === 'Hybrid'}
                                >
                                    Hybrid
                                </option>
                                <option
                                    title='Employees work off-site.'
                                    value='Remote'
                                    selected={storeData?.workplace === 'Remote'}
                                >
                                    Remote
                                </option>
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
                                id='jobLocation'
                                ref={jobLocationRef}
                                defaultValue={storeData?.jobLocation}
                                required type="text"
                                placeholder="Job Location"
                                className="input h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md"
                            />
                        </div>
                        <div className='mt-5'>
                            <label htmlFor='quantity' className='font-medium sm:text-lg text-base'>Employees quantity</label>
                            <input
                                id='quantity'
                                ref={empQuantityRef}
                                defaultValue={storeData?.empQuantity}
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
                                className="select w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md min-h-0 h-11"
                            >
                                <option value="">Select type</option>
                                <option
                                    value='Full-time'
                                    selected={storeData?.empType === 'Full-time'}
                                >
                                    Full-time
                                </option>
                                <option
                                    value='Part-time'
                                    selected={storeData?.empType === 'Part-time'}
                                >
                                    Part-time
                                </option>
                                <option
                                    value='Internship'
                                    selected={storeData?.empType === 'Internship'}
                                >
                                    Internship
                                </option>
                                <option
                                    value='Contract'
                                    selected={storeData?.empType === 'Contract'}
                                >
                                    Contract
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className='flex sm:flex-row flex-col-reverse justify-between gap-4 mt-10'>
                        <div
                            onClick={() => navigate(-1)}
                            className='sm:w-max w-full btn btn-outline text-white hover:text-accent hover:bg-white border-white normal-case text-lg gap-2 px-5 h-11 min-h-0'
                        >
                            <ChevronLeftIcon className='w-6 h-6 inline-block' /> Back
                        </div>
                        <button
                            type='submit'
                            disabled={loading}
                            className='sm:w-max w-full btn btn-outline  text-accent hover:text-white bg-white hover:bg-transparent border-white sm:px-10 px-6 normal-case text-lg h-11 min-h-0'
                        >
                            {
                                loading ? <Spinner className='px-14' /> : 'Save and continue'
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </>
    );
};

export default JobContactInfo;