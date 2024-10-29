import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { motion } from 'framer-motion';

const EnhancedFeedbackDistribution = ({ feedbacks }) => {
    const [series, setSeries] = useState([]);
    const [labels, setLabels] = useState([]);
    const [percentages, setPercentages] = useState([]);

    useEffect(() => {
        if (feedbacks && feedbacks.length > 0) {
            const groupedFeedbacks = {
                '1st Year': 0,
                '2nd Year': 0,
                '3rd Year': 0,
                '4th Year': 0
            };

            feedbacks.forEach((item) => {
                if (item.year === 'I') {
                    groupedFeedbacks['1st Year'] += 1;
                } else if (item.year === 'II') {
                    groupedFeedbacks['2nd Year'] += 1;
                } else if (item.year === 'III') {
                    groupedFeedbacks['3rd Year'] += 1;
                } else if (item.year === 'IV') {
                    groupedFeedbacks['4th Year'] += 1;
                }
            });

            const seriesData = Object.values(groupedFeedbacks);
            const labelsData = Object.keys(groupedFeedbacks);
            const totalFeedbacks = seriesData.reduce((a, b) => a + b, 0);

            // Calculate percentages
            const percentagesData = seriesData.map((value) => {
                const percentage = ((value / totalFeedbacks) * 100).toFixed(1);
                return isNaN(percentage) ? "0" : percentage; // Handle NaN for zero total
            });

            setSeries(seriesData);
            setLabels(labelsData);
            setPercentages(percentagesData);
        } else {
            setSeries([]);
            setLabels([]);
            setPercentages([]);
        }
    }, [feedbacks]);

    const chartOptions = {
        chart: {
            type: 'donut',
            animations: {
                dynamicAnimation: {
                    enabled: true,
                    speed: 350
                }
            }
        },
        colors: ['#4caf50', '#EE66A6', '#2196f3', '#6C48C5'], // Custom colors for each year
        labels: labels,
        legend: {
            position: 'bottom',
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        ],
        // colors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        plotOptions: {
            pie: {
                donut: {
                    size: '70%',
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            label: 'Total',
                            fontSize: '22px',
                            formatter: function (w) {
                                return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                            }
                        }
                    }
                }
            }
        },
        dataLabels: {
            enabled: false
        },
        tooltip: {
            enabled: true,
            y: {
                formatter: function (value) {
                    return value + " feedbacks";
                }
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-[#F4F6FF] to-white opacity-10 rounded-xl  p-8"
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-center"
            >
                <h2 className="text-2xl font-bold text-black mb-1">Feedback Distribution</h2>
                <p className="text-[#5c5c5c] text-sm mb-6">Distribution of feedback across different years</p>
            </motion.div>
            <motion.div
                className="flex items-center justify-center"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
            >
                {series.length > 0 ? (
                    <Chart
                        options={chartOptions}
                        series={series}
                        type="donut"
                        width="380"
                    />
                ) : (
                    <p className="text-gray-500">No feedback data available.</p>
                )}
            </motion.div>
            {series.length > 0 && (
                <motion.div
                    className="mt-8 grid grid-cols-2 gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    {labels.map((label, index) => (
                        <motion.div
                            key={label}
                            className="flex items-center bg-white rounded-lg p-3 shadow-md hover:shadow-lg transition-shadow duration-200"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className={`w-4 h-4 rounded-full mr-3`} style={{ backgroundColor: chartOptions.colors[index] }}></div>
                            <span className="text-sm font-medium text-gray-700">{label}: </span>
                            <span className="text-sm font-bold text-indigo-600 ml-1">{series[index]} ({percentages[index]}%)</span>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </motion.div>
    );
};

export default EnhancedFeedbackDistribution;
