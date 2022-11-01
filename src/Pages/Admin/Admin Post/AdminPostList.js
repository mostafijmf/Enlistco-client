import { ArrowRightIcon, PencilAltIcon, XIcon } from '@heroicons/react/solid';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../Shared/Spinner';
import DescriptionForm from './DescriptionForm';
import PostInfoForm from './PostInfoForm';
import TermsForm from './TermsForm';

const AdminPostList = ({ post }) => {
    const [openPost, setOpenPost] = useState(false);
    const [deletePost, setDeletePost] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openInfoForm, setOpenInfoForm] = useState(false);
    const [openDesForm, setOpenDesForm] = useState(false);
    const [openTermsForm, setOpenTermsForm] = useState(false);
    const navigate = useNavigate();
    const {
        _id,
        permission,
        jobTitle,
        company,
        publish,
        jobLocation,
        salary,
        empType,
        jobDescription,
        workplace,
        empQuantity,
        employerEmail,
        receiveEmail,
        skillTags,
        terms,
        // Screening question
        // bgCheck,
        // certification,
        // drivingLicense,
        // drugTest,
        // education,
        // gpa,
        // hybridWork,
        // remoteWork,
        // workExperience,
        // urgentHiring,
        // customQuestion
    } = post;

    // Delete post button
    const handleDelete = async (id) => {
        setLoading(true);
        await axios.delete(`https://api.enlistco.co.in/post/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': localStorage.getItem('user_token')
            }
        })
            .then(res => {
                if (res) {
                    setDeletePost(!deletePost);
                    setLoading(false);
                }
            })
            .catch(err => {
                setDeletePost(!deletePost);
                setLoading(false);
                if (err?.response?.data?.logout) {
                    localStorage.removeItem('user_token');
                    return navigate('/login');
                }
            });
    };

    return (openPost ?
        <div className="bg-white rounded-lg border shadow-md mb-20 relative">
            <div className="sm:p-8 p-5">

                {/* ================Post information================ */}
                {
                    openInfoForm &&
                    <PostInfoForm setOpenInfoForm={setOpenInfoForm} post={post} />
                }
                <div>
                    <h1 className="sm:text-3xl text-2xl text-center font-medium">{jobTitle}</h1>
                    <h5 className='text-lg font-medium text-center mt-1'>{company}</h5>
                    <div className='flex justify-between items-center'>
                        <span className='text-accent text-sm tracking-wide'>Published: {publish}</span>
                        <div
                            onClick={() => setOpenInfoForm(true)}
                            className='w-max text-gray-500 hover:text-gray-600 duration-300 cursor-pointer'>
                            <PencilAltIcon className='w-6 h-6'></PencilAltIcon>
                        </div>
                    </div>
                    <h5 className='font-medium mb-2'>Location :
                        <span className='text-base font-normal ml-2'>{jobLocation}</span>
                    </h5>
                    <h5 className='font-medium mb-2'>Salary :
                        <span className='text-base font-normal ml-2'>${salary}</span>
                    </h5>
                    <h5 className='font-medium mb-2'>Job Type :
                        <span className='text-base font-normal ml-2'>{empType}</span>
                    </h5>
                    <h5 className='font-medium mb-2'>Employees Quantity :
                        <span className='text-base font-normal ml-2'>{empQuantity}</span>
                    </h5>
                    <h5 className='font-medium mb-2'>Your email :
                        <span className='text-base font-normal ml-2'>{employerEmail}</span>
                    </h5>
                    <h5 className='font-medium mb-2'>Receive email :
                        <span className='text-base font-normal ml-2'>{receiveEmail}</span>
                    </h5>{
                        skillTags.length !== 0 &&
                        <h5 className='font-medium mb-2'>Tags :
                            {
                                skillTags.map(tag => <span key={tag} className='text-base font-normal ml-2'>{tag}</span>)
                            }
                        </h5>
                    }
                    <p className='bg-slate-200 mb-2 px-2 py-1 rounded w-max'>{workplace}</p>
                </div>

                {/* ================Post Description================ */}
                <div>
                    <div className='flex items-start justify-between mt-5 mb-1'>
                        <h1 className='text-2xl font-medium'>Description :</h1>
                        <div
                            onClick={() => setOpenDesForm(true)}
                            className='mt-2 w-max text-gray-500 hover:text-gray-600 duration-300 cursor-pointer'>
                            <PencilAltIcon className='w-6 h-6' />
                        </div>
                    </div>
                    <hr />
                    {
                        openDesForm &&
                        <DescriptionForm setOpenDesForm={setOpenDesForm} post={post} />
                    }
                    <div
                        className='mb-10 pl-3'
                        dangerouslySetInnerHTML={{ __html: jobDescription }}
                    ></div>
                </div>

                {/* ================Post Terms and Conditions================ */}
                <div>
                    <div className='flex items-start justify-between mt-5 mb-1'>
                        <h1 className='text-2xl font-medium'>Terms and Conditions :</h1>
                        <div
                            onClick={() => setOpenTermsForm(true)}
                            className='mt-2 w-max text-gray-500 hover:text-gray-600 duration-300 cursor-pointer'>
                            <PencilAltIcon className='w-6 h-6' />
                        </div>
                    </div>
                    <hr />
                    {
                        openTermsForm &&
                        <TermsForm setOpenTermsForm={setOpenTermsForm} post={post}/>
                    }
                    <div className='mb-10 pl-3 mt-1' dangerouslySetInnerHTML={{ __html: terms }}></div>
                </div>
            </div>
            <div className="absolute md:bottom-5 bottom-2 right-6">
                <button
                    onClick={() => setOpenPost(false)}
                    className="btn btn-link normal-case text-base min-h-0 h-9 px-2"
                >
                    Show Less
                </button>
            </div>
        </div>
        :
        <div className='bg-white w-full shadow-md p-5 border mb-3 sm:mx-0 mx-2 relative'>
            {
                !permission &&
                <div className='absolute top-0 right-0 w-max px-2 rounded-l-xl bg-primary text-white text-sm'>
                    Under review
                </div>
            }
            <ul className='grid sm:grid-cols-2 sm:grid-rows-1 grid-rows-2 items-center list-none'>
                <li>
                    <h1 className='text-xl text-left font-medium'>{jobTitle}</h1>
                    <p className='sm:text-lg text-base'>{company}</p>
                </li>
                <li className='flex justify-between items-center'>
                    <div>
                        <h5 className='text-base font-medium text-gray-500'>Published</h5>
                        <h4>{publish}</h4>
                    </div>
                    <div className='flex items-center justify-center gap-5'>
                        <button
                            onClick={() => setOpenPost(true)}
                            className="btn btn-link normal-case text-base min-h-0 h-max px-0"
                        >View
                        </button>
                        <button
                            onClick={() => setDeletePost(!deletePost)}
                            className="btn btn-link text-accent normal-case text-base min-h-0 h-max px-0"
                        >Delete
                        </button>
                    </div>
                </li>
            </ul>
            {
                deletePost &&
                <div className="fixed w-screen h-screen bg-black/60 top-0 left-0 z-30 flex items-center justify-center">
                    <div className="modal-box text-center bg-secondary">
                        <h3 className="font-medium text-2xl text-white">Are you sure!</h3>
                        <p className="text-lg py-4 text-gray-300">Do you want to delete it?</p>
                        <div className="flex justify-center gap-10 mt-5">
                            <button
                                onClick={() => setDeletePost(!deletePost)}
                                className="btn btn-primary text-white min-h-0 h-10 px-10 ">
                                No
                            </button>
                            <button
                                onClick={() => handleDelete(_id)}
                                className="btn btn-outline text-white min-h-0 h-10 px-10 ">
                                {loading ? <Spinner></Spinner> : 'Yes'}
                            </button>

                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default AdminPostList;