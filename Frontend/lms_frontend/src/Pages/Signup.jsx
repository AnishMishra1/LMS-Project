import React, { useState } from 'react'
import HomeLayout from '../Layouts/HomeLayout'
import { BsPersonCircle } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {toast} from 'react-hot-toast'
import { createAccount } from '../Redux/Slices/Authslice';
import { isEmail, isValidPassword } from '../Helpers/regexMatcher.js';

const Signup = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [signupData , setSignupData] = useState({
        fullName: '',
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

    // function getImage(event){
    //     event.preventDefault();
       
    //     //getting the image
    //     const uploadedImage = event.target.files[0];
        
    //     if(uploadedImage){
    //         setSignupData({
    //             ...signupData, 
    //             avatar: uploadedImage
    //         })
            //  const fileReader = new FileReader()
            //  fileReader.readAsDataURL(uploadedImage);
            //  fileReader.addEventListener('load', function (){
            //     setPreviewImage(this.result);
            //  })
    //     }
    // }

     async function  createNewAccount(e){
         e.preventDefault();

        if(!signupData.email || !signupData.password || !signupData.fullName){
            toast.error('please fill all the details');
            return;
        }

        if(signupData.fullName.length< 5){
            toast.error('Name should be atleast of 5 charaters')
            return;
        }
        if(!isEmail(signupData.email)){
            toast.error('Invalid email id')
        }

        if(!isValidPassword(signupData.password)){
            toast.error("please Type valid password-6 to 16 lenght ,At least one small letter, one number, special charater ")
        }


        // const formData = new formData();
        // formData.append('fullName', signupData.fullName);
        // formData.append('password', signupData.password);
        // formData.append('email', signupData.email);
        // formData.append('avatar', signupData.avatar);......

        //dispatch create account action

        const response = await dispatch(createAccount(signupData))
        console.log(response);

    
        if(response?.payload?.success)

        navigate('/');

        setSignupData({
            fullName: '',
            email:"",
            password: "",

        })

        // setPreviewImage("")
    }

    const [previewImage, setPreviewImage] = useState('');
  return (
    <HomeLayout>
        <div className='flex overflow-x-auto items-center justify-center  bg-cyan-800 h-[100vh]'>
        <form noValidate onSubmit={createNewAccount} className='flex flex-col justify-center gap-3  p-10 border rounded-lg text-white '>
            <h1 className='text-center text-2xl font-bold'>Registration Page</h1>

            {/* <label htmlFor="image_upload" className='cursor-pointer'>
               {previewImage ? 
                (<img className='w-24 h-24 rounded-full m-auto' />)
                :( <BsPersonCircle className='w-24 h-24 rounded-full m-auto' />)               }
            </label>
            <input 
            // onChange={getImage()}
            type="file"
            className='hidden'
            id='image_upload'
            accept='.jpg,.png,.jpeg,.svg' 
            /> */}
            <div className='flex flex-col gap-1'>
               <label htmlFor="fullname" className='font-semibold'>
                Name
                </label>
                <input 
                type="text"
                required
                name='fullName'
                id='fullName'
                placeholder='Enter your name...'
                className='bg-transparent px-6 py-1 border'
                onChange={handleUserInput}
                value={signupData.fullName}

                />
            
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
                Create Account
            </button>

            <p className='text-center'>
                Already have an Account ?<Link to='/login' className='link text-accent cursor-pointer'>Login</Link>
            </p>
        </form>

        </div>
        
    </HomeLayout>
  )
}

export default Signup