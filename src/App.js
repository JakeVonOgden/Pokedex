import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Nav/Navbar';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
      </Router>
    </div>
  );
}

export default App;