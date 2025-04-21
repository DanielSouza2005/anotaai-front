import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/dashboard" element={<DashboardPage />}>
          <Route index element={"Rota Teste Dashboard"} />
          <Route path="/dashboard/contatos" element={"Rota Teste Contatos"} />
          <Route path="/dashboard/empresas" element={"Rota Teste Empresas"} />
          <Route path="/dashboard/usuarios" element={"Rota Teste Usuários"} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
        {/* element={<Navigate to="/login"/>} */}
      </Routes>
    </Router>
  );
}

export default AppRoutes;
