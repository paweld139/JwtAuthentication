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

function App() {
    const [userName, setUserName] = useState<string | null>(null);

    const navigate = useNavigate();

    const logout = useCallback(() => {
        const logout = async () => {
            await fetch('/logout', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            });

            localStorage.removeItem('token');

            localStorage.removeItem('refreshToken');

            navigate('/login');
        };

        logout();
    }, [navigate]);

    const isLogged = !!localStorage.getItem('token');

    useEffect(() => {
        const updateUserName = async () => {
            const response = await fetch('/api/user/name', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                const text = await response.text();

                setUserName(text);
            }
            else {
                const refreshToken = localStorage.getItem('refreshToken');

                if (!refreshToken) {
                    logout();
                }

                const response = await fetch('/refresh', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ refreshToken })
                });

                if (response.ok) {
                    const body = await response.json();

                    localStorage.setItem('token', body.accessToken);

                    localStorage.setItem('refreshToken', body.refreshToken);

                    updateUserName();
                }
                else {
                    logout();
                }
            }
        }

        if (isLogged) {
            updateUserName();
        }
    }, [isLogged, logout]);

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