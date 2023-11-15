import { Router } from "express";
import 
        { login, 
         logout,
         register,
         getProfile ,
         forgotPassword,
         resetPassword ,
         changePassword,
         updateUser
        } 
        from "../controllers/userControllers.js";
        
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.js";


const router = Router();

router.post('/register',upload.single("avatar"), register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/me',isLoggedIn, getProfile)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:resetToken', resetPassword)
router.put('/change-password', isLoggedIn, changePassword);
router.put('/update',isLoggedIn,upload.single('avatar'), updateUser)







export default router;