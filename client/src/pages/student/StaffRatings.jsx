// client/src/pages/student/StaffRatings.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Star,
    Send,
    User,
    Book,
    MessageSquare,
    Clock,
    Users,
    Award,
    X,
} from "lucide-react";
import Navbar from "../../components/res/Navbar";
import customFetch from "../../utils/CustomFetch";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";



const RatingModal = ({ isOpen, onClose, staff, user }) => {
    const [ratings, setRatings] = useState({});
    const [comment, setComment] = useState("");

    useEffect(() => {
        if (isOpen) {
            setRatings({});
            setComment("");
        }
    }, [isOpen]);

    const handleRating = (criteriaId, rating) => {
        setRatings((prev) => ({ ...prev, [criteriaId]: rating }));
    };

    // Function to check if all required ratings are filled and valid
    const isRatingValid = () => {
        // Check if every rating is filled and between 1 and 5
        return staff.ratings.every((rating) => {
            const ratingValue = ratings[rating.quotient]; // Get the rating for this specific criteria
            return ratingValue >= 1 && ratingValue <= 5; // Check if rating is between 1 and 5
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isRatingValid()) {
            toast.error("Please provide ratings between 1 and 5 for all criteria.");
            return;
        }

        try {
            const payload = {
                staffId: staff._id,
                comment: [comment],
                ratings: Object.keys(ratings).map((criteriaId) => ({
                    quotient: criteriaId,
                    star: [ratings[criteriaId]],
                })),
            };

            const response = await customFetch.patch(
                `/dashboard-student/ratings/${staff._id}`,
                payload
            );

            toast.success("Rating submitted successfully!");

            // Store the submission date in localStorage
            const submissionDate = new Date().toISOString();
            localStorage.setItem(`ratingSubmitted_${staff._id}_${user._id}`, submissionDate);
            window.location.reload();
            setRatings({});
            setComment("");
            onClose();
        } catch (error) {
            console.error("Error submitting rating:", error);
            toast.error("Failed to submit rating. Please try again.");
        }
    };

    if (!staff) return null;
    const marginTopStyle = window.innerWidth <= 768 ? '-200%' : '-20%';
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{ marginTop: marginTopStyle }}
                    className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl m-4 max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-3xl font-bold text-gray-900">
                                Rate {staff.firstName} {staff.lastName}
                            </h2>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-500 transition-colors"
                            >
                                <X className="w-8 h-8" />
                            </button>
                        </div>
                        <div className="flex items-center space-x-4 mb-6">
                            <User className="w-20 h-20 text-gray-400" />
                            <div>
                                <h3 className="text-2xl font-semibold text-gray-800">
                                    {staff.name}
                                </h3>
                                <p className="text-lg text-gray-600">{staff.department}</p>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {staff.ratings &&
                                    staff.ratings.map((rating) => (
                                        <div key={rating._id} className="bg-gray-50 p-4 rounded-lg">
                                            <label className="flex items-center text-lg font-medium text-gray-700 mb-2">
                                                <Star className="w-6 h-6 mr-2 text-indigo-500" />
                                                {rating.quotient.charAt(0).toUpperCase() +
                                                    rating.quotient.slice(1)}
                                            </label>
                                            <div className="flex space-x-2">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <motion.button
                                                        key={star}
                                                        type="button"
                                                        whileHover={{ scale: 1.2 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => handleRating(rating.quotient, star)}
                                                        className={`focus:outline-none ${(ratings[rating.quotient] || 0) >= star
                                                            ? "text-yellow-400"
                                                            : "text-gray-300"
                                                            }`}
                                                    >
                                                        <Star className="w-8 h-8 fill-current" />
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                            <div>
                                <label
                                    htmlFor={`comment-${staff._id}`}
                                    className="block text-lg font-medium text-gray-700 mb-2"
                                >
                                    Additional Comments{" "}
                                    <span className="text-[#a1a1a1]">( Optional )</span>
                                </label>
                                <textarea
                                    id={`comment-${staff._id}`}
                                    rows={4}
                                    className="shadow-sm focus:ring-indigo-500 px-4 py-4 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Share your thoughts about this staff member..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                ></textarea>
                            </div>
                            <motion.button
                                type="submit"
                                disabled={!isRatingValid()} // Disable button if ratings are not valid
                                className={`w-full ${isRatingValid() ? "bg-gradient-to-r from-indigo-600 to-purple-600" : "bg-gray-300 cursor-not-allowed"} text-white py-3 px-4 rounded-md hover:${isRatingValid() ? "bg-indigo-700" : ""} transition-colors duration-300 flex items-center justify-center text-lg font-semibold`}
                                whileHover={isRatingValid() ? { scale: 1.05 } : {}}
                                whileTap={isRatingValid() ? { scale: 0.95 } : {}}
                            >
                                Submit Rating
                                <Send className="ml-2 w-5 h-5" />
                            </motion.button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};




const StaffCard = ({ staff, onRate ,user}) => {
    const [isRatingDisabled, setIsRatingDisabled] = useState(false);


    useEffect(() => {
        // Assuming you have user._id available in your component
        const submissionDate = localStorage.getItem(`ratingSubmitted_${staff._id}_${user._id}`);
        if (submissionDate) {
            setIsRatingDisabled(true);
        }
    }, [staff._id, user._id]); // Add user._id as a dependency
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
            <div className="p-6">
                <div className="flex items-center space-x-4">
                    <User className="w-16 h-16 text-indigo-500" />
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800">
                            {staff.name}
                        </h3>
                        <p className="text-gray-600">{staff.department}</p>
                    </div>
                </div>
                <motion.button
                    onClick={() => onRate(staff)}
                    className={`mt-4 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-4 rounded-md 
        ${isRatingDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-700"} 
        transition-colors duration-300 flex items-center justify-center`}
                    whileHover={!isRatingDisabled ? { scale: 1.05 } : {}}
                    whileTap={!isRatingDisabled ? { scale: 0.95 } : {}}
                    disabled={isRatingDisabled}
                >
                    {isRatingDisabled ? "Rating Submitted" : "Rate This Staff"}
                </motion.button>

            </div>
        </motion.div>
    );
};


export default function StaffRatingPage() {

    const data = useLoaderData();
    const user = data.data.user;
    const [staffMembers, setStaffMembers] = useState([]);
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStaffMembers = async () => {
            try {
                const response = await customFetch.get("/dashboard-student/ratings");


                // Update this line to match the actual structure of the API response
                if (response.data && Array.isArray(response.data.rating)) {
                    setStaffMembers(response.data.rating); // Assuming 'rating' contains the staff data
                } else {
                    throw new Error("Unexpected data format from API");
                }
                setLoading(false);
            } catch (err) {
                console.error("Error fetching staff members:", err);
                setError("Failed to load staff members. Please try again later.");
                setLoading(false);
            }
        };

        fetchStaffMembers();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-red-500 text-xl">{error}</div>
            </div>
        );
    }

  

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
            <Navbar />

            <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                        Rate Your Instructors
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Your feedback helps us improve the quality of education. Rate your
                        instructors based on their teaching skills, communication, and
                        overall performance.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {staffMembers.map((staff) => (
                        <StaffCard
                            key={staff._id}
                            staff={staff}
                            onRate={setSelectedStaff}
                            user={user}
                        />
                    ))}
                </div>

                <RatingModal
                    isOpen={!!selectedStaff}
                    onClose={() => setSelectedStaff(null)}
                    staff={selectedStaff || {}}
                    user={user}
                />

                <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        Why Your Ratings Matter
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="flex items-start">
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                                    <User className="h-6 w-6" />
                                </div>
                            </div>
                            <div className="ml-4">
                                <h4 className="text-lg font-medium text-gray-900">
                                    Personalized Learning
                                </h4>
                                <p className="mt-2 text-base text-gray-500">
                                    Your ratings help instructors tailor their teaching methods to
                                    better suit student needs.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                                    <MessageSquare className="h-6 w-6" />
                                </div>
                            </div>
                            <div className="ml-4">
                                <h4 className="text-lg font-medium text-gray-900">
                                    Open Communication
                                </h4>
                                <p className="mt-2 text-base text-gray-500">
                                    Ratings foster a culture of open feedback between students and
                                    faculty.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                                    <Award className="h-6 w-6" />
                                </div>
                            </div>
                            <div className="ml-4">
                                <h4 className="text-lg font-medium text-gray-900">
                                    Continuous Improvement
                                </h4>
                                <p className="mt-2 text-base text-gray-500">
                                    Your feedback drives continuous improvement in teaching
                                    quality and course content.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="bg-white">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
                    <div className="mt-8 md:mt-0 md:order-1">
                        <p className="text-center text-base text-gray-400">
                            &copy; 2024 CampusVoices, Inc. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
