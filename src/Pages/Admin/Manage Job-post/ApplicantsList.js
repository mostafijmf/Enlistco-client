import React from 'react';
import { useNavigate } from 'react-router-dom';

const ApplicantsList = ({ items, index }) => {
    const {
        _id,
        seekerName,
        seekerEmail,
        seekerPhone,
        jobTitle,
        applied
    } = items;

    const navigate = useNavigate();

    return (
        <tbody key={_id} className='border-b'>
            <tr>
                <th className='py-3 text-sm'>{index + 1}</th>
                <td className='py-3 text-sm'>
                    <button
                        className='btn btn-link normal-case font-normal p-0 min-h-0 h-auto'
                        onClick={() => navigate('/dashboard/seeker-profile', { state: seekerEmail })}
                    >
                        {seekerName}
                    </button>
                </td>
                <td className='py-3 text-sm'>{seekerEmail}</td>
                <td className='py-3 text-sm'>{seekerPhone}</td>
                <td className='py-3 text-sm'>{jobTitle}</td>
                <td className='py-3 text-sm'>{applied}</td>
            </tr>
        </tbody>
    );
};

export default ApplicantsList;