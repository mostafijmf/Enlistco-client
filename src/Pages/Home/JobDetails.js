import { CheckCircleIcon, XIcon } from '@heroicons/react/solid';
import React, { useRef } from 'react';
import { useState } from 'react';
import useGetUsers from '../../hooks/useGetUsers';
import './JobDetails.css';
import useGetApply from '../../hooks/useGetApply';
import RequireAuth from '../Login/RequireAuth';
import { useLocation } from 'react-router-dom';
import useGetAllPost from '../../hooks/useGetAllPost';
import ApplyModal from './ApplyModal/ApplyModal';

const JobDetails = ({ open }) => {
    const [usersData] = useGetUsers();
    const [modal, setModal] = useState(false);
    const user = usersData[0];
    const [applied] = useGetApply(null);
    const [allPost] = useGetAllPost();
    const { pathname } = useLocation();
    const termsCheckRef = useRef('');
    const [checkErr, setCheckErr] = useState(false);
    const [openTerms, setOpenTerms] = useState(false);

    const post = allPost.filter(items => items._id.includes(pathname.slice(5, 20)));
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
        employerEmail,
        receiveEmail,
        skillTags,
        terms
    } = jobPost;

    const app = applied.filter(a => a.postID === _id);

    const handleApply = () => {
        if (!terms) {
            return setModal(true);
        };

        if (termsCheckRef.current.checked) {
            return (
                setModal(true),
                setCheckErr(false)
            );
        } else {
            return setCheckErr(true)
        }
    };

    return (<>
        <div className="rounded-lg border shadow-md sticky top-6 h-screen overflow-y-auto scrollBar">
            <div className="card-body sm:p-6 p-3">
                <h1 className='text-2xl font-bold text-center'>Job Details</h1>
                <div className='flex justify-between'>
                    <div>
                        <h5 className='text-accent text-sm tracking-wide'>Published: {publish}</h5>
                        {terms && app[0] === undefined &&
                            <div className='mt-1 flex items-center'>
                                <input
                                    id='termsCheck'
                                    ref={termsCheckRef}
                                    type="checkbox"
                                    className={`checkbox w-5 h-5 rounded shadow bg-white ${checkErr && 'border-red-600'}`}
                                />
                                <div
                                    onClick={() => setOpenTerms(!openTerms)}
                                    className={`underline hover:text-primary text-base ml-3 cursor-pointer ${checkErr && 'text-red-600'}`}>
                                    Terms and Conditions
                                </div>
                            </div>
                        }
                    </div>
                    {
                        app[0] === undefined ?
                            <button
                                onClick={handleApply}
                                className='btn btn-primary min-h-0 sm:h-11 h-10 normal-case text-base text-white px-6 tracking-wider'>
                                Apply
                            </button> :
                            <h4 className='text-success text-base flex items-center'>
                                <CheckCircleIcon className='w-6 h-6 mr-1'></CheckCircleIcon>Applied
                            </h4>
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
            modal && <RequireAuth>
                <ApplyModal
                    setModal={setModal}
                    jobPost={jobPost}
                    user={user}
                ></ApplyModal>
            </RequireAuth>
        }

        {/* ==============Terms and conditions Modal============== */}
        {
            openTerms && <div className='w-full h-screen flex items-center justify-center fixed top-0 left-0 bg-black/50 z-10'>
                <div className='pb-2 xl:w-2/5 md:w-1/2 sm:w-4/5 w-11/12 h-max bg-white rounded-md shadow-2xl relative'>
                    <div>
                        <button
                            onClick={() => setOpenTerms(false)}
                            className='absolute top-3 right-5 w-8 h-8 hover:bg-gray-200 hover:rounded-full duration-300 p-1'>
                            <XIcon></XIcon>
                        </button>
                        <div className='sm:px-8 px-5 py-3 border-b-2'>
                            <h1 className='text-xl font-medium'>Terms and Conditions</h1>
                        </div>
                    </div>
                    <p className='sm:px-8 px-5 py-3 text-base h-[calc(100vh-8rem)] overflow-y-auto scrollBar'>{terms}</p>
                </div>
            </div>
        }
    </>);
};

export default JobDetails;