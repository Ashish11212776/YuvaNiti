import "./App.css";
import { Routes, Route } from "react-router-dom";
import Profile from "./components/Pages/Profile";
import About from "./components/Pages/About";
import Home from "./components/Pages/Home";
import UserSignUp from "./components/UserSignup"
import LoginPage from "./components/LoginPage";
import AccountSettings from "./components/AccountSettings";
import PrivateRoutes from "./components/PrivateRoutes";
import PageNotFound from "./components/Pages/PageNotFound";
import DashBoard from "./components/Pages/DashBoard";
import Hero from "./components/Pages/Hero";
function App() {
  return ( 
    <>
      <Routes>
        <Route path="/" element={
          <div>
           <Hero/> <Home /> </div>
     } />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/account" element={<AccountSettings />} />
          <Route path="/dashboard" element={<DashBoard/>}/>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}
export default App;