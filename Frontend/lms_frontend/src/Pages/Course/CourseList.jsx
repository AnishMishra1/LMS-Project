import React, { useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { getAllCourses } from '../../Redux/Slices/CourseSlice';
import HomeLayout from '../../Layouts/HomeLayout'
import CourseCard from '../../Components/CourseCard';

const CourseList = () => {

    const dispatch = useDispatch()
    const {courseData} = useSelector((state) => state.course);

    async function loadCourses(){
        await dispatch(getAllCourses)

    }

    useEffect(() => {
        loadCourses();
    }, [])


  return (
    <HomeLayout>
        <div className='min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white bg-cyan-800'>
           <h1 className='text-center text-3xl mb-5 font-semibold'>
              Explore the courses made by 
              <span className='font-bold text-yellow-500'>
                Industry Expert
              </span>
            </h1>  
              <div className='mb-10 flex flex-wrap gap-14'>
                {courseData?.map((element) => {
                    return <CourseCard 
                    key={element.id}
                    data= {element}
                    />
                })}

              </div>
           
        </div>

    </HomeLayout>
  )
}

export default CourseList