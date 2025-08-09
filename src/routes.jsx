import { Route, Routes } from 'react-router-dom';
import ContatosPage from './pages/contato';
import DashboardPage from './pages/dashboard';
import EmpresasPage from './pages/empresa';
import LoginPage from './pages/login';
import NotFoundPage from './pages/notFound';
import UsuariosPage from './pages/usuario';
import AppSecurity from './components/security/AppSecurity';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/dashboard"
        element={
          <AppSecurity>
            <DashboardPage />
          </AppSecurity>
        }
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