import { Router } from "express";
import { getAdminAllFeedback, } from "../controllers/feedbackController.js";
import { authenticateUser } from "../middleware/AuthenticationMiddleware.js";

const router = Router();
// Apply authentication middleware to all routes
router.use(authenticateUser);
// Apply Routes 
// Routes
router.get("/all-feedbacks", getAdminAllFeedback);

export default router;

