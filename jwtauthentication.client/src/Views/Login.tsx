import {
    useCallback,
    useState
} from "react";

import {
    Alert,
    Button,
    Container
} from "reactstrap";

import {
    useNavigate
} from "react-router-dom";

import {
    login as executeLogin
} from "../requests";

import {
    LoginModel
} from "../interfaces";

import AppForm from "../components/AppForm";

const Login = () => {
    const navigate = useNavigate();

    const [data, setData] = useState<LoginModel>({
        email: "",
        password: ""
    });

    const [error, setError] = useState<string | null>(null);

    const login = useCallback(() => executeLogin(data, setError, navigate), [data, navigate]);

    const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        login();
    }, [login]);

    const goToRegister = useCallback(() => navigate('/register'), [navigate]);

    return (
        <Container>
            <h1>Login</h1>

            {error && <Alert color="danger">{error}</Alert>}

            <AppForm
                onSubmit={onSubmit}
                data={data}
                setData={setData}
                buttonText="Submit"
                inputs={[
                    {
                        name: "email",
                        label: "Email",
                        type: "email",
                        required: true
                    },
                    {
                        name: "password",
                        label: "Password",
                        type: "password",
                        required: true
                    }
                ]}
            />

            <Button color="link" onClick={goToRegister}>Register</Button>
        </Container>
    );
};

export default Login;