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

export const logout = () :void => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
}

export const isAuthenticated = (): boolean => {
    const token = getAuthToken();
    return token !== null;
}

export const setUserId = (userId: number) :void => {
    localStorage.setItem('userId', userId.toString());
}

export const decodeToken = (token: string): JwtPayload => {
    try {
        return jwtDecode<JwtPayload>(token);
    } catch (error) {
        console.error('Error decoding JWT:', error);
        throw new Error('Error decoding JWT');
    }
}

export const getUserIdFromToken = (token: string) : number => {
    try {
        const decodedToken = decodeToken(token);
        if (!decodedToken.userId) {
            throw new Error('User ID not found in token');
        }
        return decodedToken.userId;
    } catch (error) {
        console.error('Error getting user ID from token:', error);
        throw new Error('Error getting user ID from token');
    }
}

export const getEmailFromToken = (token: string) : string => {
    try {
        const decodedToken = decodeToken(token);
        if (!decodedToken.email) {
            throw new Error('Email not found in token');
        }
        return decodedToken.email;
    } catch (error) {
        console.error('Error getting email from token:', error);
        throw new Error('Error getting email from token');
    }
}



export const isTokenExpired = (token: string) : boolean => {
    try {
        const decodedToken = decodeToken(token);
        if (!decodedToken.expiration) return true;

        const currentTime = Date.now() / 1000;
        return decodedToken.expiration < currentTime;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return true
    }

}

export const formatJwt = (token: string) : string => {
    try {
        const decodedToken = decodeToken(token);
        return JSON.stringify({
            email: decodedToken.email,
            userId: decodedToken.userId,
            isAdmin: decodedToken.isAdmin,
            issuedAt: new Date(decodedToken.issuedAt * 1000).toLocaleString(),
            expiration: decodedToken.expiration * 1000 < Date.now()
        }, null, 2);
    } catch (error) {
        console.error('Error formatting JWT:', error);
        throw new Error('Error formatting JWT');
    }
}

export const isUserAdmin = (token: string): boolean => {
    try {
        const decodedToken = decodeToken(token);
        return !!decodedToken.isAdmin;
    } catch (error) {
        console.error('Error checking admin status:', error);
        return false;
    }
}