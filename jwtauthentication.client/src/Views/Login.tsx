import {
    useCallback,
    useState
} from "react";

import {
    Alert,
    Button,
    Container,
    Form,
    FormGroup,
    Input,
    Label
} from "reactstrap";

import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState<string | null>(null);

    const login = useCallback(async () => {
        const response = await fetch("login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const body = await response.json();

        if (response.ok) {
            localStorage.setItem("token", body.accessToken);

            localStorage.setItem("refreshToken", body.refreshToken);

            navigate("/");
        }
        else {
            setError('Invalid credentials');
        }
    }, [data, navigate]);

    const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        login();
    }, [login]);

    const goToRegister = useCallback(() => navigate('/register'), [navigate]);

    return (
        <Container>
            <h1>Login</h1>

            {error && <Alert color="danger">{error}</Alert>}

            <Form onSubmit={onSubmit}>
                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input
                        type="text"
                        id="username"
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                        required
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                        type="password"
                        id="password"
                        onChange={(e) => setData({ ...data, password: e.target.value })}
                        required
                    />
                </FormGroup>

                <Button>Submit</Button>
            </Form>

            <Button color="link" onClick={goToRegister}>Register</Button>
        </Container>
    );
};

export default Login;