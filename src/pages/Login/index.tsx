import React, { useState, useContext } from 'react';
import { Box, TextField, Button, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../components/Subcomponent/UserContext';

type LoginProps = {
  onLogin: (token: string) => void;
};

export const Login = ({ onLogin }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userContext) return;

    const token = userContext.login(email, password);
    if (token) {
      alert('Inicio de sesión exitoso.');
      onLogin(token); // Maneja el token según sea necesario
      navigate('/dashboard'); // Cambia la ruta según tu lógica
    } else {
      alert('Credenciales inválidas. Intenta nuevamente.');
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
        Iniciar Sesión
      </Typography>
      <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={2}>
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
          Iniciar Sesión
        </Button>
      </Box>
      <Typography variant="body2" mt={2}>
        ¿No tienes cuenta?{' '}
        <Link
          component="button"
          onClick={() => navigate('/register')}
          underline="hover"
          color="primary"
        >
          Regístrate aquí
        </Link>
      </Typography>
    </Box>
  );
};
