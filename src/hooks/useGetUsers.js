import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';

const useGetUsers = () => {
    const [user] = useAuthState(auth);
    const [usersData, setUsersData] = useState([]);
    
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
                setUsersData(res.data)
            })
            .catch(err => {});
        }
    },[user, usersData])

    return [usersData, setUsersData];
};

export default useGetUsers;