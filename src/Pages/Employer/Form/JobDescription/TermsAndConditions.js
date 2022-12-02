import { PlusIcon, XIcon } from '@heroicons/react/solid';
import React, { useEffect, useRef, useState } from 'react';
import BundledEditor from '../../../../BundledEditor';

const TermsAndConditions = ({ setTerms, termsData }) => {
    const editorRef = useRef(null);
    const [openTerms, setOpenTerms] = useState(false);

    useEffect(() => {
        setTerms(editorRef);
        termsData && setOpenTerms(true);
    }, [setTerms, termsData]);

    return (
        <div>
            <div>
                <h1
                    onClick={() => setOpenTerms(!openTerms)}
                    className='font-medium sm:text-lg text-base text-left mb-2 flex items-center cursor-pointer w-max px-2 py-1 border border-accent/50 rounded hover:bg-accent/10 duration-300'
                >
                    {
                        openTerms ?
                            <XIcon className='w-6 h-6 text-accent mr-2'></XIcon>
                            :
                            <PlusIcon className='w-6 h-6 text-accent mr-2'></PlusIcon>
                    }
                    Add terms and conditions
                    <span className='ml-2 font-normal'>(optional)</span>
                </h1>
            </div>
            {
                openTerms &&
                <BundledEditor
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue={termsData}
                    init={{
                        height: 350,
                        menubar: false,
                        plugins: ['lists', 'searchreplace', 'table', 'wordcount'],
                        toolbar: 'styles | bold italic underline | bullist numlist | fontfamily | fontsize',
                        content_style: 'body { font-family:Segoe UI; font-size:16px; color: #333333 }',
                        font_family_formats: "Andale Mono=andale mono,times;" +
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
            }

        </div>
    );
};

export default TermsAndConditions;