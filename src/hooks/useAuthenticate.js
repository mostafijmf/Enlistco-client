import axios from "axios";
import { useEffect, useState } from "react";

const useAuthenticate = () => {
    const [getUserAuth, setGetUserAuth] = useState();
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        axios.get('https://api.enlistco.co.in/logged-in', {
            method: 'GET',
            headers: {
                'Authorization': localStorage.getItem('user_token')
            }
        })
            .then(res => {
                setGetUserAuth(res.data);
                setLoading(false);
            })
            .catch(err => {
                err && setLoading(false);
            });
    }, [])

    return [getUserAuth, loading];
};

export default useAuthenticate;