import {
    LoginModel,
    RegisterModel
} from "./interfaces";

export const logout = async (
    navigate: (to: string) => void 
) => {
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

const handleRefreshToken = async (
    navigate: (to: string) => void,
    callback: () => void
) => {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
        logout(navigate);
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

        callback();
    }
    else {
        logout(navigate);
    }
};

export const updateUserName = async (
    setUserName: (userName: string) => void,
    navigate: (to: string) => void
) => {
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
        handleRefreshToken(navigate, () => updateUserName(setUserName, navigate));
    }
};

export const login = async (
    data: LoginModel,
    setError: (error: string) => void,
    navigate: (to: string) => void
) => {
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
};

export const register = async (
    form: RegisterModel,
    setError: (error: string) => void,
    goToLogin: () => void
) => {
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