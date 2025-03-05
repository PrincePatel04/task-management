export interface LoginFormValues {
    username: string;
    password: string;
}

export interface AuthData {
    accessToken: string;
    refreshToken: string;
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
}
