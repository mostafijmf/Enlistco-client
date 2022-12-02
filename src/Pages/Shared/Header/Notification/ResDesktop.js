import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResDesktop = ({ usersData, setOpenProfile, openNotification, setOpenNotification }) => {
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();


    // =============Get Notifications=============
    useEffect(() => {
        axios.get('https://api.enlistco.co.in/notifications', {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('user_token')
            }
        })
            .then(res => {
                setNotifications(res.data);
            })
            .catch(err => { });
    }, [notifications]);

    const notifyAdmin = notifications?.filter(adm => adm.notifyAdmin);
    const notifyPermission = notifications?.filter(p => p.permission);
    const notifySeeker = notifyPermission?.filter(n => n.notifyUsers.indexOf(usersData?._id) === -1);


    // Admin seen notification event
    const adminSeenNotif = async (id, postId) => {
        await axios.put(`https://api.enlistco.co.in/admin_seen_notification/${id}`,
            { notifyAdmin: false, postEdited: false },
            {
                method: 'PUT',
                headers: {
                    'Authorization': localStorage.getItem('user_token')
                }
            })
            .then(res => {
                res && navigate('/dashboard/manage-job-post', {
                    state: postId
                })
            })
            .catch(err => {
                if (err?.response?.data?.logout) {
                    localStorage.removeItem('user_token');
                    return navigate('/login');
                }
            });
    };

    // Seeker seen notification event
    const seekerSeenNotif = async (id, postId) => {
        await axios.put(`https://api.enlistco.co.in/seeker_seen_notification/${id}`,
            { seekerId: usersData?._id },
            {
                method: 'PUT',
                headers: {
                    'Authorization': localStorage.getItem('user_token')
                }
            })
            .then(res => {
                res && navigate(`/job/${postId}`)
            })
            .catch(err => {
                if (err?.response?.data?.logout) {
                    localStorage.removeItem('user_token');
                    return navigate('/login');
                }
            });
    };


    return (
        <li
            onClick={() => {
                setOpenNotification(!openNotification);
                setOpenProfile(false)
            }}
            className='text-gray-500 text-base relative'
        >
            {/* ------------Admin notification bell------------ */}
            {usersData?.admin &&
                notifyAdmin.length !== 0 &&
                <span className='absolute -top-2 left-3 z-10 text-xs font-medium bg-accent text-white px-2 py-0.5 rounded-full'>{
                    notifyAdmin.length > 20 ? '20+' : notifyAdmin.length
                }</span>
            }
            {/* ------------Seeker notification bell------------ */}
            {(usersData?.seeker && !usersData?.admin) &&
                notifySeeker.length !== 0 &&
                <span className='absolute -top-2 left-3 z-10 text-xs font-medium bg-accent text-white px-2 py-0.5 rounded-full'>{
                    notifySeeker.length > 20 ? '20+' : notifySeeker.length
                }</span>
            }

            {/* ------------Notification Icon------------ */}
            <div
                className="w-8 h-full cursor-pointer hover:text-primary notification_icon">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor"
                    strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
            </div>

            <div
                className={`rounded bg-white shadow-lg w-96 absolute top-9 border right-0 ${openNotification ? 'block' : 'hidden'}`}
            >
                <h2 className='px-5 py-3 border-b text-lg text-gray-700 font-medium text-center'>Notifications</h2>
                <ul
                    className={`list-none 
                        ${usersData?.admin &&
                            notifyAdmin.length > 10 ?
                            'h-[calc(100vh-8.5rem)] overflow-y-auto scrollBar-sm'
                            : 'h-max'} 
                        ${(usersData?.seeker && !usersData?.admin) &&
                            notifySeeker.length > 10 ?
                            'h-[calc(100vh-8.5rem)] overflow-y-auto scrollBar-sm'
                            : 'h-max'}`
                    }
                >
                    {/* ------------Admin notification list------------ */}
                    {usersData?.admin && <>
                        {
                            notifyAdmin.reverse().map(n => <li key={n._id}
                                onClick={() => adminSeenNotif(n._id, n.postId)}
                                className='w-full py-1 px-5 hover:bg-slate-100 hover:text-accent focus:bg-white focus:text-accent cursor-pointer'
                                to='/dashboard/manage-employers'>
                                <h3 className='font-medium text-base'>
                                    {n.jobTitle}
                                    <span className='ml-2 text-sm font-normal text-fuchsia-500 px-1'>{
                                        n.postEdited ? 'edited post' : 'new post'
                                    }</span>
                                </h3>
                                <p className='text-sm'>{n.company}</p>
                            </li>)
                        }
                        {
                            notifyAdmin.length === 0 && <li
                                className='w-full py-2 px-5 text-center'
                            >
                                There is no notifications.
                            </li>
                        }
                    </>}
                    {/* ------------Seeker notification list------------ */}
                    {(usersData?.seeker && !usersData?.admin) && <>
                        {
                            notifySeeker.reverse().map(n => <li key={n._id}
                                onClick={() => seekerSeenNotif(n._id, n.postId)}
                                className='w-full py-1 px-5 hover:bg-slate-100 hover:text-accent focus:bg-white focus:text-accent cursor-pointer'
                                to='/dashboard/manage-employers'>
                                <h3 className='font-medium text-base'>
                                    {n.jobTitle}
                                    <span className='ml-2 text-sm font-normal text-fuchsia-500 px-1'>new post</span>
                                </h3>
                                <p className='text-sm'>{n.company}</p>
                            </li>)
                        }
                        {
                            notifySeeker.length === 0 && <li className='w-full py-2 px-5 text-center'>
                                There is no notifications.
                            </li>
                        }
                    </>}
                </ul>
            </div>
        </li>
    );
};

export default ResDesktop;