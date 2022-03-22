import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.css';
import App from './App';
import reportWebVitals from './functions/reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app')
);

reportWebVitals();
