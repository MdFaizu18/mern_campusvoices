import departRatingsModel from '../models/depratingModel.js';

export const getDepartRatings = async (req, res) => {
    try {
        // Extract the role from the request (e.g., 'cseAdmin', 'eceAdmin')
        const { role } = req.user;

        // Map roles like 'cseAdmin' to their respective department names
        let department;
        if (role === 'cseAdmin') {
            department = 'CSE';
        } else if (role === 'eceAdmin') {
            department = 'ECE';
        } else if (role === 'eeeAdmin') {
            department = 'EEE';
        } else if (role === 'itAdmin') {
            department = 'IT';
        } else if (role === 'mechAdmin') {
            department = 'MECH';
        } else if (role === 'aimlAdmin') {
            department = 'AIML';
        } else if (role === 'bmeAdmin') {
            department = 'BME';
        } else if (role === 'civilAdmin') {
            department = 'CIVIL';
        } else {
            return res.status(400).json({ message: "Invalid role or unauthorized access." });
        }

        // Find the ratings for the specified department
        const ratings = await departRatingsModel.find({ department });

        // Calculate total rating and total ratings count for the department
        let totalRating = 0;
        let totalRatingsCount = ratings.reduce((acc, doc) => {
            doc.ratings.forEach((rating) => {
                totalRating += parseInt(rating);
            });
            return acc + doc.ratings.length;
        }, 0);

        // Send the filtered ratings and summary data
        res.status(200).json({
            totalRating,
            totalRatingsCount,
            ratings,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// // Controller
export const addDepartRatings = async (req, res) => {
    try {
        const { rating, department } = req.body;

        // Find the existing ratings document for the specific department
        let existingRatings = await departRatingsModel.findOne({ department });

        // If there's no existing ratings document for this department, create a new one
        if (!existingRatings) {
            const newRatings = new departRatingsModel({ department, ratings: [rating] });
            await newRatings.save();
        } else {
            // If there's an existing ratings document, push the new rating to the array
            existingRatings.ratings.push(rating);
            await existingRatings.save();
        }

        // Get all ratings for the specified department after the update
        const updatedRatings = await departRatingsModel.findOne({ department });

        // Calculate the total rating for the department
        let totalRating = updatedRatings.ratings.reduce((acc, rating) => acc + parseInt(rating), 0);

        // Calculate total ratings count for the department
        let totalRatingsCount = updatedRatings.ratings.length;

        // Respond with the message, total rating, and total ratings count
        res.status(200).json({ 
            message: "Rating added successfully.",
            totalRating,
            totalRatingsCount,
            averageRating: totalRatingsCount ? (totalRating / totalRatingsCount).toFixed(2) : 0
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
