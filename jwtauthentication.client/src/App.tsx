import {
    Route,
    Routes,
    useNavigate
} from "react-router-dom";

import AppRoutes from "./AppRoutes";

import {
    Navbar,
    NavbarBrand,
    NavbarText
} from "reactstrap";

import {
    useCallback,
    useEffect,
    useState
} from "react";

import {
    logout as executeLogout,
    updateUserName
} from "./requests";

function App() {
    const [userName, setUserName] = useState<string | null>(null);

    const navigate = useNavigate();

    const logout = useCallback(() => executeLogout(navigate), [navigate]);

    const isLogged = !!localStorage.getItem('token');

    useEffect(() => {
        if (isLogged) {
            updateUserName(setUserName, navigate);
        }
    }, [isLogged, logout, navigate]);

    return (
        <>
            <Navbar color="dark" dark>
                <NavbarBrand href="/">JWT</NavbarBrand>
                {isLogged && <NavbarText>Hi {userName}! <span role="button" onClick={logout}>Logout</span></NavbarText>}
            </Navbar>

            <Routes>
                {AppRoutes.map((route) => <Route key={route.name} {...route} />)}
            </Routes>
        </>
    );
}

export default App;