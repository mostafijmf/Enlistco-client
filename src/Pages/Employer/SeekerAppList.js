import React from 'react';
import { useNavigate } from 'react-router-dom';

const SeekerAppList = ({ p, index, setOpenModal }) => {
    const navigate = useNavigate();
    const { _id, seekerName, seekerEmail, seekerPhone, jobTitle, company, applied, coverLetter, subject, resume } = p;

    const handleCLetter = (coverLetter, subject) => {
        setOpenModal({ coverLetter, subject })
    };

    return (
        <tbody key={_id} className='border-b'>
            <tr>
                <th className='py-0 text-sm'>{index + 1}</th>
                <td className='py-0 text-sm'>
                    <button
                        className='btn btn-link normal-case font-normal p-0 min-h-0 h-auto'
                        onClick={() => navigate('/dashboard/seeker-profile', { state: seekerEmail })}
                    >
                        {seekerName}
                    </button>
                </td>
                <td className='py-0 text-sm'>{seekerEmail}</td>
                <td className='py-0 text-sm'>{seekerPhone}</td>
                <td className='py-0 text-sm'>{jobTitle}</td>
                <td className='py-0 text-sm'>{applied}</td>
                <td className='py-0'>
                    <button
                        onClick={() => handleCLetter(coverLetter, subject)}
                        className='btn btn-link pl-0 pr-2 normal-case text-sm'>
                        Cover-letter
                    </button>|
                    <button
                        onClick={() => navigate('/dashboard/seeker-resume', {
                            state:
                                { resume: resume, seekerName: seekerName }
                        })}
                        className='btn btn-link pl-2 pr-0 normal-case text-sm'>
                        Resume
                    </button>
                </td>
                <td className='py-0 text-sm'>
                    <button
                        onClick={() => navigate('/dashboard/seeker-applications/offer-letter', {
                            state: { _id, seekerEmail, seekerName, jobTitle, company }
                        })}
                        className='btn btn-link pl-0 pr-2 normal-case text-sm'>
                        Send offer letter
                    </button>
                </td>
            </tr>
        </tbody>
    )
};

export default SeekerAppList;