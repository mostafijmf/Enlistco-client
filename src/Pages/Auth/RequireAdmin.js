import React from 'react';
import useAdmin from '../../hooks/useAdmin';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../Shared/Spinner';

const RequireAdmin = ({ children }) => {
    const [admin, adminLoading] = useAdmin();
    const location = useLocation();

    if (adminLoading) {
        return <div className='fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center bg-white'>
            <Spinner></Spinner>
        </div>
    };

    if (!admin.admin) {
        return <Navigate to="/" state={{ from: location }} replace />
    };

    return children;
};

export default RequireAdmin;