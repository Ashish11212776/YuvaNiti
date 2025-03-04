import "./App.css";
import { Routes, Route } from "react-router-dom";
import Profile from "./Components/Pages/Profile";
import About from "./Components/Pages/About";
import Home from "./Components/Pages/Home";
import UserSignUp from "./Components/UserSignup";
import LoginPage from "./Components/LoginPage";
import AccountSettings from "./Components/AccountSettings";
import PrivateRoutes from "./components/PrivateRoutes";
import PageNotFound from "./components/Pages/PageNotFound";
import DashBoard from "./components/Pages/DashBoard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
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
