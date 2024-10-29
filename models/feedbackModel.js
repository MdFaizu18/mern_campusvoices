import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema(
    {
        name: String,
        department: {
            type: String,
        },
        year: {
            type: String,
        },
        messageType: String,
        category: {
            type: String,
            enum: ['Academics', 'Facilities', 'Campus Life', 'Personal'],
            default: 'Academics',
        },
        message: String,
        image: String,
        email: String,
        registerNo: String,
        department: String,
        year: String,
        mobileNo: String,
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'user',
        },
    },
    { timestamps: true }
);

export default mongoose.model('Feeds', FeedbackSchema);