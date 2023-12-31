import { createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axiosInstance from '../../Helpers/axiosinstance'
import toast from 'react-hot-toast';

const initialState = {
    key: '',
    subscription_id: '',
    isPaymentVerified : false,
    allPayments: '',
    finalMonths: '',
    monthlySalesRecord: [],
}


export const getRazorpayId = createAsyncThunk("razorpay/getId", async () => {
    try {
        const response = await axiosInstance.get('/payments/razorpay-key');
        return response.data;
    } catch (error) {
        toast.error('failed to load data')
    }
} )



export const purchaseCourseBundle = createAsyncThunk("razorpay/purchaseCourse", async () =>{
    try {
        const response = await axiosInstance.post("/payments/subscribe");
        console.log("here....",response);
        return response.data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

export const verifyUserPayment = createAsyncThunk("/payments/verify", async (data) =>{
    try {
        const response = await axiosInstance.post("/payments/verify",{
            razorpay_payment_id : data.razorpay_payment_id,
            razorpay_subscription_id: data.razorpay_subscription_id,
            razorpay_signature : data.razorpay_signature
        });
        return ( await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

export const getPaymentRecord = createAsyncThunk("/payments/record", async () =>{
    try {
        const response = await axiosInstance.get("/payments/records");
        toast.promise(response, {
            loading:"waiting....",
            success: (data) => {
                return data?.data?.message
            },
            error: 'failed to get payment record'
        })
        return (await response).data
    } catch (error) {
        toast.error('operation failed')
    }
})

export const cancelCourseBundle = createAsyncThunk("/payments/cancel", async () =>{
    try {
        const response = await axiosInstance.post("/payments/unsubscribe");
        toast.promise(response, {
            loading: 'unsubsrcibing the bundle',
            success: (data) =>{
                return data?.data?.message
            },
            error: 'Failed to unsubscribe'
        })

        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})
const razorpaySlice = createSlice({
  name: 'razorpay',
  initialState,
  reducers:{},
  extraReducers: (builder) => {
    builder.addCase(getRazorpayId.fulfilled, (state,action) =>{
        state.key = action?.payload?.key
    })
    .addCase(purchaseCourseBundle.fulfilled, (state,action) => {
        state.subscription_id = action?.payload?.subscription_id;
    })
    .addCase(verifyUserPayment.fulfilled, (state,action) => {
        console.log(action);
        toast.success(action?.payload?.message),
        state.isPaymentVerified = action?.payload?.success
    })
    .addCase(verifyUserPayment.rejected, (state,action) => {
       
        toast.success(action?.payload?.message),
        state.isPaymentVerified = action?.payload?.success
    })
    .addCase(getPaymentRecord.fulfilled, (state,action) => {
        console.log(action);
        state.allPayments = action?.payload?.payments;
        state.finalMonths = action?.payload?.finalMonths;
        state.monthlySalesRecord= action?.payload?.monthlySalesRecord;
    })

  }

})

export default razorpaySlice.reducer;