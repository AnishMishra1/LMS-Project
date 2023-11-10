import React from 'react'
import HomeLayout from '../../Layouts/HomeLayout'
import { RxCrossCircled } from 'react-icons/rx'
import { Link } from 'react-router-dom'

const CheckoutFail = () => {
  return (
    <HomeLayout>
      <div className='h-[90vh] flex items-center justify-center text-white bg-cyan-800 '>
        <div className='w-80 h-[26rem] flex flex-col justify-center items-center shadow-[0_0_10px_black] relative rounded-lg '>
             <h1 className='bg-red-500 absolute top-0 w-full py-4 text-2xl text-center font-bold rounded-lg'>
             Payment Unsuccessful
             </h1>
             <div className='px-4 flex flex-col items-center justify-center space-y-2'>
                 <div className='text-center space-y-2  '>
                     <h2 className='text-lg font-semibold'>
                    OOPS! your payment failed
                     </h2>
                     <p className=' ml-12 text-left '>
                         Please Try again
                     </p>
                   

                   </div>
                   <RxCrossCircled className='text-red-500 text-5xl ' />

             </div>
             <Link to='/checkout' className='bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-150 absolute bottom-0 w-full py-2 text-xl font-bold text-center rounded-bl-lg rounded-br-lg'>
              <button>
                Try again
              </button>
             
             </Link>
        </div>
      </div>
    </HomeLayout>
  )
}

export default CheckoutFail