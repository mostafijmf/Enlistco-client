// import React from 'react';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { Navigate, useLocation } from 'react-router-dom';
// import auth from '../../firebase.init';
// import useGetUsers from '../../hooks/useGetUsers';
// import Spinner from '../Shared/Spinner';

// const NewEntry = ({children}) => {
//     const [user, loading] = useAuthState(auth);
//     const location = useLocation();
//     const [usersData, setUsersData] = useGetUsers([]);
//     const {firstName, resume, exJobTitle} = usersData[0]
//     console.log(firstName, resume, exJobTitle)
//     if (loading) {
//         return <div className='h-screen w-full flex items-center justify-center'>
//             <Spinner></Spinner>
//         </div>
//     };

//     if (firstName, resume, exJobTitle) {
//         return <Navigate to="/userForm" state={{ from: location }} replace />
//     };

//     return children;
// };

// export default NewEntry;