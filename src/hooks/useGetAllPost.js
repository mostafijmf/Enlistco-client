import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

const useGetAllPost = () => {
    const [allPost, setAllPost] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        axios.get('https://boiling-beach-14928.herokuapp.com/post')
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