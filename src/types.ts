type status = "EN_CURSO" | "APROBADO" | "DESAPROBADO";

export interface LoginRequest{
    username: string;
    password: string;
}

export interface RegisterRequest{
    username : string;
    email : string;
    password : string;
    fullName : string;
}

export interface AuthResponse{
    token?: string;
}

export interface CourseRequest{
    name : string;
    code : string;
    credits?: number;
    grade?: number;
    status? : status;
}

export interface CourseResponse{
    id?: number;
    name?: string;
    code?: string;
    credits?: number;
    grade?: number;
    status? : status;
}