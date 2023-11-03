import React, { useState } from 'react'
import HomeLayout from '../Layouts/HomeLayout'
import toast from 'react-hot-toast';
import { isEmail, isValidPassword } from '../Helpers/regexMatcher.js';
import axiosInstance from '../Helpers/axiosinstance';

const Contact = () => {
    const [userInput, setUserInput] = useState({
        name: '',
        email:'',
        message:''
    })

    function handleInputChange(e) {
        const {name ,value} = e.target;

        console.log(name, email);
        setUserInput({
            ...userInput, 
            [name]:value
        })

    }

    async function onFormSubmit(e) {
        e.preventDefault();

        if(!userInput.name || !userInput.email || !userInput.message){
            toast.error("All fields are manadaorty")
            return
        }

        if(!isEmail(userInput.email)){
            toast.error('Invalid email id')
        }

        

        try {
            const response = axiosInstance.post('/contact', userInput);
            toast.promise(response, {
                loading: 'Submitting your message...',
                success: 'form submitted succesfully',
                error: 'failed to submit the form'
            })
            const contactResponse = await response
            if(contactResponse?.data?.success){
                setUserInput({
                    name: '',
                    email:'',
                    message:''

                })
            }
        } catch (error) {
            toast.error('operation failed')
            
        }

    }
  return (
    <HomeLayout>
      <div  className='flex items-center  bg-cyan-800 justify-center h-[90vh]'>
      <form
          onSubmit={onFormSubmit}
          noValidate
          className='flex flex-col items-center justify-center gap-2 p-5 rounded-md text-white border w-22rem px-19'>
           
           <h1 className='text-3xl font-semibold px-8'>
              Contact Form
           </h1>
           <div className='flex flex-col w-full gap-1 px-15'>
             <label htmlFor="name" className='text-xl font-semibold'>Name</label>
             <input 
             className='bg-transparent border px-2 py-1 rounded-sm'
             type="text" 
             id='name'
             placeholder='Enter your name'
             value={userInput.name}
             onChange={handleInputChange}
             name= 'name'
             />
           </div>

           <div className='flex flex-col w-full gap-1 px-15'>
             <label htmlFor="email" className='text-xl font-semibold'>Email</label>
             <input 
             className='bg-transparent border  py-1 rounded-sm px-2'
             type="email" 
             id='email'
             placeholder='Enter your email'
             value={userInput.email}
             onChange={handleInputChange}
             name='email'
             />
           </div>

           <div className='flex flex-col w-full gap-1 px-15'>
             <label htmlFor="message" className='text-xl font-semibold'>Message</label>
             <textarea
             className='bg-transparent border  py-1 rounded-sm px-2 resize-none h-40'
             type="message" 
             id='message'
             placeholder='Enter your message'
             value={userInput.message}
             onChange={handleInputChange}
             name='message'
             />
           </div>

           <button type='submit'
             className='w-full bg-yellow-600 hover:bg-yellow-300 transition-all ease-in-out duration-150 rounded-sm py-2 font-semibold text-lg cursor-pointer'
           >
            Submit
           </button>
  
          </form>
      </div>
    </HomeLayout>
  )
}

export default Contact