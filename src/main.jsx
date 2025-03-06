import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter} from 'react-router-dom';
import Navbar from "./components/Pages/Navbar.jsx"
import Footer from './components/Pages/Footer.jsx';
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './features/store.js'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <div className="flex flex-col min-h-screen" >

      <Navbar/>
      <App />
      <Footer/>
      </div>
      
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
