import React from 'react';
import useAdmin from '../../hooks/useAdmin';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../Shared/Spinner';

const RequireAdmin = ({children}) => {
    const [admin, adminLoading] = useAdmin();
    const location = useLocation();

    if(adminLoading){
        return <Spinner></Spinner>
    };

    if(!admin.admin){
        return <Navigate to="/" state={{ from: location }} replace />
    };

    return children;
};

export default RequireAdmin;