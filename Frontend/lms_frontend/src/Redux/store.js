import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from './Slices/Authslice'
import CourseSliceReducer from "./Slices/CourseSlice";
import RazorpaySliceReducer from "./Slices/RazorpaySlice";


const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        course: CourseSliceReducer,
        razorpay: RazorpaySliceReducer
    },
    devTools:true
});

export default store;