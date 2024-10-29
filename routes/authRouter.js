import { Router } from "express";
import { login, register, logout, adminLogin } from "../controllers/authController.js";
import { validateRegisterInput, validateLoginInput } from "../middleware/ValidationMiddleware.js";
import { authenticateUser } from "../middleware/AuthenticationMiddleware.js";

const router = Router();
router.use(authenticateUser);

router.post('/register', validateRegisterInput, register);
router.post('/login', validateLoginInput, login);
router.post('/login-admin', adminLogin);
router.get('/logout', logout)


export default router;