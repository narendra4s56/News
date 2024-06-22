import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import News from './News';
import NewsArtical from './NewsArtical';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<News />} />
        <Route path="/article/:id" element={<NewsArtical />} />
      </Routes>
    </Router>
  );
};

export default App;
