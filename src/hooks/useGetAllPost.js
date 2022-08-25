import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

const useGetAllPost = () => {
    const [allPost, setAllPost] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        axios.get('https://enlistco.co.in/api/post')
        .then(res => {
            setAllPost(res.data);
            setLoading(false)
        })
        .catch(err => {
            setLoading(false);
        });
    },[allPost]);

    return [allPost, loading];
};

export default useGetAllPost;