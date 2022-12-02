import React from 'react';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

const SeekerForm = () => {
    const [step, setStep] = useState(0);

    return (
        <div className='bg-slate-100'>
            <div className='w-full block h-3 bg-white fixed top-0 left-0 shadow-sm z-20'>
                <div className={`
                bg-primary h-full 
                ${step === 0 && 'w-5'}
                ${step === 1 && 'w-1/5'}
                ${step === 2 && 'w-2/5'}
                ${step === 3 && 'w-3/5'}
                ${step === 4 && 'w-4/5'}
                `}></div>
            </div>
            <div className="w-full flex justify-center mt-3">
                <Outlet context={setStep} />
            </div>
        </div>
    );
};

export default SeekerForm;