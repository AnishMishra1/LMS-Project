import Router from 'express';
import { allPayments,
         buySubscription, 
         cancelSubscription,
         getRazorpayApiKey,
         verifySubscription 
        } from '../controllers/paymentController.js';
import { authorizeSubscriber, authorizedRoles, isLoggedIn } from '../middlewares/auth.middleware.js';

const router = Router()

router
      .route('/razorpay-key')
      .get(isLoggedIn,getRazorpayApiKey)

router
     .route('/subscription')
     .post(isLoggedIn,buySubscription)
     
router
     .route('/verify')
     .post(isLoggedIn,verifySubscription) 
     
router
     .route('/unsubscribe')
     .post(isLoggedIn,cancelSubscription)  
     
router
     .route('/records')
     .get(isLoggedIn,authorizedRoles,allPayments)    
     
     
export default router;     