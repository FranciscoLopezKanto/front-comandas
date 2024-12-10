import React, { useState, useContext } from 'react';
import { Box, TextField, Button, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../components/Subcomponent/UserContext';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userContext) return;

    const token = userContext.register(name, email, password);
    if (token) {
      alert('Usuario registrado con éxito.');
      navigate('/login'); // Cambia la ruta según tu lógica
    } else {
      alert('El correo ya está registrado.');
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      p={3}
    >
      <Typography variant="h4" gutterBottom>
        Registrarse
      </Typography>
      <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Nombre"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Correo Electrónico"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          label="Contraseña"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Registrarse
        </Button>
      </Box>
      <Typography variant="body2" mt={2}>
        ¿Ya tienes cuenta?{' '}
        <Link
          component="button"
          onClick={() => navigate('/login')}
          underline="hover"
          color="primary"
        >
          Inicia sesión aquí
        </Link>
      </Typography>
    </Box>
  );
};
