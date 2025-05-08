import {jwtDecode} from "jwt-decode";
import type {JwtPayload} from "../Types/auth.ts";

export const setAuthToken = (token: string) :void => {
    localStorage.setItem('token', token);
}
export const getAuthToken = (): string | null => {
    return localStorage.getItem('token');
}

export const deleteAuthToken = () :void => {
    localStorage.removeItem('token');
}

export const isAuthenticated = (): boolean => {
    const token = getAuthToken();
    return token !== null;
}

export const decodeToken = (token: string): JwtPayload => {
    try {
        return jwtDecode<JwtPayload>(token);
    } catch (error) {
        console.error('Error decoding JWT:', error);
        throw new Error('Error decoding JWT');
    }
}

