import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../config/axiosConfig';
import type { RegisterRequest } from '../types';

export const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const payload: RegisterRequest = {
                username,
                email,
                password,
                fullName,
            };

            await AuthService.register(payload);
            navigate('/login');
        } catch (error) {
            console.error('Error en el registro', error);
            alert('Error en el registro. Por favor, intenta nuevamente.');
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <h2>Register</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
            />
            <button type="submit">Registrarse</button>
            <p>
                ¿Ya tienes una cuenta? <Link to="/login">Login</Link>
            </p>
        </form>
    );
};