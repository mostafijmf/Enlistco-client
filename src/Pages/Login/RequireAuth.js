import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../firebase.init';
import Spinner from '../Shared/Spinner';
import EmailVerify from './EmailVerify';

const RequireAuth = ({ children }) => {
    const [user, loading] = useAuthState(auth);
    const location = useLocation();

    if (loading) {
        return <div className='h-screen w-full flex items-center justify-center'>
            <Spinner></Spinner>
        </div>
    };

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />
    };

    if (user.providerData[0]?.providerId === "password" && !user.emailVerified) {
        return <EmailVerify></EmailVerify>
    };

    return children;
};

export default RequireAuth;