import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAdmin = () => {
    const [admin, setAdmin] = useState([]);
    const [adminLoading, setAdminLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://api.enlistco.co.in/admin', {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('user_token')
            }
        })
            .then(res => {
                setAdmin(res.data);
                setAdminLoading(false)
            })
            .catch(err => {
                setAdminLoading(false);
                if (err?.response?.data?.logout) {
                    localStorage.removeItem('user_token');
                    return navigate('/login');
                }
            });
    }, [admin, navigate]);
    return [admin, adminLoading];
};

export default useAdmin;