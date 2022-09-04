import { XIcon } from '@heroicons/react/solid';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import BundledEditor from '../../../BundledEditor';
import useGetUsers from '../../../hooks/useGetUsers';
import PageTitle from '../../Shared/PageTitle';
import Spinner from '../../Shared/Spinner';
import AdditionalQuestions from './AdditionalQuestions';

const ApplyModal = ({ setModal, jobPost, user }) => {
    const [usersData] = useGetUsers();
    const [openInput, setOpenInput] = useState(false);
    const resumeRef = useRef('');
    const [inputErr, setInputErr] = useState(false);
    const [uploadLoading, setUploadLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const editorRef = useRef(null);
    const [progress, setProgress] = useState(0);

    const {
        _id,
        jobTitle,
        company,
        employerEmail,
        receiveEmail,

        // Screening question
        bgCheck,
        certification,
        drivingLicense,
        drugTest,
        education,
        gpa,
        hybridWork,
        remoteWork,
        workExperience,
        urgentHiring,
        customQuestion
    } = jobPost;

    // Apply job
    const uploadResume = async () => {
        const resumeFile = resumeRef.current.files[0];
        const id = usersData[0]?._id;

        if (resumeFile) {
            setUploadLoading(true);
            const pdf = new FormData();
            pdf.append('file', resumeFile);
            pdf.append('upload_preset', 'resume');

            const resumeURL = await axios.post("https://api.cloudinary.com/v1_1/job-portal/upload", pdf);
            const resume = resumeURL.data.secure_url;
            const seeker = true;

            await axios.put(`https://api.enlistco.co.in/user-resume/${id}`, { resume, seeker })
                .then((res) => {
                    setOpenInput(!openInput)
                    setUploadLoading(false);
                })
                .catch(err => {
                    setUploadLoading(false);
                });
        }
        else {
            setInputErr(true);
        }
    };

    // Apply job
    const handleApply = async event => {
        event.preventDefault();
        setLoading(true);

        // screening questions
        const screeningQuestions = JSON.parse(localStorage.getItem('screeningQuestions'));
        console.log(screeningQuestions)
        const bgCheck = screeningQuestions && screeningQuestions.qBgCheck ?
            screeningQuestions.qBgCheck
            : '';
        const certification = screeningQuestions && screeningQuestions.qCertification ?
            screeningQuestions.qCertification
            : '';
        const drivingLicense = screeningQuestions && screeningQuestions.qDrivingLicense ?
            screeningQuestions.qDrivingLicense
            : '';
        const drugTest = screeningQuestions && screeningQuestions.qDrugTest ?
            screeningQuestions.qDrugTest
            : '';
        const education = screeningQuestions && screeningQuestions.qEducation ?
            screeningQuestions.qEducation
            : '';
        const gpa = screeningQuestions && screeningQuestions.qGpa ?
            screeningQuestions.qGpa
            : '';
        const hybridWork = screeningQuestions && screeningQuestions.qHybridWork ?
            screeningQuestions.qHybridWork
            : '';
        const remoteWork = screeningQuestions && screeningQuestions.qRemoteWork ?
            screeningQuestions.qRemoteWork
            : '';
        const workExperience = screeningQuestions && screeningQuestions.qWorkExperience ?
            screeningQuestions.qWorkExperience
            : '';
        const urgentHiring = screeningQuestions && screeningQuestions.qUrgentHiring ?
            screeningQuestions.qUrgentHiring
            : '';
        const customQuestion = screeningQuestions && screeningQuestions.ctQuestion ?
            screeningQuestions.ctQuestion
            : '';


        const resume = user?.resume;
        const subject = event.target.subject.value;
        const coverLetter = editorRef.current.getContent();
        const seekerEmail = user?.email;
        const seekerPhone = user?.phone;
        const seekerName = user?.firstName + user?.lastName ? user?.firstName + ' ' + user?.lastName : 'no name';
        const postID = _id;

        const date = new Date();
        const applied = date.getDate() + '-' + date.toLocaleString('default', { month: 'long' }) + '-' + date.getFullYear();
        await axios.post('https://api.enlistco.co.in/apply',
            { resume, subject, coverLetter, seekerEmail, seekerPhone, seekerName, postID, receiveEmail, employerEmail, applied, jobTitle, company, bgCheck, certification, drivingLicense, drugTest, education, gpa, hybridWork, remoteWork, workExperience, urgentHiring, customQuestion })
            .then(res => {
                localStorage.removeItem('screeningQuestions')
                setLoading(false);
                setModal(false)
            })
            .catch(err => { });
    };

    return (<>
        <PageTitle title={`Apply to ${company}`}></PageTitle>
        <div className='w-full h-screen flex items-center justify-center fixed top-0 left-0 bg-black/50 z-10'>
            <div className='pb-2 xl:w-1/2 md:w-3/5 sm:w-4/5 w-full h-max bg-white rounded-md shadow-2xl relative'>
                <div>
                    <button
                        onClick={() => setModal(false)}
                        className='absolute top-3 right-5 w-8 h-8 hover:bg-gray-200 hover:rounded-full duration-300 p-1'>
                        <XIcon></XIcon>
                    </button>
                    <div className='sm:px-8 px-5 py-3 border-b-2'>
                        <h1 className='text-xl font-medium'>Apply to {company}</h1>
                    </div>
                    {
                        bgCheck || certification || drivingLicense || drugTest || education || gpa || hybridWork || remoteWork || workExperience || urgentHiring || customQuestion ?
                            <div className='sm:px-8 px-5 my-2 flex items-center gap-4'>
                                <progress
                                    className="progress w-full"
                                    value={progress}
                                    max="100"
                                ></progress>
                                <div className='text-sm'>{progress}%</div>
                            </div>
                            : ''
                    }
                </div>
                <div>
                    { bgCheck || certification || drivingLicense || drugTest || education || gpa || hybridWork || remoteWork || workExperience || urgentHiring || customQuestion ?
                        progress === 0 ?
                            <AdditionalQuestions
                                questions={{ bgCheck, certification, drivingLicense, drugTest, education, gpa, hybridWork, remoteWork, workExperience, urgentHiring, customQuestion }}
                                setProgress={setProgress}
                            ></AdditionalQuestions>
                            :
                            <form onSubmit={handleApply}>
                                <div>
                                    <div className='sm:px-8 px-5 py-2'>
                                        <h2 className='text-lg font-medium'>CV / Resume</h2>{
                                            user?.resume ?
                                                <iframe
                                                    title='Resume'
                                                    className='mt-2'
                                                    src={user?.resume}
                                                ></iframe>
                                                : <>
                                                    <div className='text-gray-500'>
                                                        You don't have a resume.
                                                        <div
                                                            onClick={() => {
                                                                setOpenInput(!openInput);
                                                                setInputErr(false)
                                                            }}
                                                            className='btn btn-link normal-case p-0 ml-2'>
                                                            {openInput ? 'Cancel' : 'Upload your resume'}
                                                        </div>
                                                    </div> {openInput && <div className='flex items-center'>
                                                        <input
                                                            id='file'
                                                            type="file"
                                                            ref={resumeRef}
                                                            className={`input rounded-r-none h-10 text-base w-full p-1 border ${inputErr ? 'border-red-600' : 'border-gray-200'} focus:outline-0 focus:shadow-md`} />
                                                        <div
                                                            onClick={uploadResume}
                                                            className='btn btn-primary text-white rounded-l-none w-max min-h-0 h-10 normal-case text-base tracking-wide px-6'>{
                                                                uploadLoading ? <Spinner></Spinner> : 'Upload'
                                                            }
                                                        </div>
                                                    </div>
                                                    }
                                                </>
                                        }
                                    </div>
                                    <div className='sm:px-8 px-5 py-2'>
                                        <h2 className='text-lg font-medium mb-1'>Add cover letter</h2>
                                        <input
                                            type="text"
                                            placeholder="Subject"
                                            name='subject'
                                            className="input h-9 text-base w-full mb-2 border border-gray-200 focus:outline-0 focus:shadow-md"
                                        />
                                        <BundledEditor
                                            onInit={(evt, editor) => editorRef.current = editor}
                                            initialValue={
                                                'Write cover letter'
                                            }
                                            required
                                            init={{
                                                height: 160,
                                                menubar: false,
                                                toolbar: false,
                                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; letter-spacing: 1px; line-height: 20px; margin-top:0}',
                                                statusbar: false,
                                            }}

                                        />
                                        <button
                                            type='submit'
                                            disabled={openInput || loading}
                                            className='btn btn-outline btn-primary hover:text-white md:w-max w-full mt-5 min-h-0 h-10 normal-case text-lg tracking-wider px-10'>
                                            {loading ? <Spinner /> : 'Submit'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        :
                        <form onSubmit={handleApply}>
                            <div>
                                <div className='sm:px-8 px-5 py-2'>
                                    <h2 className='text-lg font-medium'>CV / Resume</h2>{
                                        user?.resume ?
                                            <iframe
                                                title='Resume'
                                                className='mt-2'
                                                src={user?.resume}>
                                            </iframe>
                                            : <>
                                                <div className='text-gray-500'>
                                                    You don't have a resume.
                                                    <div
                                                        onClick={() => {
                                                            setOpenInput(!openInput);
                                                            setInputErr(false)
                                                        }}
                                                        className='btn btn-link normal-case p-0 ml-2'>
                                                        {openInput ? 'Cancel' : 'Upload your resume'}
                                                    </div>
                                                </div> {openInput && <div className='flex items-center'>
                                                    <input
                                                        id='file'
                                                        type="file"
                                                        ref={resumeRef}
                                                        className={`input rounded-r-none h-10 text-base w-full p-1 border ${inputErr ? 'border-red-600' : 'border-gray-200'} focus:outline-0 focus:shadow-md`} />
                                                    <div
                                                        onClick={uploadResume}
                                                        className='btn btn-primary text-white rounded-l-none w-max min-h-0 h-10 normal-case text-base tracking-wide px-6'>{
                                                            uploadLoading ? <Spinner></Spinner> : 'Upload'
                                                        }
                                                    </div>
                                                </div>
                                                }
                                            </>
                                    }
                                </div>
                                <div className='sm:px-8 px-5 py-2'>
                                    <h2 className='text-lg font-medium mb-1'>Add cover letter</h2>
                                    <input
                                        type="text"
                                        placeholder="Subject"
                                        name='subject'
                                        className="input h-9 text-base w-full mb-2 border border-gray-200 focus:outline-0 focus:shadow-md"
                                    />
                                    <BundledEditor
                                        onInit={(evt, editor) => editorRef.current = editor}
                                        initialValue={
                                            'Write cover letter'
                                        }
                                        required
                                        init={{
                                            height: 160,
                                            menubar: false,
                                            toolbar: false,
                                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; letter-spacing: 1px; line-height: 20px; margin-top:0}',
                                            statusbar: false,
                                        }}

                                    />
                                    <button
                                        type='submit'
                                        disabled={openInput || loading}
                                        className='btn btn-outline btn-primary hover:text-white md:w-max w-full my-5 min-h-0 h-10 normal-case text-lg tracking-wider px-10'>
                                        {loading ? <Spinner /> : 'Submit'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    }
                </div>
            </div>
        </div>
    </>);
};

export default ApplyModal;