import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown, Star, Users } from 'lucide-react';
import Chart from 'react-apexcharts';

const EnhancedStaffPerformance = ({ staffData }) => {
    const [expandedCard, setExpandedCard] = useState(true);
    const [activeView, setActiveView] = useState('rating');
    const [showAllStaff, setShowAllStaff] = useState(false);

    const toggleCardExpansion = () => {
        setExpandedCard(!expandedCard);
    };

    const toggleView = (view) => {
        setActiveView(view);
    };

    const toggleShowAllStaff = () => {
        setShowAllStaff(!showAllStaff);
    };

    const getTopStaff = (count) => {
        return [...staffData]
            .sort((a, b) => b[activeView] - a[activeView])
            .slice(0, count);
    };

    const chartData = {
        categories: (showAllStaff ? staffData : getTopStaff(5)).map(staff => staff.name),
        series: [{
            name: activeView === 'rating' ? 'Rating' : 'Feedbacks',
            data: (showAllStaff ? staffData : getTopStaff(5)).map(staff => staff[activeView]),
        }],
    };

    const chartOptions = {
        chart: {
            type: 'bar',
            height: '100%',
            animations: {
                enabled: true,
            },
        },
        xaxis: {
            categories: chartData.categories,
            title: {
                text: 'Staff Names',
            },
        },
        yaxis: {
            title: {
                text: activeView === 'rating' ? 'Rating' : 'Number of Feedbacks',
            },
            min: 0,
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: false,
            },
        },
        fill: {
            opacity: 1,
        },
        title: {
            text: activeView === 'rating' ? 'Staff Ratings' : 'Staff Feedbacks',
            align: 'center',
        },
        legend: {
            show: false,
        },
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Staff Performance</h3>
                <button
                    onClick={toggleCardExpansion}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                    {expandedCard ? (
                        <ChevronUp className="h-5 w-5 text-gray-600" />
                    ) : (
                        <ChevronDown className="h-5 w-5 text-gray-600" />
                    )}
                </button>
            </div>
            <AnimatePresence>
                {expandedCard && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex space-x-2 mb-4">
                            <button
                                className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${activeView === 'rating'
                                    ? 'bg-indigo-100 text-indigo-700'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                onClick={() => toggleView('rating')}
                            >
                                <Star className="inline-block w-4 h-4 mr-1" />
                                Rating
                            </button>
                            <button
                                className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${activeView === 'feedbacks'
                                    ? 'bg-indigo-100 text-indigo-700'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                onClick={() => toggleView('feedbacks')}
                            >
                                <Users className="inline-block w-4 h-4 mr-1" />
                                Feedbacks
                            </button>
                        </div>
                        <div className="h-[300px] mb-4">
                            <Chart
                                options={chartOptions}
                                series={chartData.series}
                                type="bar"
                                height="100%"
                            />
                        </div>
                        <div className="flex justify-center">
                            <button
                                className="px-4 py-2 bg-indigo-500 text-white rounded-full font-medium hover:bg-indigo-600 transition-colors duration-200"
                                onClick={toggleShowAllStaff}
                            >
                                {showAllStaff ? 'Show Top 5 Staff' : 'View All Staff Ratings'}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default EnhancedStaffPerformance;
