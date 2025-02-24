import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css'
import UserSignUp from './components/UserSignUp'
import LoginPage from './components/LoginPage'


function App() {
 

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<UserSignUp />} />
      <Route  path='/' element={<LoginPage/>}/>
      
    </Routes>
    </BrowserRouter>
  )
}

export default App
