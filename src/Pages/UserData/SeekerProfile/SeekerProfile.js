import { AcademicCapIcon, BookOpenIcon, BriefcaseIcon, CheckCircleIcon, ClockIcon, HomeIcon, LocationMarkerIcon, MailIcon, OfficeBuildingIcon, PhoneIcon, PlusIcon } from '@heroicons/react/solid';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import CountryList from '../../Shared/CountryList';
import Spinner from '../../Shared/Spinner';
import schoolIcon from '../../../images/icons/school.png';
import studyingIcon from '../../../images/icons/studying.png';
import companyIcon from '../../../images/icons/company.png';
import dutyIcon from '../../../images/icons/duty.png';

const SeekerProfile = ({ user }) => {
    const [editPData, setEditPData] = useState(false);
    const [addEduData, setAddEduData] = useState(false);
    const [addJobExp, setAddJobExp] = useState(false);
    const [updateResume, setUpdateResume] = useState(true);
    const [studying, setStudying] = useState(false);
    const [currentWork, setCurrentWork] = useState(false);
    const [loading, setLoading] = useState(false);
    const [personalLoading, setPersonalLoading] = useState(false);
    const [eduLoading, setEduLoading] = useState(false);
    const [resumeLoading, setResumeLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');

    const { _id,
        firstName,
        lastName,
        email,
        phone,
        address,
        state,
        country,
        zip,
        education,
        jobExperience,
        resume,
        seekerAbout
    } = user;
    const exJobTitle = jobExperience && jobExperience[jobExperience.length - 1]?.exJobTitle;

    useEffect(() => {
        if (successMsg) {
            setTimeout(() => {
                setSuccessMsg('')
            }, 3000);
        };
    }, [successMsg]);

    // Update personal data
    const updatePersonalData = async e => {
        e.preventDefault();
        setPersonalLoading(true);
        const firstName = e.target.firstName.value;
        const lastName = e.target.lastName.value;
        const phone = e.target.phone.value;
        const address = e.target.address.value;
        const state = e.target.state.value;
        const country = e.target.country.value;
        const zip = e.target.zip.value;
        const seekerAbout = e.target.about.value;

        await axios.put(`https://api.enlistco.co.in/users-data/${_id}`, {
            firstName, lastName, phone, address, state, country, zip, seekerAbout
        })
            .then((res) => {
                if (res) {
                    setSuccessMsg('Data update successfully.')
                    setPersonalLoading(false);
                    setEditPData(!editPData);
                }
            })
            .catch(err => { setPersonalLoading(false) });
    };

    // Add new education
    const handleAddEdu = async e => {
        e.preventDefault();
        setEduLoading(true);
        const degree = e.target.degree.value;
        const institution = e.target.institution.value;
        const edugroup = e.target.group.value;
        const eduStartDate = e.target.eduStartDate.value;
        const checkbox = e.target.checkbox.checked;
        let eduEndDate;
        let eduStudying;
        if (!checkbox) {
            eduEndDate = e.target.eduEndDate.value;
            eduStudying = '';
        }
        else {
            eduStudying = 'Currently Studying';
            eduEndDate = ''
        };
        const education = { degree, institution, edugroup, eduStartDate, eduEndDate, eduStudying };

        await axios.put(`https://api.enlistco.co.in/add-edu/${_id}`, education)
            .then(res => {
                setEduLoading(false);
                setAddEduData(!addEduData);
                setSuccessMsg('Education add successfully.')
            })
            .catch(err => {
                setEduLoading(false);
            });
    };

    // Delete an education
    const handleDeleteEdu = async edu => {
        setLoading(true);
        await axios.patch(`https://api.enlistco.co.in/delete-edu/${_id}`, { edu })
            .then(res => {
                setLoading(false);
                setSuccessMsg('Education remove successfully.');
            })
            .catch(err => {
                setLoading(false);
            });
    };

    // Add new Job experience
    const handleAddJobExp = async e => {
        e.preventDefault();
        const exJobTitle = e.target.exJobTitle.value;
        const exCompany = e.target.exCompany.value;
        const exStartDate = e.target.exStartDate.value;
        const Working = e.target.checkbox.checked;
        const exResponsibilities = e.target.exResponsibilities.value;
        let exEndDate;
        let exWorking;
        if (!Working) {
            exEndDate = e.target.exEndDate.value;
            exWorking = '';
        }
        else {
            exWorking = 'Currently Working';
            exEndDate = ''
        };

        const jobExperience = { exJobTitle, exCompany, exStartDate, exEndDate, exWorking, exResponsibilities };

        await axios.put(`https://api.enlistco.co.in/add-jobexp/${_id}`, jobExperience)
            .then(res => {
                setLoading(false);
                setAddJobExp(!addJobExp);
                setSuccessMsg('Job experience add successfully.')
            })
            .catch(err => {
                setLoading(false);
            });
    };

    // Delete a Job experience
    const handleDeleteJobExp = async ex => {
        setLoading(true);
        await axios.patch(`https://api.enlistco.co.in/delete-jobexp/${_id}`, { ex })
            .then(res => {
                setLoading(false);
                setSuccessMsg('A job experience remove successfully.');
            })
            .catch(err => {
                setLoading(false);
            });
    };


    // Upload resume
    const handleResumeUpload = async (e) => {
        e.preventDefault();
        setResumeLoading(true);

        // ---------resume url generate----------
        const resumeFile = e.target.resume.files[0];

        let resumeURL;
        if (resumeFile) {
            const pdf = new FormData();
            pdf.append('file', resumeFile);
            pdf.append('upload_preset', 'resume');

            resumeURL = await axios.post("https://api.cloudinary.com/v1_1/job-portal/upload", pdf);
        };
        const resume = resumeURL.data.secure_url;

        // Send data to database
        await axios.put(`https://api.enlistco.co.in/user-resume/${_id}`, { resume })
            .then((res) => {
                if (res) {
                    setResumeLoading(false);
                    setSuccessMsg('Resume upload successfully.');
                }
            })
            .catch(err => { setResumeLoading(false) });
    };


    return (
        <div>
            <div className={`fixed top-20 ${successMsg ? 'right-10' : '-right-96'} z-10 duration-300 bg-white flex items-center py-3 px-5 border rounded-lg shadow-md`}>
                <CheckCircleIcon className='w-7 h-7 text-success mr-2'></CheckCircleIcon>
                <p className='text-success text-base'>{successMsg}</p>
            </div>
            {
                loading &&
                <div className='sticky bg-black/20 z-50 top-0 left-0 h-screen w-full flex items-center justify-center'>
                    <Spinner></Spinner>
                </div>
            }

            {/* ======================Seeker about====================== */}
            <div className='bg-white md:w-4/5 sm:w-11/12 w-full mx-auto mb-5 sm:p-8 p-4 shadow-md border rounded-md'>
                <div>
                    <h1 className='text-center md:text-3xl sm:text-2xl text-xl font-medium'>{firstName} {lastName}</h1>
                    <h2 className='text-center sm:text-xl text-lg'>{exJobTitle}</h2>
                </div>
                <div className='w-full mt-5 relative'>
                    <div onClick={() => setEditPData(!editPData)} className='absolute cursor-pointer hover:text-accent duration-300 sm:top-0 -top-6  right-0 flex items-center text-lg text-primary w-max px-2'>
                        {
                            editPData ?
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                :
                                <><span className='mr-2'>Edit</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                                    </svg>
                                </>
                        }
                    </div>
                    {
                        editPData ?
                            <form onSubmit={updatePersonalData}>
                                <ul>
                                    <li className='mt-2 text-base flex'>
                                        <div className='font-medium flex items-center gap-3'>
                                            <MailIcon className='w-6 h-6 text-gray-500'></MailIcon>
                                            Email :
                                        </div>
                                        <span className='ml-2'>{email}</span>
                                    </li>
                                    <li className='mt-2 text-base font-medium sm:flex sm:gap-2 sm:items-center'>
                                        <label htmlFor="firstName">First Name :</label>
                                        <input
                                            required
                                            id='firstName'
                                            type="text"
                                            placeholder="Your first name"
                                            className="input bg-slate-100 font-normal h-11 text-base sm:w-96 w-full border border-gray-200 focus:outline-0 focus:shadow-md"
                                        />
                                    </li>
                                    <li className='mt-2 text-base font-medium sm:flex sm:gap-2 sm:items-center'>
                                        <label htmlFor="lastName">Last Name :</label>
                                        <input
                                            required
                                            id='lastName'
                                            type="text"
                                            placeholder="Your last name"
                                            className="input bg-slate-100 font-normal h-11 text-base sm:w-96 w-full border border-gray-200 focus:outline-0 focus:shadow-md"
                                        />
                                    </li>
                                    <li className='mt-2 text-base font-medium sm:flex sm:gap-10 sm:items-center'>
                                        <label htmlFor="phone">Phone :</label>
                                        <input
                                            required
                                            id='phone'
                                            type="number"
                                            placeholder="Update your phone number?"
                                            className="input bg-slate-100 font-normal h-11 text-base sm:w-96 w-full border border-gray-200 focus:outline-0 focus:shadow-md"
                                        />
                                    </li>
                                    <li className='mt-2 text-base font-medium sm:flex sm:gap-7 sm:items-center'>
                                        <label htmlFor="address">Address :</label>
                                        <input required id='address' type="text" placeholder="Update your address?" className="input bg-slate-100 h-11 text-base font-normal sm:w-96 w-full border border-gray-200 focus:outline-0 focus:shadow-md" />
                                    </li>
                                    <li className='mt-2 text-base font-medium sm:flex sm:gap-4 sm:items-center'>
                                        <label htmlFor="state">City/State :</label>
                                        <input required id='state' type="text" placeholder="City / State" className="input bg-slate-100 h-11 text-base font-normal sm:w-96 w-full border border-gray-200 focus:outline-0 focus:shadow-md" />
                                    </li>
                                    <li className='mt-2 text-base font-medium sm:flex sm:gap-7 sm:items-center'>
                                        <label htmlFor="country">Country :</label>
                                        <select required id='country' className="select bg-slate-100 w-max min-h-0 h-11 border sm:ml-0 ml-2 border-gray-200 focus:outline-0 focus:shadow-md">
                                            <option defaultValue>Select country</option>
                                            <CountryList></CountryList>
                                        </select>
                                    </li>
                                    <li className='mt-2 text-base font-medium sm:flex sm:gap-6 sm:items-center'>
                                        <label htmlFor="zip">Zip code :</label>
                                        <input required id='zip' type="text" placeholder="Update your zip code" className="input bg-slate-100 h-11 text-base sm:w-96 w-full border border-gray-200 focus:outline-0 focus:shadow-md" />
                                    </li>
                                    <li className='mt-4 text-base font-medium sm:flex sm:gap-9 sm:items-start'>
                                        <label htmlFor='about' className='block font-medium sm:text-lg text-base'>About :</label>
                                        <textarea
                                            rows="6"
                                            id='about'
                                            placeholder='Describe yourself'
                                            className='text-base bg-slate-100 md:w-4/5 sm:w-11/12 w-full mt-1 p-2 border rounded-md border-gray-200 focus:outline-0 focus:shadow-md'
                                        ></textarea>
                                    </li>
                                    <li className='mt-8 text-lg text-center'>
                                        <button
                                            type='submit'
                                            disabled={personalLoading}
                                            className='btn btn-outline btn-accent normal-case text-base  px-16 min-h-0 h-10 sm:w-max w-full'
                                        >{
                                                personalLoading ? <Spinner></Spinner> : 'Save'
                                            }
                                        </button>
                                    </li>
                                </ul>
                            </form>
                            :
                            <ul>
                                <li className='mt-2 text-base flex'>
                                    <div className='font-medium flex items-center gap-3'>
                                        <MailIcon className='w-6 h-6 text-gray-500'></MailIcon>
                                        Email :
                                    </div>
                                    <span className='ml-2'>{email}</span>
                                </li>
                                <li className='mt-4 text-base flex'>
                                    <div className='font-medium flex items-center gap-3'>
                                        <PhoneIcon className='w-6 h-6 text-gray-500'></PhoneIcon>
                                        Phone :
                                    </div>
                                    <span className='ml-2'>{phone}</span>
                                </li>
                                <li className='mt-4 text-base flex'>
                                    <div className='font-medium flex items-center gap-3'>
                                        <HomeIcon className='w-6 h-6 text-gray-500'></HomeIcon>
                                        Address :
                                    </div>
                                    <span className='ml-2'>{address}</span>
                                </li>
                                <li className='mt-4 text-base flex'>
                                    <div className='font-medium flex items-center gap-3'>
                                        <OfficeBuildingIcon className='w-6 h-6 text-gray-500'></OfficeBuildingIcon>
                                        City/State :
                                    </div>
                                    <span className='ml-2'>{state}</span>
                                </li>
                                <li className='mt-4 text-base flex'>
                                    <div className='font-medium flex items-center gap-3'>
                                        <LocationMarkerIcon className='w-6 h-6 text-gray-500'></LocationMarkerIcon>
                                        Country :
                                    </div>
                                    <span className='ml-2'>{country}</span>
                                </li>
                                <li className='mt-4 text-base flex'>
                                    <div className='font-medium flex items-center gap-3'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-gray-500">
                                            <path d="M19.5 22.5a3 3 0 003-3v-8.174l-6.879 4.022 3.485 1.876a.75.75 0 01-.712 1.321l-5.683-3.06a1.5 1.5 0 00-1.422 0l-5.683 3.06a.75.75 0 01-.712-1.32l3.485-1.877L1.5 11.326V19.5a3 3 0 003 3h15z" />
                                            <path d="M1.5 9.589v-.745a3 3 0 011.578-2.641l7.5-4.039a3 3 0 012.844 0l7.5 4.039A3 3 0 0122.5 8.844v.745l-8.426 4.926-.652-.35a3 3 0 00-2.844 0l-.652.35L1.5 9.59z" />
                                        </svg>
                                        Zip code :
                                    </div>
                                    <span className='ml-2'>{zip}</span>
                                </li>
                                {
                                    seekerAbout &&
                                    <li className='mt-2'>
                                        <h2 className='text-center font-medium sm:text-xl text-lg my-2'>About You</h2>
                                        <hr />
                                        <p className='p-3'>{seekerAbout}</p>
                                    </li>
                                }
                            </ul>
                    }
                </div>
            </div>


            {/* ======================Seeker Education====================== */}
            <div className='bg-white md:w-4/5 sm:w-11/12 w-full mx-auto mb-5 sm:p-8 p-4 shadow-md border rounded-md'>
                <h1 className='text-center md:text-3xl sm:text-2xl text-xl font-medium'>Education</h1>
                <div className='mt-5 relative'>
                    {
                        education?.map((edu, index) =>
                            <ul key={index} className='border-t mb-5 relative'>
                                <span
                                    onClick={() => handleDeleteEdu(edu)}
                                    className='absolute top-5 right-0 cursor-pointer text-gray-500 hover:text-red-500 duration-300 hover:before:content-["Remove"] hover:before:text-sm hover:before:bg-slate-200 hover:before:absolute hover:before:-bottom-9 hover:before:-right-5 hover:before:px-2 hover:before:py-1 hover:before:rounded'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </span>
                                <li className='mt-4 text-base flex'>
                                    <div className='font-medium flex items-center gap-3'>
                                        <AcademicCapIcon className='w-6 h-6 text-gray-500'></AcademicCapIcon>
                                        Degree :
                                    </div>
                                    <span className='ml-2'>{edu.degree}</span>
                                </li>
                                <li className='mt-4 text-base flex'>
                                    <div className='font-medium flex items-center gap-3'>
                                        <img className='w-6 h-6' src={schoolIcon} alt="school icon" />
                                        Institution :
                                    </div>
                                    <span className='ml-2'>{edu.institution}</span>
                                </li>
                                <li className='mt-4 text-base flex'>
                                    <div className='font-medium flex items-center gap-3'>
                                        <BookOpenIcon className='w-6 h-6 text-gray-500'></BookOpenIcon>
                                        Subject/Group :
                                    </div>
                                    <span className='ml-2'>{edu.edugroup}</span>
                                </li>
                                <li className='mt-4 text-base flex'>
                                    <div className='font-medium flex items-center gap-3'>
                                        <ClockIcon className='w-6 h-6 text-gray-500'></ClockIcon>
                                        Start Date :
                                    </div>
                                    <span className='ml-2'>{edu.eduStartDate}</span>
                                </li>
                                {
                                    edu.eduEndDate ?
                                        <li className='mt-4 text-base flex'>
                                            <div className='font-medium flex items-center gap-3'>
                                                <CheckCircleIcon className='w-6 h-6 text-gray-500'></CheckCircleIcon>
                                                End Date :
                                            </div>
                                            <span className='ml-2'>{edu.eduEndDate}</span>
                                        </li>
                                        :
                                        <li className='mt-4 text-base flex'>
                                            <div className='font-medium flex items-center gap-3'>
                                                <img className='w-6 h-6' src={studyingIcon} alt="studying icon" />
                                                {edu.eduStudying}
                                            </div>
                                        </li>
                                }
                            </ul>)
                    }
                    {
                        !addEduData &&
                        <div className='w-full'>
                            <button onClick={() => setAddEduData(!addEduData)} className='btn btn-link text-accent normal-case text-lg px-0 tracking-wide'>
                                <PlusIcon className='w-6 h-6 mr-2'></PlusIcon>
                                Add new Education</button>
                        </div>
                    }
                    {
                        addEduData &&
                        <div className='xl:w-4/6 lg:w-9/12 md:w-4/5 w-full mx-auto bg-white h-max mt-10 pt-5 rounded-xl border-t'>
                            <h1 className='text-center text-2xl font-semibold mb-5'>Add another Education</h1>
                            <form onSubmit={handleAddEdu}>
                                <div>
                                    <label htmlFor='degree' className='font-medium text-base'>Degree<span className='text-orange-600 ml-1'>*</span></label>
                                    <input id='degree' required type="text" placeholder="Enter your degree" className="input bg-slate-100 h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                                </div>
                                <div className='mt-5'>
                                    <label htmlFor='institution' className='font-medium text-base'>Institution<span className='text-orange-600 ml-1'>*</span></label>
                                    <input id='institution' required type="text" placeholder="Enter your institution name" className="input bg-slate-100 h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                                </div>
                                <div className='mt-5'>
                                    <label htmlFor='group' className='font-medium text-base'>Subject/Group<span className='text-orange-600 ml-1'>*</span></label>
                                    <input id='group' required type="text" placeholder="Enter your subject / group?" className="input bg-slate-100 h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                                </div>
                                <div className='flex sm:justify-between sm:gap-5 sm:flex-row flex-col'>
                                    <div className='mt-5'>
                                        <label htmlFor='eduStartDate' className='font-medium text-base'>Start date<span className='text-orange-600 ml-1'>*</span></label>
                                        <input id='eduStartDate' required type="date" className="input bg-slate-100 h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                                    </div>
                                    {
                                        !studying &&
                                        <div className='mt-5'>
                                            <label htmlFor='eduEndDate' className='font-medium text-base'>End date<span className='text-orange-600 ml-1'>*</span></label>
                                            <input id='eduEndDate' required type='date' className="input bg-slate-100 h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                                        </div>
                                    }
                                </div>
                                <div className='md:mt-5 mt-3 flex items-center'>
                                    <input id='checkbox' onChange={() => setStudying(!studying)} type="checkbox" className="checkbox bg-slate-100" />
                                    <label className='text-base ml-3 cursor-pointer' htmlFor="checkbox">Currently Studying</label>
                                </div>
                                <div className='mt-6 flex sm:flex-row flex-col justify-between gap-4'>
                                    <button
                                        type="submit"
                                        disabled={eduLoading}
                                        className='sm:w-max w-full btn btn-outline btn-accent normal-case text-base  sm:px-16 px-10 min-h-0 h-11'
                                    >
                                        {
                                            eduLoading ? <Spinner></Spinner> : 'Save'
                                        }
                                    </button>
                                    <button
                                        onClick={() => setAddEduData(!addEduData)}
                                        className='sm:w-max w-full btn btn-link sm:px-10 capitalize text-base text-accent hover:text-primary h-11 min-h-0'>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    }
                </div>
            </div>


            {/* ======================Seeker Job Experience====================== */}
            <div className='bg-white md:w-4/5 sm:w-11/12 w-full mx-auto mb-5 sm:p-8 p-4 shadow-md border rounded-md'>
                <h1 className='text-center md:text-3xl sm:text-2xl text-xl font-medium'>Job Experience</h1>
                <div className='mt-5 relative'>
                    {jobExperience &&
                        jobExperience.map((ex, index) =>
                            <ul key={index} className='border-t mb-5 relative'>
                                <span
                                    onClick={() => handleDeleteJobExp(ex)}
                                    className='absolute top-5 right-0 cursor-pointer text-gray-500 hover:text-red-500 duration-300 hover:before:content-["Remove"] hover:before:text-sm hover:before:bg-slate-200 hover:before:absolute hover:before:-bottom-9 hover:before:-right-5 hover:before:px-2 hover:before:py-1 hover:before:rounded'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </span>
                                <li className='mt-4 text-base flex'>
                                    <div className='font-medium flex items-center gap-3'>
                                        <BriefcaseIcon className='w-6 h-6 text-gray-500'></BriefcaseIcon>
                                        Job Title :
                                    </div>
                                    <span className='ml-2'>{ex.exJobTitle}</span>
                                </li>
                                <li className='mt-4 text-base flex'>
                                    <div className='font-medium flex items-center gap-3'>
                                        <img className='w-6 h-6' src={companyIcon} alt="company icon" />
                                        Company :
                                    </div>
                                    <span className='ml-2'>{ex.exCompany}</span>
                                </li>
                                <li className='mt-4 text-base flex'>
                                    <div className='font-medium flex items-center gap-3'>
                                        <ClockIcon className='w-6 h-6 text-gray-500'></ClockIcon>
                                        Start Date :
                                    </div>
                                    <span className='ml-2'>{ex.exStartDate}</span>
                                </li>
                                {
                                    ex.exEndDate ?
                                        <li className='mt-4 text-base flex'>
                                            <div className='font-medium flex items-center gap-3'>
                                                <CheckCircleIcon className='w-6 h-6 text-gray-500'></CheckCircleIcon>
                                                End Date :
                                            </div>
                                            <span className='ml-2'>{ex.exEndDate}</span>
                                        </li>
                                        :
                                        <li className='mt-4 text-base flex'>
                                            <div className='font-medium flex items-center gap-3'>
                                                <BriefcaseIcon className='w-6 h-6 text-gray-500'></BriefcaseIcon>
                                                {ex.exWorking}
                                            </div>
                                        </li>
                                }
                                <li className='mt-4 text-base flex'>
                                    <div className='flex items-start gap-3'>
                                        <img className='w-6 h-6' src={dutyIcon} alt="company icon" />
                                        <div>
                                            <h3 className='font-medium'>Responsibilities :</h3>
                                            <span>{ex.exResponsibilities}</span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        )
                    }
                    {
                        !addJobExp &&
                        <div className='w-full'>
                            <button onClick={() => setAddJobExp(!addJobExp)} className='btn btn-link text-accent normal-case text-lg px-0 tracking-wide'>
                                <PlusIcon className='w-6 h-6 mr-2'></PlusIcon>
                                Add new experience</button>
                        </div>
                    }
                    {
                        addJobExp &&
                        <div className='xl:w-4/6 lg:w-9/12 md:w-4/5 w-full mx-auto bg-white h-max mt-10 pt-5 rounded-xl border-t'>
                            <h1 className='text-center text-2xl font-semibold mb-5'>Add another job experience</h1>
                            <form onSubmit={handleAddJobExp}>
                                <div>
                                    <div>
                                        <label htmlFor='exJobTitle' className='font-medium text-base'>Job title<span className='text-orange-600 ml-1'>*</span></label>
                                        <input id='exJobTitle' required type="text" placeholder="Enter your Job title" className="input h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                                    </div>
                                    <div className='mt-5'>
                                        <label htmlFor='exCompany' className='font-medium text-base'>Company name<span className='text-orange-600 ml-1'>*</span></label>
                                        <input id='exCompany' required type="text" placeholder="Enter company name" className="input h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                                    </div>
                                    <div className='flex sm:justify-between sm:gap-5 sm:flex-row flex-col'>
                                        <div className='mt-5'>
                                            <label htmlFor='exStartDate' className='font-medium text-base'>Start date<span className='text-orange-600 ml-1'>*</span></label>
                                            <input id='exStartDate' required type="date" className="input h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                                        </div>
                                        {
                                            currentWork ? '' :
                                                <div className='mt-5'>
                                                    <label htmlFor='exEndDate' className='font-medium text-base'>End date<span className='text-orange-600 ml-1'>*</span></label>
                                                    <input id='exEndDate' required type='date' className="input h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                                                </div>
                                        }
                                    </div>
                                    <div className='md:mt-5 mt-3 flex items-center'>
                                        <input id='checkbox' onChange={() => setCurrentWork(!currentWork)} type="checkbox" className="checkbox bg-white" />
                                        <label className='text-base ml-3 cursor-pointer' htmlFor="checkbox">Currently Working</label>
                                    </div>
                                    <div className='mt-5'>
                                        <label htmlFor='exResponsibilities' className='font-medium text-base'>Responsibilities</label>
                                        <textarea id='exResponsibilities' rows="3" type="text" placeholder="Describe your responsibilities" className="textarea text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                                    </div>
                                </div>
                                <div className='mt-6 flex sm:flex-row flex-col justify-between gap-4'>
                                    <button
                                        className='btn btn-outline btn-accent normal-case text-base  px-16 min-h-0 h-11 sm:w-max w-full' type="submit">
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setAddJobExp(!addJobExp)}
                                        className='sm:w-max w-full btn btn-link sm:px-10 capitalize text-base text-accent hover:text-primary min-h-0 h-11'>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    }
                </div>
            </div>

            {/* ======================Seeker Resume====================== */}
            {
                updateResume && resume ? <div className='bg-white md:w-4/5 sm:w-11/12 w-full mx-auto mb-5 shadow-md border rounded-md relative'>
                    <span
                        onClick={() => setUpdateResume(!updateResume)}
                        className='absolute top-10 sm:right-10 right-4 text-primary hover:text-accent duration-300 cursor-pointer'
                        title='Update resume'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                            <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                        </svg>
                    </span>
                    <div className='lg:w-4/5 sm:w-11/12 w-full mx-auto mb-10 overflow-y-auto'>
                        <h1 className='text-center my-8 md:text-3xl sm:text-2xl text-xl font-medium'>
                            CV / Resume
                        </h1>
                        <iframe title='Resume' className='w-full h-screen' src={resume}></iframe>
                    </div>
                </div> :
                    <form
                        onSubmit={handleResumeUpload}
                        className='bg-white md:w-4/5 sm:w-11/12 w-full mx-auto sm:p-8 p-4 shadow-md border rounded-md mb-5 relative'>
                        {
                            resume && <span
                                onClick={() => setUpdateResume(!updateResume)}
                                className='absolute top-10 sm:right-10 right-4 text-primary hover:text-accent duration-300 cursor-pointer'
                                title='Update resume'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </span>
                        }
                        <h1 className='text-center mb-10 md:text-3xl sm:text-2xl text-xl font-medium'>
                            Upload your CV / Resume
                        </h1>
                        <div className='flex items-center justify-between w-full border rounded-md '>
                            <input
                                id='resume'
                                required
                                type="file"
                                className="input bg-slate-100 h-11 py-2 text-base w-full border-none border-gray-200 focus:outline-0 hover:shadow-md"
                            />
                            <button
                                type="submit"
                                disabled={resumeLoading}
                                className='btn btn-accent min-h-0 h-11 px-6 text-base hover:text-white normal-case rounded-l-none rounded-r-md'
                            >
                                {resumeLoading ? <Spinner></Spinner> : "Upload"}
                            </button>
                        </div>
                    </form>
            }
        </div>
    );
};

export default SeekerProfile;