import React, { useState } from 'react'
import { useDispatch, useSelector}  from'react-redux';
import {Link, useNavigate } from 'react-router-dom'
import { BsPersonCircle } from 'react-icons/bs';
import HomeLayout from '../Layouts/HomeLayout'
import { AiOutlineArrowLeft } from 'react-icons/ai';
import toast from 'react-hot-toast';
import { getUserData, updateProfile } from '../Redux/Slices/Authslice';


const EditProfile = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [data, setData] = useState({
        fullName: '',
        userId: useSelector((state) => state?.auth?.data?._id)

    });

    function handleInputChange(e) {
       
        const {name, value} = e.target;
        setData({
            ...data,
            [name] : value

        })
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        if(!data.fullName ){
            toast.error('All field are manadatory')
            return;
        }

        if(data.fullName.length <5 ){
            toast.error('Minimum 5 charater require')
        }

        await dispatch(updateProfile([data.userId, data]))

        await dispatch(getUserData());

        navigate('/user/profile')
    }


  return (
    <HomeLayout>
            <div className="flex items-center justify-center bg-cyan-800 ustify-center h-[90vh]">
                <form
                      onSubmit={onFormSubmit}
                    
                    className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 min-h-[26rem] shadow-[0_0_10px_black]"
                >
                    <h1 className="text-center text-2xl font-semibold">Edit profile</h1>
                    {/* <label className="cursor-pointer" htmlFor="image_uploads">
                        {data.previewImage ? (
                            <img 
                                className="w-28 h-28 rounded-full m-auto"
                                src={data.previewImage}

                            />
                        ): (
                            <BsPersonCircle className="w-28 h-28 rounded-full m-auto" />
                        )}
                    </label>
                    <input 
                        onChange={handleImageUpload}
                        className="hidden"
                        type="file"
                        id="image_uploads"
                        name="image_uploads"
                        accept=".jpg, .png, .svg, .jpeg"

                    /> */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="fullName" className="text-lg font-semibold">Full Name</label>
                        <input 
                            required
                            type="text"
                            name="fullName"
                            id="fullName"
                            placeholder="Enter your name"
                            className="bg-transparent px-2 py-1 border"
                            value={data.fullName}
                            onChange={handleInputChange}

                        />
                    </div>
                    <button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 text-lg cursor-pointer">
                        Update profile
                    </button>
                    <Link to="/user/profile">
                        <p className="link text-accent cursor-pointer flex items-center justify-center w-full gap-2">
                            <AiOutlineArrowLeft /> Go back to profile
                        </p>
                    </Link>
                </form>
            </div>
        </HomeLayout>
  )
}

export default EditProfile;