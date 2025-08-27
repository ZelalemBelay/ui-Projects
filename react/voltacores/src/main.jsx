import React from 'react'; // Correct import for React
import ReactDOM from 'react-dom/client'; // Correct import for ReactDOM
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);