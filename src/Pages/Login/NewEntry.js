import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Shared/Footer';

const NewEntry = () => {
    const navigate = useNavigate();

    const handleEntry = entry => {
        entry === 'seeker' ? navigate('/form/userContact') : navigate('/employer/contact');
    };
    return (
        <>
            <div className='h-screen w-full bg-slate-100 flex items-center justify-center'>
                <div className='w-2/5 bg-white shadow-lg px-10 py-8 rounded-lg'>
                    <h1 className='text-4xl text-gray-500 mb-10 text-center'>Welcome!</h1>
                    <h4 className='text-xl font-medium'>What is your role?</h4>
                    <button onClick={() => handleEntry('seeker')} className='btn btn-outline btn-primary w-full mt-5 normal-case tracking-wide text-xl'>Job seeker</button>
                    <button onClick={() => handleEntry('employer')} className='btn btn-outline btn-primary w-full mt-5 normal-case tracking-wide text-xl'>Employer</button>
                </div>
            </div>
            <Footer></Footer>
        </>
    );
};

export default NewEntry;