import React from 'react';
import { useNavigate } from 'react-router-dom';

const AJobSeeker = ({ user, index, setDeleteUData, setUserData }) => {
    const { firstName, lastName, admin, email, phone } = user;
    const navigate = useNavigate();

    const handleDelete = user => {
        setDeleteUData(true);
        setUserData(user);
    };
    
    return (
        <tbody className='border-b'>
            <tr>
                <th className='py-2 text-sm'>{index + 1}</th>
                <td className='py-2 text-sm'>{firstName} {lastName}</td>
                <td className='py-2 text-sm'>{email}</td>
                <td className='py-2 text-sm'>{phone}</td>
                <td className='py-2 text-sm'>
                    {
                        !admin && <>
                            <button
                                onClick={() => navigate('/dashboard/manage-seekers/details', {
                                    state: user
                                })}
                                className='btn btn-link mr-6 normal-case text-base min-h-0 h-9 tracking-wider'>
                                View
                            </button>
                            <button
                                onClick={() => handleDelete(user)}
                                className='btn btn-outline normal-case text-base min-h-0 h-9 tracking-wider'>
                                Delete
                            </button>
                        </>
                    }
                </td>
            </tr>
        </tbody>
    );
};

export default AJobSeeker;