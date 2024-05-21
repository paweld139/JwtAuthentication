import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div>
            <h1>Home</h1>
        </div>
    );
};

export default Home;