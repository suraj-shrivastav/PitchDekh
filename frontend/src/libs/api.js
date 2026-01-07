import axios from "axios";
import { supabase } from "./supabaseClient";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request Interceptor: Attach Supabase JWT to every request
api.interceptors.request.use(async (config) => {
    const { data: { session } } = await supabase.auth.getSession();

    if (session?.access_token) {
        config.headers.Authorization = `Bearer ${session.access_token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response Interceptor: Global error handling
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const message = error.response?.data?.message || error.message;
        console.error("API Error:", message);
        return Promise.reject(error);
    }
);