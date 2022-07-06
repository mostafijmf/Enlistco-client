import React, { useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';

const UserJobExperience = () => {
    const [user] = useAuthState(auth);
    const [currentWork, setCurrentWork] = useState(false);
    const navigate = useNavigate();

    const jobTitleRef = useRef('');
    const companyRef = useRef('');
    const startDateRef = useRef('');
    const workingRef = useRef('');
    const responsibilitiesRef = useRef('');


    const handleJobExp = event => {
        event.preventDefault();
        const exJobTitle = jobTitleRef.current.value;
        const exCompany = companyRef.current.value;
        const exStartDate = startDateRef.current.value;
        const Working = workingRef.current.checked;
        const exResponsibilities = responsibilitiesRef.current.value;
        let exEndDate;
        let exWorking;
        if(!Working){
            exEndDate = event.target.endDate.value;
            exWorking = '';
        }
        else{
            exWorking = 'Currently Working';
            exEndDate = ''
        };

        localStorage.setItem('jobExp', JSON.stringify({exJobTitle, exCompany, exStartDate, exEndDate, exWorking, exResponsibilities}))
        navigate('/form/education')
    };

    return (
        <div class="flex justify-center bg-slate-100">
            <div className='lg:w-1/2 md:w-3/5 sm:w-4/5 w-11/12 bg-white sm:px-10 px-5 sm:py-8 py-5 h-max mt-8 mb-10 rounded-xl border shadow-lg'>
                <h1 className='text-center md:text-4xl sm:text-3xl text-2xl font-semibold mb-5'>Job Experience</h1>
                <form onSubmit={handleJobExp}>
                    <div>
                        <div>
                            <label htmlFor='jobTitle' className='font-medium sm:text-lg text-base'>Job title<span className='text-orange-600 ml-1'>*</span></label>
                            <input id='jobTitle' ref={jobTitleRef} required type="text" placeholder="Enter your Job title" className="input h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                        </div>
                        <div className='mt-5'>
                            <label htmlFor='companyName' className='font-medium sm:text-lg text-base'>Company name<span className='text-orange-600 ml-1'>*</span></label>
                            <input id='companyName' ref={companyRef} required type="text" placeholder="Enter company name" className="input h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                        </div>
                        <div className='flex justify-between'>
                            <div className='mt-5'>
                                <label htmlFor='startDate' className='font-medium sm:text-lg text-base'>Start date<span className='text-orange-600 ml-1'>*</span></label>
                                <input id='startDate' ref={startDateRef} required type="date" className="input h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                            </div>
                            {
                                currentWork ? '' :
                                    <div className='mt-5'>
                                        <label htmlFor='endDate' className='font-medium sm:text-lg text-base'>End date</label>
                                        <input name='endDate' id='endDate' type='date' className="input h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                                    </div>
                            }
                        </div>
                        <div className='md:mt-5 mt-3 flex items-center'>
                            <input ref={workingRef} id='checkbox' onClick={() => setCurrentWork(!currentWork)} type="checkbox" className="checkbox bg-white" />
                            <label className='text-base ml-3 cursor-pointer' htmlFor="checkbox">Currently Working</label>
                        </div>
                        <div className='mt-5'>
                            <label htmlFor='responsibilities' className='font-medium sm:text-lg text-base'>Responsibilities</label>
                            <textarea id='responsibilities' ref={responsibilitiesRef} rows="3" type="text" placeholder="Describe your responsibilities" class="textarea text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                        </div>
                    </div>
                    <div className='mt-6 flex justify-between'>
                        <button onClick={()=>navigate('/form/education')} className='btn btn-outline btn-primary sm:px-10 px-6 capitalize sm:text-lg text-base text-white h-0 sm:min-h-12 min-h-8'>Skip</button>

                        <button className='btn btn-primary sm:px-10 px-6 capitalize sm:text-lg text-base text-white h-0 sm:min-h-12 min-h-8' type="submit">Next</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserJobExperience;