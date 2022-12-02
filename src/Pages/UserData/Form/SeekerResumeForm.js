import { ExclamationIcon } from '@heroicons/react/solid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import Spinner from '../../Shared/Spinner';

const SeekerResumeForm = () => {
    const setStep = useOutletContext();
    setStep(4);
    const [dragActive, setDragActive] = useState(false);
    const [files, setFiles] = useState(null);
    const [error, setError] = useState(false);
    const [dbError, setDbError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (files) {
            setError(false);
        }
    }, [files]);

    // =========================Drag the file over the form=========================
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    // =========================Input file=========================
    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            setFiles(e.target.files[0]);
        }
    };

    // =========================Drop the file over the form=========================
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFiles(e.dataTransfer.files[0]);
        };
    };

    // =========================Upload file button=========================
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!files) return setError(true);
        setLoading(true);

        // ---------resume url generate----------
        let resumeURL;
        if (files) {
            const pdf = new FormData();
            pdf.append('file', files);
            pdf.append('upload_preset', 'resume');

            resumeURL = await axios.post("https://api.cloudinary.com/v1_1/job-portal/upload", pdf);
        };
        const resume = resumeURL.data.secure_url;

        const userContact = JSON.parse(localStorage.getItem('userContact'));
        const seekerAbout = JSON.parse(localStorage.getItem('seekerAbout'));
        const jobExp = JSON.parse(localStorage.getItem('jobExp')) || '';
        const education = JSON.parse(localStorage.getItem('education')) || '';

        // Send data to database
        await axios.put('https://api.enlistco.co.in/seeker_data',
            { userContact, seekerAbout, jobExp, education, resume },
            {
                method: 'PUT',
                headers: {
                    'Authorization': localStorage.getItem('user_token')
                }
            })
            .then(res => {
                if (res.data) {
                    setLoading(false);
                    localStorage.removeItem('userContact');
                    localStorage.removeItem('seekerAbout');
                    localStorage.removeItem('jobExp');
                    localStorage.removeItem('education');
                    navigate('/');
                }
            })
            .catch(err => {
                const { logout, message } = err.response.data;
                if (logout) {
                    setLoading(false);
                    localStorage.removeItem('user_token');
                    localStorage.removeItem('userContact');
                    localStorage.removeItem('seekerAbout');
                    localStorage.removeItem('jobExp');
                    localStorage.removeItem('education');
                    return navigate('/login');
                }
                setDbError(message)
                setLoading(false);
            });
    };

    return (
        <div className={`w-full h-screen ${dragActive && "bg-black/60"}`}>
            <h1 className='text-center sm:text-3xl text-2xl font-semibold mt-14 mb-8'>
                Upload your resume/cv
            </h1>
            <form
                onDragEnter={handleDrag}
                onSubmit={(e) => e.preventDefault()}
                className='h-72 lg:w-1/2 md:w-3/5 sm:w-4/5 w-11/12 mx-auto text-center relative'
            >
                <input
                    onChange={handleChange}
                    type="file"
                    id="file"
                    multiple={true}
                    className='hidden'
                />
                <label
                    className={`h-full w-full flex items-center justify-center rounded-lg border-dashed bg-white cursor-pointer ${dragActive ? 'border-8 z-30' : 'border-2'} ${error ? 'border-red-500' : 'border-gray-300'}`}
                    htmlFor="file"
                >
                    <div>
                        <p className='text-lg text-gray-500'>Drag and drop your file here</p>
                        <p className='text-lg text-gray-500'>or</p>
                        <div
                            className='text-lg font-medium text-gray-500 hover:underline cursor-pointer'
                        >
                            Browse to upload
                        </div>
                        {
                            files?.name &&
                            <p className='text-lg text-success mt-5'>{files?.name}</p>
                        }
                    </div>
                </label>
                {dragActive &&
                    <div
                        className='absolute w-full h-full rounded-lg top-0 left-0 right-0 bottom-0 z-30'
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}>
                    </div>}
            </form>
            {
                error &&
                <p className='text-center text-red-500 mt-5'>
                    <ExclamationIcon className='w-5 h-5 inline-block mr-1' />Resume must required
                </p>
            }
            {
                dbError &&
                <p className='text-center text-red-500 mt-5'>
                    <ExclamationIcon className='w-5 h-5 inline-block mr-1' />{dbError}</p>
            }
            <div className='block text-center relative'>
                <button
                    disabled={loading}
                    onClick={handleSubmit}
                    type="submit"
                    className='btn btn-primary min-h-0 h-11 px-8 mt-8 normal-case text-lg text-white'
                >
                    {
                        loading ? <Spinner className={'px-2'}></Spinner> : 'Submit'
                    }
                </button>
            </div>
        </div>
    );
};

export default SeekerResumeForm;