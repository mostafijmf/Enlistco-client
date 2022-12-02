import { XIcon } from '@heroicons/react/solid';
import React from 'react';

const JobInfoForm = ({ setOpenInfoForm, jobContact, appOptions }) => {

    // Update post info button
    const handleSubmit = async (e) => {
        e.preventDefault();
        const jobTitle = e.target.jobTitle.value;
        const company = e.target.company.value;
        const workplace = e.target.workplace.value;
        const jobLocation = e.target.location.value;
        const empQuantity = e.target.empQuantity.value;
        const empType = e.target.empType.value;
        const salary = e.target.salary.value;

        localStorage.setItem('jobContact', JSON.stringify({
            jobTitle,
            company,
            workplace,
            jobLocation,
            empQuantity,
            empType
        }));

        localStorage.setItem('appOptions', JSON.stringify({
            receiveEmail: appOptions.receiveEmail,
            salary,
            skillTags: appOptions.skillTags,
            email: appOptions.email,
            applyType: appOptions.applyType,
            bgCheck: appOptions.bgCheck,
            certification: appOptions.certification,
            drivingLicense: appOptions.drivingLicense,
            drugTest: appOptions.drugTest,
            education: appOptions.education,
            gpa: appOptions.gpa,
            hybridWork: appOptions.hybridWork,
            remoteWork: appOptions.remoteWork,
            workExperience: appOptions.workExperience,
            urgentHiring: appOptions.urgentHiring,
            customQuestion: appOptions.customQuestion,
        }));

        setOpenInfoForm(false);
    };

    return (
        <div className='fixed top-0 left-0 w-full h-screen flex justify-center sm:items-center items-start bg-black/50 z-30 overflow-y-auto scrollBar-sm'>
            <form
                onSubmit={handleSubmit}
                className='2xl:w-[900px] xl:w-1/2 lg:w-3/5 sm:w-4/5 w-full mx-2 sm:my-0 my-10 bg-white sm:p-8 p-5 rounded-md relative'
            >
                <div
                    onClick={() => setOpenInfoForm(false)}
                    className='absolute top-5 sm:right-5 right-4 w-max p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-600 duration-300 cursor-pointer'
                >
                    <XIcon className='w-7 h-7'></XIcon>
                </div>
                <h1 className='text-2xl font-medium text-center'>Update job information</h1>
                <ul className='list-none mt-5'>
                    <li className='mt-2 text-base font-medium sm:flex sm:gap-24 sm:items-center'>
                        <label htmlFor="jobTitle">
                            Job Title<span className='text-orange-600 ml-px text-lg'>*</span> :
                        </label>
                        <input
                            defaultValue={jobContact?.jobTitle}
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
                            defaultValue={jobContact?.company}
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
                                selected={jobContact?.workplace === 'On-site'}
                            > On-site
                            </option>
                            <option
                                value='Hybrid'
                                selected={jobContact?.workplace === 'Hybrid'}
                            >Hybrid
                            </option>
                            <option
                                value='Remote'
                                selected={jobContact?.workplace === 'Remote'}
                            >Remote
                            </option>
                        </select>
                    </li>
                    <li className='mt-2 text-base font-medium sm:flex sm:gap-16 sm:items-center'>
                        <label htmlFor="location">
                            Job Location<span className='text-orange-600 ml-px text-lg'>*</span> :
                        </label>
                        <input
                            defaultValue={jobContact?.jobLocation}
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
                            defaultValue={jobContact?.empQuantity}
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
                                selected={jobContact?.empType === 'Full-time'}
                            >Full-time
                            </option>
                            <option
                                value='Part-time'
                                selected={jobContact?.empType === 'Part-time'}
                            >Part-time
                            </option>
                            <option
                                value='Internship'
                                selected={jobContact?.empType === 'Internship'}
                            >Internship
                            </option>
                            <option
                                value='Contract'
                                selected={jobContact?.empType === 'Contract'}
                            >Contract
                            </option>
                        </select>
                    </li>
                    <li className='mt-2 text-base font-medium sm:flex sm:gap-28 sm:items-center'>
                        <label htmlFor="salary">Salary :</label>
                        <input
                            defaultValue={appOptions?.salary}
                            id='salary'
                            type="text"
                            placeholder="Enter amount, ex: $150,000 per year"
                            className="sm:ml-2 input bg-slate-100 h-11 text-base font-normal md:w-96 sm:w-72 w-full border border-gray-200 focus:outline-0 focus:shadow-md"
                        />
                    </li>
                    <li className='mt-8 text-lg text-center'>
                        <button
                            type='submit'
                            className='btn btn-outline btn-accent normal-case text-lg px-16 min-h-0 h-11 sm:w-max w-full hover:text-white'
                        >
                            Update
                        </button>
                    </li>
                </ul>
            </form>
        </div>
    );
};

export default JobInfoForm;