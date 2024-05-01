import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./style.scss"

const index = () => {

    const navigate = useNavigate()
    function login() {
        if (!localStorage.getItem('token')) {
            navigate('/signin')
        }
    }

    useEffect(() => {
        login()
    }, [])
    return (
        <>
            Home
        </>
    );
};

export default index;
