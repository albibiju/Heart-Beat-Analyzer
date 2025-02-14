import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";

import { Provider } from 'react-redux';
import store from './redux/store';
import DashboardPage1 from './pages/DashboardPage1/DashboardPage1.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
    {/* <DashboardPage1 /> */}
  </Provider>,
)
