import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Tables } from './pages/Tables/Tables';
import { TableDetails } from './pages/Tables/Details/TableDetails';
import { Login } from './pages/Login';
import ProductList from './pages/products/ProductList';
import { Navbar } from './components/navbar';
import { ThemeProvider } from '@mui/material/styles';
import theme from './components/theme';
import { AddProduct } from './pages/products/AddProduct';
import ViewAllProduct from './pages/products/ViewAllProduct'; // Asegúrate de importar el TablesProvider
import { TablesProvider } from './pages/Tables/TablesContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogin = () => {
    localStorage.setItem('authToken', 'sample-token'); // Simula autenticación
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <TablesProvider>  {/* Asegúrate de envolver el contenido que usa el contexto */}
          {isLoggedIn ? (
            <>
              <Navbar onLogout={handleLogout} />
              <Routes>
                <Route path="/" element={<Tables />} />
                <Route path="/table/:id" element={<TableDetails />} />
                <Route path="/productos" element={<ProductList />} />
                <Route path="/productos/agregar" element={<AddProduct />} />
                <Route path="/productos/ver-todos" element={<ViewAllProduct />} />
              </Routes>
            </>
          ) : (
            <Routes>
              <Route path="*" element={<Login onLogin={handleLogin} />} />
            </Routes>
          )}
        </TablesProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
