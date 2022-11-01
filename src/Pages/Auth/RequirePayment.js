import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useGetUsers from '../../hooks/useGetUsers';
import Spinner from '../Shared/Spinner';

const RequirePayment = ({ children }) => {
    const [usersData, loading] = useGetUsers();
    const location = useLocation();

    if (loading) {
        return <div className='fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center bg-white'>
            <Spinner></Spinner>
        </div>
    };
    const subscription = usersData?.subscription;

    if (subscription === 'required') {
        return <Navigate to="/payment" state={{ from: location }} replace />
    };

    return children;
};

export default RequirePayment;