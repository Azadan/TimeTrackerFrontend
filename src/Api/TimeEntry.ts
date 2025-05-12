import axios from "axios";
import type {CheckInRequest, CheckoutRequest} from "../Types/ActivateCategory.ts";

const API_URL = 'https://king-prawn-app-mtxis.ondigitalocean.app/api/v1/timeentry';

export const checkIn = async (request: CheckInRequest) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${API_URL}/checkin`, request, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        // @ts-ignore
        throw new error('Failed to check in');
    }
}

export const checkOut = async (request: CheckoutRequest) => {
    try {
        const token = localStorage.getItem('token');
        const reponse = await axios.post(`${API_URL}/checkout`, request, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
        return reponse.data;
    } catch (error) {
        // @ts-ignore
        throw new error('Failed to check out');
    }
}

export const getCategoryStatistics = async (userId: number) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/statistics/weekly/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
        return {
            success: response.data.success,
            message: response.data.message,
            data: response.data.data || [],
        }
    } catch (error) {
        // @ts-ignore
        throw new error('Failed to fetch category statistics');
    }
}

export const getActiveTimeEntry = async (userId: number) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/active/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching active time entry:", error);
        throw new Error('Failed to fetch active time entry');
    }
};