import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import AIReportPage from './pages/AIReportPage';
import TestFirebase from './pages/TestFirebase';
import AdminPanel from './pages/AdminPanel';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/ai-report" element={<AIReportPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/test" element={<TestFirebase />} />
      </Routes>
    </Router>
  );
}

export default App;
