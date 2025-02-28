import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { Store } from './app/Store.js';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from "./Components/Pages/Navbar.jsx"
import Footer from './Components/Pages/Footer.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
      <BrowserRouter>
      <Navbar/>
      <App />
      <Footer/>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
