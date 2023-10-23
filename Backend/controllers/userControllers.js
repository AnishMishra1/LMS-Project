import AppError from "../utils/error.utils.js";
import User from "../models/userModel.js"

const cookieOptions = {
    maxAge: 7*24*60*60*1000,// 7days
    httpOnly: true,
    secure: true
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
            
        }
    })

    if(!user) {
        return next(new AppError('user registration failed plz try again', 400))
    }

    //TODO: File upload

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

       
    
        const token = await user.generateJWTToken;
    
        user.password = undefined;
    
        res.cookie('token', token, cookieOptions)
    
        res.status(200).json({
            success:true,
            message:'login succesfully',
            user,
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
        const userId = req.body.id
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


export {
    register,
    login,logout,
    getProfile
}