import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>test</h1>} />
      </Routes>
    </Router>
  );
}
