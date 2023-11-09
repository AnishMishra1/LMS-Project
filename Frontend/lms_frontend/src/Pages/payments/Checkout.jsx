import React, { useEffect } from 'react'
import { useDispatch, useSelector}  from "react-redux"
import { useNavigate} from 'react-router-dom'
import { getRazorpayId, purchaseCourseBundle, verifyUserPayment } from '../../Redux/Slices/RazorpaySlice';
import toast from 'react-hot-toast';
import HomeLayout from '../../Layouts/HomeLayout';
import {BiRupee} from 'react-icons/bi'

const Checkout = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const razorpayKey = useSelector((state) => state?.razorpay?.key);
    const subscription_id  = useSelector((state) => state?.razorpay?.subscription_id)
    const userData = useSelector((state) => state?.auth?.data)
    const isPaymentVerified = useSelector((state)=> state?.razorpay?.isPaymentVerified)

    const paymentDetails = {
        razorpay_payment_id : '',
        razorpay_subscription_id: '',
        razorpay_signature:'',
       
    }

    async function handleSubscription(e) {
        e.preventDefault();
        if(!razorpayKey || !subscription_id){
            toast.error('something went wrong')
        }

        const options = {
            key: razorpayKey,
            subscription_id: subscription_id,
            name: 'Coursify pvt ltd',
            description: 'Subscription',
            theme: {
               color: '#F37254'
            },
            prefill:{
                email: userData.email,
                name: userData.fullName
            },

            handler: async function (response){
                paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
                paymentDetails.razorpay_signature = response.razorpay_signature;
                paymentDetails.razorpay_subscription_id = response.razorpay_subscription_id;

                toast.success('payment successfull')

                const res = await  dispatch(verifyUserPayment(paymentDetails))

                res?.payload?.success ? navigate('/checkout/success'): navigate('/checkout/fail')
                
               
            }
            // ...................................

        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    async function load(){
      const res2 = await dispatch(getRazorpayId())
      console.log(res2);
      const res1= await dispatch(purchaseCourseBundle())
      console.log(res1);
    }

    useEffect(() =>{
       load();
    },[])

  return (
    <HomeLayout>
        <form
        onSubmit={handleSubscription}
        
           className='min-h-[90vh] flex items-center justify-center text-white bg-cyan-800' >
            <div className='w-80 h-[26rem] justify-center bg-slate-800 flex flex-col shadow-[0,0,10px_black] rounded-lg relative'>
                  <h1 className='bg-yellow-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded'>Subscription Bundle</h1>
                  <div className='px-4 space-y-5 text-center'>
                    <p className='text-[17px]'>
                        This purchase will allow you to access all avilable course of our platform
                        for { " "} 
                        <span className='text-yellow-500 font-bold'>
                            1 Year duration
                            <br />
                        </span>
                        All the existing and new launched courses will be also avilable
                    </p>

                    <p className='flex items-center justify-center gap-1 text-2xl font-bold text-yellow-300'>
                        <BiRupee /><span className=''>499 Only</span>
                    </p>

                    <div className='text-gray-200'>
                        <p>100% Refund on cancellation</p>
                        <p>* Term and conditions applied</p>
                    </div>

                    <button type='submit' className='bg-yellow-500 hover:bg-yellow-200 transition-all ease-in-out duration-150 absolute bottom-0 w-full left-0 text-xl font-bold rounded-bl-lg rounded-br-lg py-2'>
                        Buy Now
                    </button>

                  </div>
            </div>

        </form>
    </HomeLayout>
  )
}

export default Checkout