import React from 'react';
import { useNavigate } from 'react-router-dom';
import useGetPost from '../../hooks/useGetPost';
import useGetUsers from '../../hooks/useGetUsers';
import EmployerProfile from '../Employer/EmployerProfile';
import SeekerProfile from './SeekerProfile';

const UserProfile = () => {
    const [usersData] = useGetUsers(null);
    const [myPost] = useGetPost(null);
    const navigate = useNavigate();

    if (usersData.length === 0) {
        return <div className='h-screen w-full flex items-center justify-center'>
            <div className='h-96 w-full flex flex-col justify-center gap-5 items-center'>
                <h1 className='text-4xl text-gray-500'>You don't have data</h1>
                <button onClick={() => navigate('/form/userContact')} className='btn btn-primary hover:text-white normal-case text-xl tracking-wide'>Upload your resume</button>
            </div>
        </div>
    }
    const seeker = usersData[0].seeker;
    const employer = myPost.find(e => e !== undefined);
    return (<>
        <h1 className='text-center md:text-4xl sm:text-3xl text-2xl mt-5 text-accent'>Personal Information</h1>
        {seeker &&
            usersData.map(user => <SeekerProfile key={user._id} user={user}></SeekerProfile>)
        }
        {
            employer &&
            <EmployerProfile employer={employer}></EmployerProfile>
        }
    </>);
};

export default UserProfile;