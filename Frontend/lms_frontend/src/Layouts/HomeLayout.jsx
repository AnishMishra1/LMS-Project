import React from 'react'
import {FiMenu} from 'react-icons/fi';
import {AiFillCloseCircle} from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux'
import Footer from '../Components/Footer';
import { logout } from '../Redux/Slices/Authslice';

const HomeLayout = ({children}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    //for checking if user is looged in
    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

    //for displaying the option
    const role = useSelector((state) => state?.auth?.role);
  
   function changeWidth(){
    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].computedStyleMap.width = auto;
   }

   function hideDrawer(){
    const element = document.getElementsByClassName("drawer-toggle")
    element[0].checked = false;

    changeWidth();
   }

   async function handleLogout(e){
         e.preventDefault();

         const res = await dispatch(logout());

        if(res?.payload?.success){
            navigate('/')
        }
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
                  <ul className="menu p-4 w-48 h-[100%] sm:w-80 bg-base-300 text-base-content relative">
                       {/* Sidebar content here */}
                       <li className='w-fit absolute right-2 z-50'>
                           <button onClick={hideDrawer}>
                              <AiFillCloseCircle size={24} />
                           </button>
                        </li>
                        <li>
                            <Link to= '/'>Home</Link>
                        </li>

                        {isLoggedIn && role === 'ADMIN' && (
                            <li>
                                <Link to='/admin/dashboard'>Admin DashBoard</Link>
                            </li>
                        )}

                        <li>
                            <Link to= '/courses'>All Courses</Link>
                        </li>
                        <li>
                            <Link to= '/contact'>Contact Us</Link>
                        </li>
                        <li>
                            <Link to= '/about'>About Us</Link>
                        </li>

                        <li className='absolute bottom-4 w-[90%]'>
                        
                         {!isLoggedIn && (
                            <div className='w-full bottom-4 flex items-center justify-center'>
                                <button className='btn-primary px-4 font-semibold rounded-md w-full'>
                                 <Link to='/login'>Login</Link>
                                </button>
                                <button className='btn-secondary px-4 font-semibold rounded-md w-full'>
                                 <Link to='/signup'>SignUp</Link>
                                </button>
                            </div>
                                 ) }


                             {isLoggedIn && (
                            <div className='w-full bottom-4 flex items-center justify-center'>
                                <button className='btn-primary px-4 font-semibold rounded-md w-full'>
                                 <Link to='/me'>Profile</Link>
                                </button>
                                <button className='btn-secondary px-4 font-semibold rounded-md w-full'>
                                 <Link onClick={handleLogout}>Logout</Link>
                                </button>
                            </div>
                                 ) }

                                 
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