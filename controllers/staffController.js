import { StatusCodes } from "http-status-codes";
import staffModel from "../models/staffModel.js";



export const getAllStaffs = async (req, res) => {
    try {
        // Determine the department filter based on user role
        let departmentFilter = {};
        if (req.user.role === 'cseAdmin') {
            departmentFilter.department = 'CSE';
        } else if (req.user.role === 'eceAdmin') {
            departmentFilter.department = 'ECE';
        } else if (req.user.role === 'mechAdmin') {
            departmentFilter.department = 'MECH';
        } else if (req.user.role === 'eeeAdmin') {
            departmentFilter.department = 'EEE';
        } else if (req.user.role === 'aimlAdmin') {
            departmentFilter.department = 'AIML';
        } else if (req.user.role === 'itAdmin') {
            departmentFilter.department = 'IT';
        } else if (req.user.role === 'BMEAdmin') {
            departmentFilter.department = 'BME';
        } else if (req.user.role === 'civilAdmin') {
            departmentFilter.department = 'CIVIL';
        }

        // Create the search query object, combining search and department filter
        const queryObject = { ...departmentFilter };


        // Fetch staff based on the combined query object
        const allStaff = await staffModel.find(queryObject);
        const TotalNoStaffs = await staffModel.countDocuments(queryObject);

        // Respond with the filtered staff list
        res.status(200).json({ TotalNoStaffs, staffs: allStaff });
    } catch (error) {
        console.error('Error fetching staff members:', error.message);
        res.status(500).json({ message: "Failed to fetch the staff members", error: error.message });
    }
};


export const createStaff = async (req, res) => {
    const staffCode = req.body.staffCode;
    const isStaffCode = await staffModel.findOne({ staffCode});
    if (isStaffCode) {
        return res.status(400).json({ message: "Staff Code already exists" });
    }
    const staff = await staffModel.create(req.body);
    res.status(200).json({ msg: "staff added... ", staff });
};

export const getOneStaff = async (req, res) => {
    const staff = await staffModel.findById(req.params.id);
    res.status(StatusCodes.OK).json({ staff });
};

export const updateStaff = async (req, res) => {
    const updatedStaff = await staffModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        }
    );
    res
        .status(StatusCodes.OK)
        .json({ msg: "Staff details modified...", updatedStaff });
};

export const deleteStaff = async (req, res) => {
    const removedStaff = await staffModel.findByIdAndDelete(req.params.id);
    res
        .status(StatusCodes.OK)
        .json({ msg: "Staff details deleted...", staff: removedStaff });
};