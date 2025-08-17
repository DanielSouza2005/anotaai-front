import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/login';
import AppSecurity from '../components/security/AppSecurity';
import DashboardPage from '../pages/dashboard';
import ContatosPage from '../pages/contato';
import EmpresasPage from '../pages/empresa';
import UsuariosPage from '../pages/usuario';
import NotFoundPage from '../pages/notFound';

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