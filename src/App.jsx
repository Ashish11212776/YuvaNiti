import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css'
import UserSignUp from './components/UserSignUp'


function App() {
 

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<UserSignUp />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
