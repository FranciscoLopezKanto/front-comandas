import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Tables } from './pages/Tables';
import { TableDetails } from './pages/TableDetails';
import { Login } from './pages/Login';
import { Navbar } from './components/navbar';
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

  return (
    <Router>
      <ThemeProvider theme={theme}>
      {isLoggedIn ? (
        <>
          <Routes>
            <Route path="/" element={<Tables />} />
            <Route path="/table/:id" element={<TableDetails />} />
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
