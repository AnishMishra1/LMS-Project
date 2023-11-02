import React, { useState } from 'react'
import HomeLayout from '../Layouts/HomeLayout'
import { BsPersonCircle } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {toast} from 'react-hot-toast'
import { createAccount } from '../Redux/Slices/Authslice';

const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [signupData , setSignupData] = useState({
        
        email:"",
        password: "",
    })

    function handleUserInput(e){
        const {name , value} = e.target;
        setSignupData({
            ...signupData,
            [name]: value
        })
    }

    

     async function  createNewAccount(e){
         e.preventDefault();

        if(!signupData.email || !signupData.password || !signupData.fullName){
            toast.error('please fill all the details');
            return;
        }

        


        

        //dispatch create account action

        const response = await dispatch(createAccount())
        console.log(response);

    
        if(response?.payload?.success)

        navigate('/');

        setSignupData({
            fullName: '',
            email:"",
            password: "",

        })

       
    }

    
  return (
    <HomeLayout>
        <div className='flex overflow-x-auto items-center justify-center  bg-cyan-800 h-[100vh]'>
        <form noValidate onSubmit={createNewAccount} className='flex flex-col justify-center gap-3  p-10 border rounded-lg text-white '>
            <h1 className='text-center text-2xl font-bold'>Login Page</h1>

           
            <div className='flex flex-col gap-1'>
               
            
                <label htmlFor="email" className='font-semibold'>
                    Email
                </label>
                <input 
                type="email"
                name='email'
                id='email'
                placeholder='Enter your email...'
                className='bg-transparent px-6 py-1 border'
                value={signupData.email}
                onChange={handleUserInput}

                />

                <label htmlFor="password" className='font-semibold'>
                 Password
                </label>
                <input 
                type="password"
                name='password'
                id='password'
                placeholder='Enter your password...'
                className='bg-transparent px-6 py-1 border'
                value={signupData.password}
                onChange={handleUserInput}

                />  
                
                 
            </div>
            <button type='submit' className=' mt-3 w-full bg-yellow-600 hover:bg-yellow-300 transition-all ease-in-out duration-150 rounded-sm py-2 font-semibold text-lg cursor-pointer'>
                Please Login
            </button>

            <p className='text-center'>
                Dont Have Account ?<Link to='/signup' className='link text-accent cursor-pointer'>SignUp</Link>
            </p>
        </form>

        </div>
        
    </HomeLayout>
  )
}

export default Login