import feedbackModel from "../models/feedbackModel.js";
import userModel from "../models/userModel.js";

export const getAllStats = async (req, res,next) => {
    try {
        const Totalfeedbacks = await feedbackModel.countDocuments();
        const Totalusers = await userModel.countDocuments();

        const feedbackCountsByYear = await feedbackModel.aggregate([
            {
                $group: {
                    _id: { year: "$year", messageType: "$messageType" },
                    count: { $sum: 1 }
                }
            }
        ]);
        const feedbackCountsByDepartment = await feedbackModel.aggregate([
            {
                $group: {
                    _id: "$department",
                    count: { $sum: 1 }
                }
            }
        ]);

        // Separate counts by messageType for each year
        const feedbackCountsByYearSeparated = {};
        const personalFeedbackCount = feedbackCountsByYear.find(item => item._id.messageType === "personal");
        feedbackCountsByYear.forEach(item => {
            const { year, messageType } = item._id;
            if (messageType !== "personal") {
                if (!feedbackCountsByYearSeparated[year]) {
                    feedbackCountsByYearSeparated[year] = {};
                }
                feedbackCountsByYearSeparated[year][messageType] = item.count;
            }
        });

        const feedbackTotalYearCount = { ...feedbackCountsByYearSeparated };

        if (personalFeedbackCount) {
            feedbackTotalYearCount["personal"] = personalFeedbackCount.count;
        }



        res.json({
            Totalfeedbacks,
            Totalusers,
            feedbackTotalYearCount,
            feedbackTotalDepartCount: feedbackCountsByDepartment,
        });
    } catch (error) {
        console.error(error);
        next(error)
        // res.status(500).json({ error: 'Internal Server Error by thunder client' });
    }
};
