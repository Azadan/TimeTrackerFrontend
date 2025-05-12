import type {createCategoryRequest} from "../Types/Category.ts";
import axios from "axios";

const API_URL = 'https://king-prawn-app-mtxis.ondigitalocean.app/api/v1/category';

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


export const updateCategory = async (categoryId: number, data: createCategoryRequest) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.put(`${API_URL}/update/${categoryId}`, data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        // @ts-ignore
        throw new Error('Failed to update category');
    }
}