import { Router } from "express";
const router = Router();

import { addDepartRatings, getDepartRatings } from "../controllers/departRatingsController.js";
import { authenticateUser } from "../middleware/AuthenticationMiddleware.js";

router.use(authenticateUser);

router.get("/", getDepartRatings);
router.post("/", addDepartRatings);

export default router;