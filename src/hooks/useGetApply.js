import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';

const useGetApply = () => {
    const [user] = useAuthState(auth);
    const [applied, setApplied] = useState([]);
    useEffect(()=>{
        const email = user?.email;
        if(email){
            axios.get(`https://boiling-beach-14928.herokuapp.com/apply/${email}`)
            .then(res => {
                setApplied(res.data)
            })
            .catch(err => {});
        };
    },[user, applied]);
    return [applied, setApplied];
};

export default useGetApply;