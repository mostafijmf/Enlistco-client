import { CheckCircleIcon, PlusIcon } from '@heroicons/react/solid';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import CountryList from '../../Shared/CountryList';
import Spinner from '../../Shared/Spinner';

const SeekerProfile = ({ user }) => {
    const [editPData, setEditPData] = useState(false);
    const [addEduData, setAddEduData] = useState(false);
    const [addJobExp, setAddJobExp] = useState(false);
    const [studying, setStudying] = useState(false);
    const [currentWork, setCurrentWork] = useState(false);
    const [loading, setLoading] = useState(false);
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
        setLoading(true);
        const phone = e.target.phone.value;
        const address = e.target.address.value;
        const state = e.target.state.value;
        const country = e.target.country.value;
        const zip = e.target.zip.value;

        await axios.patch(`https://boiling-beach-14928.herokuapp.com/users/${_id}`, {
            phone, address, state, country, zip
        })
            .then((res) => {
                if (res) {
                    setSuccessMsg('Data update successfully.')
                    setLoading(false);
                    setEditPData(!editPData);
                }
            })
            .catch(err => { });
    };

    // Add new education
    const handleAddEdu = async e => {
        e.preventDefault();
        setLoading(true);
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

        await axios.put(`https://boiling-beach-14928.herokuapp.com/add-edu/${_id}`, education)
            .then(res => {
                setLoading(false);
                setAddEduData(!addEduData);
                setSuccessMsg('Education add successfully.')
            })
            .catch(err => {
                setLoading(false);
            });
    };

    // Delete an education
    const handleDeleteEdu = async edu => {
        setLoading(true);
        await axios.patch(`https://boiling-beach-14928.herokuapp.com/delete-edu/${_id}`, { edu })
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

        await axios.put(`https://boiling-beach-14928.herokuapp.com/add-jobexp/${_id}`, jobExperience)
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
        await axios.patch(`https://boiling-beach-14928.herokuapp.com/delete-jobexp/${_id}`, { ex })
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
        setLoading(true);

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
        await axios.put(`https://boiling-beach-14928.herokuapp.com/user-resume/${_id}`, { resume })
            .then((res) => {
                if (res) {
                    setLoading(false);
                    setSuccessMsg('Resume upload successfully.');
                    console.log(res.data)
                }
            })
            .catch(err => { setLoading(false) });
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
            <div className='md:w-4/5 sm:w-11/12 w-full mx-auto sm:p-8 p-4 shadow-lg border rounded-md'>
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
                                    <li className='mt-2 text-base font-medium'>Email :
                                        <span className='font-normal ml-2'>{email}</span>
                                    </li>
                                    <li className='mt-2 text-base font-medium'>
                                        <label htmlFor="phone">Phone :</label>
                                        <input required id='phone' type="number" placeholder="Update your phone number?" className="input font-normal h-11 text-base sm:w-96 w-full sm:ml-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                                    </li>
                                    <li className='mt-2 text-base font-medium'>
                                        <label htmlFor="address">Address :</label>
                                        <input required id='address' type="text" placeholder="Update your address?" className="input h-11 text-base font-normal sm:w-96 w-full sm:ml-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                                    </li>
                                    <li className='mt-2 text-base font-medium'>
                                        <label htmlFor="state">City/State :</label>
                                        <input required id='state' type="text" placeholder="City / State" className="input h-11 text-base font-normal sm:w-96 w-full sm:ml-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                                    </li>
                                    <li className='mt-2 text-base font-medium'>
                                        <label htmlFor="country">Country :</label>
                                        <select required id='country' className="select w-max sm:ml-5 border border-gray-200 focus:outline-0 focus:shadow-md">
                                            <option defaultValue>Select country</option>
                                            <CountryList></CountryList>
                                        </select>
                                    </li>
                                    <li className='mt-2 text-base font-medium'>
                                        <label htmlFor="zip">Zip code :</label>
                                        <input required id='zip' type="text" placeholder="Update your zip code" className="input h-11 text-base sm:w-96 w-full sm:ml-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                                    </li>
                                    <li className='mt-5 text-lg'>
                                        <button type='submit' className='btn btn-outline btn-accent normal-case text-base tracking-wider px-16 min-h-0 h-10 sm:w-max w-full'>Save</button>
                                    </li>
                                </ul>
                            </form>
                            :
                            <ul>
                                <li className='mt-2 text-base font-medium'>Email :
                                    <span className='font-normal ml-2'>{email}</span>
                                </li>
                                <li className='mt-2 text-base font-medium'>Phone :
                                    <span className='font-normal ml-2'>{phone}</span>
                                </li>
                                <li className='mt-2 text-base font-medium'>Address :
                                    <span className='font-normal ml-2'>{address}</span>
                                </li>
                                <li className='mt-2 text-base font-medium'>City/State :
                                    <span className='font-normal ml-2'>{state}</span>
                                </li>
                                <li className='mt-2 text-base font-medium'>Country :
                                    <span className='font-normal ml-2'>{country}</span>
                                </li>
                                <li className='mt-2 text-base font-medium'>Zip code :
                                    <span className='font-normal ml-2'>{zip}</span>
                                </li>
                                <li className='mt-2'>
                                    <h2 className='text-center font-medium sm:text-xl text-lg my-2'>About</h2>
                                    <hr/>
                                    <p className='p-3'>{seekerAbout}</p>
                                </li>
                            </ul>
                    }
                </div>
            </div>

            <hr className='my-7' />

            <div className='md:w-4/5 sm:w-11/12 w-full mx-auto sm:p-8 p-4 shadow-lg border rounded-md'>
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
                                <li className='mt-2 text-base font-medium'>Degree :
                                    <span className='font-normal ml-2'>{edu.degree}</span>
                                </li>
                                <li className='mt-2 text-base font-medium'>Institution :
                                    <span className='font-normal ml-2'>{edu.institution}</span>
                                </li>
                                <li className='mt-2 text-base font-medium'>Subject/Group :
                                    <span className='font-normal ml-2'>{edu.edugroup}</span>
                                </li>
                                <li className='mt-2 text-base font-medium'>Start Date :
                                    <span className='font-normal ml-2'>{edu.eduStartDate}</span>
                                </li>
                                {
                                    edu.eduEndDate ?
                                        <li className='mt-2 text-base font-medium'>End Date :
                                            <span className='font-normal ml-2'>{edu.eduEndDate}</span>
                                        </li>
                                        :
                                        <li className='mt-2 text-base font-medium'>{edu.eduStudying}</li>
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
                                    <input id='degree' required type="text" placeholder="Enter your degree" className="input h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                                </div>
                                <div className='mt-5'>
                                    <label htmlFor='institution' className='font-medium text-base'>Institution<span className='text-orange-600 ml-1'>*</span></label>
                                    <input id='institution' required type="text" placeholder="Enter your institution name" className="input h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                                </div>
                                <div className='mt-5'>
                                    <label htmlFor='group' className='font-medium text-base'>Subject/Group<span className='text-orange-600 ml-1'>*</span></label>
                                    <input id='group' required type="text" placeholder="Enter your subject / group?" className="input h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                                </div>
                                <div className='flex sm:justify-between sm:gap-5 sm:flex-row flex-col'>
                                    <div className='mt-5'>
                                        <label htmlFor='eduStartDate' className='font-medium text-base'>Start date<span className='text-orange-600 ml-1'>*</span></label>
                                        <input id='eduStartDate' required type="date" className="input h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                                    </div>
                                    {
                                        !studying &&
                                        <div className='mt-5'>
                                            <label htmlFor='eduEndDate' className='font-medium text-base'>End date<span className='text-orange-600 ml-1'>*</span></label>
                                            <input id='eduEndDate' required type='date' className="input h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                                        </div>
                                    }
                                </div>
                                <div className='md:mt-5 mt-3 flex items-center'>
                                    <input id='checkbox' onChange={() => setStudying(!studying)} type="checkbox" className="checkbox bg-white" />
                                    <label className='text-base ml-3 cursor-pointer' htmlFor="checkbox">Currently Studying</label>
                                </div>
                                <div className='mt-6 flex sm:flex-row flex-col justify-between gap-4'>
                                    <button
                                        className='sm:w-max w-full btn btn-outline btn-accent normal-case text-base tracking-wider sm:px-16 px-10 min-h-0 h-11'
                                        type="submit">
                                        Save
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

            <hr className='my-7' />

            <div className='md:w-4/5 sm:w-11/12 w-full mx-auto sm:p-8 p-4 shadow-lg border rounded-md'>
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
                                <li className='mt-2 text-base font-medium'>Job Title :
                                    <span className='font-normal ml-2'>{ex.exJobTitle}</span>
                                </li>
                                <li className='mt-2 text-base font-medium'>Company :
                                    <span className='font-normal ml-2'>{ex.exCompany}</span>
                                </li>
                                <li className='mt-2 text-base font-medium'>Start Date :
                                    <span className='font-normal ml-2'>{ex.exStartDate}</span>
                                </li>
                                {
                                    ex.exEndDate ?
                                        <li className='mt-2 text-base font-medium'>End Date :
                                            <span className='font-normal ml-2'>{ex.exEndDate}</span>
                                        </li>
                                        :
                                        <li className='mt-2 text-base font-medium'>{ex.exWorking}</li>
                                }
                                <li className='mt-2 text-base font-medium'>Responsibilities :
                                    <p className='font-normal'>{ex.exResponsibilities}</p>
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
                                        className='btn btn-outline btn-accent normal-case text-base tracking-wider px-16 min-h-0 h-11 sm:w-max w-full' type="submit">
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
            <hr className='my-7' />
            {
                resume ? <>
                    <div className='lg:w-3/5 sm:w-11/12 w-full mx-auto overflow-y-auto'>
                        <h1 className='text-center my-5 md:text-3xl sm:text-2xl text-xl font-medium'>CV / Resume</h1>
                        <iframe title='Resume' className='w-full h-screen' src={resume}></iframe>
                    </div>
                    <hr className='my-7' />
                </> :
                    <form
                        onSubmit={handleResumeUpload}
                        className='md:w-4/5 sm:w-11/12 w-full mx-auto sm:p-8 p-4 shadow-lg border rounded-md mb-10'>
                        <h1 className='text-center mb-5 md:text-3xl sm:text-2xl text-xl font-medium'>Upload your CV / Resume</h1>
                        <div className='flex items-center justify-between w-full border rounded-md '>
                            <input
                                id='resume'
                                required
                                type="file"
                                className="input h-11 py-2 text-base w-full border-none border-gray-200 focus:outline-0 hover:shadow-md"
                            />
                            <input
                                type="submit"
                                value="Upload"
                                // className='px-8 py-2 bg-accent rounded-r-md text-lg text-white h-full w-max'
                                className='btn btn-accent min-h-0 h-11 px-6 text-base hover:text-white normal-case rounded-l-none rounded-r-md'
                            />
                        </div>
                    </form>
            }
        </div>
    );
};

export default SeekerProfile;