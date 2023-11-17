import { Router } from "express";
import { authorizedRoles, isLoggedIn } from "../middlewares/auth.middleware.js";
import { userStats } from "../controllers/Miscellaneous.js";


const router = Router();

// {{URL}}/api/v1/
// router.route('/contact').post(contactUs);
router
  .route('/admin/stats/users')
  .get(isLoggedIn, authorizedRoles, userStats);

export default router;