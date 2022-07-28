import React from 'react';

const AUser = ({ user, index, setDeleteUData, setUserData }) => {
    const { firstName, lastName, seeker, employer, admin, email, } = user;
    
    const handleDelete = user =>{
        setDeleteUData(true);
        setUserData(user);
    };

    return (
        <tbody className='border-b'>
            <tr>
                <th className='py-2 text-sm'>{index + 1}</th>
                <td className='py-2 text-sm'>{firstName} {lastName}</td>
                <td className='py-2 text-sm'>
                    {seeker && 'Seeker'} {employer && '& Employer'} {admin && 'Admin'}
                </td>
                <td className='py-2 text-sm'>{email}</td>
                <td className='py-2 text-sm'>
                    {
                        !admin && <>
                            <button className='btn btn-link mr-8 normal-case text-base min-h-0 h-9 tracking-wider'>View</button>
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

export default AUser;