import axios from "axios";
import type {CheckInRequest, CheckinRequest} from "../Types/ActivateCategory.ts";

const API_URL = 'http://localhost:8080/api/v1/timeentry';

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

export const checkOut = async (request: CheckinRequest) => {
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

export const getCategoryStatistics = async (userId: number, categoryId: number) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/statistics/weekly/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
        const allStatistics = response.data.data || [];
        const categoryStats = allStatistics.filter((stat: any) =>
            stat.categoryName === categoryId.toString()
        );
        return {
            success: response.data.success,
            message: response.data.message,
            data: categoryStats,
        }
    } catch (error) {
        // @ts-ignore
        throw new error('Failed to fetch category statistics');
    }

}