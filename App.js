import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChatBot from './ChatBot';
import FeedbackPage from './FeedbackPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatBot />} />
        <Route path="/feedbacks" element={<FeedbackPage />} />
      </Routes>
    </Router>
  );
}

export default App;
