import React, { useEffect, useRef, useState } from 'react';
import BundledEditor from '../../../../BundledEditor';
import { useNavigate, useOutletContext } from 'react-router-dom';
import PageTitle from '../../../Shared/PageTitle';
import TermsAndConditions from './TermsAndConditions';
import { ChevronLeftIcon } from '@heroicons/react/solid';

const JobDescription = () => {
    const setStep = useOutletContext();
    setStep(1);

    const editorRef = useRef(null);
    const [terms, setTerms] = useState('');
    const navigate = useNavigate();
    const [storeData, setStoreData] = useState({});

    useEffect(() => {
        const jobDescription = JSON.parse(localStorage.getItem('jobDescription'));
        const terms = JSON.parse(localStorage.getItem('terms'));
        setStoreData({ jobDescription, terms });
    }, []);


    // ===================Scrolling top===================
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);


    const handleJobDes = () => {
        if (editorRef.current) {
            localStorage.setItem('jobDescription', JSON.stringify(editorRef.current.getContent()));
            localStorage.setItem('terms', JSON.stringify(
                terms.current ?
                    terms.current.getContent()
                    : ''
            ))
            navigate('/job-form/application-options')
        }
    };

    return (<>
        <PageTitle title='Description Form - Dashboard'></PageTitle>
        <div className='2xl:w-[920px] xl:w-55 lg:w-3/5 md:w-2/3 sm:w-4/5 w-full mx-2 py-6 px-5 text-center bg-white rounded-lg shadow-lg my-10'>
            <h1 className='text-4xl text-accent text-center'>Add a job description<span className='text-orange-600 text-3xl ml-1'>*</span></h1>
            <p className='sm:text-lg text-base text-gray-600 mt-2 mb-5'>Describe the responsibilities of this job, required work experience, skills, or education.</p>
            <BundledEditor
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue={storeData?.jobDescription ?
                    storeData?.jobDescription :
                    '<p>Please add a job description here</p> <strong>Responsibilities :</strong><ul><li>List here responsibilities</li></ul> <strong>Qualifications :</strong><ul><li>List here qualifications</li></ul><strong>Benefits :</strong><ul><li>List here benefits</li></ul>'
                }
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

            <hr className='my-10' />

            {/* =================Terms and Conditions================= */}
            <TermsAndConditions setTerms={setTerms} termsData={storeData?.terms} />


            <div className='flex sm:flex-row flex-col-reverse justify-between gap-4 md:mx-5 mt-10'>
                <button
                    onClick={() => navigate(-1)}
                    className='sm:w-max w-full btn btn-outline btn-accent normal-case text-lg h-11 min-h-0 gap-2 px-5 hover:text-white'
                >
                    <ChevronLeftIcon className='w-6 h-6 inline-block' /> Back
                </button>
                <button
                    onClick={handleJobDes}
                    className='sm:w-max w-full btn btn-accent sm:px-10 px-5 normal-case text-lg text-white h-11 min-h-0'
                >
                    Save and continue
                </button>
            </div>
        </div>
    </>
    );
};

export default JobDescription;