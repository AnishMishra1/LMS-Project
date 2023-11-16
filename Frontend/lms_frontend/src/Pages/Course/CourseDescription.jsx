import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import HomeLayout from '../../Layouts/HomeLayout';
import { useSelector } from 'react-redux';


const CourseDescription = () => {

    const { state } = useLocation();

    

    const Navigate = useNavigate()

    const { role, data } = useSelector((state) => state.auth);

   
  return (
    <HomeLayout>
        <div className='min-h-[90vh] bg-cyan-800 py-12 px-20 flex flex-col items-center justify-center text-white'>
            <div className='grid grid-cols-2 gap-10 py-10 relative'>
                <div className='space-y-5'>
                    <img src={state?.thumbnail?.secure_url} alt="thumbnail"
                    className='w-full h-64' />

                      <div className='space-y-4'>
                         <div className='flex  flex-col items-center justify-between text-xl'>
                            <p className='font-semibold'>
                                <span>
                                    Total Lectures:{" "}
                                </span>
                                {state?.numberOfLectures} 
                            </p>

                            <p className='font-semibold'>
                                <span>
                                    Instructor:{" "}
                                </span>
                                {state?.createdBy} Vishwa Mohan
                            </p>

                         </div>

                         {
                            role == 'ADMIN' || data?.subscription?.status == 'active'  ? (
                              <button onClick={() => Navigate("/course/displaylecture", {state: {...state}})} className='bg-yellow-500 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-300 transition-all ease-in-out duration-150'>
                                Watch Lectures
                              </button>
                            ):
                            (
                              <button onClick={() => Navigate('/checkout')} className='bg-yellow-500  text-xl rounded-md font-bold px-8 py-3 w-full hover:bg-yellow-300 transition-all ease-in-out duration-150'>
                                Subscribe
                              </button>
                            )
                         }


                     </div>
                    
                </div>

                <div className='space-y-2 text-xl items-center '>
                    <h1 className='text-3xl font-bold text-yellow-500 text-center'>
                       {state?.title}
                    </h1>

                    <p className='text-yellow-500 text-lg'>
                      Course description:
                    </p>
                    <p className='text-yellow-500'>
                      {state?.description}
                    </p>

                </div>

            </div>

        </div>
    </HomeLayout>
  )
}

export default CourseDescription