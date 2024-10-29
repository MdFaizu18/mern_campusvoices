import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = async (req, res, next) => {
    const { token } = req.cookies;
    console.log("Cookies:", req.cookies); // This can help you see all cookies sent with the request.
    console.log("Token:", token); // This will show the specific token value.

    if (!token) {
        return next();
    }
    try {
        const { userId, role } = verifyJWT(token);
        req.user = { userId, role };
        console.log(req.user);
        next();
    } catch (error) {
        return next();
    }
};


// to access the admin pages routes 
// Middleware
export const authorizePermissions = (roles) => {
    return (req, res, next) => {
        // Check if req.user exists and if its role is included in the array of permitted roles
        if (!req.user || !roles.some(role => req.user.role === role)) {
            return res.status(403).json({ message: 'Access forbidden. Only admins and heads allowed.' });
        }
        next();
    };
};``