import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useGetSeekerApply = () => {
    const [seekerApplied, setSeekerApplied] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://api.enlistco.co.in/apply/seeker_applications`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('user_token')
            }
        })
            .then(res => {
                setSeekerApplied(res.data);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                // if (err?.response?.data?.logout) {
                //     localStorage.removeItem('user_token');
                //     return navigate('/login');
                // }
            });
    }, [seekerApplied, navigate]);
    return [seekerApplied, loading];
};

export default useGetSeekerApply;