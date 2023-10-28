import { Router } from "express";
import { createCourse, deleteCourse, getAllCourses, getLecturesByCourseId, updateCourse, addLectureToCourseById, removeLectureFromCourse } from "../controllers/CourseController.js";
import { authorizeSubscriber, authorizedRoles, isLoggedIn } from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/')
              .get(isLoggedIn, getAllCourses)
              .post(isLoggedIn,authorizedRoles,createCourse);
//Alternate method
// router.route('/').get(getAllCourses)

router.route('/:id')
             .get(isLoggedIn,authorizeSubscriber, getLecturesByCourseId)
             .put(isLoggedIn,authorizedRoles,updateCourse)
             .delete(isLoggedIn,authorizedRoles,deleteCourse)
             .post(isLoggedIn ,authorizedRoles, addLectureToCourseById);
             
router.route('/courseId/lectures/:lectureId').delete(isLoggedIn,authorizedRoles,removeLectureFromCourse)

// router.post('/create', createCourse)

// router.put('/update', updateCourse)

// router.delete('/delete', deleteCourse)

export default router;
