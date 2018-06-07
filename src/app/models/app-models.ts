export interface LoginEvent {
    action: string,
    success: boolean,
}

export interface LoginUser {
    username: string;
    password: string;
}

export interface SignUpUser {
    email: string;
    username: string;
    password: string;
}
