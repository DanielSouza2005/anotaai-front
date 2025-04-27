import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import DashboardPage from './pages/dashboard/DashboardPage';
import NotFoundPage from './pages/notFound/NotFoundPage';
import ContatosPage from './pages/contato/ContatosPage';
import LoginPage from './pages/login/LoginPage';
import EmpresasPage from './pages/empresa/EmpresasPage';
import UsuariosPage from './pages/usuario/UsuariosPage';
import authService from './services/auth/authService';

function AppRoutes() {

  const isAuthenticated = authService.isAuthenticated();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/dashboard"
          element={isAuthenticated ?
            <DashboardPage /> :
            <Navigate to="/login" />
          }>
          <Route index element={<ContatosPage />} />
          <Route path="/dashboard/contatos" element={<ContatosPage />} />
          <Route path="/dashboard/empresas" element={<EmpresasPage />} />
          <Route path="/dashboard/usuarios" element={<UsuariosPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
