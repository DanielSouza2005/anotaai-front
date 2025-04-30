import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/auth/AuthContext';
import ContatosPage from './pages/contato/ContatosPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import EmpresasPage from './pages/empresa/EmpresasPage';
import LoginPage from './pages/login/LoginPage';
import NotFoundPage from './pages/notFound/NotFoundPage';
import UsuariosPage from './pages/usuario/UsuariosPage';

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/dashboard"
        element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />}
      >
        <Route index element={<ContatosPage />} />
        <Route path="contatos" element={<ContatosPage />} />
        <Route path="empresas" element={<EmpresasPage />} />
        <Route path="usuarios" element={<UsuariosPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;