import { ExclamationIcon, XIcon } from '@heroicons/react/solid';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import BundledEditor from '../../../BundledEditor';
import Spinner from '../../Shared/Spinner';

const DescriptionForm = ({ setOpenDesForm, data }) => {
    const { _id, jobDescription } = data;
    const editorRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    // Update button
    const updateDescription = async () => {
        setLoading(true);
        const permission = false;

        if (editorRef.current) {
            const jobDescription = editorRef.current.getContent();
            await axios.put(`https://api.enlistco.co.in/update_post/${_id}?description=true`,
                { jobDescription, permission },
                {
                    method: 'PUT',
                    headers: {
                        'Authorization': localStorage.getItem('user_token')
                    }
                })
                .then((res) => {
                    if (res) {
                        setLoading(false);
                        setOpenDesForm(false);
                    }
                })
                .catch(err => {
                    const { logout, message } = err.response.data;
                    setLoading(false);
                    setErrorMsg(message);
                    if (logout) {
                        setLoading(false);
                        localStorage.removeItem('user_token');
                        return navigate('/login');
                    }
                });
        };
        setLoading(false);
    };

    return (
        <div
            className='fixed top-0 left-0 w-full h-screen flex justify-center sm:items-center items-start bg-black/50 z-30 overflow-y-auto scrollBar-sm'
        >
            <div className='xl:w-1/2 lg:w-3/5 sm:w-4/5 w-full mx-2 sm:my-0 my-10 bg-white sm:p-8 p-5 rounded-md relative'>
                <div
                    onClick={() => setOpenDesForm(false)}
                    className='absolute top-5 right-5 w-max p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-600 duration-300 cursor-pointer'
                >
                    <XIcon className='w-7 h-7'></XIcon>
                </div>
                <h1 className='text-2xl font-medium text-center mb-5'>Edit job description</h1>
                <BundledEditor
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue={jobDescription}
                    init={{
                        height: 400,
                        menubar: false,
                        plugins: ['lists', 'searchreplace', 'table', 'wordcount'],
                        toolbar: 'styles | bold italic underline | bullist numlist | fontfamily | fontsize',
                        content_style: 'body { font-family:Segoe UI; font-size:16px; color: #333333 }',
                        font_family_formats: "Segoe UI;" +
                            "Andale Mono=andale mono,times;" +
                            "Arial=arial,helvetica,sans-serif;" +
                            "Arial Black=arial black,avant garde;" +
                            "Book Antiqua=book antiqua,palatino;" +
                            "Comic Sans MS=comic sans ms,sans-serif;" +
                            "Courier New=courier new,courier;" +
                            "Georgia=georgia,palatino;" +
                            "Helvetica=helvetica;" +
                            "Impact=impact,chicago;" +
                            "Tahoma=tahoma,arial,helvetica,sans-serif;" +
                            "Terminal=terminal,monaco;" +
                            "Times New Roman=times new roman,times;" +
                            "Trebuchet MS=trebuchet ms,geneva;" +
                            "Verdana=verdana,geneva;",
                        font_size_formats: '8px 10px 12px 14px 16px 18px 20px 24px',
                        statusbar: false,
                    }}

                />
                <div className='w-full text-center mt-8'>
                    {
                        errorMsg &&
                        <p className='text-base text-center text-red-600'>
                            <ExclamationIcon className='w-5 h-5 inline-block' /> {errorMsg}
                        </p>
                    }
                    <button
                        disabled={loading}
                        onClick={updateDescription}
                        className='btn btn-outline btn-accent normal-case text-base px-16 min-h-0 h-11 sm:w-max w-full hover:text-white'
                    >
                        {loading ? <Spinner className={'px-2'} /> : 'Update'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DescriptionForm;