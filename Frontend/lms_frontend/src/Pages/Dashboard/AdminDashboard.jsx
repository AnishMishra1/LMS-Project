import React, { useEffect } from 'react'
import HomeLayout from '../../Layouts/HomeLayout';
import { ArcElement, BarElement, CategoryScale, Chart as ChartJs, Legend, LinearScale, Title, Tooltip} from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteCourse, getAllCourses } from '../../Redux/Slices/CourseSlice';
import { getStatsData } from '../../Redux/Slices/StatSlice';
import { getPaymentRecord } from '../../Redux/Slices/RazorpaySlice';
import { Pie, Bar } from 'react-chartjs-2'
import { FaUsers } from 'react-icons/fa'
import { FcSalesPerformance } from 'react-icons/fc'
import { GiMoneyStack} from 'react-icons/gi'
import { BsCollectionPlayFill, BsTrash } from 'react-icons/bs';
ChartJs.register(ArcElement,BarElement, CategoryScale, Legend,LinearScale,Title,Tooltip)


const AdminDashboard = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allUserCount , subscribedCount} = useSelector((state) => state.stat);

  const { allPayments ,  monthlySalesRecord} = useSelector((state) => state.razorpay);
 
  const userData = {
    labels: ['Register User', 'Enrolled User'],
    datasets : [
        {
            label: 'User Details',
            data: [allUserCount, subscribedCount],
            backgroundColor:['yellow', 'green'],
            borderWidth: 1,
            borderColor: ['yellow', 'green']

        }
    ]
  }

  const salesData ={
    labels: ['jan', 'feb', 'march','apr','may','jun','jul','aug','sep','oct','nov','dec'],
    fontColor: 'white',
    datasets: [
        {
            label: 'Sales / Months',
            data: monthlySalesRecord,
            backgroundColor: [ 'rgb(255,99,132)'],
            borderColor:['white'],
            borderWidth:2
        }
    ]
  }

  const myCourses = useSelector((state) => state?.course?.courseData);

  async function onCourseDelete(id){
    if(window.confirm('Are you sure want to delete the course ?')){
        const res = await dispatch(deleteCourse(id))
        if(res?.payload?.success){
            await dispatch(getAllCourses())
        }
    }
  }

  useEffect(() => {
    (
        async () => {
            await dispatch(getAllCourses());
            await dispatch(getStatsData());
            await dispatch(getPaymentRecord());
        }
    )()

  },[])

  



  return (
    <HomeLayout>
        <div className=' min-h-[90vh] pt-5 flex-col flex-wrap gap-10 text-white bg-cyan-800'>
            <h1 className='text-center text-4xl font-semibold text-yellow-500'>
                Admin Dashboard
            </h1>
            <div className='grid grid-cols-2 gap-5 m-auto mx-10 mt-10'>
                <div className='flex flex-col items-center gap-10 p-5 shadow-lg rounded-md'>
                   <div className='w-80 h-80'>
                     <Pie data={userData} />
                   </div>
                   <div className='grid grid-cols-2 gap-5'>
                    <div className='flex items-center justify-between p-5 gap-5 rounded-md shadow-md'>
                        <div className='flex felx-col items-center'>
                            <p className='font-semibold'>Registered Users {" "}</p>
                            
                            <h3 className='text-3xl font-bold'>{allUserCount}</h3>
                        </div>
                        <FaUsers  className='text-yellow-500 text-5xl'/>

                    </div>
                    <div className='flex items-center justify-between p-5 gap-5 rounded-md shadow-md'>
                        <div className='flex felx-col items-center'>
                            <p className='font-semibold'>Subscribed Users {" "}</p>
                            
                            <h3 className='text-3xl font-bold'>{subscribedCount}</h3>
                        </div>
                        <FaUsers  className='text-green-500 text-5xl'/>

                    </div>

                </div>
                </div>

                <div className='flex flex-col items-center gap-5 shadow-lg rounded-md'>
                <div className='h-80 w-full relative'>
                  <Bar  className="absolute bottom-0 h-80" data= {salesData}/>
                </div>

                <div className='grid grid-cols-2 gap-5'>
                <div className='flex items-center justify-between p-5 gap-5 rounded-md shadow-md'>
                        <div className='flex felx-col items-center'>
                            <p className='font-semibold'>Subscription count {" "}</p>
                            
                            <h3 className='text-3xl font-bold'>{allPayments?.count}</h3>
                        </div>
                        <FcSalesPerformance  className='text-green-500 text-5xl'/>

                    </div>

                    <div className='flex items-center justify-between p-5 gap-5 rounded-md shadow-md'>
                        <div className='flex felx-col items-center'>
                            <p className='font-semibold'>Toatl Revenue {" "}</p>
                            
                            <h3 className='text-3xl font-bold'>{allPayments?.count*499}</h3>
                        </div>
                        <GiMoneyStack  className='text-green-500 text-5xl'/>

                    </div>
                 
                </div>

            </div>

               
            </div>

           
            <div className='mt-5 mx-[10%] w-[85%] self-center flex flex-col items-center justify-center gap-10 shadow-lg rounded-md'>
                <div className='flex w-full items-center justify-center'>
                    <h1 className='text-center text-3xl font-semibold'>
                        Courses Overview
                    </h1>

                    <button
                    className='m-auto w-fit bg-yellow-500 hover:bg-yellow-200 transition-all ease-in-out duration-150 rounded-sm py-2 px-4 font-semibold text-lg cursor-pointer'
                    onClick={() => {
                        navigate('/course/create')
                    }}>
                        Create new course

                    </button>

                </div>
                <table className=' text-white table overflow-x-scroll'>
                    <thead>
                        <tr>
                            <th>S.no</th>
                            <th>Course Title</th>
                            <th>Course category</th>
                            <th>Instructor</th>
                            <th> Total Lecture</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myCourses?.map((course,idx) => {
                                return (
                                    <tr key={course?._id}>
                                        <td>{idx+1}</td>
                                        <td>
                                            <textarea readOnly value={course?.title} className='w-40 h-auto bg-transparent'></textarea>
                                        </td>
                                        <td>
                                            {course?.category}
                                        </td>
                                        <td>
                                            {course?.createdBy}
                                        </td>
                                        <td>
                                            {course?.numberOfLectures}
                                        </td>
                                        <td className='max-w-28 overflow-hidden text-ellipsis whitespace-nowrap'>
                                            <textarea value={course?.description}
                                            readOnly
                                            className='w-80 h-auto bg-transparent resize-none'
                                             >

                                            </textarea>

                                        </td>

                                        <td className='flex items-center gap-4'>
                                            <button 
                                            className='bg-green-500 hover:bg-green-200 translate-x-0 ease-in-out duration-150 text-xl py-2 px-4 rounded-md font-bold'
                                            onClick={() => navigate('/course/displaylecture' ,{state: {...state}})}
                                            >
                                                <BsCollectionPlayFill/>

                                            </button>

                                            <button 
                                            className='bg-red-500 hover:bg-red-200 translate-x-0 ease-in-out duration-150 text-xl py-2 px-4 rounded-md font-bold'
                                            onClick={() => onCourseDelete(course?._id)}
                                            >
                                                <BsTrash/>

                                            </button>

                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>

                </table>

            </div>
        </div>

    </HomeLayout>
  )
}

export default AdminDashboard