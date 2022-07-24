import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SeekerAppList = ({ p, seekerApplyList, setOpenModal }) => {

    const post = seekerApplyList.filter(a => a.postID === p._id);
    const navigate = useNavigate();
    const handleCLetter = (coverLetter, subject) => {
        setOpenModal({coverLetter, subject})
    };

    return <>{
        post.map((sp, index) => <tbody key={sp._id} className='border-b'>
            <tr>
                <th className='py-0'>{index + 1}</th>
                <td className='py-0'>{sp.seekerName}</td>
                <td className='py-0'>{sp.seekerEmail}</td>
                <td className='py-0'>{sp.jobTitle}</td>
                <td className='py-0'>{sp.applied}</td>
                <td className='py-0'>
                    <button onClick={() => handleCLetter(sp.coverLetter, sp.subject)} className='btn btn-link pl-0 pr-2 normal-case text-lg'>Cover-letter</button>|
                    <button onClick={() => navigate('/dashboard/seeker-resume', { state: 
                        {resume: sp.resume, seekerName: sp.seekerName} })} className='btn btn-link pl-2 pr-0 normal-case text-lg'>Resume</button>
                </td>
            </tr>
        </tbody>)}
    </>;
};

export default SeekerAppList;