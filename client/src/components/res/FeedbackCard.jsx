import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Lock, FileText, Calendar, Clock, Filter, Trash2 } from 'lucide-react';
import Navbar from '../../components/res/Navbar';
import { redirect, useLoaderData } from 'react-router-dom';
import customFetch from '../../utils/CustomFetch';
import { toast } from 'react-toastify';

export default FeedbackCard = ({ feedback, onDelete }) => {
    const { message, createdAt, _id } = feedback;  // Destructure properties from feedback

    // Format date and time from createdAt
    const date = new Date(createdAt).toLocaleDateString();
    const time = new Date(createdAt).toLocaleTimeString();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-lg shadow-md p-6 mb-4"
        >
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                    <MessageCircle className="w-5 h-5 text-blue-500 mr-2" />
                    <span className="text-sm font-medium text-gray-600">Feedback</span>
                </div>
                <button
                    onClick={() => onDelete(_id)}
                    className="text-red-500 hover:text-red-700"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>
            <p className="text-gray-800 mb-4">{message}</p>  {/* Feedback content */}
            <div className="flex justify-between items-center text-sm text-gray-500">
                <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{date}</span> {/* Formatted date */}
                </div>
                <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{time}</span> {/* Formatted time */}
                </div>
            </div>
        </motion.div>
    );
};
