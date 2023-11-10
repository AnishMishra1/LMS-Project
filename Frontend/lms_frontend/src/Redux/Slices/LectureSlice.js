import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";

const initialState = {
    lectures:[]
}

export const getCourseLectures = createAsyncThunk('/course/lecture/get', async (cid) => {
    try {
        const response = axiosInstance.get(`/courses/${cid}`);
        toast.promise(response, {
            loading: 'fetching course lectures',
            success: 'lectures fetched successfully',
            error: 'failed to load the lectures'
        })
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        
    }
})

export const addCourseLecture = createAsyncThunk('/course/lecture/add', async (cid) => {
    try {
        const formData = new FormData()
        formData.append("lecture", data.lecture);
        formData.append("tittle", data.tittle);
        formData.append("description", data.description);
        
        const response = axiosInstance.post(`/courses/${cid}`);
        toast.promise(response, {
            loading: 'adding course lectures',
            success: 'lectures added successfully',
            error: 'failed to add the lectures'
        })
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        
    }
})

export const deleteCourseLecture = createAsyncThunk('/course/lecture/delete', async (data) => {
    try {
        const response = axiosInstance.delete(`/courses?courseId=${data.courseId}&lectureId=${data.lectureId}`);
        toast.promise(response, {
            loading: 'deleting course lectures',
            success: 'lectures deleted uccessfully',
            error: 'failed to delete the lectures'
        })
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        
    }
})




const lectureSlice = createSlice({
    name: 'lecture',
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(getCourseLectures.fulfilled, (state,action) => {
            state.lectures = action?.payload?.lectures
        })
        .addCase(addCourseLecture.fulfilled, (state,action) => {
            state.lectures = action?.payload?.course?.lectures
        })
        

    }
})

export default lectureSlice.reducer;