import React from 'react';
import { useNavigate } from 'react-router-dom';
import useGetUsers from '../../hooks/useGetUsers';
import PageTitle from '../Shared/PageTitle';
import Spinner from '../Shared/Spinner';
import SeekerProfile from '../UserData/SeekerProfile/SeekerProfile';

const UserProfile = () => {
    const [usersData, loading] = useGetUsers(null);
    const navigate = useNavigate();

    if (loading) {
        return <div className='h-screen w-full flex justify-center items-center'>
            <Spinner></Spinner>
        </div>
    }

    const seeker = usersData.seeker;
    const employer = usersData.employer;

    if (!usersData || usersData.length === 0) {
        return <div className='h-96 w-full flex flex-col justify-center gap-5 items-center'>
            <h1 className='text-4xl text-gray-500'>You don't have data</h1>
            <button
                onClick={() => navigate('/form/seeker-contact')}
                className='btn btn-primary hover:text-white min-h-0 sm:h-11 h-10 normal-case text-lg tracking-wide'
            >Upload your resume
            </button>
        </div>
    }


    if (!usersData.employer && !usersData.seeker) {
        return <div className='h-96 w-full flex flex-col justify-center gap-5 items-center'>
            <h1 className='text-4xl text-gray-500'>You don't have data</h1>
            <button
                onClick={() => navigate('/form/seeker-contact')}
                className='btn btn-primary hover:text-white min-h-0 sm:h-11 h-10 normal-case text-lg tracking-wide'
            >Upload your resume
            </button>
        </div>
    }

    return (<>
        <PageTitle title='Profile - Dashboard'></PageTitle>
        <section className='relative mt-5 mb-20'>
            {
                seeker || employer ?
                    <SeekerProfile usersData={usersData}></SeekerProfile>
                    : ''
            }
        </section>
    </>
    );
};

export default UserProfile;