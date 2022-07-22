import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

const useGetAllPost = () => {
    const [allPost, setAllPost] = useState([]);

    useEffect(()=>{
        axios.get('https://boiling-beach-14928.herokuapp.com/post')
        .then(res => {
            setAllPost(res.data)
        })
        .catch(err => {
            console.log(err)
        });
    },[allPost]);

    return [allPost, setAllPost];
};

export default useGetAllPost;