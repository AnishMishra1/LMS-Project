import Course from "../models/courseModel.js"
import AppError from "../utils/error.utils.js";
import cloudinary from 'cloudinary'
import fs from 'fs/promises'


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
        createdBy,
        thumbnail:{
          public_id: "dummy",
          secure_url:"dummy"
        }
    })

    if(!course){
        return next (new AppError('plz try again',500))
    }

    if (req.file) {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "lms",
        });
    
        if (result) {
          course.thumbnail.public_id = result.public_id;
          course.thumbnail.secure_url = result.secure_url;
        } else {
          return next(new AppError(error.message, 400));
        }
    
        fs.rm(`uploads/${req.file.filename}`);
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

    await course.remove();

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
    try {
      const { title, description }   = req.body;
      

      if (!title || !description) {
        return next(new AppError("please provide title and description", 400));
      }
  
      const { id } = req.params;
  
      
  
      const course = await Course.findById(id);
  
  
  
      if(!course){
          return next (new AppError('course with given id doesnot exist',500))
      }
  
      const lectureData = {
          title,
          description,
          lecture: {
              public_id: "dummy",
              secure_url: "dummy",
            },
      }
  
      if (req.file) {
          try {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
              folder: "lms",
              chunk_size: 50000000, // 50 mb size
              resource_type: 'video',
            });
      
            if (result) {
              lectureData.lecture.public_id = result.public_id;
              lectureData.lecture.secure_url = result.secure_url;
            } else {
              return next(new AppError(error.message, 400));
            }
      
            fs.rm(`uploads/${req.file.filename}`);
          } catch (error) {
            return next(new AppError(error.message,400))
          }
        }
  
      course.lectures.push(lectureData);
  
      course.numberOfLectures = course.lectures.length;
  
      await course.save();
  
      res.status(200).json({
          success:true,
          message: 'lecture succesfully added',
          course
      })
    } catch (error) {
       return next(new AppError(error,403))
    }

}

const removeLectureFromCourse = async function(req,res,next) {
     
    const {courseId, lectureId} = req.query;

    console.log("courdseid",courseId);
    console.log("lid",lectureId);

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

  // const lectureIndex = course.lectures.findIndex(
  //   (lecture) => { lecture._id.toString() == lectureId.toString()}
  // )

  const lectureIndex = course.lectures.findIndex(
    (lecture) => lecture._id.toString() === lectureId.toString()
  );

  // if(lectureIndex === -1){
  //   return next(new AppError('Lecture does not exist.', 404));
  // }

  await cloudinary.v2.uploader.destroy(
    course.lectures[lectureIndex].lecture.public_id,
    {
      resource_type: 'video',
    }
  );


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