// controllers/staffRatingsController.js
import { StatusCodes } from "http-status-codes";
import staffRatingModel from "../models/staffRatingsModel.js";
import userModel from "../models/userModel.js";



export const getAllRatings = async (req, res) => {
    const { search } = req.query;

    const queryObject = {};
    if (search) {
        queryObject.$or = [{ name: { $regex: search, $options: "i" } }];
    }

    // Get the department from the current user
    const { userId } = req.user; // Assuming req.user contains the user's department
    const user = await userModel.findById(userId);

    if (!user) {
        return res
            .status(400)
            .json({ msg: "user not found unable to fetch department" });
    }
    const userDepartment = user.department; // Get the user's department

    try {
 

        // Fetch all ratings from the database, filtering by userDepartment
        const ratings = await staffRatingModel.find({
            department: userDepartment, // Filter ratings by department
            ...queryObject, // Include any additional search criteria
        });

        let totalStaff = 0;
        let totalReviews = 0;
        let totalOverallAverage = 0;

        // Iterate over each rating to calculate total count, sum, and average of the stars for each quotient
        const updatedRatings = ratings.map((rating) => {
            let totalAverage = 0;

            const updatedQuotients = rating.ratings.map((quotient) => {
                const totalStars = quotient.star.length;
                const sumStars = quotient.star.reduce((acc, curr) => acc + curr, 0);
                // Calculate average
                const averageStars = totalStars > 0 ? sumStars / totalStars : 0;
                // Round averageStars based on the specified manner
                const roundedAverage = Math.round(averageStars * 2) / 2;

                // Increment totalAverage
                totalAverage += roundedAverage;
                // Increment totalReviews
                totalReviews += totalStars;

                // Create a new object with updated quotient data
                const updatedQuotient = {
                    ...quotient.toObject(), // Convert Mongoose document to plain JavaScript object
                    totalCount: totalStars, // Add total count of stars
                    sum: sumStars, // Add sum of stars
                    average: roundedAverage, // Add rounded average of stars
                };

                return updatedQuotient;
            });

            // Calculate overall average for the current staff's ratings
            const overallAverage =
                rating.ratings.length > 0
                    ? Math.round((totalAverage / rating.ratings.length) * 2) / 2
                    : 0;

            totalStaff++;
            totalOverallAverage += overallAverage;

            // Create a new object with updated rating data
            const updatedRating = {
                ...rating.toObject(), // Convert Mongoose document to plain JavaScript object
                ratings: updatedQuotients, // Update ratings with calculated totalCount, sum, and average
                overallAverage, // Add overall average for the current staff's ratings
            };

            return updatedRating;
        });

        // Calculate department overall average
        const departmentOverallAverage =
            totalStaff > 0
                ? Math.round((totalOverallAverage / totalStaff) * 2) / 2
                : 0;

        // Sort the updated ratings alphabetically by staff name
        const sortedUpdatedRatings = updatedRatings.slice().sort((a, b) => {
            const nameA = a.name.toUpperCase(); // Ignore case
            const nameB = b.name.toUpperCase(); // Ignore case
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0; // Names are equal
        });

        // Sort the updated ratings to get the top five staff based on their overall average ratings
        const sortedTopFive = updatedRatings
            .slice() // Make a copy of the array to avoid mutating the original one
            .sort((a, b) => b.overallAverage - a.overallAverage)
            .slice(0, 5);

        res.status(StatusCodes.OK).json({
            rating: sortedUpdatedRatings,
            topFive: sortedTopFive,
            totalStaff,
            totalReviews,
            departmentOverallAverage,
        });
    } catch (error) {
        console.error(error);
        res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: "Server Error" });
    }
};

export const createRatings = async (req, res) => {
    console.log(req.body);
    const {staffCode}=req.body;
    const staff = await staffRatingModel.findOne({staffCode});
    if (staff) {
        return res.status(400).json({ msg: "Staff already exists" });
    }
    const rating = await staffRatingModel.create(req.body);
    res.status(201).json({ rating });
};

// controllers/staffRatingsController.js
export const updateRatings = async (req, res) => {
    const { id } = req.params;
    let { ratings, comment } = req.body; // Extract ratings and comment from the request body
    console.log("Request Body:", req.body); // Log the entire request body

    try {
        // Fetch the existing document from the database
        const existingDocument = await staffRatingModel.findById(id);
        if (!existingDocument) {
            return res.status(404).json({ error: "Rating not found" });
        }

        // Ensure ratings is an array
        if (!Array.isArray(ratings)) {
            const ratingsArray = Object.entries(ratings).map(([quotient, star]) => ({
                quotient,
                star: [star], // Wrap star in an array
            }));
            ratings = ratingsArray; // Update ratings with the new array
        }

        // Iterate over each rating in the request body and update the corresponding entry in the database
        for (const newRating of ratings) {
            const { quotient, star } = newRating;

            // Ensure that star is always an array
            const starArray = Array.isArray(star) ? star : [star];

            // Find the index of the quotient in the ratings array
            const index = existingDocument.ratings.findIndex(
                (rating) => rating.quotient === quotient
            );

            if (index !== -1) {
                // If the quotient already exists, add the new value(s) to the existing star array
                existingDocument.ratings[index].star.push(...starArray);
            } else {
                // If the quotient doesn't exist, add a new entry for the quotient with the provided star value(s)
                existingDocument.ratings.push({ quotient, star: starArray });
            }
        }

        // Handle comments at the top level
        if (comment) {
            console.log("Comment received:", comment); // Log the received comment
            // Ensure existingDocument.comment is an array
            if (!Array.isArray(existingDocument.comment)) {
                existingDocument.comment = []; // Initialize as an array if not already
            }
            // Push new comments into the existing array
            if (Array.isArray(comment)) {
                existingDocument.comment.push(...comment); // Push new comments into the existing array
            } else {
                existingDocument.comment.push(comment); // If comment is a single string, push it directly
            }
        }

        // Save the updated document back to the database
        await existingDocument.save();

        // Fetch and return the updated document
        const updatedDocument = await staffRatingModel.findById(id);

       

        return res
            .status(StatusCodes.OK)
            .json({ msg: "Ratings modified...", updatedRatings: updatedDocument });
    } catch (error) {
        console.error(error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: "Server Error" });
    }
};

export const getSingleRatings = async (req, res) => {
    const rating = await staffRatingModel.findById(req.params.id);
    const data = rating.ratings.map((rating) => {
   
        return rating.quotient;
    });


    res.status(200).json({ rating: rating });
};

export const deleteRatings = async (req, res) => {
    const { id } = req.params;
    const removedRatings = await staffRatingModel.findByIdAndDelete(id);
    res.status(201).json({ msg: "ratings deleted...", rating: removedRatings });
};
