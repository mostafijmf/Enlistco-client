import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';

const useGetUsers = () => {
    const [user] = useAuthState(auth);
    const [usersData, setUsersData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(()=>{
        const email = user?.email;
        if(email){
            const url = `https://boiling-beach-14928.herokuapp.com/users/${email}`;
            axios.get(url,{
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            .then(res => {
                setUsersData(res.data);
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
            });
        }
    },[user, usersData])

    return [usersData, loading];
};

export default useGetUsers;