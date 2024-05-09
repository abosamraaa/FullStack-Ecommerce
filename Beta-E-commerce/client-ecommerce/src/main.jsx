import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Provider } from 'react-redux'; // If using Redux
import { store } from './rtk/Store'; // Adjust the path if needed
import AuthProvider from './context/UserContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
          <AuthProvider>
    <Provider store={store}>

      <Router>
          <App /> {/* Main application */}
        </Router>


    </Provider>
    </AuthProvider>
  </React.StrictMode>,
);


