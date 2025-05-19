import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import { AuthContext } from './context/AuthContext';

function App() {
  const { token } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/feed" element={token ? <Feed /> : <Navigate to="/login" />} />
      <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
