import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

type NavbarProps = {
  onLogout: () => void;
};

export const Navbar = ({ onLogout }: NavbarProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
  };

  return (
    <>
      <AppBar position="fixed" color="primary">
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Logo o Nombre */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}
          >
            Mi FKSudo
          </Typography>

          {/* Botones en Escritorio */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            <Button
              component={Link}
              to="/"
              variant="outlined"
              color="inherit"
              sx={{
                borderColor: 'white',
                ':hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              Ir a Mesas
            </Button>

            <Button
              component={Link}
              to="/productos"
              variant="outlined"
              color="inherit"
              sx={{
                borderColor: 'white',
                ':hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              Ver Productos
            </Button>

            <Button
              component={Link}
              to="/detalles"
              variant="outlined"
              color="inherit"
              sx={{
                borderColor: 'white',
                ':hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              Detalles
            </Button>

            <Button
              component={Link}
              to="/ordenes"
              variant="outlined"
              color="inherit"
              sx={{
                borderColor: 'white',
                ':hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              Ver Órdenes
            </Button>

            <Button
              component={Link}
              to="/usuario"
              variant="outlined"
              color="inherit"
              sx={{
                borderColor: 'white',
                ':hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              Datos Usuario
            </Button>

            <Button
              variant="contained"
              color="secondary"
              onClick={onLogout}
              sx={{
                ':hover': {
                  backgroundColor: '#c0392b',
                },
              }}
            >
              Cerrar Sesión
            </Button>
          </Box>

          {/* Botón del menú móvil */}
          <IconButton
            color="inherit"
            edge="start"
            sx={{ display: { xs: 'block', md: 'none' } }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer para Móviles */}
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/">
                <ListItemText primary="Ir a Mesas" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/productos">
                <ListItemText primary="Ver Productos" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/detalles">
                <ListItemText primary="Detalles" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/ordenes">
                <ListItemText primary="Ver Órdenes" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/usuario">
                <ListItemText primary="Datos Usuario" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={onLogout}>
                <ListItemText primary="Cerrar Sesión" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};
