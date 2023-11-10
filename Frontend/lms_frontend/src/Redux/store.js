import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from './Slices/Authslice'
import CourseSliceReducer from "./Slices/CourseSlice";
import RazorpaySliceReducer from "./Slices/RazorpaySlice";
import LectureSliceReducer from "./Slices/LectureSlice";


const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        course: CourseSliceReducer,
        razorpay: RazorpaySliceReducer,
        lecture: LectureSliceReducer
    },
    devTools:true
});

export default store;