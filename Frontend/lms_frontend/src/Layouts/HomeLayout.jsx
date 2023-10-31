import React from 'react'
import {FiMenu} from 'react-icons/fi';
import {AiFillCloseCircle} from 'react-icons/ai'
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';

const HomeLayout = ({children}) => {
  
   function changeWidth(){
    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].computedStyleMap.width = auto;
   }

   function hideDrawer(){
    const element = document.getElementsByClassName("drawer-toggle")
    element[0].checked = false;

    changeWidth();
   }


  return (
    <div className='min-h-[90vh] '>
        <div className='drawer absolute left-0 z-50 w-fit'>
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
              <div className='drawer-content'>
                <label htmlFor="my-drawer" className='cursor-pointer relative'>
                    <FiMenu
                        onClick={changeWidth}
                        size= {"32px"}
                        className='font-bold text-white m-4'                        
                        />
                </label>

              </div>
              <div className="drawer-side">
                  <label htmlFor="my-drawer"  className="drawer-overlay"></label>
                  <ul className="menu p-4 w-48 sm:w-80 bg-base-300 text-base-content relative">
                       {/* Sidebar content here */}
                       <li className='w-fit absolute right-2 z-50'>
                           <button onClick={hideDrawer}>
                              <AiFillCloseCircle size={24} />
                           </button>
                        </li>
                        <li>
                            <Link to= '/'>Home</Link>
                        </li>
                        <li>
                            <Link to= '/courses'>All Courses</Link>
                        </li>
                        <li>
                            <Link to= '/contact'>Contact Us</Link>
                        </li>
                        <li>
                            <Link to= '/about'>About Us</Link>
                        </li>
                       
      
                  </ul>
             </div> 

        </div>

        { children}

        <Footer />
       
    </div>
  )
}

export default HomeLayout