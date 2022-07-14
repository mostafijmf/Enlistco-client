import { useEffect } from 'react';
import { useState } from 'react';

const useGetAllPost = () => {
    const [allPost, setAllPost] = useState([]);

    useEffect(()=>{
        fetch('https://boiling-beach-14928.herokuapp.com/post')
        .then(res => res.json())
        .then(data => setAllPost(data))
    },[allPost]);

    return [allPost, setAllPost];
};

export default useGetAllPost;