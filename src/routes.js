import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import DashboardPage from './pages/dashboard/DashboardPage';
import NotFoundPage from './pages/notFound/NotFoundPage';
import ContatosPage from './pages/contato/ContatosPage';
import LoginPage from './pages/login/LoginPage';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/dashboard" element={<DashboardPage />}>
          <Route index element={<ContatosPage />} />
          <Route path="/dashboard/contatos" element={<ContatosPage />} />
          <Route path="/dashboard/empresas" element={"Rota Teste Empresas"} />
          <Route path="/dashboard/usuarios" element={"Rota Teste Usuários"} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
