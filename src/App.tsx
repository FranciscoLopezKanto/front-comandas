import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Tables } from './pages/Tables/Tables';
import { TableDetails } from './pages/Tables/Details/TableDetails';
import { Login } from './pages/Login';
import ProductList from './pages/products/ProductList';
import { Navbar } from './components/navbar';
import { SalesChart } from './pages/Sells';
import { ThemeProvider } from '@mui/material/styles';
import theme from './components/theme';

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
 //falta ruta ventas , productos, agregar productos
  return (
    <Router>
      <ThemeProvider theme={theme}>
      {isLoggedIn ? (
        <>
          <Routes>
            <Route path="/" element={<Tables />} />
            <Route path="/table/:id" element={<TableDetails />} />
            <Route path='/productos' element={<ProductList />} />
            <Route path='/ventas' element={<SalesChart />} />
          </Routes>
          <Navbar onLogout={handleLogout} />
        </>
      ) : (
        <Routes>
          <Route path="*" element={<Login onLogin={handleLogin} />} />
        </Routes>
      )}
      </ThemeProvider>
    </Router>
  );
}

export default App;
