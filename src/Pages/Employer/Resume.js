import React from 'react';
import { useLocation } from 'react-router-dom';

const Resume = () => {
    const location = useLocation();
    return (
        <div>
            <iframe title='resume' src={location?.state?.resume} className='w-full h-screen'></iframe>
        </div>
    );
};

export default Resume;