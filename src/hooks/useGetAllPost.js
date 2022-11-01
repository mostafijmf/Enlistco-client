import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useGetAllPost = () => {
    const [allPost, setAllPost] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get('https://api.enlistco.co.in/post', {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('user_token')
            }
        })
        .then(res => {
            setAllPost(res.data);
            setLoading(false)
        })
        .catch(err => {
            setLoading(false);
        });
    },[allPost, navigate]);

    return [allPost, loading];
};

export default useGetAllPost;