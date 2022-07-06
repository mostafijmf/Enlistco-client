import React, { useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import CountryList from './CountryList';

const UserContact = () => {
    const [user] = useAuthState(auth);

    const emailRef = useRef('');
    const fNameRef = useRef('');
    const lNameRef = useRef('');
    const phoneRef = useRef('');
    const resumeRef = useRef('');
    const countryRef = useRef('');
    const addressRef = useRef('');
    const stateRef = useRef('');
    const zipRef = useRef('');

    const navigate = useNavigate();


    const handleContact = event => {
        event.preventDefault();
        const firstName = fNameRef.current.value;
        const lastName = lNameRef.current.value;
        const phone = phoneRef.current.value;
        const resume = resumeRef.current.value;
        const country = countryRef.current.value;
        const address = addressRef.current.value;
        const state = stateRef.current.value;
        const zip = zipRef.current.value;

        localStorage.setItem('userContact', JSON.stringify({ firstName, lastName, phone, resume, country, address, state, zip }));
        
        navigate('/form/jobExperience')
    };

    return (
        <div class="flex justify-center bg-slate-100">
            <div className='lg:w-1/2 md:w-3/5 sm:w-4/5 w-11/12 bg-white sm:px-10 px-5 sm:py-8 py-5 h-max sm:mt-8 mt-6 mb-10 rounded-xl border shadow-lg'>
                <h1 className='text-center md:text-4xl sm:text-3xl text-2xl font-semibold mb-5'>Personal information</h1>
                <form onSubmit={handleContact}>
                    <div>
                        <div>
                            <label htmlFor='email' className='font-medium sm:text-lg text-base'>First name<span className='text-orange-600 ml-1'>*</span></label>
                            <input ref={fNameRef} required type="text" placeholder="Enter your first name" className="input h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                        </div>
                        <div className='mt-5'>
                            <label htmlFor='password' className='font-medium sm:text-lg text-base'>Last name<span className='text-orange-600 ml-1'>*</span></label>
                            <input ref={lNameRef} required type="text" placeholder="Enter your last name" className="input h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                        </div>
                        <div className='mt-5'>
                            <label htmlFor='password' className='font-medium sm:text-lg text-base'>Phone</label>
                            <input ref={phoneRef} required type="number" placeholder="Your phone number" className="input h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                        </div>
                        <div className='mt-5'>
                            <label htmlFor='password' className='font-medium sm:text-lg text-base'>Email</label>
                            <input ref={emailRef} disabled required value={user?.email} className="input h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                        </div>
                        <div className='mt-5'>
                            <label htmlFor='file' className='font-medium sm:text-lg text-base'>Upload your resume</label>
                            <input id='file' ref={resumeRef} type="file" className="input h-10 text-base w-full mt-2 p-1 border border-gray-200 focus:outline-0 focus:shadow-md" />
                        </div>
                    </div>


                    <h1 className='text-center md:text-4xl sm:text-3xl text-2xl font-semibold mt-6'>Your location</h1>
                    <div>
                        <div className='mt-5'>
                            <label htmlFor='country' className='font-medium sm:text-lg text-base'>Country</label>
                            <select ref={countryRef} id='country' class="select w-max ml-5 border border-gray-200 focus:outline-0 focus:shadow-md">
                                <option defaultValue disabled>Select country</option>
                                <CountryList></CountryList>
                            </select>
                        </div>
                        <div className='mt-5'>
                            <label htmlFor='streetAddress' className='font-medium sm:text-lg text-base'>Street address</label>
                            <input id='streetAddress' ref={addressRef} type="text" placeholder="Your address" className="input h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                        </div>
                        <div className='mt-5'>
                            <label htmlFor='city' className='font-medium sm:text-lg text-base'>City / State</label>
                            <input id='city' ref={stateRef} type="text" placeholder="Your city / state" className="input h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                        </div>
                        <div className='mt-5'>
                            <label htmlFor='zipCode' className='font-medium sm:text-lg text-base'>Zip code</label>
                            <input id='zipCode' ref={zipRef} type="number" placeholder="Zip code" className="input h-11 text-base w-full mt-2 border border-gray-200 focus:outline-0 focus:shadow-md" />
                        </div>
                    </div>
                    <div className='mt-6 flex justify-between'>
                        <button onClick={() =>navigate('/form/jobExperience')} className='btn btn-outline btn-primary sm:px-10 px-6 capitalize sm:text-lg text-base text-white h-0 sm:min-h-12 min-h-8'>Skip</button>
                        <button type='submit' className='btn btn-primary sm:px-10 px-6 capitalize sm:text-lg text-base text-white h-0 sm:min-h-12 min-h-8'>Next</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserContact;