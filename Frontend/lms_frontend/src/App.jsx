
import './App.css'
import { Routes , Route} from 'react-router-dom'

import Homepage from './Pages/Homepage'
import AboutUs from './Pages/AboutUs'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import CourseList from './Pages/Course/CourseList'

function App() {


  return (
    <>
    
      <Routes>
        <Route path ='/' element = {<Homepage />}></Route>
        <Route path ='/about' element = {<AboutUs />}></Route>
        

        {/* Creating Signup route */}
        <Route path ='/signup' element = {<Signup />}></Route>
        <Route path ='/login' element = {<Login />}></Route>

        <Route path ='/courses' element = {<CourseList />}></Route>




      </Routes>
      
    </>
  )
}

export default App
