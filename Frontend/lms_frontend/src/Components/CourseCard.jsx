import React from 'react'
import { useNavigate } from 'react-router-dom'

const CourseCard = () => {

    const navigate = useNavigate();
  return (
    <div 
       onClick={() => navigate('/course/description',{state:{...data}})}
       className='text-white w-[22rem] h-[430px] shadow-lg cursor-pointer group overflow-hidden bg-zinc-700'>
        <div className="overflow-hidden">
            <img src={data?.thumnail?.secure_url} 
            alt="course thumbnail"
             className=' h-48 w-full rounded-tl-lg group-hover:scale[1,2] transition-all ease-in-out duration-200' />
        </div>
        <div className= 'p-3 space-y-1 text-white'>
            <h2 className='text-xl font-bold text-yellow-500 line-clamp-2' >
                {data?.title}
            </h2>
            <p className='line-clamp-2'>
                {data?.description}
            </p>
            <p className='font-semibold'>
                <span className='text-yellow-500 fornt-bold'>Category</span>
                {data?.category}
            </p>
            <p className='font-semibold'>
                <span className='text-yellow-500 fornt-bold'>Total Lectures</span>
                {data?.numberOfLectures}
            </p>
            <p className='font-semibold'>
                <span className='text-yellow-500 fornt-bold'>Instructed By</span>
                {data?.createdBy}
            </p>
        </div>

    </div>
  )
}

export default CourseCard