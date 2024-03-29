import { XIcon } from '@heroicons/react/solid';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../Shared/Spinner';

const PostInfoForm = ({ setOpenInfoForm, data }) => {
    const {
        _id,
        jobTitle,
        company,
        workplace,
        jobLocation,
        empQuantity,
        empType,
        salary,
        receiveEmail
    } = data;

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();


    // Update post info button
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const jobTitle = e.target.jobTitle.value;
        const company = e.target.company.value;
        const workplace = e.target.workplace.value;
        const jobLocation = e.target.location.value;
        const empQuantity = e.target.empQuantity.value;
        const empType = e.target.empType.value;
        const salary = e.target.salary.value;
        const permission = false;

        await axios.put(`https://api.enlistco.co.in/update_post/${_id}?postInfo=true`,
            { jobTitle, company, workplace, jobLocation, empQuantity, empType, salary, permission },
            {
                method: 'PUT',
                headers: {
                    'Authorization': localStorage.getItem('user_token')
                }
            })
            .then((res) => {
                if (res) {
                    setLoading(false);
                    setOpenInfoForm(false);
                }
            })
            .catch(err => {
                const { logout, message } = err.response.data;
                setLoading(false);
                setErrorMsg(message);
                if (logout) {
                    setLoading(false);
                    localStorage.removeItem('user_token');
                    return navigate('/login');
                }
            });
    };

    return (
        <div className='fixed top-0 left-0 w-full h-screen flex justify-center sm:items-center items-start bg-black/50 z-30 overflow-y-auto scrollBar-sm'>
            <form
                onSubmit={handleSubmit}
                className='xl:w-1/2 lg:w-3/5 sm:w-4/5 w-full mx-2 sm:my-0 my-10 bg-white sm:p-8 p-5 rounded-md relative'
            >
                <div
                    onClick={() => setOpenInfoForm(false)}
                    className='absolute top-5 sm:right-5 right-4 w-max p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-600 duration-300 cursor-pointer'
                >
                    <XIcon className='w-7 h-7'></XIcon>
                </div>
                <h1 className='text-2xl font-medium text-center'>Update post information</h1>
                <ul className='list-none mt-8'>
                    <li className='mt-2 text-base font-medium sm:flex sm:gap-24 sm:items-center'>
                        <label htmlFor="jobTitle">
                            Job Title<span className='text-orange-600 ml-px text-lg'>*</span> :
                        </label>
                        <input
                            defaultValue={jobTitle}
                            required
                            id='jobTitle'
                            type="text"
                            placeholder="Enter job title"
                            className="input bg-slate-100 font-normal h-11 text-base md:w-96 sm:w-72 w-full border border-gray-200 focus:outline-0 focus:shadow-md"
                        />
                    </li>
                    <li className='mt-2 text-base font-medium sm:flex sm:gap-10 sm:items-center'>
                        <label htmlFor="company">
                            Company Name<span className='text-orange-600 ml-px text-lg'>*</span> :
                        </label>
                        <input
                            defaultValue={company}
                            required
                            id='company'
                            type="text"
                            placeholder="Company name"
                            className="input bg-slate-100 font-normal h-11 text-base md:w-96 sm:w-72 w-full border border-gray-200 focus:outline-0 focus:shadow-md"
                        />
                    </li>
                    <li className='mt-2 text-base font-medium sm:flex sm:gap-20 sm:items-center'>
                        <label htmlFor="workplace">
                            Workplace<span className='text-orange-600 ml-px text-lg'>*</span> :
                        </label>
                        <select
                            required
                            id='workplace'
                            className="select bg-slate-100 xl:w-96 sm:w-max w-full min-h-0 h-11 border border-gray-200 focus:outline-0 focus:shadow-md"
                        >
                            <option value="">Select type</option>
                            <option
                                value='On-site'
                                selected={workplace === 'On-site'}
                            > On-site
                            </option>
                            <option
                                value='Hybrid'
                                selected={workplace === 'Hybrid'}
                            >Hybrid
                            </option>
                            <option
                                value='Remote'
                                selected={workplace === 'Remote'}
                            >Remote
                            </option>
                        </select>
                    </li>
                    <li className='mt-2 text-base font-medium sm:flex sm:gap-16 sm:items-center'>
                        <label htmlFor="location">
                            Job Location<span className='text-orange-600 ml-px text-lg'>*</span> :
                        </label>
                        <input
                            defaultValue={jobLocation}
                            required
                            id='location'
                            type="text"
                            placeholder="Job location"
                            className="input bg-slate-100 h-11 text-base font-normal md:w-96 sm:w-72 w-full border border-gray-200 focus:outline-0 focus:shadow-md"
                        />
                    </li>
                    <li className='mt-2 text-base font-medium sm:flex sm:gap-6 sm:items-center'>
                        <label htmlFor="empQuantity">
                            Employees quantity :
                        </label>
                        <input
                            defaultValue={empQuantity}
                            id='empQuantity'
                            type="number"
                            placeholder="How many employees want to hire?"
                            className="input bg-slate-100 h-11 text-base font-normal md:w-96 sm:w-72 w-full border border-gray-200 focus:outline-0 focus:shadow-md"
                        />
                    </li>
                    <li className='mt-2 text-base font-medium sm:flex sm:gap-7 sm:items-center'>
                        <label htmlFor="empType">
                            Employment type<span className='text-orange-600 ml-px text-lg'>*</span> :
                        </label>
                        <select
                            required
                            id='empType'
                            className="select bg-slate-100 xl:w-96 sm:w-max w-full min-h-0 h-11 border border-gray-200 focus:outline-0 focus:shadow-md"
                        >
                            <option value="">Select type</option>
                            <option
                                value='Full-time'
                                selected={empType === 'Full-time'}
                            >Full-time
                            </option>
                            <option
                                value='Part-time'
                                selected={empType === 'Part-time'}
                            >Part-time
                            </option>
                            <option
                                value='Internship'
                                selected={empType === 'Internship'}
                            >Internship
                            </option>
                            <option
                                value='Contract'
                                selected={empType === 'Contract'}
                            >Contract
                            </option>
                        </select>
                    </li>
                    <li className='mt-2 text-base font-medium sm:flex sm:gap-28 sm:items-center'>
                        <label htmlFor="salary">Salary :</label>
                        <input
                            defaultValue={salary}
                            id='salary'
                            type="text"
                            placeholder="Enter amount, ex: $150,000 per year"
                            className="sm:ml-2 input bg-slate-100 h-11 text-base font-normal md:w-96 sm:w-72 w-full border border-gray-200 focus:outline-0 focus:shadow-md"
                        />
                    </li>
                    <li className='mt-8 text-lg text-center'>
                        {
                            errorMsg &&
                            <p className='text-base text-red-600 mt-2'>{errorMsg}</p>
                        }
                        <button
                            type='submit'
                            disabled={loading}
                            className='btn btn-outline btn-accent normal-case text-base px-16 min-h-0 h-11 sm:w-max w-full hover:text-white'
                        >
                            {
                                loading ? <Spinner className={'px-2'} /> : 'Update'
                            }
                        </button>
                    </li>
                </ul>
            </form>
        </div>
    );
};

export default PostInfoForm;