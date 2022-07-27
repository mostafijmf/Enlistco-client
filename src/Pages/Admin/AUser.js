import React, { useState } from 'react';

const AUser = ({ user, index }) => {
    const { _id, firstName, lastName, seeker, employer, admin, email, } = user;
    const [deleteUser, setDeleteUser] = useState(false);

    const handleDelete = id => {
        const url = `https://boiling-beach-14928.herokuapp.com/users/${id}`;
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => { });
        setDeleteUser(!deleteUser);
    };

    return (
        <>
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
                                <button onClick={() => setDeleteUser(!deleteUser)} className='btn btn-outline normal-case text-base min-h-0 h-9 tracking-wider'>Delete</button>
                            </>
                        }
                    </td>
                </tr>
            </tbody>
            
            {
                deleteUser &&
                <div className="fixed w-screen h-screen top-0 left-0 z-20 flex items-center justify-center">
                    <div className="modal-box text-center bg-secondary">
                        <h3 className="font-medium text-2xl text-white">Are you sure!</h3>
                        <p className="text-lg py-4 text-gray-300">Do you want to delete it?</p>
                        <div className="flex justify-center gap-5 mt-5">

                            <button onClick={() => setDeleteUser(!deleteUser)} className="btn btn-primary text-white min-h-8 h-0 px-6 tracking-wider">No</button>

                            <button onClick={() => handleDelete(_id)} className="btn btn-outline text-white min-h-8 h-0 px-6 tracking-wider">Yes</button>

                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default AUser;