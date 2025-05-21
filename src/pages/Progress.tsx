import React, { useState, useEffect } from 'react';
import { getUserProfile, saveUserProfile, getAllExerciseProgress, UserProfile, ExerciseProgress } from '../utils/db';

const Progress: React.FC = () => {
  const [userName, setUserName] = useState<string>('');
  const [storedUserName, setStoredUserName] = useState<string | undefined>(undefined);
  const [progress, setProgress] = useState<ExerciseProgress[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Mock userId for now
  const userId = 'defaultUser';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const profile = await getUserProfile(userId);
        if (profile && profile.userName) {
          setStoredUserName(profile.userName);
          setUserName(profile.userName);
        }
        const allProgress = await getAllExerciseProgress();
        setProgress(allProgress);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleSaveUserName = async () => {
    const profile: UserProfile = { userId, userName };
    try {
      await saveUserProfile(profile);
      setStoredUserName(userName);
      alert('Nombre de usuario guardado!');
    } catch (error) {
      console.error("Error saving user name:", error);
      alert('Error al guardar el nombre de usuario.');
    }
  };

  if (loading) {
    return <div>Cargando progreso...</div>;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Progreso del Usuario</h2>

      <div style={{ marginBottom: '20px' }}>
        <h3>Perfil de Usuario</h3>
        <input
          type="text"
          value={userName}
          onChange={handleUserNameChange}
          placeholder="Ingresa tu nombre de usuario"
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <button onClick={handleSaveUserName} style={{ padding: '5px 10px' }}>
          Guardar Nombre
        </button>
        {storedUserName && <p>Nombre guardado: {storedUserName}</p>}
      </div>

      <div>
        <h3>Progreso de Ejercicios</h3>
        {progress.length === 0 ? (
          <p>No hay progreso registrado.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>ID Ejercicio</th>
                <th style={tableHeaderStyle}>ID Tema</th>
                <th style={tableHeaderStyle}>Estado</th>
                <th style={tableHeaderStyle}>Respuesta Seleccionada</th>
                <th style={tableHeaderStyle}>Correcta</th>
                <th style={tableHeaderStyle}>Puntaje</th>
                <th style={tableHeaderStyle}>Tiempo (seg)</th>
                <th style={tableHeaderStyle}>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {progress.map((item) => (
                <tr key={item.exerciseId}>
                  <td style={tableCellStyle}>{item.exerciseId}</td>
                  <td style={tableCellStyle}>{item.topicId}</td>
                  <td style={tableCellStyle}>{item.status}</td>
                  <td style={tableCellStyle}>{item.selectedAnswer}</td>
                  <td style={tableCellStyle}>{item.isCorrect ? 'Sí' : 'No'}</td>
                  <td style={tableCellStyle}>{item.score ?? 'N/A'}</td>
                  <td style={tableCellStyle}>{item.timeSpent ?? 'N/A'}</td>
                  <td style={tableCellStyle}>{new Date(item.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const tableHeaderStyle: React.CSSProperties = {
  borderBottom: '2px solid #ddd',
  padding: '8px',
  textAlign: 'left',
  backgroundColor: '#f2f2f2',
};

const tableCellStyle: React.CSSProperties = {
  borderBottom: '1px solid #ddd',
  padding: '8px',
  textAlign: 'left',
};

export default Progress;
