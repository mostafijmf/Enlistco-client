import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGetAllUsers from '../../../hooks/useGetAllUsers';
import PageTitle from '../../Shared/PageTitle';
import Spinner from '../../Shared/Spinner';
import AJobSeeker from './AJobSeeker';

const ManageJobSeekers = () => {
    const [allUsers, loading] = useGetAllUsers();
    const [deleteUData, setDeleteUData] = useState(false);
    const [dLoading, setDLoading] = useState(false);
    const [userData, setUserData] = useState();
    const navigate = useNavigate();

    
    if (loading) {
        return <div className='w-full h-screen flex items-center justify-center'>
            <Spinner></Spinner>
        </div>
    };

    const seeker = allUsers.filter(s => s.seeker);

    const handleDelete = async email => {
        setDLoading(true);
        await axios.delete(`https://api.enlistco.co.in/admin_delete/${email}`, {
            method: 'DELETE',
            headers: {
                'Authorization': localStorage.getItem('user_token')
            }
        })
            .then(res => {
                setDeleteUData(!deleteUData);
                setDLoading(false);
            })
            .catch(err => {
                setDLoading(false);
                if (err?.response?.data?.logout) {
                    localStorage.removeItem('user_token');
                    return navigate('/login');
                }
            });
    };

    return (<>
        <PageTitle title='Manage Seeker - Dashboard'></PageTitle>
        <h1 className='text-2xl text-center my-5 text-accent font-medium'>Manage job seekers</h1>
        <div className="overflow-x-auto mb-10">
            <table className="table w-full" id='exportToxlsx'>
                <thead>
                    <tr>
                        <th className='py-3 rounded-l-none normal-case text-base font-medium'>No.</th>
                        <th className='py-3 normal-case text-base font-medium'>Name</th>
                        <th className='py-3 normal-case text-base font-medium'>Email</th>
                        <th className='py-3 normal-case text-base font-medium'>Phone number</th>
                        <th className='py-3 rounded-r-none normal-case text-base font-medium'></th>
                    </tr>
                </thead>
                {seeker.map((user, index) =>
                    <AJobSeeker
                        key={user._id}
                        user={user}
                        index={index}
                        setDeleteUData={setDeleteUData}
                        setUserData={setUserData}>
                    </AJobSeeker>
                )}
            </table>

            {
                deleteUData &&
                <div className="fixed w-screen h-screen bg-black/60 top-0 left-0 z-30 flex items-center justify-center">
                    <div className="modal-box text-center bg-secondary">
                        <h3 className="font-medium text-2xl text-white">Are you sure!</h3>
                        <p className="text-lg py-4 text-gray-300">Do you want to delete it?</p>
                        <div className="flex justify-center gap-10 mt-5">
                            <button
                                onClick={() => setDeleteUData(!deleteUData)}
                                className='btn btn-primary text-white min-h-0 h-10 px-10'
                            >No
                            </button>
                            <button
                                onClick={() => handleDelete(userData.email)}
                                disabled={dLoading}
                                className="btn btn-outline text-white min-h-0 h-10 px-10"
                            >
                                {dLoading ? <Spinner></Spinner> : 'Yes'}
                            </button>

                        </div>
                    </div>
                </div>
            }
        </div>
    </>
    );
};

export default ManageJobSeekers;