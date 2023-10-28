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
        const {id} = req.user
        const user = await User.findById(id);
    
        if(!user){
            return next(new AppError('Unauthorized, Please login',400))
        }
    
        if(user.role === 'ADMIN'){
            return  next (new AppError('Admin can not purschase',400))
        }
    
        const subscription = await razorpay.subscriptions.create({
            plan_id:process.env.RAZORPAY_PLAIN_ID,
            customer_notify:1
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
    try {
        const {id}= req.user;
        const {razorpay_payment_id, razorpay_signature, razorpay_subscription_id} = req.body;
    
        const user = await User.findById(id);
    
        if(!user){
            return next(new AppError('Unauthorized, Please login',400))
        }
    
       const subscriptionId = user.subscription.id;
    
       const generatedSignature = crypto
                                       .createHmac('sha256',process.env.RAZORPAY_SECRET)
                                       .update(`${razorpay_payment_id} | ${subscriptionId}`)
                                       .digest('hex');
    
    
       if(generatedSignature !== razorpay_signature){
         return next(new AppError('payment is not verfied',500));
       }      
       
       await Payment.create({
        razorpay_payment_id,
        razorpay_subscription_id,
        razorpay_signature
       });
    
       user.subscription.status = 'active';
       await user.save();
    
       res.status(200).json({
        success: true,
        message:'payment verified succesfully done'
       })
    } catch (e) {
        return next(new AppError(e.message,400))
        
    }

    
}

const cancelSubscription = async function(req,res,next){
    try {
        const  { id} = req.user;
        const user = await User.findById(id);
    
        if(!user){
            return next(new AppError('Unauthorized, Please login',400))
        }
    
        if(user.role === 'ADMIN'){
            return  next (new AppError('Admin can not purschase',400))
        }
    
        const subscriptionId = user.subscription.id;
    
        const subscription = await razorpay.subscriptions.cancel(subscriptionId);
    
        user.subscription.status = subscription.status;
    
        await user.save();
    
    } catch (e) {
        return next(new AppError(e.message,400));
        
    }

}

const allPayments = async function(req,res,next){

    try {
        const {count} = req.query;
    
        const payments = await razorpay.subscriptions.all({
            count: count || 10,
        })
    
        res.status(200).json({
            success:true,
            message: 'All payments',
            subscriptions
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