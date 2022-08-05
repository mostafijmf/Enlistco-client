import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Footer from '../Shared/Footer';
import PageTitle from '../Shared/PageTitle';
import Spinner from '../Shared/Spinner';

const NewEntry = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [isNavigate, setIsNavigate] = useState(false)

    const handleEntry = async entry => {
        setLoading(true)
        if (user) {
            const seeker = entry === 'seeker' ? true : false;
            const employer = entry === 'employer' ? true : false;
            const email = user?.email;
            const url = `https://boiling-beach-14928.herokuapp.com/users/${email}`;

            await axios.put(url, { email, seeker, employer })
                .then(res => {
                    const accessToken = res.data.token;
                    localStorage.setItem('accessToken', accessToken);

                })
                .catch(err => { setLoading(false) });
            setLoading(false);
            seeker && navigate('/form/user-contact');
            employer && setIsNavigate(!isNavigate);
        }
    };


    return (<>
        <PageTitle title='New Entry'></PageTitle>
        <section className='h-screen w-full bg-slate-100 flex items-center justify-center'>
            {
                loading && <div
                    className='fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-black/50 z-10'>
                    <Spinner></Spinner>
                </div>
            }
            {
                isNavigate &&
                <div className="fixed w-screen h-screen top-0 left-0 z-20 flex items-center justify-center bg-black/50 ">
                    <div className="modal-box text-center bg-secondary">
                        <h3 className="text-2xl py-4 text-white">Do you want to post now?</h3>
                        <div className="flex justify-center gap-10 mt-5">
                            <button
                                onClick={() => navigate('/')}
                                className="btn btn-primary text-white min-h-0 h-10 px-10 tracking-wider">
                                No
                            </button>

                            <button
                                onClick={() => navigate('/employer-form/contact')}
                                className="btn btn-outline text-white hover:bg-white hover:text-secondary min-h-0 h-10 px-10 tracking-wider">
                                Yes
                            </button>

                        </div>
                    </div>
                </div>
            }
            <div className='w-2/5 bg-white shadow-lg px-10 py-8 rounded-lg'>
                <h1 className='text-4xl text-gray-500 mb-10 text-center'>Welcome!</h1>
                <h4 className='text-xl font-medium'>What is your role?</h4>
                <button
                    onClick={() => handleEntry('seeker')}
                    className='btn btn-outline btn-primary hover:text-white w-full mt-5 normal-case tracking-wide text-xl'>Job seeker
                </button>
                <button
                    onClick={() => handleEntry('employer')}
                    className='btn btn-outline btn-primary hover:text-white w-full mt-5 normal-case tracking-wide text-xl'>Employer
                </button>
            </div>
        </section>
        <Footer></Footer>
    </>);
};

export default NewEntry;