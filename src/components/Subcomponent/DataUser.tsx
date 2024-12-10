import React, { useContext } from 'react';
import { Box, Typography, Paper, Avatar } from '@mui/material';
import { UserContext } from './UserContext';
import PersonIcon from '@mui/icons-material/Person'; // Icono de usuario

export const DataUser = () => {
  const userContext = useContext(UserContext);

  // Obtener el usuario actual desde el contexto
  const currentUser = userContext?.currentUser;

  if (!currentUser) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        p={3}
      >
        <Typography variant="h6" color="error">
          No hay usuario logueado.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      p={3}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          maxWidth: 400,
          textAlign: 'center',
          width: '100%',
        }}
      >
        {/* Avatar o Icono de Usuario */}
        <Avatar sx={{ width: 80, height: 80, margin: '0 auto 16px' }}>
          <PersonIcon sx={{ fontSize: 40 }} />
        </Avatar>

        <Typography variant="h4" gutterBottom>
          Datos del Usuario
        </Typography>
        <Typography variant="body1">
          <strong>Nombre:</strong> {currentUser.name}
        </Typography>
        <Typography variant="body1">
          <strong>Email:</strong> {currentUser.email}
        </Typography>
        <Typography variant="body1">
          <strong>Rol:</strong> {currentUser.rol}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          ¡Bienvenido a tu cuenta!
        </Typography>
      </Paper>
    </Box>
  );
};
