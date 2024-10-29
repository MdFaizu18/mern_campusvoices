import mongoose from "mongoose";

const featureSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    emoji: {
        type: String,
        required: true,
    },
});

export default mongoose.model("Features", featureSchema);

