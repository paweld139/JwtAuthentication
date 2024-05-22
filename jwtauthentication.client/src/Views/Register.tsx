import {
    useState,
    useCallback,
    useMemo
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
    register as executeRegister
} from "../requests";

import {
    RegisterModel
} from "../interfaces";

import AppForm from "../components/AppForm";

const Register = () => {
    const navigate = useNavigate();

    const [data, setData] = useState<RegisterModel>({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState<string | null>(null);

    const goToLogin = useCallback(() => navigate('/login'), [navigate]);

    const register = useCallback(() => executeRegister(data, setError, goToLogin), [data, goToLogin]);

    const isInvalid = useMemo(() => data.confirmPassword !== '' && data.password !== data.confirmPassword, [data]);

    const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isInvalid) {
            return;
        }

        register();
    }, [isInvalid, register]);

    return (
        <Container>
            <h1>Register</h1>

            {error && (
                <Alert color="danger">
                    <div dangerouslySetInnerHTML={{ __html: error }} />
                </Alert>
            )}

            <AppForm
                onSubmit={onSubmit}
                data={data}
                setData={setData}
                buttonText="Register"
                inputs={[
                    {
                        name: 'email',
                        label: 'Email',
                        type: 'email',
                        required: true
                    },
                    {
                        name: 'password',
                        label: 'Password',
                        type: 'password',
                        required: true
                    },
                    {
                        name: 'confirmPassword',
                        label: 'Confirm Password',
                        type: 'password',
                        required: true,
                        isInvalid,
                        errorMessage: 'Passwords must match'
                    }
                ]}
            />

            <Button color="link" onClick={goToLogin}>Login</Button>
        </Container>
    );
};

export default Register;