
import './App.css'
import {Routes,Route} from 'react-router-dom';
import Profile from './Components/Pages/Profile'
import About from './Components/Pages/About';
import Home from './Components/Pages/Home';
// const router=createBrowserRouter(
//   [
//     {
//       path:"/Profile",
//       element:
//       <div>
//         <Navbar />
//         <Profile/>
//         <Footer/>
//       </div>
      
//     },
//     {
//       path:"/",
//       element:
//       <div>
//         <Navbar/>
//         <Data />
//         <Footer/>
//       </div>
//     },
//     {
//       path:"/About",
//       element:<About/>
//     },
//     {
//       path:"/login",
//       element:
//       <div>
//         <h1>LOGIN</h1>
//       </div>
//     }
//     ,
//     {
//       path:"/signup",
//       element:
//       <div>
//         <h1>LOGIN</h1>
//       </div>
//     }
//   ]
//   );
function App() {
 

  return (
    <>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/profile' element={<Profile/>}/>
     </Routes>
    </>
  )
}

export default App
