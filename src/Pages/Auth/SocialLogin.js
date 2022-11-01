import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { CheckIcon, ExclamationIcon } from '@heroicons/react/solid';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import axios from 'axios';
const SocialLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    const [socialState, setSocialState] = useState({
        data: '',
        success: '',
        error: '',
        loading: false
    });
    const { data, success, error, loading } = socialState;


    // ===================Open google window===================
    gapi.load('client:auth2', () => {
        window.gapi.client.init({
            clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            plugin_name: "chat"
        })
    })

    // ===================Google sign-in===================
    const onSuccess = async (res) => {
        setSocialState({ ...socialState, loading: true })
        const tokenId = res.tokenId;
        await axios.post('https://api.enlistco.co.in/google_login', { tokenId })
            .then(res => {
                const { user_token, newEntry, message } = res.data;
                setSocialState({
                    ...socialState,
                    data: user_token,
                    success: message,
                    error: '',
                    loading: false
                });
                localStorage.setItem('user_token', user_token);
                newEntry ? navigate('/new-entry') : navigate(from, { replace: true });
            })
            .catch(err => {
                setSocialState({
                    ...socialState,
                    data: '',
                    success: '',
                    error: err.response.data.message,
                    loading: false
                })
            })
    };

    const onFailure = (err) => {
        setSocialState({ ...socialState, loading: true });
        err && setSocialState({
            ...socialState,
            data: '',
            success: '',
            error: 'Popup closed by user',
            loading: false
        });
    };

    return (
        <div className='text-center'>
            <div className="divider my-5">OR</div>
            {
                error && <p className='text-sm text-red-600 mb-3 flex items-center justify-center gap-1'>
                    <ExclamationIcon className='w-4 h-4'></ExclamationIcon>
                    {error}
                </p>
            }
            {
                success && <p className='text-sm text-success mb-3 flex items-center justify-center gap-1'>
                    <CheckIcon className='w-4 h-4'></CheckIcon>
                    {success}
                </p>
            }
            <GoogleLogin
                clientId="544921467171-vovg7pkuphgorvnvbh8n950p7s1lfv82.apps.googleusercontent.com"
                onSuccess={onSuccess}
                onFailure={onFailure}
                className='text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg h-11 border shadow-none border-blue-600 duration-300 w-full flex justify-center normal-case text-lg'
                disabled={loading}
            >
                {
                    loading ? <span>Loading...</span> : <span>Continue with google</span>
                }
            </GoogleLogin>
        </div>
    );
};

export default SocialLogin;