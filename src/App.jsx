import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css'
import UserSignUp from './components/UserSignup'
import LoginPage from './components/LoginPage'
import AccountSettings from './components/AccountSettings'




function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<UserSignUp />} />
      <Route  path='/login' element={<LoginPage/>}/>
      <Route path='/account' element={<AccountSettings/>}/>
    </Routes>
    </BrowserRouter>
  )
}
export default App
