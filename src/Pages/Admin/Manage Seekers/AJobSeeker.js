import React from 'react';
import { useNavigate } from 'react-router-dom';

const AJobSeeker = ({ user, index, setDeleteUData, setUserData }) => {
    const { firstName, lastName, admin, email, phone } = user;
    const navigate = useNavigate();

    return (
        <tbody className='border-b'>
            <tr>
                <th className='py-2 text-sm'>{index + 1}</th>
                <td className='py-2 text-sm'>
                    <button
                        onClick={() => navigate('/dashboard/manage-seekers/details', {
                            state: user
                        })}
                        className='text-base text-primary font-medium hover:text-emerald-600'
                    >
                        {firstName} {lastName}
                    </button>
                </td>
                <td className='py-2 text-sm'>{email}</td>
                <td className='py-2 text-sm'>{phone}</td>
                <td className='py-2 text-sm'>
                    {
                        !admin &&
                        <svg
                            onClick={() => {
                                setDeleteUData(true);
                                setUserData(user);
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24"
                            strokeWidth="2" stroke="currentColor"
                            className='w-6 h-6 text-gray-500 hover:text-red-600 duration-300 cursor-pointer mx-auto'
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    }
                </td>
            </tr>
        </tbody>
    );
};

export default AJobSeeker;