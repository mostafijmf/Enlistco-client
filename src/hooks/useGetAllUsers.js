import { useEffect, useState } from 'react';

const useGetAllUsers = () => {
    const [allUsers, setAllUsers] = useState([]);

    useEffect(()=>{
        fetch('https://boiling-beach-14928.herokuapp.com/users')
        .then(res => res.json())
        .then(data => setAllUsers(data))
    },[allUsers]);
    return [allUsers, setAllUsers];
};

export default useGetAllUsers;