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
  ListItemIcon,
  Box,
} from '@mui/material';
import { Menu as MenuIcon, TableChart, ShoppingCart, Analytics, Assignment, Person, Logout } from '@mui/icons-material';
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
            <IconButton component={Link} to="/" color="inherit">
              <TableChart />
            </IconButton>
            <IconButton component={Link} to="/productos" color="inherit">
              <ShoppingCart />
            </IconButton>
            <IconButton component={Link} to="/detalles" color="inherit">
              <Analytics />
            </IconButton>
            <IconButton component={Link} to="/ordenes" color="inherit">
              <Assignment />
            </IconButton>
            <IconButton component={Link} to="/usuario" color="inherit">
              <Person />
            </IconButton>
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
                <ListItemIcon>
                  <TableChart />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/productos">
                <ListItemIcon>
                  <ShoppingCart />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/detalles">
                <ListItemIcon>
                  <Analytics />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/ordenes">
                <ListItemIcon>
                  <Assignment />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/usuario">
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={onLogout}>
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};
