import AppError from "../utils/error.utils.js";
import jwt from 'jsonwebtoken'
import User from "../models/userModel.js"

const isLoggedIn = async(req, res, next) => {

    const { token } = req.cookies ;

    if(!token){
        return next (new AppError('please login first',401))
    }

    const userDetails = jwt.verify(token, process.env.JWT_SECRET)

    req.user = userDetails;

    next();


}

const authorizedRoles =  function(req,res,next){
    if(req.user.role !== 'ADMIN'){
        return next (new AppError("you are not authorized person",403))
    }

    next();

}

const authorizeSubscriber = async function(req,res, next){
  
  const user = await User.findById(req.user.id)

  console.log(user);
  if(user.role !== "ADMIN" && user.subscription.status !=='active'){
    return next (new AppError("please subscribe the route",403))
  }

  next()
}

export {isLoggedIn, authorizedRoles, authorizeSubscriber}