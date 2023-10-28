import AppError from "../utils/error.utils.js";
import jwt from 'jsonwebtoken'

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
  if(req.user.subscription.status !== 'active' || req.user.role !== 'ADMIN'){
    return next (new AppError("please subscribe the route",403))
  }

  next()
}

export {isLoggedIn, authorizedRoles, authorizeSubscriber}