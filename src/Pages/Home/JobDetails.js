import { CheckCircleIcon } from '@heroicons/react/solid';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import useGetUsers from '../../hooks/useGetUsers';
import './JobDetails.css';
import RequireAuth from '../Auth/RequireAuth/RequireAuth';
import { useLocation } from 'react-router-dom';
import useGetAllPost from '../../hooks/useGetAllPost';
import ApplyModal from './ApplyModal/ApplyModal';
import axios from 'axios';

const JobDetails = ({ open }) => {
    const [usersData] = useGetUsers();
    const [openModal, setOpenModal] = useState(false);
    const user = usersData;
    const [allPost] = useGetAllPost();
    const { pathname } = useLocation();
    const [openTerms, setOpenTerms] = useState(false);

    const post = allPost.filter(items =>
        (items.jobStatus !== 'Paused' && items.permission)
        && items._id.includes(pathname.slice(5))
    );
    const jobPost = post[0] || open;
    const {
        _id,
        publish,
        jobTitle,
        company,
        jobLocation,
        salary,
        empType,
        jobDescription,
        workplace,
        empQuantity,
        // employerEmail,
        // receiveEmail,
        // skillTags,
        terms
    } = jobPost;

    const jobDetailsRef = useRef();
    useEffect(() => {
        if (pathname !== '/') {
            jobDetailsRef?.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [pathname]);


    // ===============Applied check=============== 
    const [applied, setApplied] = useState([]);
    useEffect(() => {
        axios.get(`https://api.enlistco.co.in/apply/get_single_apply`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('user_token')
            }
        })
            .then(res => {
                setApplied(res.data);
            })
            .catch(err => { });
    }, [applied]);
    const app = applied.filter(a => a.postID === _id);


    // ===============Apply button===============
    const handleApply = () => {
        if (!terms) {
            return setOpenModal(true);
        };

        if (terms) {
            return setOpenTerms(true)
        }
    };

    return (<>
        <div
            ref={jobDetailsRef}
            className="bg-white rounded-lg border shadow-md sticky top-14 h-screen overflow-y-auto scrollBar"
        >
            <div className="card-body sm:p-6 p-5">
                <h1 className='text-2xl font-bold text-center'>Job Details</h1>
                <div className='flex items-center justify-between'>
                    <div>
                        <h5 className='text-accent text-sm tracking-wide'>Published: {publish}</h5>
                    </div>
                    {
                        jobPost?.applyType === 'easyApply' ?
                            app[0] === undefined ?
                                <button
                                    onClick={handleApply}
                                    className='btn btn-primary min-h-0 h-11 normal-case text-lg text-white px-9'>
                                    Apply
                                </button> :
                                <h4 className='text-success text-lg flex items-center px-5'>
                                    <CheckCircleIcon className='w-6 h-6 mr-1'></CheckCircleIcon>Applied
                                </h4>
                            :
                            <a
                                href={jobPost?.applyType}
                                target='blank'
                                className='btn btn-primary min-h-0 h-11 normal-case text-lg text-white px-6 gap-2'
                            >
                                Apply
                                <svg
                                    className="w-5 h-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none" viewBox="0 0 24 24"
                                    strokeWidth={2.6} stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                </svg>
                            </a>
                    }
                </div>
                <h2 className="text-2xl font-medium">{jobTitle}</h2>
                <h5 className='font-medium'>{company}</h5>
                <h5 className='font-medium'>Location :
                    <span className='text-base font-normal ml-2'>{jobLocation}</span>
                </h5>
                <h5 className='font-medium'>Salary :
                    <span className='text-base font-normal ml-2'>${salary}</span>
                </h5>
                <h5 className='font-medium'>Job Type :
                    <span className='text-base font-normal ml-2'>{empType}</span>
                </h5>
                <h5 className='font-medium'>Employees Quantity :
                    <span className='text-base font-normal ml-2'>{empQuantity}</span>
                </h5>
                <span className='bg-slate-200 px-2 py-1 rounded w-max'>{workplace}</span>
                <hr />
                <div className='mb-10' dangerouslySetInnerHTML={{ __html: jobDescription }}></div>
            </div>
        </div>

        {/* ==============Apply Modal============== */}
        {
            openModal && <RequireAuth>
                <ApplyModal
                    setModal={setOpenModal}
                    jobPost={jobPost}
                    user={user}
                ></ApplyModal>
            </RequireAuth>
        }

        {/* ==============Terms and conditions Modal============== */}
        {
            openTerms &&
            <div className='fixed top-0 left-0 z-30 w-full h-screen py-3 flex justify-center bg-black/60'>
                <div className='lg:w-1/2 md:w-3/5 sm:w-4/5 w-full h-max mx-2 sm:px-8 px-5 bg-white rounded-md shadow-2xl'>
                    <div>
                        <h1 className='text-2xl font-medium py-5'>Terms and Conditions</h1>
                        <hr />
                        <div className='h-[calc(100vh-14rem)] pt-3 overflow-y-auto scrollBar-sm'>
                            <p
                                className='text-base'
                                dangerouslySetInnerHTML={{ __html: terms }}
                            ></p>
                        </div>
                        <div className='flex items-center justify-between md:mx-16 sm:mx-12  mt-10 mb-8'>
                            <button
                                onClick={() => setOpenTerms(false)}
                                className='btn btn-primary btn-outline min-h-0 h-11 normal-case hover:text-white text-lg px-8'
                            >
                                Decline
                            </button>
                            <button
                                onClick={() => {
                                    setOpenTerms(false);
                                    setOpenModal(true)
                                }}
                                className='btn btn-primary min-h-0 h-11 normal-case text-white text-lg px-8'
                            >
                                Accept
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        }
    </>);
};

export default JobDetails;