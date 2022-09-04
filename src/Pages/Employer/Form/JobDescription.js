import React, { useRef } from 'react';
import BundledEditor from '../../../BundledEditor';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../../Shared/PageTitle';

const JobDescription = () => {
    // Description
    const editorRef = useRef(null);
    const termsRef = useRef();
    const navigate = useNavigate();

    const handleJobDes = () => {
        const terms = termsRef.current.value;
        if (editorRef.current) {
            localStorage.setItem('jobDescription', JSON.stringify(editorRef.current.getContent()));
            localStorage.setItem('terms', JSON.stringify(terms))
            navigate('/employer-form/application-options')
        }
    };

    return (<>
        <PageTitle title='Description Form - Dashboard'></PageTitle>
        <div className='bg-slate-100 flex justify-center items-center h-full py-10'>
            <div className='lg:w-3/5 md:w-2/3 sm:w-4/5 w-11/12 py-6 px-5 text-center bg-white rounded-lg shadow-lg'>
                <h1 className='text-4xl text-accent text-center'>Add a job description<span className='text-orange-600 text-3xl ml-1'>*</span></h1>
                <h5 className='sm:text-lg text-base text-gray-600 mt-2 mb-5'>Describe the responsibilities of this job, required work experience, skills, or education.</h5>
                <BundledEditor
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue={
                        '<p>Please add a job description here</p> <strong>Responsibilities :</strong><ul><li>List here responsibilities</li></ul> <strong>Qualifications :</strong><ul><li>List here qualifications</li></ul><strong>Benefits :</strong><ul><li>List here benefits</li></ul>'
                    }
                    init={{
                        height: 400,
                        menubar: false,
                        plugins: ['lists', 'searchreplace', 'table', 'wordcount'],
                        toolbar: 'undo redo | bold italic underline | bullist numlist',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                        statusbar: false,
                    }}

                />

                <hr className='mt-8 mb-5' />
                {/* =================Terms and Conditions================= */}
                <div>
                    <h1 className='font-medium sm:text-lg text-base text-left mb-2'>
                        <label htmlFor='terms'>
                            Add terms and conditions
                            <span className='ml-2 font-normal'>(optional)</span>
                        </label>
                    </h1>
                    <textarea
                        id='terms'
                        ref={termsRef}
                        className='textarea border w-full p-2 border-gray-200 focus:outline-0 focus:shadow-md'
                        placeholder='Ask something here'
                        rows="3"
                    />
                </div>

                <div className='flex sm:flex-row flex-col-reverse justify-between gap-4 md:mx-5 mt-10'>
                    <button
                        onClick={() => navigate('/employer-form/contact')}
                        className='sm:w-max w-full btn btn-outline btn-accent sm:px-10 px-5 normal-case sm:text-lg text-base h-11 min-h-0'>
                        Preview
                    </button>
                    <button
                        onClick={handleJobDes}
                        className='sm:w-max w-full btn btn-accent sm:px-10 px-5 normal-case sm:text-lg text-base text-white h-11 min-h-0'>
                        Save and continue
                    </button>
                </div>
            </div>
        </div>
    </>
    );
};

export default JobDescription;