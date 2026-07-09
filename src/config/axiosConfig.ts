import axios from 'axios';
import type {LoginRequest, RegisterRequest} from '../types';
const api = axios.create({
    baseURL: '',
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
    if (token){
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const AuthService = {
    login: (credentials: LoginRequest) => api.post('/auth/login', credentials),
    register: (data: RegisterRequest) => api.post('/auth/register', data)
}

export const CourseService = {
    getCourses: () => api.get('/courses'),
    getCourse: (id: number) => api.get(`/courses/${id}`),
    createCourse: (data: any) => api.post('/courses', data),
    updateCourse: (id: number, data: any) => api.patch(`/courses/${id}`, data),
    deleteCourse: (id: number) => api.delete(`/courses/${id}`),
}