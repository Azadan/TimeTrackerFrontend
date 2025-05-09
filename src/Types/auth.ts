export type LoginRequest = {
    email: string;
    password: string;
}

export type RegisterRequest = {
    email: string
    password: string;
    isAdmin?: boolean
}

export type RegisterResponse = {
    message: string;
    success: boolean;
    data: {
        userId: string;
        email: string;
        isAdmin: boolean;
    }
}

export type AuthResponse = {
    jwt: string;
}

export type ApiResponse<T> = {
    message : string;
    success: boolean;
    data: T;
}

export type JwtPayload = {
    email: string;
    userId: number;
    isAdmin?: boolean;
    issuedAt: number
    expiration: number;
}