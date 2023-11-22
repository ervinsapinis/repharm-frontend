import React from 'react';
import logo from './logo.svg';
import './App.css';
import PatientsList from './PatientsList'; // Adjust the path as needed

function App() {
  return (
      <div className="App">
        <header className="App-header">
          <PatientsList />
        </header>
      </div>
  );
}

export default App;
