import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Layout from "../../components/ui/layout"
import { getDataFromCookie } from "@data-service";
import "./style.scss"

const index = () => {

    const navigate = useNavigate()
    function login() {
        if (!getDataFromCookie("token")) {
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
