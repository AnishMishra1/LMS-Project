
import './App.css'
import { Routes , Route} from 'react-router-dom'

import Homepage from './Pages/Homepage'
import AboutUs from './Pages/AboutUs'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import CourseList from './Pages/Course/CourseList'
import Contact from './Pages/Contact'
import CourseDescription from './Pages/Course/CourseDescription'
import RequireAuth from './Components/Auth/RequireAuth'
import CreateCouse from './Pages/Course/CreateCouse'
import Denied from './Pages/Denied'

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
        <Route path ='/course/description' element = {<CourseDescription />}></Route>
        <Route path ='/contact' element = {<Contact />}></Route>
        <Route path ='/denied' element = {<Denied />}></Route>

        <Route element={<RequireAuth allowedRoles={['ADMIN']}/>}>
        <Route path ='/course/create' element = {<CreateCouse />}></Route> 
        </Route>

        '/course/description'




      </Routes>
      
    </>
  )
}

export default App
