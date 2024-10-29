import { Router } from "express";
import { createFeedback, deleteFeedback, getOneFeedback, getUserAllFeedback } from "../controllers/feedbackController.js";
import { authenticateUser } from "../middleware/AuthenticationMiddleware.js";
const router = Router();

router.use(authenticateUser);
// Apply Routes 
router.route("/").get(getUserAllFeedback).post(createFeedback);
router.route("/:id").get(getOneFeedback).delete(deleteFeedback);


export default router;