import express from "express";
import {
    createRatings,
    deleteRatings,
    getAllRatings,
    updateRatings,
    getSingleRatings,
} from "../controllers/staffRatingsController.js";
import { authenticateUser } from "../middleware/AuthenticationMiddleware.js";

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateUser);

// Routes that don't require an ID
router.route("/").get(getAllRatings).post(createRatings);

// Routes that require an ID
router
    .route("/:id")
    .get(getSingleRatings)
    .patch(updateRatings)
    .delete(deleteRatings);


export default router;
