import { CheckCircleIcon, XIcon } from '@heroicons/react/solid';
import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BundledEditor from '../../../BundledEditor';
import PageTitle from '../../Shared/PageTitle';
import Spinner from '../../Shared/Spinner';

const SendOfferLetter = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { _id, seekerEmail, seekerName, jobTitle, company } = location?.state;
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const editorRef = useRef(null);

    useEffect(() => {
        if (successMsg) {
            setTimeout(() => {
                setSuccessMsg('')
            }, 3000);
        };
    }, [successMsg]);

    const handleOfferLetter = async e => {
        e.preventDefault();
        setLoading(true);
        const subject = e.target.subject.value;
        const offerLetter = editorRef.current.getContent();

        await axios.put(`https://boiling-beach-14928.herokuapp.com/apply/${_id}`, {
            _id, seekerEmail, seekerName, jobTitle, company, subject, offerLetter
        })
            .then(res => {
                if (res.data) {
                    setSuccessMsg('Offer letter sent successfully');
                    setLoading(false);
                }
            })
            .catch(err => {
                setLoading(false);
            });
    };

    return (<>
        <PageTitle title='Send Offer Letter - Dashboard'></PageTitle>
        <div className='bg-white top-0 left-0 h-full w-full py-10'>
            <div className={`fixed top-20 ${successMsg ? 'right-10' : '-right-96'} z-10 duration-300 bg-white flex items-center py-3 px-5 border rounded-lg shadow-md`}>
                <CheckCircleIcon className='w-7 h-7 text-success mr-2'></CheckCircleIcon>
                <p className='text-success text-base'>{successMsg}</p>
            </div>
            <div className='xl:w-3/5 md:w-3/4 sm:w-11/12 w-full mx-auto py-5 sm:px-8 px-5 shadow-xl border rounded-md relative'>
                <div className='absolute top-3 right-3'>
                    <XIcon
                        onClick={() => navigate(-1)}
                        className='w-8 h-8 hover:bg-slate-200 p-1 rounded-full cursor-pointer'>
                    </XIcon>
                </div>
                <h1 className='text-center sm:text-2xl text-xl mb-5'>Write an offer letter</h1>

                <hr />

                <div className='mt-5'>
                    <form onSubmit={handleOfferLetter}>
                        <label
                            htmlFor="subject"
                            className='sm:text-lg text-base font-medium text-gray-600'>
                            Subject
                            <span className='text-orange-600 ml-1'>*</span>
                        </label>
                        <input
                            required
                            type="text"
                            placeholder="Write subject"
                            name='subject' id='subject'
                            className="input h-9 text-base w-full mt-2 mb-4 border border-gray-200 focus:outline-0 focus:shadow-md"
                        />
                        <BundledEditor
                            onInit={(evt, editor) => editorRef.current = editor}
                            initialValue={
                                'Write an offer letter here.'
                            }
                            required
                            init={{
                                height: 200,
                                menubar: false,
                                toolbar: false,
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; letter-spacing: 1px; line-height: 20px; margin-top:0}',
                                statusbar: false,
                            }}

                        />
                        <button
                            disabled={loading}
                            className='btn btn-outline btn-accent md:w-max w-full my-5 min-h-0 h-10 normal-case text-lg tracking-wider px-10'>
                            {loading ? <Spinner /> : 'Send'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </>
    );
};

export default SendOfferLetter;