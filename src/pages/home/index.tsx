import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Layout from "../../components/ui/layout"
import "./style.scss"

const index = () => {
    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    function login() {
        if (!token) {
            navigate('/signin')
        }
    }

    useEffect(() => {
        login()
    }, [])
    return (
        <>
            <Layout/>
        </>
    );
};

export default index;
