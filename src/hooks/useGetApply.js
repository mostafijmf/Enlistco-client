import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useGetApply = () => {
    const [applied, setApplied] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://api.enlistco.co.in/apply/get_single_apply`, {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('user_token')
            }
        })
            .then(res => {
                setApplied(res.data);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                // if (err?.response?.data?.logout) {
                //     localStorage.removeItem('user_token');
                //     return navigate('/login');
                // }
            });
    }, [applied, navigate]);
    return [applied, loading];
};

export default useGetApply;