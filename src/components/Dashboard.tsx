import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CourseService } from '../config/axiosConfig';
import { useAuth } from '../context/AuthContext';

export const Dashboard = () => {
    const [courses, setCourses] = useState<any[]>([]);
    const navigate = useNavigate();
    useAuth();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await CourseService.getCourses();
                const page = response.data;
                setCourses(Array.isArray(page?.content) ? page.content : []);
            } catch (error) {
                console.error('Error al traer los cursos', error);
                setCourses([]);
            }
        };

        fetchCourses();
    }, []);

    return (
        <div>
            <h1>StudyTrack</h1>
            <p>Bienvenido!</p>
            <h2>Cursos</h2>
            {courses.length === 0 ? (
                <p>No hay cursos disponibles.</p>
            ) : (
                <ul>
                    {courses.map((course) => (
                        <li key={course.id}>
                            <span>{course.name}</span>
                            <span> - {course.code}</span>
                            <span> - {course.credits !== null ? course.credits : 'N/A'} créditos</span>
                            <span> - Nota: {course.grade !== null ? course.grade : 'N/A'}</span>
                            <span> - Estado: {course.status}</span>
                            <button type="button" onClick={() => navigate(`/courses/${course.id}`)}>
                                Editar
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            <button type="button" onClick={() => navigate('/course/new')}>
                Crear Nuevo Curso
            </button>
        </div>
    );
}
