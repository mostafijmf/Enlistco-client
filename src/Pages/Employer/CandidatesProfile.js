import { XIcon } from '@heroicons/react/solid';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Spinner from '../Shared/Spinner';

const CandidatesProfile = () => {
    const location = useLocation();
    const [cdData, setCdData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const email = location.state;
        if (email) {
            axios.get(`https://boiling-beach-14928.herokuapp.com/users/${email}`)
                .then(res => {
                    setCdData(res.data);
                    setLoading(false)
                })
                .catch(err => {
                    setLoading(false)
                });
        }
    }, [location]);

    if (loading) {
        return <div className='flex justify-center mt-96'>
            <Spinner></Spinner>
        </div>
    };
    
    const { _id,
        firstName,
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
        exResponsibilities,
        resume
    } = cdData[0];
    return (
        <div className='xl:w-3/5 md:w-9/12 w-11/12 mx-auto sm:p-8 p-5 my-10 border shadow-lg relative'>
            <div className='absolute top-3 right-3'>
                <XIcon onClick={() => navigate('/dashboard/seeker-applications')} className='w-10 h-10 hover:bg-slate-200 p-1 rounded-full cursor-pointer'></XIcon>
            </div>
            <div className='mb-5'>
                <h1 className='md:text-3xl sm:text-2xl text-xl text-center'>{firstName} {lastName}</h1>
                <h4 className='text-sm text-center font-medium mt-1'>{address}, {country}</h4>
            </div>
            {/* <div className='mb-10'>
                <h1 className='text-xl border-b pb-1'>About</h1>
                <p className='my-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti doloribus quis repellendus maiores debitis ducimus, quasi, ad blanditiis, tempore non harum quo tenetur accusamus ab atque! Reprehenderit aliquid necessitatibus recusandae eligendi vel sunt ea repellat! Labore at, error quasi aliquam in delectus earum cupiditate id voluptatem doloremque autem dolorum minus?</p>
            </div> */}
            <div className='mb-10'>
                <h1 className='text-xl border-b pb-1'>Work Experience</h1>
                <div className='my-2'>
                    <h2 className='text-base font-medium'>{exJobTitle}</h2>
                    <h4 className='text-gray-500'>{exCompany}</h4>
                    <p className='text-gray-500'>{exStartDate} to {exEndDate && exEndDate} {exWorking && 'Present'}</p>
                    <p>{exResponsibilities}</p>
                </div>
            </div>
            <div className='mb-10'>
                <h1 className='text-xl border-b pb-1'>Education</h1>
                <div className='my-2'>
                    <h2 className='text-base font-medium'>{degree}</h2>
                    <h4 className='text-gray-500'>{institution}</h4>
                    <p className='text-gray-500'>{edugroup}</p>
                    <p className='text-gray-500'>{eduStartDate} to {eduEndDate && eduEndDate} {eduStudying && 'Present'}</p>
                    <p>{exResponsibilities}</p>
                </div>
            </div>
            {/* <div className='mb-10'>
                <h1 className='text-xl border-b pb-1'>Skills</h1>
                <div>
                    <p>skill</p>
                    <p>skill</p>
                    <p>skill</p>
                    <p>skill</p>
                    <p>skill</p>
                    <p>skill</p>
                    <p>skill</p>
                </div>
            </div>
            <div className='mb-10'>
                <h1 className='text-xl border-b pb-1'>Link</h1>
                <div>
                    <p>Linkedin</p>
                    <p>Facebook</p>
                </div>
            </div> */}
        </div>
    );
};

export default CandidatesProfile;