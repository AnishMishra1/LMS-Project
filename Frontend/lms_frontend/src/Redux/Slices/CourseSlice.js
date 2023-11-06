import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import axiosInstance from '../../Helpers/axiosinstance'

const initialState = {
    courseData : []
}

export const getAllCourses = createAsyncThunk("/course/get", async () => {
    try {
        const response = axiosInstance.get('/courses');
        toast.promise(response, {
            loading: 'loading course data',
            success: "courses loaded succefully",
            error: "Failed to get cousres"
        })
        return (await response).data.courses
        
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

export const createNewCourse = createAsyncThunk ('/course/create', async(data) => {
    try {
        const response = axiosInstance.post('/courses',data);
        toast.promise(response, {
            loading: 'WAIT ! Creating new course',
            success: (data) => {
                return data?.data?.message
            },
            error: 'Failed to create course'
        })
        return (await response).data
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message)
        
    }
})

const courseSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCourses.fulfilled, (state,action) => {
            if(action.payload){
                console.log(action.payload);
                state.courseData = [...action.payload]
            }
        })

    }

})

export default courseSlice.reducer;