import { body, validationResult } from 'express-validator';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../errors/CustomError.js';
import { DEP_STATUS, USER_GENDER, YEAR_STATUS } from '../utils/constant.js';
import mongoose from 'mongoose';
import { param } from 'express-validator';
import userModel from '../models/userModel.js';
import staffModel from "../models/staffModel.js";

// to validate the main validation middleware using this syntax 
const withValidationErrors = (validateValues) => {
    return [
        validateValues,
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map((error) => error.message);
                throw new BadRequestError(errorMessages);
            }
            next();
        },
    ];
};

// ----------------- to validate whether its user or admin ----------------------
export const validateIdParam = withValidationErrors([
    param('id').custom(async (value, { req }) => {
        const isValidMongoId = mongoose.Types.ObjectId.isValid(value);
        if (!isValidMongoId) throw new BadRequestError('invalid MongoDB id');
        const feed = await feedbackModel.findById(value);
        if (!feed) throw new NotFoundError(`no job with id ${value}`);
        const isAdmin = req.user.role === 'admin';
        const isOwner = req.user.userId === feedbackModel.createdBy.toString();
        if (!isAdmin && !isOwner)
            throw UnauthorizedError('not authorized to access this route');
    }),
]);

// --------------------- to validate the reister form ------------------------
export const validateRegisterInput = withValidationErrors([
    body('name').notEmpty().withMessage('name is required'),
    body('department')
        .isIn(Object.values(DEP_STATUS))
        .withMessage('invalid status value'),
    body('registerNo')
        .notEmpty()
        .withMessage('register no is required')
        .isLength({ min: 12 })
        .withMessage('register must be at least 12 characters long')
        .custom(async (registerNo) => {
            const user = await userModel.findOne({ registerNo });
            if (user) {
                throw new BadRequestError('register number already exits')
            }
        }),
    body('email')
        .notEmpty()
        .withMessage('email should be required')
        .isEmail()
        .withMessage('invalid email format')
        .custom(async (email) => {
            const user = await userModel.findOne({ email });
            if (user) {
                throw new BadRequestError('email already exits')
            }
        }),
    body('password')
        .notEmpty()
        .withMessage('password is required')
        .isLength({ min: 8 })
        .withMessage('password must be at least 8 characters long'),
]);


// ------------------------------ to validate the login form --------------------
export const validateLoginInput = withValidationErrors([
    body('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .withMessage('invalid email format'),
    body('registerNo')
        .notEmpty()
        .withMessage('register no is required')
        .isLength({ min: 12 })
        .withMessage('register must be at least 12 characters long'),
    body('password').notEmpty().withMessage('password is required'),
]);

// ---------------------------to validate the form ---------------------------
// Validation for feedback form input
export const validateFormInput = withValidationErrors([
    body('name').notEmpty().withMessage('Name is required'),
    body('department')
        .isIn(Object.values(DEP_STATUS))
        .withMessage('Invalid department value'),
    body('year')
        .isIn(['I', 'II', 'III', 'IV'])
        .withMessage('Invalid year status'),
    body('category')
        .isIn(['Academics', 'Facilities', 'Campus Life', 'Personal'])
        .withMessage('Invalid category value'),
    body('messageType')
        .isIn(['secret', 'normal'])
        .withMessage('Invalid messageType value'),
    body('message').notEmpty().withMessage('Provide some feedback content'),
]);

// to validate the add staff and staff ratings --------------
//* -------------------------- to validate the staff login-----------
export const validateSatffInput = withValidationErrors([
    body("firstName").notEmpty().withMessage(" Name is required"),
    body("lastName").notEmpty().withMessage(" Last is required"),
    body("email")
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("invalid email format"),
    body("phoneNumber").notEmpty().withMessage("Phone Number Must Required"),
    body("department").notEmpty().withMessage("Department is required"),
    body("departmentCode").notEmpty().withMessage("Department Code is required"),
    body("staffCode")
        .notEmpty()
        .withMessage("Staff Code is required")
        .custom(async (value) => {
            // Check if the staff code already exists in the database
            const existingStaff = await staffModel.findOne({ staffCode: value });
            if (existingStaff) {
                // If a staff with the same code is found, throw an error
                throw new Error("Staff code already exists. Please use a unique code.");
            }
            // If no staff with the same code is found, the validation will proceed
            return true;
        }),
    body("experience").notEmpty().withMessage("Experiences is required"),
    body("jobPosition").notEmpty().withMessage("Job Position  is required"),
]);


//*--------------- to  validate thhe input of Rating form-------------

export const validateRatingInput = withValidationErrors([
    body("name").notEmpty().withMessage("Name is required"),
    body("staffCode")
        .notEmpty()
        .withMessage("Staff Code is required")
        .custom(async (value) => {
            // Check if the staff code already exists in the database
            const existingStaff = await staffModel.findOne({ staffCode: value });
            if (existingStaff) {
                // If a staff with the same code is found, throw an error
                throw new Error("Staff code already exists. Please use a unique code.");
            }
            // If no staff with the same code is found, the validation will proceed
            return true;
        }),
    body("ratings")
        .isArray({ min: 1 })
        .withMessage("At least one rating is required"),
]);

export const validateDepartRating = withValidationErrors([
    body("ratings").notEmpty().withMessage("Fill the Ratings")
])

// --------------------- to validate the userProfile form ------------------------
export const validateUserProfileInput = withValidationErrors([
    body('name').notEmpty().withMessage('name is required'),
    body('DOB').notEmpty().withMessage('DOB is required'),
    body('department')
        .isIn(Object.values(DEP_STATUS))
        .withMessage('invalid status value'),
    body('gender')
        .isIn(Object.values(USER_GENDER))
        .withMessage('invalid status value'),
    body('registerNo')
        .notEmpty()
        .withMessage('register no is required')
        .isLength({ min: 12 })
        .withMessage('register must be at least 12 characters long'),
    body('mobileNo')
        .notEmpty()
        .withMessage('mobile no is required')
        .isLength({ min: 10 })
        .withMessage('mobile no must be at least 10 characters long'),
    body('email')
        .notEmpty()
        .withMessage('email should be required')
        .isEmail()
        .withMessage('invalid email format'),
    body('address').notEmpty().withMessage('address is required'),
]);
