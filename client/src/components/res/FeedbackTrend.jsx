import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { motion, AnimatePresence } from 'framer-motion';
import dayjs from 'dayjs';
import { ChevronUp, ChevronDown, Calendar, TrendingUp, BarChart2, Activity } from 'lucide-react';

const CreativeFeedbackTrend = ({ feedbacks }) => {
    const [chartData, setChartData] = useState([]);
    const [groupBy, setGroupBy] = useState('day');
    const [expandedCard, setExpandedCard] = useState('feedbackTrend');
    const [hoveredDataPoint, setHoveredDataPoint] = useState(null);

    useEffect(() => {
        if (feedbacks && feedbacks.length > 0) {
            const groupedData = groupFeedbacks(feedbacks, groupBy);
            setChartData(groupedData);
        } else {
            setChartData([]);
        }
    }, [feedbacks, groupBy]);

    const groupFeedbacks = (feedbacks, groupBy) => {
        const formatString = groupBy === 'day' ? 'YYYY-MM-DD' : groupBy === 'week' ? 'YYYY-[W]WW' : 'YYYY-MM';
        const grouped = feedbacks.reduce((acc, feedback) => {
            const dateKey = dayjs(feedback.createdAt).format(formatString);
            acc[dateKey] = (acc[dateKey] || 0) + 1;
            return acc;
        }, {});

        const sortedKeys = Object.keys(grouped).sort();
        return sortedKeys.map((key) => ({
            x: key,
            y: grouped[key]
        }));
    };

    const toggleCardExpansion = () => {
        setExpandedCard((prevCard) => (prevCard === 'feedbackTrend' ? null : 'feedbackTrend'));
    };

    const chartOptions = {
        chart: {
            type: 'area',
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 350
                }
            },
            toolbar: {
                show: false
            },
            events: {
                mouseMove: function (event, chartContext, config) {
                    const dataPointIndex = config.dataPointIndex;
                    if (dataPointIndex !== -1) {
                        setHoveredDataPoint(chartData[dataPointIndex]);
                    } else {
                        setHoveredDataPoint(null);
                    }
                }
            }
        },
        xaxis: {
            type: 'category',
            labels: {
                rotate: -45,
                style: {
                    colors: '#718096',
                    fontSize: '12px',
                },
                format: groupBy === 'day' ? 'dd MMM' : groupBy === 'week' ? 'WW YYYY' : 'MMM YYYY',
            },
            tickPlacement: 'between',
            position: 'bottom'
        },
        yaxis: {
            title: {
                text: 'Feedback Count',
                style: {
                    color: '#4A5568',
                    fontSize: '14px',
                    fontWeight: 600,
                }
            },
        },
        dataLabels: {
            enabled: false,
        },
        tooltip: {
            enabled: false,
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.3,
                stops: [0, 90, 100],
                colorStops: [
                    {
                        offset: 0,
                        color: '#6366F1',
                        opacity: 0.8
                    },
                    {
                        offset: 100,
                        color: '#A78BFA',
                        opacity: 0.2
                    }
                ]
            }
        },
        stroke: {
            curve: 'smooth',
            width: 3,
        },
    };

    const buttonVariants = {
        active: { backgroundColor: '#6366F1', color: '#ffffff', boxShadow: '0 4px 6px -1px rgba(99, 102, 241, 0.4)' },
        inactive: { backgroundColor: '#E2E8F0', color: '#4A5568', boxShadow: 'none' }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 shadow-lg"
        >
            <div className="flex justify-between items-center mb-6">
                <motion.h3
                    className="text-3xl font-bold text-indigo-800"
                    initial={{ x: -20 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Activity className="inline-block mr-2 h-8 w-8 text-indigo-600" />
                    Feedback Pulse
                </motion.h3>
                <motion.div
                    className="flex gap-2"
                    initial={{ x: 20 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {['day', 'week', 'month'].map((period) => (
                        <motion.button
                            key={period}
                            className={`px-4 py-2 text-sm rounded-full font-medium transition-all duration-200 ease-in-out`}
                            onClick={() => setGroupBy(period)}
                            variants={buttonVariants}
                            animate={groupBy === period ? 'active' : 'inactive'}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {period.charAt(0).toUpperCase() + period.slice(1)}
                        </motion.button>
                    ))}
                    <motion.button
                        onClick={toggleCardExpansion}
                        className="p-2 bg-white rounded-full hover:bg-indigo-100 transition-colors duration-200 shadow-md"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        {expandedCard === 'feedbackTrend' ? <ChevronUp className="h-5 w-5 text-indigo-600" /> : <ChevronDown className="h-5 w-5 text-indigo-600" />}
                    </motion.button>
                </motion.div>
            </div>
            <AnimatePresence>
                {(expandedCard === 'feedbackTrend' || expandedCard === null) && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative bg-white rounded-lg shadow-inner p-4 max-h-[400px] overflow-auto"
                    >
                        {chartData.length > 0 ? (
                            <>
                                <Chart
                                    options={chartOptions}
                                    series={[{ name: 'Feedback Count', data: chartData }]}
                                    type="area"
                                    height={350}
                                />
                                <AnimatePresence>
                                    {hoveredDataPoint && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                            className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-lg border border-indigo-200"
                                        >
                                            <p className="text-sm font-semibold text-indigo-800">{dayjs(hoveredDataPoint.x).format('MMMM D, YYYY')}</p>
                                            <p className="text-2xl font-bold text-indigo-600">{hoveredDataPoint.y} Feedbacks</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-[350px] flex items-center justify-center"
                            >
                                <p className="text-gray-500 text-lg">No feedback data available.</p>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.div
                className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                {[
                    { icon: Calendar, label: 'Time Range', value: `${dayjs(chartData[0]?.x).format('MMM D')} - ${dayjs(chartData[chartData.length - 1]?.x).format('MMM D')}` },
                    { icon: TrendingUp, label: 'Total Feedbacks', value: chartData.reduce((sum, data) => sum + data.y, 0) },
                    { icon: BarChart2, label: 'Avg. Daily Feedbacks', value: (chartData.reduce((sum, data) => sum + data.y, 0) / chartData.length).toFixed(1) }
                ].map((stat, index) => (
                    <motion.div
                        key={index}
                        className="bg-white p-4 rounded-lg shadow-md"
                        whileHover={{ scale: 1.03, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="flex items-center mb-2">
                            <stat.icon className="h-6 w-6 text-indigo-500 mr-2" />
                            <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                        </div>
                        <p className="text-2xl font-bold text-indigo-700">{stat.value}</p>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default CreativeFeedbackTrend;