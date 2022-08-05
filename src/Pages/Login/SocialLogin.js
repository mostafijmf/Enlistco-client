import React, { useEffect } from 'react';
import google from '../../images/social-icon/google.svg';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Spinner from '../Shared/Spinner';
import { useLocation, useNavigate } from 'react-router-dom';
import useGetUsers from '../../hooks/useGetUsers';
import { useState } from 'react';

const SocialLogin = () => {
    const [signInWithGoogle, user, gLoading, error] = useSignInWithGoogle(auth);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [usersData, loading] = useGetUsers();
    let from = location.state?.from?.pathname || "/";

    useEffect(() => {
        if (user && loading) {
            setIsLoading(true)
        } else {
            if (user) {
                if (usersData.length !== 0) {
                    navigate(from, { replace: true })
                }
                else if (usersData.length === 0) {
                    navigate('/new-entry')
                }
            }
        }
    }, [user, loading, signInWithGoogle, usersData, navigate, from]);


    return (
        <div className='text-center'>
            <div className="divider my-5">OR</div>
            <button onClick={() => signInWithGoogle()} className='btn btn-outline text-blue-600 w-full capitalize sm:text-lg text-base'>
                {
                    isLoading || gLoading ? <Spinner></Spinner> : <>
                        <img className='w-8 h-8 mr-2' src={google} alt="" />Continue With Google
                    </>
                }
            </button>
            {
                error && <p className='text-sm text-red-600 mt-3 '>Popup closed by user</p>
            }
        </div>
    );
};

export default SocialLogin;