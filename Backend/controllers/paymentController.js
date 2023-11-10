import crypto from 'crypto';
import Payment from "../models/paymentModel.js";
import User from "../models/userModel.js";
import { razorpay } from "../server.js";
import AppError from "../utils/error.utils.js";


const getRazorpayApiKey = async function(req,res,next){

    try {
        res.status(200).json({
            success: true,
            message:'Razorpay API Key',
            key: process.env.RAZORPAY_KEY_ID 
        });
        
    } catch (e) {
        return next(new AppError(e.message,400))
    }
    

}


const buySubscription = async function(req,res,next){
    try {
        
        
        const user = await User.findById(req.user.id);
    
        if(!user){
            return next(new AppError('Unauthorized, Please login',400))
        }
    
        if(user.role === 'ADMIN'){
            return  next (new AppError('Admin can not purschase',400))
        }
    
        const subscription = await razorpay.subscriptions.create({
            plan_id:process.env.RAZORPAY_PLAN_ID  ,
            customer_notify:1,
            total_count:12
        });

        
    
    
        user.subscription.id = subscription.id;
        user.subscription.status = subscription.status;
    
        await user.save();
    
        res.status(200).json({
            success:true,
            message: 'subscribed succesfully',
            subscription_id: subscription.id
        })
    
    } catch (e) {
        return next( new AppError(e.message,400));
    }

    
}

const verifySubscription = async function(req,res,next){
    
        const { id } = req.user;
        const user = await User.findById(id);
        if(!user){
            return next(new AppError('Unauthorized, Please login',400))
        }
        const { razorpay_payment_id, razorpay_subscription_id, razorpay_signature } =
          req.body;

          
    
          
    
        
    
        const subscriptionId = user.subscription.id;
    
        const generatedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_SECRET)
        .update(`${razorpay_payment_id}|${subscriptionId}`)
        .digest('hex');

        
    
    
        if (generatedSignature !== razorpay_signature) {
            return next(new AppError('Payment not verified, please try again.', 400));
          }   
       
          await Payment.create({
            razorpay_payment_id,
            razorpay_subscription_id,
            razorpay_signature,
          });
    
         // Update the user subscription status to active (This will be created before this)
         user.subscription.status = 'active';
         

         

        // Save the user in the DB with any changes
         await user.save();
      
         res.status(200).json({
            success: true,
            message: 'Payment verified successfully',
          });
    

    
}

const cancelSubscription = async function(req,res,next){
    
    const { id } = req.user;

    // Finding the user
    const user = await User.findById(id);
  
    // Checking the user role
    if (user.role === 'ADMIN') {
      return next(
        new AppError('Admin does not need to cannot cancel subscription', 400)
      );
    }
  
    // Finding subscription ID from subscription
    const subscriptionId = user.subscription.id;
  
    // Creating a subscription using razorpay that we imported from the server
    try {
      const subscription = await razorpay.subscriptions.cancel(
        subscriptionId // subscription id
      );
  
      // Adding the subscription status to the user account
      user.subscription.status = subscription.status;
  
      // Saving the user object
      await user.save();
    } catch (error) {
      // Returning error if any, and this error is from razorpay so we have statusCode and message built in
      return next(new AppError(error.error.description, error.statusCode));
    }
  
  
    user.subscription.id = undefined; // Remove the subscription ID from user DB
    user.subscription.status = undefined; // Change the subscription Status in user DB
  
    await user.save();
    
  
    // Send the response
    res.status(200).json({
      success: true,
      message: 'Subscription canceled successfully',
    });
    
    

}

const allPayments = async function(req,res,next){

    try {
        const {count, skip} = req.query;
    
        const payments = await razorpay.subscriptions.all({
            count: count || 10,
        })

        
        res.status(200).json({
            success:true,
            message: 'All payments',
            payments
        })
    } catch (e) {

        return next(new AppError(e.message,400))
        
    }
    
}


export {
    getRazorpayApiKey,
    buySubscription,
    verifySubscription,
    cancelSubscription,
    allPayments
}