import React, { useState, useEffect } from 'react';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener los datos del perfil
  const fetchUserProfile = async () => {
  try {
    const response = await fetch('http://localhost:3000/users/profile', {
      method: 'GET',
      credentials: 'include', // Incluye las cookies en la solicitud
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    setUserData(data);
    setLoading(false);
  } catch (e) {
    setError(e);
    setLoading(false);
  }
};

  // Llamar a la función para obtener los datos del perfil al montar el componente
  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div className="profile-container">
      {loading && <p>Cargando perfil...</p>}
      {error && <p>Error al cargar el perfil: {error.message}</p>}
      {userData && (
        <>
          <div className="profile-header">
            <img
              src={userData.avatarUrl || 'URL_POR_DEFECTO'}
              alt={`${userData.name}'s avatar`}
              className="avatar"
            />
            <h1>{userData.name}</h1>
            <p className="username">@{userData.username}</p>
          </div>

          <div className="profile-info">
            <p className="bio">{userData.bio || 'Sin biografía.'}</p>
            {userData.location && <p className="location">Ubicación: {userData.location}</p>}
            {userData.website && (
              <p className="website">
                Sitio web:{' '}
                <a href={userData.website} target="_blank" rel="noopener noreferrer">
                  {userData.website}
                </a>
              </p>
            )}
          </div>

          <div className="profile-stats">
            {userData.followers !== undefined && <p>Seguidores: {userData.followers.toLocaleString()}</p>}
            {userData.following !== undefined && <p>Siguiendo: {userData.following.toLocaleString()}</p>}
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;