import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';

const useGetPost = () => {
    const [user] = useAuthState(auth);
    const [myPost, setMyPost] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const email = user?.email;
        const url = `https://boiling-beach-14928.herokuapp.com/post/${email}`;
            axios.get(url,{
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            .then(res => {
                setMyPost(res.data);
                setLoading(false)
            })
            .catch(err => {
                setLoading(false)
            });
    }, [user, myPost]);

    return [myPost, loading];
};

export default useGetPost;