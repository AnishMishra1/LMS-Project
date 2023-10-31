import React from 'react'
import HomeLayout from '../Layouts/HomeLayout'
import { Link } from 'react-router-dom';
import homepage from '../assets/Images/homePageMainImage.png'

const Homepage = () => {
  return (
    <HomeLayout>
        <div className='pt-10 text-white flex items-center bg-cyan-900 justify-center gap-10  h-[90vh]'>
            <div className='w-1/2 space-y-6'>
                <h1 className='text-5xl font-semibold mx-20'>
                   Find out best
                    
                    <span className='text-yellow-500 font-bold'>
                    Online Courses
                   </span>
                    
                </h1>
                <p className='text-xl text-gray-200 mx-20'>
                    we have large library of courses taught by skilled and qualified faculties at very low cost.
                </p>
                <div className='space-x-6 mx-20'>
                    <Link to='/courses'>
                        <button className='bg-yellow-500 px-5 py-3 rounded-md font-semibold text-lg
                        cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-150 '>
                            Explore Courses
                        </button>
                    </Link>


                    <Link to='/contact'>
                        <button className='border border-yellow-600 px-5 py-3 rounded-md font-semibold text-lg
                        cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-150 '>
                            Contact Us
                        </button>
                    </Link>
                </div>

            </div>

            <div className='w-1/2 flex items-center justify-center' >
                <img src={homepage} alt="homepage image" />

            </div>

        </div>
    </HomeLayout>
  )
}

export default Homepage