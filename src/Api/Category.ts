import type {createCategoryRequest} from "../Types/Category.ts";
import axios from "axios";

const API_URL = 'http://localhost:8080/api/v1/category';

export const createCategory = async (categoryData: createCategoryRequest) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${API_URL}/create`, categoryData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        // @ts-ignore
        throw new error('Failed to create category');
    }
}

export const getCategories = async (userId: number) => {
    try {
        const token = localStorage.getItem('token');
        console.log("Finns det en token här: ", token);
        const response = await axios.get(`${API_URL}/find/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        // @ts-ignore
        throw new error('Failed to fetch categories');
    }
}