import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Spinner from '../../Shared/Spinner';
import ApplicantsList from './ApplicantsList';

const ViewApplicants = () => {
    const location = useLocation();
    const appliedID = location?.state;
    const [appliedList, setAppliedList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://boiling-beach-14928.herokuapp.com/admin-applied-list/${appliedID}`)
            .then(res => {
                setAppliedList(res.data);
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
            });
    }, [appliedID]);

    if (loading) {
        return <div className='h-screen w-full flex items-center justify-center'>
            <Spinner></Spinner>
        </div>
    };

    if (appliedList.length === 0) {
        return <div className='h-96 w-11/12 mx-auto flex flex-col justify-center gap-5 items-center'>
            <h1 className='md:text-4xl sm:text-3xl text-2xl text-center text-gray-500'>No one has applied yet.</h1>
        </div>
    };

    return (
        <section>
            <h1 className='text-center text-2xl font-medium text-accent my-3'>Applicants</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th className='bg-slate-100 py-3 rounded-l-none normal-case text-base font-medium'>({appliedList.length})</th>
                            <th className='bg-slate-100 py-3 normal-case text-base font-medium'>Name</th>
                            <th className='bg-slate-100 py-3 normal-case text-base font-medium'>Seeker email</th>
                            <th className='bg-slate-100 py-3 normal-case text-base font-medium'>Phone number</th>
                            <th className='bg-slate-100 py-3 normal-case text-base font-medium'>Job title</th>
                            <th className='bg-slate-100 py-3 rounded-r-none normal-case text-base font-medium'>Applied</th>
                        </tr>
                    </thead>
                    {
                        appliedList.map((items, index) => <ApplicantsList
                            key={index} items={items}
                            index={index}>
                        </ApplicantsList>)
                    }
                </table>
            </div>
        </section>
    );
};

export default ViewApplicants;