import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useGetUsers = () => {
    const [usersData, setUsersData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('https://api.enlistco.co.in/users/get_single_user', {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('user_token')
            }
        })
            .then(res => {
                setUsersData(res.data);
                setLoading(false)
            })
            .catch(err => {
                setLoading(false);
            });
    }, [usersData, navigate]);

    return [usersData, loading];
};

export default useGetUsers;