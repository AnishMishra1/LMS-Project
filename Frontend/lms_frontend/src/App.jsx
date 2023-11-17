
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
import Profile from './Pages/Profile'
import EditProfile from './Pages/EditProfile'
import Checkout from './Pages/payments/Checkout'
import CheckoutSuccess from './Pages/payments/CheckoutSuccess'
import CheckoutFail from './Pages/payments/CheckoutFail'
import DisplayLecture from './Pages/Dashboard/DisplayLecture'
import AddLecture from './Pages/Dashboard/AddLecture'
import AdminDashboard from './Pages/Dashboard/AdminDashboard'

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
        <Route path="/course/addlecture" element={<AddLecture />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={['ADMIN', 'USER']}/>}>
        <Route path ='/user/profile' element = {<Profile />}></Route> 
        <Route path ='/user/editprofile' element = {<EditProfile />}></Route> 
        <Route path ='/checkout' element = {<Checkout />}></Route> 
        <Route path='/checkout/success' element={<CheckoutSuccess />} />
        <Route path='/checkout/fail' element={<CheckoutFail />} />
        <Route path='/course/displaylecture' element={<DisplayLecture />}/>
        
        </Route>

        

        

        '/course/description'




      </Routes>
      
    </>
  )
}

export default App
