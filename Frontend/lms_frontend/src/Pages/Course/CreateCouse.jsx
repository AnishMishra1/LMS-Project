import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import HomeLayout from '../../Layouts/HomeLayout';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import apj from '../../assets/Images/apj.png'
import toast from 'react-hot-toast';
import axiosInstance from '../../Helpers/axiosinstance';
import { createNewCourse } from '../../Redux/Slices/CourseSlice';


const CreateCouse = () => {
 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    title: '',
    description: '',
    category: '',
    createdBy: "",
    thumbnail: null,
    previewImage: ""
    

  })

  
  function handleImageUpload(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    if(uploadedImage) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(uploadedImage);
        fileReader.addEventListener("load", function () {
            setUserInput({
                ...userInput,
                previewImage: this.result,
                thumbnail: uploadedImage
            })
        })
    }
}

  function handleUserInput(e){
     const {name , value} = e.target;
     
     setUserInput({
      ...userInput,
      [name] : value,
      
     })
   
  }

  async function onFormSubmit(e){
    e.preventDefault();
    if(!userInput.title || !userInput.description || !userInput.category || !userInput.createdBy || !userInput.thumbnail){
      toast.error('All field are mandatory');
      return;
    }

    const response = await dispatch(createNewCourse(userInput));

    if(response?.payload?.success){
      setUserInput({
        title: '',
      description: '',
      category: '',
       createdBy: "",
       thumbnail: null,
       previewImage: ""

      })
      navigate('/courses')
    }

  }



  return (
    <HomeLayout>
      <div className='h-[90vh] flex items-center bg-cyan-800 justify-center'>
        <form 
           onSubmit={onFormSubmit}
           className='flex flex-col justify-center gap-5  rounded-lg p-4 text-white h-[50px] w-[700px] relative'>
           <Link onClick={() => navigate(-1)} className=
           'absolute top-8 text-2xl text-accent cursor-pointer'>
              <AiOutlineArrowLeft />
           </Link>
           <h1 className='text-center text-2xl font-bold'>
            Create New Course
           </h1>

           <main className='grid grid-cols-2 gap-x-10'>
             <div className='gap-y-6'>
              <div>
                <label htmlFor='image_upload' className='cursor-pointer'>
                {userInput.previewImage ? (
                    <img 
                        className="w-full h-44 m-auto border"
                        src={userInput.previewImage}
                    />
                    ): (
                     <div className="w-full h-44 m-auto flex items-center justify-center border">
                         <h1 className="font-bold text-lg">Upload your course thumbnail</h1>
                     </div>
                     )}

                </label>
                <input 
                className=''
                type='file'
                id='image_upload'
                accept='.jpg, .png, .jpeg, .svg'
                name='image_upload'
                onChange={handleImageUpload}
               
                />
              </div>
              <div className='flex flex-col gap-1'>
                <label htmlFor="title" className='text-lg font-semibold'>
                     Course Title
                </label>
                <input 
                required
                type="text"
                name='title'
                id='title'
                placeholder='Enter the title of course'
                onChange={handleUserInput}
                value={userInput.title}
                className='bg-transparent px-2 py-1 border' />

              </div>
              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold" htmlFor="title">
                   Course title
                </label>
                <input
                  required
                  type="text"
                  name="title"
                  id="title"
                   placeholder="Enter course title"
                  className="bg-transparent px-2 py-1 border"
                  value={userInput.title}
                  onChange={handleUserInput}
                 />
              </div>
             </div>

             {/* Right */}

             <div className='flex flex-col gap-1'>
             <div className='flex flex-col gap-1'>
                <label htmlFor="title" className='text-lg font-semibold'>
                     Instructor
                </label>
                <input 
                required
                type="text"
                name='createdBy'
                id='createdBy'
                placeholder='Enter the instructor of course'
                onChange={handleUserInput}
                value={userInput.createdBy}
                className='bg-transparent px-2 py-1 border' />

              </div>

              <div className='flex flex-col gap-1'>
                <label htmlFor="title" className='text-lg font-semibold'>
                     Category
                </label>
                <input 
                required
                type="text"
                name='category'
                id='category'
                placeholder='Enter the Category'
                onChange={handleUserInput}
                value={userInput.category}
                className='bg-transparent px-2 py-1 border' />

              </div>

              <div className='flex flex-col gap-1'>
                <label htmlFor="title" className='text-lg font-semibold'>
                    Description
                </label>
                <textarea 
                required
                type="text"
                name='description'
                id='description'
                placeholder='Enter the Category'
                onChange={handleUserInput}
                value={userInput.description}
                className='bg-transparent px-2 py-1 border h-24 resize-none overflow-y-scroll' />

              </div>

              </div>

              

           </main >

           <button type='submit'
           className='w-full py-2 rounded-sm font-semibold text-lg cursor-pointer bg-yellow-500 hover:bg-yellow-300 transition-all ease-in-out duration-150'>
            Create Course
           </button>
        </form>

      </div>

    </HomeLayout>
  )
}

export default CreateCouse