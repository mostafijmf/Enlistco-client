import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';

const useGetUsers = () => {
    const [user] = useAuthState(auth);
    const [usersData, setUsersData] = useState([]);

    useEffect(()=>{
        const email = user?.email;
        if(email){
            const url = `http://localhost:5000/users/${email}`;
            fetch(url)
            .then(res => res.json())
            .then(data => setUsersData(data));
        }
    },[])

    return [usersData, setUsersData];
};

export default useGetUsers;