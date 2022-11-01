import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useGetPost = () => {
    const [myPost, setMyPost] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://api.enlistco.co.in/post/get_single_post', {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('user_token')
            }
        })
            .then(res => {
                setMyPost(res.data);
                setLoading(false)
            })
            .catch(err => {
                err && setLoading(false);
            });
    }, [myPost, navigate]);

    return [myPost, loading];
};

export default useGetPost;