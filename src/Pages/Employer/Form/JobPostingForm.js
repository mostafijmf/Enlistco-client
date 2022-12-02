import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

const JobPostingForm = () => {
    const [step, setStep] = useState(0);

    return (
        <div className='bg-slate-100'>
            <div className='w-full block h-3 border border-white bg-white fixed top-0 left-0 shadow z-20'>
                <div className={`
                bg-accent h-full 
                ${step === 0 && 'w-1/4'}
                ${step === 1 && 'w-1/2'}
                ${step === 2 && 'w-3/4'}
                ${step === 3 && 'w-full'}
                `}></div>
            </div>
            <div className="w-full flex justify-center mt-3">
                <Outlet context={setStep} />
            </div>
        </div>
    );
};

export default JobPostingForm;