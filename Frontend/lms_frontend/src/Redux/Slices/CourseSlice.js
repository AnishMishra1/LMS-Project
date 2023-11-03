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

const courseSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

    }

})

export default courseSlice.reducer;