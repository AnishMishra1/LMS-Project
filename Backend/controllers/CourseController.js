import Course from "../models/courseModel.js"
import AppError from "../utils/error.utils.js";


//get All courses
const getAllCourses = async function(req,res, next){
    
    const courses = await Course.find({}).select('-lectures');

   

    res.status(200).json({
        success: true,
        message: 'All courses ',
        courses,
    });

}


//get course by ID
const getLecturesByCourseId = async function (req,res, next){

  try {
    const {id} = req.params
    const course = await Course.findById(id);

    if(!course){
        return next(new AppError("There is no any courses",400))
    }

    res.status(200).json({
        success:true,
        message: "courses lectures fetched succesfully",
        lectures: course.lectures || 0
    })

  } catch (e) {

     return next(new AppError(e.message,400));
    
  }
}


//create course
const createCourse = async function(req,res,next) {

    const {title, description,category, createdBy } = req.body;

    if(!title || !description || !category || !createdBy){
        return next(new AppError("all filed are mandatory",400))
    }

    const course = await Course.create({
        title,
        description,
        category,
        createdBy
    })

    if(!course){
        return next (new AppError('plz try again',400))
    }

    await course.save();

    res.status(200).json({
        success:true,
        message: 'course created successfully',
        course
    })

}


//update any course
const updateCourse = async function(req, res,next){
    try {
        const {id} = req.params;

        const course = await Course.findByIdAndUpdate(
            id,
            {
              $set: req.body
            },
            {
                runValidators: true
            }
        );

        if(!course){
            return next(new AppError("course with given id doesnt exist",400))
        }

        res.status(200).json({
            success:true,
            message:'course updated succefully',
            course
        })
        
    } catch (e) {
        return next (new AppError(e.message, 400))
    }

}


//delete any course
const deleteCourse = async function(req, res, next){

    try {
        const {id} = req.params

    const course = await Course.findById(id);

    if(!course){
        return next(new AppError("course doent exist",400))
    }

    await course.findByIdAndDelete(id)

    res.status(200).json({
        success:true,
        message: "course deleted successfully",
        course


    })
        
    } catch (error) {

        return next(new AppError(error.message,400));
        
    }

    const {id} = req.params

    const course = await Course.findById(id);

    await course.deleteOne()

    res.status(200).json({
        success:true,
        message: "course deleted successfully",
        course


    })

}


const addLectureToCourseById = async function(req,res,next){
    const {title, description } = req.body;

    const {id} = req.params;

    const course = await Course.findById(id);

    if(!course){
        return next (new AppError('course with given id doesnot exist',500))
    }

    const lectureData = {
        title,
        description,
        lecture: {}
    }

    course.lectures.push(lectureData);

    course.numberOfLectures = course.lectures.length;

    await course.save();

    res.status(200).json({
        success:true,
        message: 'lecture succesfully added',
        course
    })

}

const removeLectureFromCourse = async function(req,res,next) {
     
    const {courseId, lectureId} = req.params;

    if (!courseId) {
        return next(new AppError('Course ID is required', 400));
      }
    
      if (!lectureId) {
        return next(new AppError('Lecture ID is required', 400));
      }

      // Find the course using the courseId
  const course = await Course.findById(courseId);

  if (!course) {
    return next(new AppError('Invalid ID or Course does not exist.', 404));
  }

  const lectureIndex = course.lectures.findIndex(
    (lecture) => { lecture._id.toString() == lecture.lectureId.toString()}
  )

  if(lectureIndex === -1){
    return next(new AppError('Lecture does not exist.', 404));
  }


   // Remove the lecture from the array
   course.lectures.splice(lectureIndex, 1);

   // update the number of lectures based on lectres array length
  course.numberOfLectures = course.lectures.length;

  
  // Save the course object
  await course.save();

  // Return response
  res.status(200).json({
    success: true,
    message: 'Course lecture removed successfully',
  });
}

export {
    getAllCourses,
    getLecturesByCourseId,
    createCourse, 
    updateCourse,
    deleteCourse,
    addLectureToCourseById,
    removeLectureFromCourse
}