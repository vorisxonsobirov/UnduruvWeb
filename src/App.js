import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Bar from './components/Bar/Bar';
import Profile from './components/Profile/Profile';
import Map from './components/Map/Map';
import CoordinatesScreen from './components/Map/CoordinatesScreen';
import AuthPage from './components/Auth/AuthPage';
import { useState, useEffect } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Проверка: если логин и пароль уже сохранены — вход разрешён
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
    if (storedEmail && storedPassword) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuthSuccess = (email, password) => {
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false); // Просто сбрасываем состояние авторизации
  };

  if (!isAuthenticated) {
    return <AuthPage onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="App">
      <Navbar onLogout={handleLogout} />
      <div className="main-layout">
        <Bar />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Profile />} />
            <Route path="/Map" element={<Map />} />
            <Route path="/Coordinates" element={<CoordinatesScreen />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;