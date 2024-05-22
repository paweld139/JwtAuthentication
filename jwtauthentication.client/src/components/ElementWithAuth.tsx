import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

interface Props {
    element: JSX.Element;
}

const ElementWithAuth = ({
    element
}: Props) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    return element;
}

export default ElementWithAuth;