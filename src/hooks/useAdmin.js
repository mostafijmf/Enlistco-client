import axios from "axios";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";

const useAdmin = () => {
    const [user] = useAuthState(auth);
    const [admin, setAdmin] = useState([]);
    const [adminLoading, setAdminLoading] = useState(true);

    useEffect(()=>{
        const email = user?.email;
        if(email){
            const url = `https://boiling-beach-14928.herokuapp.com/admin/${email}`;
            axios.get(url)
            .then(res => {
                setAdmin(res.data);
                setAdminLoading(false)
            })
            .catch(err => {});
        }
    },[user]);
    return [admin, adminLoading];
};

export default useAdmin;