export interface LoginModel {
    email: string;
    password: string;
}

export interface RegisterModel {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface FormInput<T> {
    name: keyof T;
    label: string;
    type: 'text' | 'email' | 'password';
    required?: boolean;
    isInvalid?: boolean;
    errorMessage?: string;
}