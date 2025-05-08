import axios from 'axios';
import type {LoginRequest, RegisterRequest, AuthResponse, ApiResponse, RegisterResponse} from "../Types/auth.ts";

const API_URL = 'http://localhost:8080/api/v1/auth';

export const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
    try {
        const response = await axios.post<AuthResponse>(`${API_URL}/login`, credentials);
        return response.data;
    } catch (error) {
        // @ts-ignore
        throw new error('Login failed');
    }
}

export const register = async (userData: RegisterRequest): Promise<ApiResponse<RegisterResponse>> => {
    try {
        const response = await axios.post<ApiResponse<RegisterResponse>>(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        // @ts-expect-error
        throw new error('Registration failed');
    }
}