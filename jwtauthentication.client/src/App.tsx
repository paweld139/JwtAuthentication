import { useEffect, useState } from "react";

import Login from "./Login";

import Home from "./Home";

function App() {
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            setAuthorized(true);
        }
    }, []);

    return (
        !authorized ? <Login setAuthorized={setAuthorized} /> : <Home />
    );
}

export default App;