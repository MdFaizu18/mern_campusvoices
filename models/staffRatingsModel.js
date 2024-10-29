import mongoose from "mongoose";

const staffRatingsSchema = new mongoose.Schema(
    {
        name: String,
        department: String,
        staffCode: String,
        comment: [String],
        ratings: [
            {
                quotient: String,
                star: [Number],
            },
        ],
    },
    { timestamps: true }
);

export default mongoose.model("StaffRatting", staffRatingsSchema);