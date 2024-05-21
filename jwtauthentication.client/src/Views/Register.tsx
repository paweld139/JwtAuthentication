import { useState } from "react";

import {
    Alert,
    Button,
    Container,
    Form,
    FormFeedback,
    FormGroup,
    Input,
    Label
} from "reactstrap";

import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState<string | null>(null);

    const goToLogin = () => navigate('/login');

    const register = async () => {
        const response = await fetch('register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });

        if (response.ok) {
            goToLogin();
        } else {
            const body = await response.json();

            setError(Object.values(body.errors as { [key: string]: string }).join('<br />'));
        }
    };

    const isInvalid = form.confirmPassword !== '' && form.password !== form.confirmPassword;

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isInvalid) {
            return;
        }

        register();
    };

    return (
        <Container>
            <h1>Register</h1>

            {error && (
                <Alert color="danger">
                    <div dangerouslySetInnerHTML={{ __html: error }} />
                </Alert>
            )}


            <Form onSubmit={onSubmit}>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                        type="email"
                        name="email"
                        id="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                        type="password"
                        name="password"
                        id="password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        required
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="confirmPassword">Confirm Password</Label>
                    <Input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={form.confirmPassword}
                        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                        invalid={isInvalid}
                        required
                    />
                    <FormFeedback>Passwords must match</FormFeedback>
                </FormGroup>

                <Button>Register</Button>
            </Form>

            <Button color="link" onClick={goToLogin}>Login</Button>
        </Container>
    );
};

export default Register;