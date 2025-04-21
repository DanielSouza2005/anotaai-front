import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" />
        <Route path="*" />
        {/* element={<Navigate to="/login"/>} */}
      </Routes>
    </Router>
  );
}

export default App;
