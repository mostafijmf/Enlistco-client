import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ children }) => {
    const location = useLocation();
    const token = localStorage.getItem('user_token');


    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />
    };

    return children;
};

export default RequireAuth;