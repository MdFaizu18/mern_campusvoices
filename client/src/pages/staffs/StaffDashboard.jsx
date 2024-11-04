import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, Hash, Clock, Phone, Mail, ChevronRight, User, Star, Edit, Save, Briefcase, BookOpen, Zap, Activity, MessageSquare, TrendingUp } from 'lucide-react';

const StaffDashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [staffDetails, setStaffDetails] = useState({
        firstName: 'John',
        lastName: 'Doe',
        experience: '5',
        jobPosition: 'Professor',
        department: 'CSE',
        staffCode: 'STAFF123',
        email: 'john.doe@university.edu',
        mobileNumber: '+1234567890',
    });

    const departments = ['CSE', 'ECE', 'MECH', 'IT', 'AIML', 'BME', 'EEE'];

    const closeModal = () => setIsModalOpen(false);

    const openModal = () => {
        setIsModalOpen(true);
        setSelectedStaff({
            name: `${staffDetails.firstName} ${staffDetails.lastName}`,
            position: staffDetails.jobPosition,
            department: staffDetails.department,
            staffCode: staffDetails.staffCode,
            overallAverage: 4.5,
            ratings: {
                teaching: { average: 4.7, quotient: 'Teaching Skills' },
                communication: { average: 4.5, quotient: 'Communication' },
                knowledge: { average: 4.8, quotient: 'Subject Knowledge' },
                punctuality: { average: 4.3, quotient: 'Punctuality' },
            },
        });
    };

    const getRatingColor = (rating) => {
        if (rating >= 4.5) return 'bg-emerald-500';
        if (rating >= 4) return 'bg-blue-500';
        if (rating >= 3.5) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStaffDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsEditing(false);
        console.log('Updated staff details:', staffDetails);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-200 to-pink-100">
            <header className="bg-white bg-opacity-90 backdrop-blur-md shadow-lg sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold text-indigo-800">CampusVoices </h1>
                        <nav>
                            <ul className="flex space-x-8">
                                <li><a href="#" className="text-indigo-600 hover:text-indigo-800 transition-colors">Staff-Dashboard</a></li>
                                {/* {/* <li><a href="#ratings" className="text-indigo-600 hover:text-indigo-800 transition-colors">Ratings</a></li> */}
                                <li><a href="" className="text-indigo-600 hover:text-indigo-800 transition-colors">Logout</a></li> 
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white rounded-2xl shadow-xl overflow-hidden"
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-semibold text-gray-800">Your Profile</h2>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 shadow-md hover:bg-indigo-700 transition-colors duration-300"
                                        onClick={() => setIsEditing(!isEditing)}
                                    >
                                        {isEditing ? (
                                            <>
                                                <Save size={20} />
                                                <span>Save</span>
                                            </>
                                        ) : (
                                            <>
                                                <Edit size={20} />
                                                <span>Edit</span>
                                            </>
                                        )}
                                    </motion.button>
                                </div>

                                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={staffDetails.firstName}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={staffDetails.lastName}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Experience (years)</label>
                                        <input
                                            type="number"
                                            name="experience"
                                            value={staffDetails.experience}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Job Position</label>
                                        <input
                                            type="text"
                                            name="jobPosition"
                                            value={staffDetails.jobPosition}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                                        <select
                                            name="department"
                                            value={staffDetails.department}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        >
                                            {departments.map((dept) => (
                                                <option key={dept} value={dept}>{dept}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Staff Code</label>
                                        <input
                                            type="text"
                                            name="staffCode"
                                            value={staffDetails.staffCode}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={staffDetails.email}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                                        <input
                                            type="tel"
                                            name="mobileNumber"
                                            value={staffDetails.mobileNumber}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>
                                </form>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="mt-8 bg-white rounded-2xl shadow-xl overflow-hidden"
                        >
                            <div className="p-6">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quick Stats</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-4 text-white">
                                        <div className="flex items-center justify-between">
                                            <span className="text-lg font-semibold">Overall Rating</span>
                                            <Star className="h-6 w-6" />
                                        </div>
                                        <p className="text-3xl font-bold mt-2">4.5</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl p-4 text-white">
                                        <div className="flex items-center justify-between">
                                            <span className="text-lg font-semibold">Total Feedbacks</span>
                                            <MessageSquare className="h-6 w-6" />
                                        </div>
                                        <p className="text-3xl font-bold mt-2">127</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-4 text-white">
                                        <div className="flex items-center justify-between">
                                            <span className="text-lg font-semibold">Improvement</span>
                                            <TrendingUp className="h-6 w-6" />
                                        </div>
                                        <p className="text-3xl font-bold mt-2">+12%</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="bg-white rounded-2xl shadow-xl overflow-hidden"
                        >
                            <div className="p-6">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
                                <ul className="space-y-4">
                                    <li className="flex items-center space-x-3">
                                        <div className="bg-blue-100 rounded-full p-2">
                                            <BookOpen className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-800">New feedback received</p>
                                            <p className="text-xs text-gray-500">2 hours ago</p>
                                        </div>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        <div className="bg-green-100 rounded-full p-2">
                                            <Zap className="h-5 w-5 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-800">Rating improved</p>
                                            <p className="text-xs text-gray-500">1 day ago</p>
                                        </div>
                                    </li>
                                    <li className="flex items-center space-x-3">
                                        <div className="bg-purple-100 rounded-full p-2">
                                            <Activity className="h-5 w-5 text-purple-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-800">Profile updated</p>
                                            <p className="text-xs text-gray-500">3 days ago</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="mt-8"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={openModal}
                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl shadow-md hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2"
                            >
                                <Star className="h-5 w-5" />
                                <span>View Detailed Ratings</span>
                            </motion.button>
                        </motion.div>
                    </div>
                </div>
            </main>



            <AnimatePresence>
                {isModalOpen && selectedStaff && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden"
                        >
                            <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
                                <button
                                    onClick={closeModal}
                                    className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                                <h2 className="text-3xl font-bold mb-2">{selectedStaff.name}</h2>
                                <p className="text-xl">{selectedStaff.position}</p>
                            </div>
                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Staff Details</h3>
                                    <div className="flex items-center space-x-3 text-gray-600">
                                        <Award className="h-5 w-5 text-indigo-500" />
                                        <span>{selectedStaff.department}</span>
                                    </div>
                                    <div className="flex items-center space-x-3 text-gray-600">
                                        <Hash className="h-5 w-5 text-indigo-500" />
                                        <span>Staff Code: {selectedStaff.staffCode}</span>
                                    </div>
                                    <div className="flex items-center space-x-3 text-gray-600">
                                        <Clock className="h-5 w-5 text-indigo-500" />
                                        <span>{staffDetails.experience} years of experience</span>
                                    </div>
                                    <div className="flex items-center space-x-3 text-gray-600">
                                        <Phone className="h-5 w-5 text-indigo-500" />
                                        <span>{staffDetails.mobileNumber}</span>
                                    </div>
                                    <div className="flex items-center space-x-3 text-gray-600">
                                        <Mail className="h-5 w-5 text-indigo-500" />
                                        <span>{staffDetails.email}</span>
                                    </div>
                                    <div className="mt-6">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-lg font-semibold text-gray-800">Overall Rating</span>
                                            <span className="text-2xl font-bold text-indigo-600">{selectedStaff.overallAverage}</span>
                                        </div>
                                        <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                                            <div
                                                className={`h-full ${getRatingColor(selectedStaff.overallAverage)}`}
                                                style={{ width: `${(selectedStaff.overallAverage / 5) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Rating Distribution</h3>
                                    <div className="space-y-6">
                                        {Object.entries(selectedStaff.ratings).map(([category, { average, quotient }]) => (
                                            <div key={category}>
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-sm font-medium text-gray-700 capitalize">{quotient}</span>
                                                    <span className="text-sm font-medium text-gray-700">{average.toFixed(1)} / 5</span>
                                                </div>
                                                <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                                                    <div
                                                        className={`h-full ${getRatingColor(average)}`}
                                                        style={{ width: `${(average / 5) * 100}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-6 py-4 flex justify-end">
                                <button
                                    className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors"
                                    onClick={closeModal}
                                >
                                    <span>Close</span>
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default StaffDashboard;