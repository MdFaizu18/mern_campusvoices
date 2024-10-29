import Router from "express";
import {
    createStaff,
    deleteStaff,
    getAllStaffs,
    getOneStaff,
    updateStaff,
} from "../controllers/staffController.js";
import { authenticateUser } from "../middleware/AuthenticationMiddleware.js";

const router = Router();
router.use(authenticateUser);
router.route("/").get(getAllStaffs).post( createStaff);
router
    .route("/:id")
    .get(getOneStaff)
    .patch( updateStaff)
    .delete(deleteStaff);

export default router;