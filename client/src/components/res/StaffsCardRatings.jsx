import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, User, Star } from "lucide-react";
import customFetch from "../../utils/CustomFetch";
import { toast } from "react-toastify";

const CreativeStaffCard = () => {
    const [staffMembers, setStaffMembers] = useState([]);

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const response = await customFetch.get("/dashboard-student/ratings");
                console.log(response.data.rating);
                setStaffMembers(response.data.rating);
            } catch (error) {
                console.error("Error fetching top staff:", error);
            }
        };
        fetchStaff();
    }, []);

    const calculateAverageCompliments = (ratings) => {
        const totalCount =
            ratings?.reduce((acc, rating) => acc + rating.totalCount, 0) || 0;
        const quotientLength = ratings?.length || 1;
        return quotientLength > 0 ? Math.round(totalCount / quotientLength) : 0;
    };

    async function handleDeleteStaff(id) {
        const url = `dashboard-student/ratings/${id}`;
        try {
            await customFetch.delete(url);
            toast.success("Staff's rating successfully removed");
            window.location.reload(); // Reload the page after deletion
        } catch (error) {
            console.error("There was a problem with the delete operation:", error);
            toast.error("There was a problem with the delete operation:", error);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-600 mb-8 text-center">
                    Staff Performance Dashboard
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {staffMembers.map((staff) => (
                        <motion.div
                            key={staff.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center">
                                        <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mr-4 overflow-hidden shadow-inner">
                                            {staff.imageUrl ? (
                                                <img
                                                    src={staff.imageUrl}
                                                    alt={staff.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <User className="w-8 h-8 text-indigo-500" />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-indigo-800">
                                                {staff.name}
                                            </h3>
                                            <div className="flex items-center mt-1">
                                                <Star className="w-5 h-5 text-yellow-400 mr-1" />
                                                <span className="text-lg font-semibold text-indigo-600">
                                                    {staff.overallAverage}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => handleDeleteStaff(staff._id)}
                                        className="p-2 bg-red-100 rounded-full shadow-md hover:bg-red-200 transition-all duration-200"
                                    >
                                        <Trash2 className="w-5 h-5 text-red-600" />
                                    </motion.button>
                                </div>
                                <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg p-4 mb-4 shadow-inner">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium text-indigo-600">
                                            Compliments
                                        </span>
                                        <span className="font-bold text-indigo-700">
                                            {calculateAverageCompliments(staff.ratings)}{" "}
                                            {/* Updated to show average count */}
                                        </span>
                                    </div>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                                    <div
                                        className="bg-purple-500 h-2.5 rounded-full"
                                        style={{ width: `${(staff.rating / 5) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div >
    );
};

export default CreativeStaffCard;
