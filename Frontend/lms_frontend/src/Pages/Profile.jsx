import React from 'react';
import {useDispatch, useSelector}  from 'react-redux'
import HomeLayout from '../Layouts/HomeLayout'
import { Link, useNavigate } from 'react-router-dom';
import { cancelCourseBundle } from '../Redux/Slices/RazorpaySlice';
import { getUserData } from '../Redux/Slices/Authslice';
import toast from 'react-hot-toast';

const Profile = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const userData = useSelector(state => state?.auth?.data)

    async function handleCancellation() {
        toast('intiating cancellation')
        await dispatch(cancelCourseBundle())
        await dispatch(getUserData());
        toast.success('cancellation completed')
        navigate('/');

    }
    

  return (
    <HomeLayout>
        <div className='min-h-[90vh] bg-cyan-800 flex items-center justify-center'>

            <div className='ny-10 flex flex-col gap-4 rounded-lg p-4 text-white w-96 '>
                <img src={userData?.avatar?.secure_url}  className='w-40  m-auto rounded-full border border-black'/>
                <h3 className='text-xl font-semibold text-center capitalize'>
                   
                    {userData.fullName}
                </h3>

                <div className='grid grid-cols-2'>
                    <p>Email: {   userData?.email}</p>
                    <p>Role: {   userData?.role}</p>
                    <p>subscription: {userData?.subscription?.status === 'active'? 'Active' :'Inactive'       }</p>


                </div>
                <div className='grid grid-cols-2 gap-2 justify-center items-center '>
                <div className='flex items-center justify-center gap-2'>
                    <Link to= '/user/editprofile' className='w-1/2 bg-yellow-600 hover:bg-yellow-300 transition-all ease-in-out duration-100 font-semibold px-20  cursor-pointer  rounded-sm'>
                     <button className='text-center justify-center'>
                        Edit profile
                     </button>
                    </Link>
                </div>
                <div className='flex items-center justify-center gap-2'>
                    <Link  className='w-1/2 bg-yellow-600 hover:bg-yellow-300 transition-all ease-in-out duration-100 font-semibold px-20 cursor-pointer   rounded-sm'>
                     <button className=''>
                        Change Password
                     </button>
                    </Link>
                </div>


                </div>

               
                {userData?.subscription?.status === 'active' && (
                    <button onClick={handleCancellation} className='w-full bg-red-600 hover:bg-red-300 transition-all ease-in-out duration-100 rounded-sm font-semibold py-2 cursor-pointer text-center'>
                        Cancel Subscription

                    </button>
                )}

            </div>
        </div>

    </HomeLayout>
  )
}

export default Profile