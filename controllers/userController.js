
import cloudinary from "../config/cloudinaryConfig.js";
import userModel from "../models/userModel.js"
import mongoose from 'mongoose';
import { comparePassword, hassPassword } from '../utils/passwordUtils.js';
import staffModel from "../models/staffModel.js";
// Example for Node.js/Express with JWT

export const getCurrentUser = async (req, res) => {
    if (!req.user) {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    try {
        const user = await userModel.findOne({ _id: req.user.userId });
        res.status(200).json({ user: user });

    } catch (error) {
        res.status(500).json({ msg: 'error in current user', error })
    }
}


// Controller to get the count of users based on the user's role
export const getUsersCount = async (req, res) => {
    try {
        // Determine the department filter based on user role
        let roleFilter = {};
        if (req.user.role === 'cseAdmin') {
            roleFilter.department = 'CSE';
        } else if (req.user.role === 'eceAdmin') {
            roleFilter.department = 'ECE';
        } else if (req.user.role === 'mechAdmin') {
            roleFilter.department = 'MECH';
        } else if (req.user.role === 'eeeAdmin') {
            roleFilter.department = 'EEE';
        } else if (req.user.role === 'aimlAdmin') {
            roleFilter.department = 'AIML';
        } else if (req.user.role === 'itAdmin') {
            roleFilter.department = 'IT';
        } else if (req.user.role === 'bmeAdmin') {
            roleFilter.department = 'BME';
        } else if (req.user.role === 'civilAdmin') {
            roleFilter.department = 'CIVIL';
        }

        // Fetch the count of users with the specified role and department
        const userCount = await userModel.countDocuments({ role: 'user', ...roleFilter });

        res.status(200).json({ userCount });
    } catch (error) {
        res.status(500).json({ msg: 'Error in getting user count', error });
    }
};




export const updateUser = async (req, res) => {
    try {
        console.log("Update user function called");
        const { id } = req.params;
        const updates = req.body;

        console.log("Request file:", req.file);
        console.log("Request body:", req.body);

        // If there's a file uploaded, upload it to Cloudinary
        if (req.file) {
            console.log("File detected, attempting to upload to Cloudinary");
            try {
                // Convert buffer to base64 string
                const base64Image = `data:${req.file.mimetype
                    };base64,${req.file.buffer.toString("base64")}`;

                const result = await cloudinary.uploader.upload(base64Image, {
                    folder: "services",
                    resource_type: "auto",
                });
                console.log("Cloudinary upload result:", result);
                updates.profileImage = result.secure_url;
            } catch (cloudinaryError) {
                console.error("Cloudinary upload error:", cloudinaryError);
                return res.status(500).json({
                    msg: "Error uploading image to Cloudinary",
                    error: cloudinaryError.message,
                });
            }
        }

        console.log("Attempting to update user in database");
        const updatedUser = await userModel.findByIdAndUpdate(id, updates, {
            new: true,
        });

        if (!updatedUser) {
            console.log("User not found");
            return res.status(404).json({ msg: "User not found" });
        }
        console.log("User updated successfully");
        res.status(200).json({ msg: "User details modified...", updatedUser });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ msg: "Error updating user", error: error.message });
    }
};


export const getUserRole = async (req, res) => {
    const { email: userEmail } = req.params;
    let user = await userModel.findOne({ email: userEmail });
    // If no user is found in userModel, check in the staffModel
    if (!user) {
        user = await staffModel.findOne({ email: userEmail });

        // If still no user is found, return a 404 error
        if (!user) {
            return res.status(404).json({ msg: `No user with email ${userEmail} found` });
        }
    }
    res.status(200).json({ user });
};

export const changePassword = async (req, res) => {
    const { oldPassword, newPassword, password } = req.body;

    console.log("Request body:", req.body); // Add this for debugging

    if (!oldPassword || !newPassword || !password) {
        return res
            .status(400)
            .json({ message: "Please provide all required password fields" });
    }

    try {
        // Retrieve user from database
        const user = await userModel.findOne({ _id: req.user.userId });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if old password matches
        const isMatch = await comparePassword(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Old password is incorrect" });
        }

        // Check if new password matches the confirmation
        if (newPassword !== password) {
            return res
                .status(400)
                .json({ message: "New password and confirm password do not match" });
        }

        // Hash the new password
        const hashedPassword = await hassPassword(newPassword);

        // Update user's password
        await userModel.updateOne(
            { _id: req.user.userId },
            { password: hashedPassword }
        );

        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        console.error("Error changing password:", error);
        res.status(500).json({
            message: "An error occurred while changing password",
            error: error.message,
        });
    }
};

// to getting current profile img of the user 
export const getImgUser = async (req, res) => {
    const { id } = req.params;
    try {
        const objectId = new mongoose.Types.ObjectId(id);

        // Find the user by ObjectId
        const user = await userModel.findById(objectId);


        res.status(200).json({ msg: 'user',user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error updating password' });
    }
}

// to get the current staff details 
export const getCurrentStaff = async (req, res) => {
    if (!req.user) {
        return res.status(403).json({ message: 'Access denied. Staffs only.' });
    }
    try {
        const user = await staffModel.findOne({ _id: req.user.userId }).select('-password');
        res.status(200).json({ user: user });

    } catch (error) {
        res.status(500).json({ msg: 'error in current user', error })
    }
}


export const getUserById = async (req, res) => {
    const { password, userId } = req.body;


    try {
        // Hash the new password
        const hashedPassword = await hassPassword(password);

        // Update the user's password in the database
        await userModel.findByIdAndUpdate(userId, { password: hashedPassword });

        res.status(200).json({ msg: 'Password updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error updating password' });
    }
}

