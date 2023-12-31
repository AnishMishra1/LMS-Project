import AppError from "../utils/error.utils.js";
import User from "../models/userModel.js"
import cloudinary from 'cloudinary'
import sendEmail from '../utils/sendEmail.js'
import crypto from "crypto"
import sendToken from "../utils/sendToken.js";
import fs from 'fs/promises';

const cookieOptions = {
    secure: process.env.NODE_ENV === 'production' ? true : false,
    maxAge: 7*24*60*60*1000,// 7days
    httpOnly: true,
   
}

const register = async (req, res, next) =>{

    try {

        const { fullName, email,password} = req.body;

    if(!fullName || !email || !password) {
        return next(new AppError('All fields are required', 400));
    }

    const userExists = await User.findOne({email});

    if(userExists){
        return next(new AppError('Email already exists',400))
    }

    const user = await User.create({
        fullName,
        email,
        password,
        avatar:{
            public_id: email,
            secure_url:
            'https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg',

            
        },
    })

    if(!user) {
        return next(new AppError('user registration failed plz try again', 400))
    }

    // TODO: File upload

    // Run only if user sends a file

    console.log("files details > ", JSON.stringify(req.file));

    if (req.file) {
    
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
              folder: "lms",
              width: 250,
              height: 250,
              gravity: "faces",
              crop: "fill",
            });

        console.log("Upload Result:", result);
  
        // If success
        if (result) {
          // Set the public_id and secure_url in DB
          user.avatar.public_id = result.public_id;
          user.avatar.secure_url = result.secure_url;
  
          // After successful upload remove the file from local storage
          fs.rm(`uploads/${req.file.filename}`);
        }
      } catch (error) {
        return next(
          new AppError(error || 'File not uploaded, please try again', 400)
        );
      }
    }



    await user.save();

    user.password = undefined;

    const token = await user.generateJWTToken;
    

    res.cookie('token', token, cookieOptions)

    res.status(201).json({
        success: true,
        message: "user registed succesfully",
        user,
    })
        
    } catch (e) {
        return next(new AppError(e.message, 500))
        
    }
    

};

const login = async(req, res, next) =>{

    try {

        const {email, password} = req.body;

        if(!email || !password) {
            return next (new AppError('All fields are required', 400));
        }
    
        const  user = await User.findOne({
            email
        }).select('+password');
    
        if(!user || !user.comparePassword(password)){
            return next(new AppError('email or password not match',400))
        }

       
    
        const token = await user.generateJWTToken();
    
        user.password = undefined;
    
        res.cookie('token', token, cookieOptions)
    
        res.status(200).json({
            success:true,
            message:'login succesfully',
            user,
            token
        })
    
        
    } catch (e) {

        return next(new AppError(e.message, 500))
        
    }

  
    
    
};

const logout = (req, res) =>{
     res.cookie('token', null, {
        secure: true,
        maxAge:0,
        httpOnly:true
     });

     res.status(200).json({
        success:true,
        message:" logout succesfully"
     })
    
};

const getProfile = async (req, res) =>{
    try {
        const userId = req.user.id
        const user = await User.findById(userId) ;

        res.status(200).json({
            success:true,
            message:'user details',
            user
        })
    } catch (e) {
        return next(new AppError('failed to uplaod detail',400))
    }
    
    
};

const forgotPassword = async(req,res, next) =>{

    const {email} = req.body
    console.log('your mail is ', email);

    if(!email){
        return next(new AppError('email is required', 400))
    }

    const user = await User.findOne({email});

    if(!user){
        return next(new AppError('email is not registered', 400))
    }

    const resetToken = await user.generatePasswordResetToken();

    await user.save();

    const resetPasswordURL = `${process.env.FRONTEND_URL}/forgot-password/${resetToken}`;

    console.log(resetPasswordURL);

    const subject = 'reset password'

    const message =`you can reset your password ${resetPasswordURL}`
   

    try {
        await sendEmail(email, subject, message);

        res.status(200).json({
            success:true,
            message: `reset password token sent to mail id ${email} succesfully`
        })
    } catch (error) {
        user.forgotPasswordExpiry = undefined;
        user.forgotPasswordToken = undefined;

        await user.save();
        return next(new AppError(error.message,500))
        
    }

}

const resetPassword =  async(req, res) =>{
    const { resetToken } = req.params;

    const { password } = req.body;

    const forgotPasswordToken = crypto.
                                     createHash('sha256')
                                     .update(resetToken)
                                     .digest('hex');

    const user = await User.findOne ({
        forgotPasswordToken,
        forgotPasswordExpiry: {$gt : Date.now()}
    })  
    
    if(!user){
        return next(new AppError('Token is invalid or expired, try again',400))
    }

    user.password = password;
    user.forgotPasswordExpiry = undefined
    user.forgotPasswordToken = undefined

    user.save();
    res.status(200).json({
        success:true,
        message: 'password changed succefully'
    })

}

const changePassword = async(req,res, next) =>{

    try {
        const {oldPassword, newPassword} = req.body;
    const {id} = req.user;
    

    if(!oldPassword || !newPassword) {
        return next (
            new AppError('all field are manadototy', 400)
        )
    }

    const user = await User.findById(id).select("+password");

    if(!user){
        return next (new AppError('user does not exit', 400))
    }
   

    const isPasswordValid = await user.comparePassword(oldPassword);

    if(!isPasswordValid){
        return next(new AppError('invalid old password',400))
    }

    user.password = newPassword;
    await user.save();

    
    sendToken(user, 200, res);
        
    } catch (error) {

        return next(new AppError(error,400))
        
    }
    

}

const updateUser = async (req,res,next) =>{ 

        // Destructuring the necessary data from the req object
        const {fullName} = req.body;
        const {id} = req.user.id;
    
        const user = await User.findById(id);
    
        if(!user){
            return next(new AppError('Invalid user id or User Not found'))
        }
    
        if(req.fullName){
            user.fullName = fullName
        }

        if(req.file){
              await cloudinary.v2.uploader.destroy(user.avatar.public_id);

        try {
                const result = await cloudinary.v2.uploader.upload(req.file.path, {
                  folder: "lms",
                  width: 250,
                  height: 250,
                  gravity: "faces",
                  crop: "fill",
                });
    
                   console.log("Upload Result:", result);
      
                 // If success
                 if (result) {
                  // Set the public_id and secure_url in DB
                   user.avatar.public_id = result.public_id;
                    user.avatar.secure_url = result.secure_url;
      
                    // After successful upload remove the file from local storage
                    fs.rm(`uploads/${req.file.filename}`);
                }
            }     catch (error) {
                  return next(
                   new AppError(error || 'File not uploaded, please try again', 400)
                   );
            }
        
        }


  

    await user.save();

    res.status(200).json({
        success:true,
        message: 'User details updated successfully'
    })

}


export {
    register,
    login,
    logout,
    getProfile,
    forgotPassword,
    resetPassword,
    changePassword,
    updateUser
}   