import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { CourseService } from '../config/axiosConfig';
import type { CourseRequest } from '../types';

export const CourseDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [course, setCourse] = useState<any>(null);
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [credits, setCredits] = useState<number | undefined>(undefined);
    const [grade, setGrade] = useState<number | undefined>(undefined);
    const [status, setStatus] = useState<'EN_CURSO' | 'APROBADO' | 'DESAPROBADO'>('EN_CURSO');

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await CourseService.getCourse(Number(id));
                setCourse(response.data);
                setName(response.data.name);
                setCode(response.data.code);
                setCredits(response.data.credits);
                setGrade(response.data.grade);
                setStatus(response.data.status);
            } catch (error) {
                console.error('Error al traer el curso', error);
            }
        };

        fetchCourse();
    }, [id]);

    const handleUpdate = async () => {
        try {
            const payload: CourseRequest = { name, code, credits, grade, status };
            await CourseService.updateCourse(Number(id), payload);
            alert('Curso actualizado exitosamente');
        } catch (error) {
            console.error('Error al actualizar el curso', error);
            alert('Error al actualizar el curso. Por favor, intenta nuevamente.');
        }
    };

    const handleDelete = async () => {
        try {
            await CourseService.deleteCourse(Number(id));
            alert('Curso eliminado exitosamente');
            navigate('/dashboard');
        }
        catch (error) {
            console.error('Error al eliminar el curso', error);
            alert('Error al eliminar el curso. Por favor, intenta nuevamente.');
        }
    };

    if (!course) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <h2>Detalles del Curso</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
                <div>
                    <label>Nombre:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label>Codigo</label>
                    <input type="text" value={code} onChange={(e) => setCode(e.target.value)} required />
                </div>
                <div>
                    <label>Creditos</label>
                    <input type="number" value={course.credits} onChange={(e) => setCredits(Number(e.target.value))} />
                </div>
                <div>
                    <label>Nota</label>
                    <input type="number" value={course.grade} onChange={(e) => setGrade(Number(e.target.value))}/>
                </div>
                <div>
                    <label>Estado</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value as 'EN_CURSO' | 'APROBADO' | 'DESAPROBADO')} required>
                        <option value="EN_CURSO">En Curso</option>
                        <option value="APROBADO">Aprobado</option>
                        <option value="DESAPROBADO">Desaprobado</option>
                    </select>
                </div>
                <button type="submit">Actualizar Curso</button>
            </form>
            <button onClick={handleDelete}>Eliminar Curso</button>
        </div>
    );
}