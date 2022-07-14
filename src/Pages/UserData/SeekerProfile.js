import { PlusIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import CountryList from './CountryList';

const SeekerProfile = ({ user }) => {
    const [editPData, setEditPData] = useState(false);
    const [editEduData, setEditEduData] = useState(false);
    const [addJobExp, setAddJobExp] = useState(false);
    const [studying, setStudying] = useState(false);
    const [currentWork, setCurrentWork] = useState(false);

    const { firstName,
        lastName,
        exJobTitle,
        email,
        phone,
        address,
        state,
        country,
        zip,
        degree,
        institution,
        edugroup,
        eduStartDate,
        eduEndDate,
        eduStudying,
        exCompany,
        exStartDate,
        exEndDate,
        exWorking,
        exResponsibilities
    } = user;
    return (
        <div>
            <div className='md:w-3/5 sm:w-4/5 w-11/12 mx-auto'>
                <div>
                    <h1 className='text-center text-3xl font-medium mt-5'>{firstName} {lastName}</h1>
                    <h2 className='text-center text-xl'>{exJobTitle}</h2>
                </div>
                <div className='w-full mt-5 relative'>
                    <div onClick={() => setEditPData(!editPData)} className='absolute cursor-pointer hover:text-accent duration-300 top-0 right-0 flex items-center text-lg text-primary w-max px-2'>
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
                            <form>
                                <ul>
                                    <li className='mt-4 text-lg font-medium'>
                                        <label htmlFor="email">Email :</label>
                                        <input id='email' type="email" placeholder="Update email?" className="input h-11 text-base font-normal sm:w-96 w-full ml-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                                    </li>
                                    <li className='mt-4 text-lg font-medium'>
                                        <label htmlFor="phone">Phone :</label>
                                        <input id='phone' type="number" placeholder="Update your phone number?" className="input font-normal h-11 text-base sm:w-96 w-full ml-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                                    </li>
                                    <li className='mt-4 text-lg font-medium'>
                                        <label htmlFor="address">Address :</label>
                                        <input name='address' id='address' type="text" placeholder="Update your address?" className="input h-11 text-base font-normal sm:w-96 w-full ml-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                                    </li>
                                    <li className='mt-4 text-lg font-medium'>
                                        <label htmlFor="state">City/State :</label>
                                        <input id='state' type="text" placeholder="City / State" className="input h-11 text-base font-normal sm:w-96 w-full ml-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                                    </li>
                                    <li className='mt-4 text-lg font-medium'>
                                        <label htmlFor="country">Country :</label>
                                        <select id='country' className="select w-max ml-5 border border-gray-200 focus:outline-0 focus:shadow-md">
                                            <option disabled selected>Select country</option>
                                            <CountryList></CountryList>
                                        </select>
                                    </li>
                                    <li className='mt-4 text-lg font-medium'>
                                        <label htmlFor="zip">Zip code :</label>
                                        <input id='zip' type="text" placeholder="Update your zip code" className="input h-11 text-base sm:w-96 w-full ml-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                                    </li>
                                    <li className='mt-5 text-lg'>
                                        <button type='submit' className='btn btn-outline btn-accent px-16'>Save</button>
                                    </li>
                                </ul>
                            </form>
                            :
                            <ul>
                                <li className='mt-4 text-lg font-medium'>Email :
                                    <span className='font-normal ml-2'>{email}</span>
                                </li>
                                <li className='mt-4 text-lg font-medium'>Phone :
                                    <span className='font-normal ml-2'>{phone}</span>
                                </li>
                                <li className='mt-4 text-lg font-medium'>Address :
                                    <span className='font-normal ml-2'>{address}</span>
                                </li>
                                <li className='mt-4 text-lg font-medium'>City/State :
                                    <span className='font-normal ml-2'>{state}</span>
                                </li>
                                <li className='mt-4 text-lg font-medium'>Country :
                                    <span className='font-normal ml-2'>{country}</span>
                                </li>
                                <li className='mt-4 text-lg font-medium'>Zip code :
                                    <span className='font-normal ml-2'>{zip}</span>
                                </li>
                            </ul>
                    }
                </div>
            </div>

            <hr className='my-7' />

            <div className='md:w-3/5 sm:w-4/5 w-11/12 mx-auto'>
                <h1 className='text-center text-3xl font-medium mt-5'>Education</h1>
                <div className='mt-5 relative'>
                    <div onClick={() => setEditEduData(!editEduData)} className='absolute cursor-pointer hover:text-accent duration-300 top-0 right-0 flex items-center text-lg text-primary w-max px-2'>
                        {
                            editEduData ?
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
                        editEduData ?
                            <form>
                                <ul>
                                    <li className='mt-4 text-lg font-medium'>
                                        <label htmlFor="degree">Degree :</label>
                                        <input id='degree' type="text" placeholder="Update your degree?" className="input h-11 text-base font-normal sm:w-96 w-full ml-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                                    </li>
                                    <li className='mt-4 text-lg font-medium'>
                                        <label htmlFor="institution">Institution :</label>
                                        <input id='institution' type="text" placeholder="Update your institution name?" className="input font-normal h-11 text-base sm:w-96 w-full ml-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                                    </li>
                                    <li className='mt-4 text-lg font-medium'>
                                        <label htmlFor="group">Subject/Group :</label>
                                        <input id='group' type="text" placeholder="Update your subject / group?" className="input h-11 text-base font-normal sm:w-96 w-full ml-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                                    </li>
                                    <li className='mt-4 text-lg font-medium'>
                                        <div className='flex gap-5'>
                                            <div>
                                                <label htmlFor='startDate' className='font-medium sm:text-lg text-base'>Start date</label>
                                                <input id='startDate' required type="date" className="input h-11 text-base font-normal text-gray-400 w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                                            </div>
                                            {
                                                studying ? '' :
                                                    <div>
                                                        <label htmlFor='endDate' className='font-medium sm:text-lg text-base'>End date</label>
                                                        <input id='endDate' type='date' className="input h-11 text-base font-normal text-gray-400 w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                                                    </div>
                                            }
                                        </div>
                                        <div className='md:mt-5 mt-3 flex items-center'>
                                            <input id='checkbox' onChange={() => setStudying(!studying)} type="checkbox" className="checkbox bg-white" />
                                            <label className='text-base ml-3 cursor-pointer' htmlFor="checkbox">Currently Studying</label>
                                        </div>
                                    </li>
                                    <li className='mt-5 text-lg'>
                                        <button type='submit' className='btn btn-outline btn-accent px-16'>Save</button>
                                    </li>
                                </ul>
                            </form>
                            :
                            <ul>
                                <li className='mt-4 text-lg font-medium'>Degree :
                                    <span className='font-normal ml-2'>{degree}</span>
                                </li>
                                <li className='mt-4 text-lg font-medium'>Institution :
                                    <span className='font-normal ml-2'>{institution}</span>
                                </li>
                                <li className='mt-4 text-lg font-medium'>Subject/Group :
                                    <span className='font-normal ml-2'>{edugroup}</span>
                                </li>
                                <li className='mt-4 text-lg font-medium'>Start Date :
                                    <span className='font-normal ml-2'>{eduStartDate}</span>
                                </li>
                                {
                                    eduEndDate ?
                                        <li className='mt-4 text-lg font-medium'>End Date :
                                            <span className='font-normal ml-2'>{eduEndDate}</span>
                                        </li>
                                        :
                                        <li className='mt-4 text-lg font-medium'>{eduStudying}</li>
                                }
                            </ul>
                    }
                </div>
            </div>

            <hr className='my-7' />

            <div className='md:w-3/5 sm:w-4/5 w-11/12 mx-auto'>
                <h1 className='text-center text-3xl font-medium mt-5'>Job Experience</h1>
                <div className='mt-5 relative'>
                    {addJobExp ?
                        <div className='w-full bg-white sm:px-10 px-5 sm:py-8 py-5 h-max mt-8 mb-10 rounded-xl border shadow-lg'>
                            <h1 className='text-center text-2xl font-semibold mb-5'>Add another job experience</h1>
                            <form>
                                <div>
                                    <div>
                                        <label htmlFor='jobTitle' className='font-medium sm:text-lg text-base'>Job title<span className='text-orange-600 ml-1'>*</span></label>
                                        <input id='jobTitle' required type="text" placeholder="Enter your Job title" className="input h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                                    </div>
                                    <div className='mt-5'>
                                        <label htmlFor='companyName' className='font-medium sm:text-lg text-base'>Company name<span className='text-orange-600 ml-1'>*</span></label>
                                        <input id='companyName' required type="text" placeholder="Enter company name" className="input h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                                    </div>
                                    <div className='flex justify-between'>
                                        <div className='mt-5'>
                                            <label htmlFor='startDate' className='font-medium sm:text-lg text-base'>Start date<span className='text-orange-600 ml-1'>*</span></label>
                                            <input id='startDate' required type="date" className="input h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                                        </div>
                                        {
                                            currentWork ? '' :
                                                <div className='mt-5'>
                                                    <label htmlFor='endDate' className='font-medium sm:text-lg text-base'>End date<span className='text-orange-600 ml-1'>*</span></label>
                                                    <input id='endDate' type='date' className="input h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                                                </div>
                                        }
                                    </div>
                                    <div className='md:mt-5 mt-3 flex items-center'>
                                        <input id='checkbox' onChange={() => setCurrentWork(!currentWork)} type="checkbox" className="checkbox bg-white" />
                                        <label className='text-base ml-3 cursor-pointer' htmlFor="checkbox">Currently Working</label>
                                    </div>
                                    <div className='mt-5'>
                                        <label htmlFor='responsibilities' className='font-medium sm:text-lg text-base'>Responsibilities</label>
                                        <textarea id='responsibilities' rows="3" type="text" placeholder="Describe your responsibilities" className="textarea text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                                    </div>
                                </div>
                            </form>
                            <div className='mt-6 flex justify-between items-center'>
                                <button className='btn btn-outline btn-accent sm:px-10 px-6 capitalize sm:text-lg text-base text-white h-0 sm:min-h-12 min-h-8' type="submit">Save</button>
                                <button onClick={() => setAddJobExp(!addJobExp)} className='btn btn-link sm:px-10 capitalize sm:text-lg text-base text-accent hover:no-underline hover:text-primary h-0 min-h-8'>Cancel</button>
                            </div>
                        </div>
                        :
                        <ul>
                            <li className='mt-4 text-lg font-medium'>Job Title :
                                <span className='font-normal ml-2'>{exJobTitle}</span>
                            </li>
                            <li className='mt-4 text-lg font-medium'>Company :
                                <span className='font-normal ml-2'>{exCompany}</span>
                            </li>
                            <li className='mt-4 text-lg font-medium'>Start Date :
                                <span className='font-normal ml-2'>{exStartDate}</span>
                            </li>
                            {
                                exEndDate ?
                                    <li className='mt-4 text-lg font-medium'>End Date :
                                        <span className='font-normal ml-2'>{exEndDate}</span>
                                    </li>
                                    :
                                    <li className='mt-4 text-lg font-medium'>{exWorking}</li>
                            }
                            <li className='mt-4 text-lg font-medium'>Responsibilities :
                                <p className='font-normal'>{exResponsibilities}</p>
                            </li>
                            <li className='mt-5 text-lg'>
                                <button onClick={() => setAddJobExp(!addJobExp)} className='btn btn-link text-accent px-0 tracking-wide'>
                                    <PlusIcon className='w-6 h-6 mr-2'></PlusIcon>
                                    Add new experience</button>
                            </li>
                        </ul>
                    }
                </div>
            </div>
            <div>
                <img className='w-full h-full' src={'https://pdf.ac/1LoSq7'} alt="" />
            </div>
            <hr className='my-7' />
        </div>
    );
};

export default SeekerProfile;