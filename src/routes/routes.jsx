import { Route, Routes } from 'react-router-dom';
import AppSecurity from '../components/security/AppSecurity';
import BackupPage from '../pages/backup';
import ContatosPage from '../pages/contato';
import DashboardPage from '../pages/dashboard';
import EmpresasPage from '../pages/empresa';
import ExportacaoPage from '../pages/exportacao';
import ImportacaoPage from '../pages/importacao';
import LoginPage from '../pages/login';
import NotFoundPage from '../pages/notFound';
import UsuariosPage from '../pages/usuario';

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
        <Route path="backup" element={<BackupPage />} />
        <Route path="exportacao" element={<ExportacaoPage />} />
        <Route path="importacao" element={<ImportacaoPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;