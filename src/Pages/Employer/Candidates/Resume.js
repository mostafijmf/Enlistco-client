import React from 'react';
import { useLocation } from 'react-router-dom';
import PageTitle from '../../Shared/PageTitle';

const Resume = () => {
    const location = useLocation();
    return (
        <>
            <PageTitle title='Resume - Dashboard'></PageTitle>
            <div>
                <iframe title='resume' src={location?.state?.resume} className='w-full h-screen'></iframe>
            </div>
        </>
    );
};

export default Resume;