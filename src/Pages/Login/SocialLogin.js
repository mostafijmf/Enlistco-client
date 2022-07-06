import React from 'react';
import google from '../../images/social-icon/google.svg';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Spinner from '../Shared/Spinner';
import { useLocation, useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    if (user) {
        navigate(from, { replace: true });
    };

    return (
        <div className='text-center'>
            <div className="divider my-5">OR</div>
            <button onClick={() => signInWithGoogle()} className='btn btn-outline text-blue-600 w-full capitalize sm:text-lg text-base'>
                {
                    loading ? <Spinner></Spinner> : <>
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