import React from 'react';
import { useNavigate } from 'react-router-dom';
import useGetAllPost from '../../../hooks/useGetAllPost'

const ARecruiter = ({ emp, index, setDeleteUData, setUserData }) => {
    const { firstName, lastName, admin, email, } = emp;
    const [allPost] = useGetAllPost();

    const companyName = allPost.filter(p=>p.employerEmail === email);
    const company = companyName[0]?.company;
    const navigate = useNavigate();


    const handleDelete = emp => {
        setDeleteUData(true);
        setUserData(emp);
    };

    return (
        <tbody className='border-b'>
            <tr>
                <th className='py-2 text-sm'>{index + 1}</th>
                <td className='py-2 text-sm'>{firstName} {lastName}</td>
                <td className='py-2 text-sm'>{email}</td>
                <td className='py-2 text-sm'>{company}</td>
                <td className='py-2 text-sm'>
                    {
                        !admin && <>
                            <button
                                onClick={() => navigate('/dashboard/manage-recruiters/details', {
                                    state: {emp, company}
                                })}
                                className='btn btn-link mr-6 normal-case text-base min-h-0 h-9 tracking-wider'>
                                View
                            </button>
                            <button
                                onClick={() => handleDelete(emp)}
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

export default ARecruiter;