import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, UserPlus, Zap, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const QuickActions = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleViewFeedbacks = () => {
        navigate('/admin-dashboard/view-feeds');
    };

    const handleAddStaff = () => {
        navigate('/admin-dashboard/add-staff');
    };

    const handleGenerateReport = () => {
        setShowModal(true);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg shadow-md hover:from-purple-700 hover:to-pink-700 transition-colors flex items-center justify-center"
                    onClick={handleViewFeedbacks}
                >
                    <MessageSquare className="mr-2 h-4 w-4" /> View All Feedbacks
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg shadow-md hover:from-purple-700 hover:to-pink-700 transition-colors flex items-center justify-center"
                    onClick={handleAddStaff}
                >
                    <UserPlus className="mr-2 h-4 w-4" /> Add New Staff
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg shadow-md hover:from-purple-700 hover:to-pink-700 transition-colors flex items-center justify-center"
                    onClick={handleGenerateReport}
                >
                    <Zap className="mr-2 h-4 w-4" /> Generate Report
                </motion.button>
            </div>

            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                        onClick={() => setShowModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full m-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-2xl font-bold text-purple-700">Report Generation</h3>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                            <p className="text-lg text-gray-700 mb-6">
                                Exciting things are brewing! Our report generator is getting a supercharged upgrade and in maintanance.
                            </p>
                            <p className="text-xl font-semibold text-purple-600 mb-4">
                                Stay tuned for mind-blowing insights! Coming Soon! 🚀
                            </p>
                            <div className="flex justify-center">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="py-2 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg shadow-md hover:from-purple-700 hover:to-pink-700 transition-colors"
                                    onClick={() => setShowModal(false)}
                                >
                                     Can't wait
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default QuickActions;