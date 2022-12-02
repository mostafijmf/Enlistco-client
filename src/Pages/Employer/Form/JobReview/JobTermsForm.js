import { XIcon } from '@heroicons/react/solid';
import React, { useRef } from 'react';
import BundledEditor from '../../../../BundledEditor';

const JobTermsForm = ({ setOpenTermsForm, terms }) => {
    const editorRef = useRef(null);

    // ==================Update button==================
    const updateTerms = () => {
        if (editorRef.current) {
            localStorage.setItem('terms', JSON.stringify(editorRef.current.getContent()));
            setOpenTermsForm(false);
        }
    }

    return (
        <div
            className='fixed top-0 left-0 w-full h-screen flex justify-center sm:items-center items-start bg-black/50 z-30 overflow-y-auto scrollBar-sm'
        >
            <div className='2xl:w-[900px] xl:w-1/2 lg:w-3/5 sm:w-4/5 w-full mx-2 sm:my-0 my-10 bg-white sm:p-8 p-5 rounded-md relative'>
                <div
                    onClick={() => setOpenTermsForm(false)}
                    className='absolute top-5 right-5 w-max p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-600 duration-300 cursor-pointer'
                >
                    <XIcon className='w-7 h-7' />
                </div>
                <h1 className='text-2xl font-medium text-center mb-5'>Edit Terms and Conditions</h1>
                <BundledEditor
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue={terms}
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
                <div className='w-full text-right mt-7'>
                    <button
                        onClick={updateTerms}
                        className='btn btn-outline btn-accent normal-case text-base px-10 min-h-0 h-11 sm:w-max w-full hover:text-white'
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JobTermsForm;