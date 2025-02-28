import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter} from 'react-router-dom';
import Navbar from "./Components/Pages/Navbar.jsx"
import Footer from './Components/Pages/Footer.jsx';
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './features/store.js'




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <Navbar/>
      <App />
      <Footer/>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
