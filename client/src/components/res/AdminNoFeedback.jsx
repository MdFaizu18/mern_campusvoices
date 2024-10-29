import React from 'react';
import { motion } from 'framer-motion';
import { Inbox, AlertCircle, RefreshCw } from 'lucide-react';

const AdminNoFeedback= () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-lg border border-gray-200"
        >
            <motion.div
                animate={{
                    y: [0, -10, 0],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
                className="mb-6 text-gray-400"
            >
                <Inbox size={64} />
            </motion.div>
            <motion.h3
                className="text-2xl font-bold text-gray-800 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                No Feedbacks Available
            </motion.h3>
            <motion.p
                className="text-lg text-gray-600 text-center mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                There are currently no feedbacks to display.
                <br />
                This could be due to filtering or lack of submissions.
            </motion.p>
            <motion.div
                className="flex items-center justify-center space-x-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
            >
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center cursor-pointer"
                >
                    <div className="p-3 bg-purple-100 rounded-full mb-2">
                        <AlertCircle size={24} className="text-purple-600" />
                    </div>
                    <span className="text-sm text-gray-600">Check Filters</span>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center cursor-pointer"
                >
                    <div className="p-3 bg-blue-100 rounded-full mb-2">
                        <RefreshCw size={24} className="text-blue-600" />
                    </div>
                    <span className="text-sm text-gray-600">Refresh Data</span>
                </motion.div>
            </motion.div>
            <motion.div
                className="mt-8 text-sm text-gray-500"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
            >
                If this persists, consider reviewing the feedback collection process.
            </motion.div>
        </motion.div>
    );
};

export default AdminNoFeedback;