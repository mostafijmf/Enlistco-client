import React from 'react';
import { useNavigate } from 'react-router-dom';
import useGetPost from '../../../hooks/useGetPost';
import useGetUsers from '../../../hooks/useGetUsers';
import EmployerProfile from '../../Employer/EmployerProfile';
import PageTitle from '../../Shared/PageTitle';
import Spinner from '../../Shared/Spinner';
import SeekerProfile from './SeekerProfile';

const UserProfile = () => {
    const [usersData, loading] = useGetUsers(null);
    const [myPost] = useGetPost(null);
    const navigate = useNavigate();

    if (loading) {
        return <div className='h-screen w-full flex justify-center items-center'>
            <Spinner></Spinner>
        </div>
    }
    
    if (!usersData || usersData.length === 0) {
        return <div className='h-96 w-full flex flex-col justify-center gap-5 items-center'>
            <h1 className='text-4xl text-gray-500'>You don't have data</h1>
            <button onClick={() => navigate('/form/user-contact')} className='btn btn-primary hover:text-white min-h-0 sm:h-11 h-10 normal-case text-lg tracking-wide'>Upload your resume</button>
        </div>
    }


    const seeker = usersData[0].seeker;
    const employer = myPost.find(e => e !== undefined);
    return (<>
        <PageTitle title='Profile - Dashboard'></PageTitle>
        <section className='relative'>
            <h1 className='text-center sm:text-3xl text-2xl my-5 text-accent'>Personal Information</h1>
            {seeker &&
                usersData.map(user => <SeekerProfile key={user._id} user={user}></SeekerProfile>)
            }
            {
                employer &&
                <EmployerProfile employer={employer}></EmployerProfile>
            }
        </section>
    </>
    );
};

export default UserProfile;