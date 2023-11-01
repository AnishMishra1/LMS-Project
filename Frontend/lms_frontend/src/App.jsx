
import './App.css'
import { Routes , Route} from 'react-router-dom'

import Homepage from './Pages/Homepage'
import AboutUs from './Pages/AboutUs'

function App() {


  return (
    <>
    
      <Routes>
        <Route path ='/' element = {<Homepage />}></Route>
        <Route path ='/about' element = {<AboutUs />}></Route>

      </Routes>
      
    </>
  )
}

export default App
