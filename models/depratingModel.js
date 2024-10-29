import mongoose from "mongoose";

const depRatingsSchema = new mongoose.Schema({
    department: {
        type: String,
        required: true,
        trim: true,
        unique: true // Ensure that each department only has one document for ratings.
    },
    ratings: {
        type: [String], // Array of ratings.
        default: []
    }
});

export default mongoose.model("DepartmentRatings", depRatingsSchema);


