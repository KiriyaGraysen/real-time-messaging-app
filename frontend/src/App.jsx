import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        
        <Route 
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>}
        />
        
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </BrowserRouter>
  );
}