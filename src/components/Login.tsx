import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {AuthService} from '../config/axiosConfig';

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            const response = await AuthService.login({username, password});
            const {token} = response.data;
            login(token);
            navigate('/dashboard');
        }catch(error){
            console.error('Error en el login', error);
            alert('Error en el login. Por favor, verifica tus credenciales.');
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Login</button>
            <p>
                ¿Aun no tienes una cuenta? <Link to="/register">Registrarse</Link>
            </p>
        </form>
    );


}

