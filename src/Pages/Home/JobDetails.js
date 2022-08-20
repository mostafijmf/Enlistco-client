import { CheckCircleIcon } from '@heroicons/react/solid';
import React from 'react';
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
        skillTags
    } = jobPost;

    const app = applied.filter(a => a.postID === _id);

    return (<>
        <div className="rounded-lg border shadow-md sticky top-6 h-screen overflow-y-auto scrollBar">
            <div className="card-body sm:p-6 p-3">
                <h1 className='text-2xl font-bold text-center'>Job Details</h1>
                <div className='flex justify-between'>
                    <span className='text-accent text-sm tracking-wide'>Published: {publish}</span>{
                        app[0] === undefined ?
                            <button
                                onClick={() => setModal(true)}
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
        {
            modal && <RequireAuth>
                <ApplyModal
                    setModal={setModal}
                    jobPost={jobPost}
                    user={user}
                ></ApplyModal>
            </RequireAuth>
        }
    </>);
};

export default JobDetails;