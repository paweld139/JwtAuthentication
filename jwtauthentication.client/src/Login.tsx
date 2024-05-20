import { useCallback, useState } from "react";
import {
    Alert,
    Button,
    Container,
    Form,
    FormGroup,
    Input,
    Label
} from "reactstrap";

interface Props {
    setAuthorized: (authorized: boolean) => void;
}

const Login = ({
    setAuthorized
}: Props) => {
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const [isValidationError, setIsValidationError] = useState(false);

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

            setAuthorized(true);
        }
        else {
            setIsValidationError(true);
        }
    }, [data, setAuthorized]);

    const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        login();
    }, [login]);

    return (
        <Container>
            <h1>Login</h1>

            <Alert color="danger" isOpen={isValidationError}>
                Invalid credentials
            </Alert>

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
        </Container>
    );
};

export default Login;