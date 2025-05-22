import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Suggestions from './pages/Suggestions';
import News from './pages/News';
import Documents from './pages/Documents';
import Polls from './pages/Polls';
import Reservations from './pages/Reservations';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/sugestoes" element={<Suggestions />} />
          <Route path="/noticias" element={<News />} />
          <Route path="/documentos" element={<Documents />} />
          <Route path="/enquetes" element={<Polls />} />
          <Route path="/reservas" element={<Reservations />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App; 