import axios from "axios";
import {getAuthToken} from "../Utilities/Auth.ts";

const API_URL = 'https://king-prawn-app-mtxis.ondigitalocean.app/api/v1/user';

export const getAllUsers = async () => {
    try {
        const token = getAuthToken();
        const response = await axios.get(`${API_URL}/find/all`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        // @ts-ignore
        throw new error('Failed to fetch category statistics');
    }
}

export const getUserById = async (userId: number) => {
    try {
        const token = getAuthToken();
        if (!token) {
            throw new Error('Authentication token not found');
        }

        const response = await axios.get(`${API_URL}/find/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        console.error(`Error fetching user ${userId}:`, error);
        throw error;
    }
};