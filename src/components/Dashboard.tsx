import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CourseService } from '../config/axiosConfig';
import { useAuth } from '../context/AuthContext';

export const Dashboard = () => {
    const [courses, setCourses] = useState<any[]>([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await CourseService.getCourses(page);
                const pageData = response.data;
                setCourses(Array.isArray(pageData?.content) ? pageData.content : []);
                setTotalPages(pageData?.totalPages ?? 0);
            } catch (error) {
                console.error('Error al traer los cursos', error);
                setCourses([]);
                setTotalPages(0);
            }
        };

        fetchCourses();
    }, [page]);

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
            <div style={{ marginTop: '1rem' }}>
                <button type="button" onClick={() => setPage((prev) => Math.max(prev - 1, 0))} disabled={page === 0}>
                    Anterior
                </button>
                <span style={{ margin: '0 1rem' }}>
                    Pagina {page + 1} de {Math.max(totalPages, 1)}
                </span>
                <button type="button" onClick={() => setPage((prev) => prev + 1)} disabled={page + 1 >= totalPages}>
                    Siguiente
                </button>
            </div>
            <button type="button" onClick={() => navigate('/course/new')}>
                Crear Nuevo Curso
            </button>
        </div>
    );
}
