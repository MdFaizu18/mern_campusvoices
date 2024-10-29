import feedbackModel from "../models/feedbackModel.js";

// to get all the feedbacks for admin -- normal
export const getAdminNormalFeedback = async (req, res, next) => {
    const { year, sort, search, startDate, endDate } = req.query;

    const queryObject = { messageType: 'normal' };
    if (search) {
        queryObject.$or = [
            { name: { $regex: search, $options: 'i' } },
        ];
    }
    if (year && year !== 'all') {
        queryObject.year = year;
    }
    if (startDate && endDate) {
        queryObject.createdAt = {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
        };
    }
    const sortOptions = {
        newest: '-createdAt',
        oldest: 'createdAt',
    };

    const sortKey = sortOptions[sort] || sortOptions.newest;



    try {
        const feedbacks = await feedbackModel.find(queryObject)
            .sort(sortKey)
        const currrentFeedbacks = feedbacks.length;
        const Totalfeedbacks = await feedbackModel.countDocuments(queryObject); // Count filtered documents
        const numOfPages = Math.ceil(Totalfeedbacks / limit);

        res.status(200).json({ Totalfeedbacks, numOfPages, currrentFeedbacks, currentPage: page, feedbacks });
    } catch (error) {
        next(error)
        // res.status(500).json({ message: "Failed to fetch feedbacks", error: error.message });
    }
};


// to get all the feedbacks 
export const getUserAllFeedback = async (req, res) => {
    const { page, limit } = req.query;
    const queryObject = { createdBy: req.user.userId };

    const pageNumber = Number(page) || 1;
    const itemsPerPage = Number(limit) || 10;
    const skip = (pageNumber - 1) * itemsPerPage;

    try {
        // Fetch normal feedbacks
        const normalFeedbacks = await feedbackModel.find({ ...queryObject, messageType: 'normal' });
        const normalFeedbacksCount = normalFeedbacks.length;

        // Fetch personal feedbacks
        const personalFeedbacks = await feedbackModel.find({ ...queryObject, messageType: 'secret' });
        const personalFeedbacksCount = personalFeedbacks.length;

        // Fetch paginated feedbacks
        const feeds = await feedbackModel.find(queryObject)
            .sort({ createdAt: -1 })
        const feedsTotal = await feedbackModel.countDocuments(queryObject); // Total feedback count
        const numOfPages = Math.ceil(feedsTotal / itemsPerPage);

        res.status(200).json({
            feedsTotal,
            numOfPages,
            currentPage: pageNumber,
            feeds,
            normalFeedbacksCount,
            personalFeedbacksCount
        });

    } catch (error) {
        res.status(500).json({ message: "Failed to fetch the feedback", error: error.message });
    }
}


// to get all the feedbacks 
export const getAdminAllFeedback = async (req, res) => {
    if (!req.user) {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

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



        // Fetch feedbacks by department only, without limiting to userId
        const combinedQueryObject = { ...departmentFilter };

        // Fetch normal feedbacks
        const normalFeedbacks = await feedbackModel.find({ ...combinedQueryObject, messageType: 'normal' });
        const normalFeedbacksCount = normalFeedbacks.length;

        // Fetch personal feedbacks
        const personalFeedbacks = await feedbackModel.find({ ...combinedQueryObject, messageType: 'secret' });
        const personalFeedbacksCount = personalFeedbacks.length;


        // Fetch paginated feedbacks
        const feeds = await feedbackModel.find(combinedQueryObject)
            .sort({ createdAt: -1 })
        const feedsTotal = await feedbackModel.countDocuments(combinedQueryObject); // Total feedback count
     


        res.status(200).json({
            feedsTotal,
            feeds,
            normalFeedbacks,
            personalFeedbacks,
            normalFeedbacksCount,
            personalFeedbacksCount,
        });

    } catch (error) {
        console.error('Error fetching feedbacks:', error.message);
        res.status(500).json({ message: "Failed to fetch the feedback", error: error.message });
    }
};


// to create the feedback 
export const createFeedback = async (req, res) => {

    if (!req.user || !req.user.userId) {
        return res.status(400).json({ msg: 'User ID not found in request' });
    }
    req.body.createdBy = req.user.userId;
    const feedbacks = await feedbackModel.create(req.body);
    res.status(200).json({ feedbacks });
};



// to get the single feedback 
export const getOneFeedback = async (req, res) => {
    const { id } = req.params;
    const msg = await feedbackModel.findById(id);
    if (!msg) {
        return res.status(404).json({ msg: `no feedback with the ${id}` })
    }
    res.status(200).json({ msg })
}

// to delete the particular feedback 
export const deleteFeedback = async (req, res) => {
    const { id } = req.params;
    const removedFeed = await feedbackModel.findByIdAndDelete(id);
    res.status(201).json({ msg: "feed deleted...", Feed: removedFeed })
}
