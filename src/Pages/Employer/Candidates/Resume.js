import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageTitle from '../../Shared/PageTitle';

const Resume = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const resume = location?.state?.resume;
    return (
        <>
            <PageTitle title='Resume - Dashboard'></PageTitle>
            {
                resume ?
                    <div>
                        <iframe title='resume' src={resume} className='w-full h-screen'></iframe>
                    </div>
                    :
                    <div className='w-full h-screen bg-slate-100 flex items-center justify-center'>
                        <div className='text-center bg-white sm:p-10 p-5 mx-2 rounded-lg shadow-md'>
                            <h1 className='text-2xl sm:mb-10 mb-5'>This candidate has no resume.</h1>
                            <button
                                onClick={() => navigate(-1)}
                                className='btn btn-primary min-h-0 h-10 normal-case text-base'
                            >Go back
                            </button>
                        </div>
                    </div>
            }
        </>
    );
};

export default Resume;