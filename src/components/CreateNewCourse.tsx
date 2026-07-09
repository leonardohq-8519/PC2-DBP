import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CourseService } from '../config/axiosConfig';

export const CreateNewCourse = () => {
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [credits, setCredits] = useState<number | undefined>(undefined);
    const [grade, setGrade] = useState<number | undefined>(undefined);
    const [status, setStatus] = useState<'EN_CURSO' | 'APROBADO' | 'DESAPROBADO'>('EN_CURSO');
    const navigate = useNavigate();

    const handleCreateCourse = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = {
                name,
                code,
                credits,
                grade,
                status,
            };
            await CourseService.createCourse(payload);
            navigate('/dashboard');
        } catch (error) {
            console.error('Error al crear el curso', error);
            alert('Error al crear el curso. Por favor, intenta nuevamente.');
        }
    };

    return (
        <form onSubmit={handleCreateCourse}>
            <h2>Crear Nuevo Curso</h2>
            <input
                type="text"
                placeholder="Nombre del Curso"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Código del Curso"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Créditos"
                value={credits}
                onChange={(e) => setCredits(Number(e.target.value))}
            />
            <input
                type="number"
                placeholder="Nota"
                value={grade}
                onChange={(e) => setGrade(Number(e.target.value))}
            />
            <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'EN_CURSO' | 'APROBADO' | 'DESAPROBADO')}
            >
                <option value="EN_CURSO">EN_CURSO</option>
                <option value="APROBADO">APROBADO</option>
                <option value="DESAPROBADO">DESAPROBADO</option>
            </select>
            <button type="submit">Crear Curso</button>
        </form>
    );
}