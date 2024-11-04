import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, LogOut, ThumbsUp , MessageCircle , MessageSquare, Award, Book, ChevronDown, Menu, ChevronRight } from 'lucide-react';
import { useNavigate, Link, useLoaderData, redirect } from 'react-router-dom';
import DialogBox from '../../components/res/DailogBox';
import Navbar from '../../components/res/Navbar';
import backImg from '../../assets/images/clg-img-13.jpg';
import customFetch from '../../utils/CustomFetch';
import { toast } from 'react-toastify';

export const loader = async () => {
    try {
        const data = await customFetch.get('/dashboard-student/current-user');
        return data;
    } catch (error) {
        if (error.response && error.response.status === 403) {
            // toast.error("Please Login !!")
            return redirect('/')
        } else {
            // toast.error("Please Login !!")
            return redirect('/')
        }
    }
}

export default function MainDashboardStudent() {
    const data = useLoaderData();

    const [rating, setRating] = useState(0);
    const [features, setFeatures] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);
    const [showMoreFeedback, setShowMoreFeedback] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [department, setDepartment] = useState('');
    const [userId, setUserId] = useState('');

    const navigate = useNavigate();

    const handleCardClick = (path) => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });

        setTimeout(() => {
            navigate(path);
        }, 300);
    };

    useEffect(() => {
        if (data && data.data && data.data.user) {
            setDepartment(data.data.user.department);
            setUserId(data.data.user._id);
        }
    }, [data]);

    useEffect(() => {
        // Retrieve and parse stored rating submissions
        const storedData = JSON.parse(localStorage.getItem('ratingSubmissions')) || {};

        // Check if the current user has a stored submission
        const userSubmission = storedData[userId];
        if (userSubmission) {
            const { submissionDate } = userSubmission;
            const oneMonth = 30 * 24 * 60 * 60 * 1000;
            const now = new Date().getTime();

            // If the user has a submission within the last month, disable further submissions
            if (now - new Date(submissionDate).getTime() < oneMonth) {
                setIsDisabled(true);
            }
        }
    }, [userId]);

    // Fetch current user details on component mount
    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await customFetch.get("/dashboard-admin/feature");
                setFeatures(response.data); // Adjust 'response.data' based on your API structure
            } catch (error) {
                console.error("Failed to fetch user data", error);
                toast.error("Failed to load features.");
            }
        };
        fetchCurrentUser();
    }, []);

    // Handle rating submission
    const handleSubmit = async () => {
        if (!rating) {
            toast.error("Please provide a rating!");
            return;
        }

        try {
            const response = await customFetch.post('/depart-ratings', { rating, department });
            if (response.status === 200) {
                // Store user-specific submission data
                const storedData = JSON.parse(localStorage.getItem('ratingSubmissions')) || {};
                storedData[userId] = {
                    submissionDate: new Date().toISOString(),
                };
                localStorage.setItem('ratingSubmissions', JSON.stringify(storedData));

                setIsDisabled(true);
                setIsSubmitted(true);
                setTimeout(() => setIsSubmitted(false), 5000); // Hide the confirmation after 5 seconds
            }
        } catch (error) {
            toast.error("Error submitting rating");
        }
    };



    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-100 to-indigo-200">
            <Navbar />

            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative h-80 overflow-hidden"
            >
                <motion.img
                    src={backImg}
                    alt="College Campus"
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
                    <motion.h1
                        className="text-4xl md:text-6xl font-bold text-center mb-4"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        Enhance Your Campus
                    </motion.h1>
                    <motion.p
                        className="text-xl md:text-2xl text-center"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                    >
                        Your voice matters. Shape the future of your education.
                    </motion.p>
                </div>
                <motion.div
                    className="absolute bottom-0 left-0 right-0 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                >
                    <ChevronDown size={40} className="text-white animate-bounce" />
                </motion.div>
            </motion.div>

            {/* Main content */}
            <main className="flex-grow container mx-auto py-10 px-4 sm:px-6 lg:px-20">
                {/* MIT Chatter Box */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <h2 className="text-4xl font-bold text-indigo-900 mb-8 text-center">MIT Chatter Box</h2>
                    <p className="text-xl mb-8 text-center text-indigo-700">
                        "Engage with your college community by providing valuable feedback to improve your campus experience."
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Share Feedback", icon: MessageSquare, color: "from-orange-400 to-pink-500", path: "/student-dashboard/share-feedback" },
                            { title: "Rate Faculties", icon: Award, color: "from-green-400 to-cyan-500", path: "/student-dashboard/rate-faculties" },
                            { title: "Feedback Insights", icon: Book, color: "from-blue-400 to-indigo-500", path: "/student-dashboard/feeds" }
                        ].map((card, index) => (
                            <div onClick={() => handleCardClick(card.path)} key={card.title}>
                                <motion.div
                                    className={`rounded-lg p-6 text-white shadow-lg transform hover:-translate-y-2 transition-all duration-300 bg-gradient-to-br ${card.color}`}
                                    whileHover={{ scale: 1.05 }}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.2, duration: 0.5 }}
                                >
                                    <card.icon className="w-16 h-16 mb-4" />
                                    <h3 className="text-2xl font-semibold mb-2">{card.title}</h3>
                                    <p>Improve campus life by sharing your thoughts and experiences.</p>
                                    <div className="flex justify-between items-center">
                                        <p className="text-right"></p>
                                        <ChevronRight size={40} className="text-white animate-bounce" />
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* Rating Box and Additional Information */}
                <div className="flex flex-col md:flex-row gap-8 mb-16">
                    {/* Rating Box */}
                    <motion.section
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="bg-white rounded-lg shadow-xl p-8 flex-1 relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-300 to-purple-300"></div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">Department Ratings</h2>
                        <p className="mb-6 text-lg text-gray-600">
                            Please provide ratings for your respective department based on its performance and overall effectiveness.
                        </p>
                        <div className="flex flex-col items-center mb-6">
                            <div className="flex mb-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <motion.div
                                        key={star}
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <Star
                                            className={`w-12 h-12 cursor-pointer transition-colors duration-300 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                                }`}
                                            onClick={() => setRating(star)}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                            <motion.button
                                whileHover={{ scale: isDisabled ? 1 : 1.05 }}
                                whileTap={{ scale: isDisabled ? 1 : 0.95 }}
                                className={`px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${isDisabled
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg hover:shadow-xl'
                                    }`}
                                onClick={handleSubmit}
                                disabled={isDisabled}
                            >
                                Submit Rating
                            </motion.button>
                        </div>
                        {isDisabled && !isSubmitted && (
                            <p className="text-sm text-gray-600 text-center">*You can submit a new rating after one month</p>
                        )}
                        <AnimatePresence>
                            {isSubmitted && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90"
                                >
                                    <div className="text-center">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                        >
                                            <Star className="w-16 h-16 text-yellow-400 fill-current mx-auto mb-4" />
                                        </motion.div>
                                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Thank you for your rating!</h3>
                                        <p className="text-gray-600">Your feedback helps us improve our services.</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.section>

                    {/* Additional Information */}
                    <motion.section
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="bg-white shadow-xl rounded-lg p-8 flex-1 flex flex-col justify-center relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-300 to-blue-300"></div>
                        <h3 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
                            <MessageCircle className="w-8 h-8 mr-2 text-blue-500" />
                            Your feedback is invaluable to us
                        </h3>
                        <p className={`text-gray-600 leading-relaxed ${showMoreFeedback ? '' : 'line-clamp-3'}`}>
                            Please take a moment to evaluate your department's performance on a scale of 1 to 5,
                            where 1 represents the lowest satisfaction and 5 represents the highest. Your honest
                            feedback helps us continually improve and provide the best possible educational experience.
                            Thank you for your participation in enhancing our department's effectiveness.
                        </p>
                        <button
                            className="mt-4 text-blue-500 font-semibold hover:text-blue-600 focus:outline-none flex items-center"
                            onClick={() => setShowMoreFeedback(!showMoreFeedback)}
                        >
                            {showMoreFeedback ? 'Show Less' : 'Show More'}
                            <motion.div
                                animate={{ rotate: showMoreFeedback ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ThumbsUp className="w-5 h-5 ml-1" />
                            </motion.div>
                        </button>
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                            <h4 className="text-lg font-semibold text-gray-800 mb-2">Why Your Feedback Matters</h4>
                            <ul className="list-disc list-inside text-gray-600">
                                <li>Helps improve course content and delivery</li>
                                <li>Enhances overall student experience</li>
                                <li>Contributes to the growth of our academic community</li>
                            </ul>
                        </div>
                    </motion.section>
                </div>

                {/* Recent Campus Improvements */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.1, delay: 0.9 }}
                    className="mb-16"
                >
                    <div className="text-3xl font-bold text-indigo-900 mb-8 text-center">Recent Campus Improvements</div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => {
                            // Define gradient colors
                            const colors = [
                                "from-blue-400 to-cyan-300",
                                "from-green-400 to-emerald-300",
                                "from-purple-400 to-pink-300"
                            ];

                            // Select a color based on the index to cycle through colors
                            const color = colors[index % colors.length];

                            return (
                                <motion.div
                                    key={index}
                                    className={`bg-gradient-to-br ${color} rounded-lg p-6 shadow-lg transform hover:-translate-y-2 transition-all duration-300`}
                                    whileHover={{ scale: 1.05 }}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.2, duration: 0.5 }}
                                >
                                    <div className="text-4xl mb-4">{feature.emoji}</div>
                                    <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                                    <p className="text-gray-700">{feature.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.section>

            </main>

            {/* Footer */}
            <motion.footer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.01, delay: 0.01 }}
                className="bg-indigo-900 text-white py-8"
            >
                <div className="container mx-auto px-4 text-center">
                    <p>&copy; 2024 Campus Voices. All rights reserved.</p>
                    <div className="mt-4 flex justify-center space-x-4">
                        <a href="#" className="hover:text-purple-400 transition-colors duration-300">Privacy Policy</a>
                        <a href="#" className="hover:text-purple-400 transition-colors duration-300"><DialogBox title="Terms & Conditions" /></a>
                        <a href="#" className="hover:text-purple-400 transition-colors duration-300">Contact Us</a>
                    </div>
                </div>
            </motion.footer>
        </div>
    );
}