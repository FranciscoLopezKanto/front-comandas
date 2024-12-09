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
import { SalesChart } from './pages/Sells';

import { GetOrderIdProvider } from './pages/Tables/GetOrderIdContext';
import { ViewOrders } from './pages/orders/ViewOrders';
import { PostCompleteOrderProvider } from './pages/Tables/PostCompleteOrder';
 // Importar el GeoOrderIdProvider

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
        <GetOrderIdProvider>  {/* Envuelve la aplicación con el GeoOrderIdProvider */}
        <PostCompleteOrderProvider>
            <TablesProvider>  {/* Envuelve también el contenido con el TablesProvider */}
              {isLoggedIn ? (
                <>
                  <Navbar onLogout={handleLogout} />
                  <Routes>
                    <Route path="/" element={<Tables />} />
                    <Route path="/table/:id" element={<TableDetails />} />
                    <Route path="/productos" element={<ProductList />} />
                    <Route path="/productos/agregar" element={<AddProduct />} />
                    <Route path="/productos/ver-todos" element={<ViewAllProduct />} />
                    <Route path="/sells" element={<SalesChart />} />
                    <Route path="/ordenes" element={<ViewOrders />} /> {/* Nueva ruta */}
                  </Routes>
                </>
              ) : (
                <Routes>
                  <Route path="*" element={<Login onLogin={handleLogin} />} />
                </Routes>
              )}
            </TablesProvider>
            </PostCompleteOrderProvider>
        </GetOrderIdProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
