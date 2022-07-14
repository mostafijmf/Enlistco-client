import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';

const useGetPost = () => {
    const [user] = useAuthState(auth);
    const [myPost, setMyPost] = useState([]);

    useEffect(() => {
        const email = user?.email;
        const url = `https://boiling-beach-14928.herokuapp.com/post/${email}`;
        fetch(url, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => setMyPost(data))
    }, [myPost]);

    return [myPost];
};

export default useGetPost;