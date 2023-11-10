import React, { useEffect } from 'react'
import HomeLayout from '../../Layouts/HomeLayout'
import { AiFillCheckCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { getUserData } from '../../Redux/Slices/Authslice'
import { useDispatch } from 'react-redux'

const CheckoutSuccess = () => {

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getUserData())
  },[])
  return (
    
    <HomeLayout>
      <div className='h-[90vh] flex items-center justify-center text-white bg-cyan-800 '>
        <div className='w-80 h-[26rem] flex flex-col justify-center items-center shadow-[0_0_10px_black] relative rounded-lg '>
             <h1 className='bg-green-500 absolute top-0 w-full py-4 text-2xl text-center font-bold rounded-lg'>
              Payment Successful
             </h1>
             <div className=' px-4 flex flex-col items-center justify-center space-y-2'>
                 <div className='text-center space-y-2  '>
                     <h2 className='text-lg font-semibold'>
                      Welcome to the pro bundle
                     </h2>
                     <p className='text-left'>
                      Now you can enjoy all the course
                     </p>
                   

                   </div>
                   <AiFillCheckCircle className='text-green-500 text-5xl ' />

             </div>
             <Link to='/' className='bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-150 absolute bottom-0 w-full py-2 text-xl font-bold text-center rounded-bl-lg rounded-br-lg'>
              <button>
                Go to dashboard
              </button>
             
             </Link>
        </div>
      </div>
    </HomeLayout>
  )
}

export default CheckoutSuccess