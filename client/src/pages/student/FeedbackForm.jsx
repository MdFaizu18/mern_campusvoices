import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, BookOpen, Home, Coffee, Lock, Send } from 'lucide-react';
import Navbar from '../../components/res/Navbar';
import BannerImg from '../../assets/images/FeedbackBanner1.jpg';
import customFetch from '../../utils/CustomFetch';
import { toast } from 'react-toastify'; // Assuming you're using react-toastify for notifications


// Feedback categories
const categories = [
    { name: 'Academics', icon: BookOpen },
    { name: 'Facilities', icon: Home },
    { name: 'Campus Life', icon: Coffee },
    { name: 'Personal', icon: Lock },
];

export default function FeedbackForm() {
    const [isPersonal, setIsPersonal] = useState(false); // Feedback type (Normal or Secret)
    const [userName, setUserName] = useState(''); // Store user's name
    const [userDep, setUserDep] = useState(''); // Store user's department
    const [year, setYear] = useState(''); // Store user's year of study
    const [category, setCategory] = useState(''); // Feedback category
    const [profileImg, setProfileImg] = useState(''); // Feedback category
    const [message, setMessage] = useState(''); // Feedback message
    const [mobileNo, setMobileNo] = useState('');
    const [registerNo, setRegisterNo] = useState('');
    const [email, setEmail] = useState('')
    const userId = '1234'; // Replace with actual userId from your app logic
   

    useEffect(() => {
        // Set the default category to the first item in the categories array
        if (categories.length > 0) {
            setCategory(categories[0].name); // Assuming each category object has a 'name' property
        }
    }, [categories]);


    // Fetch current user details on component mount
    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await customFetch.get("/dashboard-student/current-user");
                setUserName(response.data.user.name);
                setUserDep(response.data.user.department);
                setProfileImg(response.data.user._id);
                setRegisterNo(response.data.user.registerNo);
                setEmail(response.data.user.email);
                setMobileNo(response.data.user.mobileNo);
            } catch (error) {
                console.error("Failed to fetch user data", error);
            }
        };
        fetchCurrentUser();
    }, []);




    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await customFetch.get("/dashboard-student/current-user");
            const today = new Date().toISOString().split('T')[0]; // Get today's date in format 'YYYY-MM-DD'
            const feedbackCountKey = `feedbackCount_${response.data.user._id}`; // Key for tracking daily feedback count
            const lastSubmissionDateKey = `lastSubmissionDate_${response.data.user._id}`;

            let feedbackCountToday = parseInt(localStorage.getItem(feedbackCountKey)) || 0;
            const lastSubmissionDate = localStorage.getItem(lastSubmissionDateKey);

            // Reset feedback count if the last submission wasn't today
            if (lastSubmissionDate !== today) {
                feedbackCountToday = 0; // Reset count for new day
                localStorage.setItem(lastSubmissionDateKey, today);
            }

            // Prevent submission if daily limit (2) is reached
            if (feedbackCountToday >= 2) {
                toast.error("You have reached the daily submission limit for feedback.");
                return;
            }

            // Prepare form data for submission
            const formData = new FormData();
            formData.append("name", userName);
            formData.append("department", userDep);
            formData.append("year", year);
            formData.append("messageType", isPersonal ? 'secret' : 'normal');
            formData.append("category", category);
            formData.append("message", message);
            formData.append("image", profileImg);
            formData.append("email", email);
            formData.append("mobileNo", mobileNo);
            formData.append("registerNo", registerNo);
            const data = Object.fromEntries(formData);

            // Submit feedback via customFetch
            await customFetch.post('/dashboard-student/feedbacks', data);
            toast.success("Feedback submitted successfully");

            // Increment feedback count and save in localStorage
            localStorage.setItem(feedbackCountKey, feedbackCountToday + 1);

            // Clear form after successful submission
            setYear('');
            setMessage('');
        } catch (error) {
            toast.error(error?.response?.data?.msg || "Failed to submit feedback");
        }
    };

    const yearOptions = ['I', 'II', 'III', 'IV']; // Year options

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar /> {/* Navbar component */}

            {/* Banner Section */}
            <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 h-52">
                <img
                    className="absolute inset-0 w-full h-full object-cover mix-blend-multiply filter brightness-50"
                    src={BannerImg}
                    alt="Campus"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Your Voice Matters
                    </h1>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="lg:grid lg:grid-cols-12 lg:gap-8">

                    {/* Left Section - Feedback Instructions */}
                    <div className="lg:col-span-5">
                        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            Help Us Improve Your Campus Experience
                        </h2>
                        <p className="mt-4 text-lg text-gray-500">
                            Your feedback is crucial in shaping the future of our institution. Whether it's about academics, facilities, campus life, or personal matters, we're here to listen and act on your suggestions.
                        </p>
                        <div className="mt-6 bg-white overflow-hidden shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-sm font-medium text-gray-900">How It Works</h3>
                                <div className="mt-5">
                                    <div className="flex items-center mb-2">
                                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
                                            <span className="text-white text-sm font-medium">1</span>
                                        </div>
                                        <p className="ml-3 text-sm text-gray-700">Choose feedback type</p>
                                    </div>
                                    <div className="flex items-center mb-2">
                                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
                                            <span className="text-white text-sm font-medium">2</span>
                                        </div>
                                        <p className="ml-3 text-sm text-gray-700">Fill in the details</p>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
                                            <span className="text-white text-sm font-medium">3</span>
                                        </div>
                                        <p className="ml-3 text-sm text-gray-700">Submit your feedback</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Right Section - Feedback Form */}
                    <div className="mt-12 lg:mt-0 lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white shadow-xl rounded-lg overflow-hidden"
                        >
                            <div className="px-4 py-5 sm:p-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Submit Your Feedback</h2>

                                {/* Feedback Type Toggle */}
                                <div className="flex justify-center mb-6">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setIsPersonal(false)}
                                        className={`px-4 py-2 rounded-l-md focus:outline-none ${!isPersonal ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' : 'bg-gray-200 text-gray-700'
                                            }`}
                                    >
                                        Normal Feedback
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setIsPersonal(true)}
                                        className={`px-4 py-2 rounded-r-md focus:outline-none ${isPersonal ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' : 'bg-gray-200 text-gray-700'
                                            }`}
                                    >
                                        Secret Feedback
                                    </motion.button>
                                </div>

                                {/* Feedback Form */}
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <AnimatePresence>
                                        {/* Non-Secret Feedback (shows additional fields) */}
                                        {!isPersonal && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <div className="mb-4">
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Name
                                                    </label>
                                                    <div className="mt-1 relative">
                                                        <input
                                                            type="text"
                                                            value={userName}
                                                            onChange={(e) => setUserName(e.target.value)}
                                                            required
                                                            readOnly
                                                            className="focus:ring-indigo-500 px-2 py-2 focus:border-indigo-500 block w-full pl-10 sm:text-sm border rounded-md"
                                                            placeholder="Enter your name"
                                                        />
                                                        <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                                    </div>
                                                </div>

                                                <div className="mb-4">
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Department
                                                    </label>
                                                    <div className="mt-1 relative">
                                                        <input
                                                            type="text"
                                                            value={userDep}
                                                            onChange={(e) => setUserDep(e.target.value)}
                                                            required
                                                            readOnly
                                                            className="focus:ring-indigo-500 px-2 py-2 focus:border-indigo-500 block w-full pl-10 sm:text-sm border rounded-md"
                                                            placeholder="Enter your department"
                                                        />
                                                        <BookOpen className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                                    </div>
                                                </div>

                                                <div className="mb-4">
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Year
                                                    </label>
                                                    <div className="mt-1 relative">
                                                        <select
                                                            value={year}
                                                            onChange={(e) => setYear(e.target.value)}
                                                            required
                                                            className="focus:ring-indigo-500 px-2 py-2 focus:border-indigo-500 block w-full pl-10 sm:text-sm border rounded-md"
                                                        >
                                                            <option value="">Select year</option>
                                                            {yearOptions.map((option) => (
                                                                <option key={option} value={option}>
                                                                    {option}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <Coffee className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Hidden Fields for isPersonal */}
                                    {isPersonal && (
                                        <>
                                            <input type="text" name="name" defaultValue={userName} hidden />
                                            <input type="text" name="department" defaultValue={userDep} hidden />
                                            <input type="text" name="year" defaultValue="I" hidden />
                                            <input type="text" name="messageType" defaultValue="secret" hidden />

                                        </>

                                    )}


                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Category
                                        </label>
                                        <div className="mt-2 grid grid-cols-2 gap-2">
                                            {categories.map((cat) => (
                                                <motion.button
                                                    key={cat.name}
                                                    required
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => setCategory(cat.name)}
                                                    type="button"
                                                    className={`px-4 py-2 rounded-md focus:outline-none flex items-center justify-center space-x-2 ${category === cat.name
                                                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                                                        : 'bg-gray-200 text-gray-700'
                                                        }`}
                                                >
                                                    <cat.icon className="h-5 w-5" />
                                                    <span>{cat.name}</span>
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Feedback Message */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Message
                                        </label>
                                        <div className="mt-1 relative">
                                            <textarea
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                required
                                                rows={4}
                                                className="focus:ring-indigo-500 px-2 py-2 focus:border-indigo-500 block w-full pl-10 sm:text-sm border rounded-md"
                                                placeholder="Enter your feedback here..."
                                            />
                                            <Send className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="flex justify-end">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            type="submit"
                                            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-md"
                                        >
                                            Submit Feedback
                                        </motion.button>
                                    </div>
                                </form>

                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
