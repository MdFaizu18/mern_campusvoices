import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, UserPlus, Star, Users, BarChart2, PieChart, Bell, Settings, Menu, X, ChevronDown, ChevronUp, TrendingUp, TrendingDown, Zap } from 'lucide-react';
import AdminSidebar from '../../components/res/AdminSidebar';
import customFetch from '../../utils/CustomFetch';
import LoadingPage from '../../components/res/LoadingPage';
import { toast } from 'react-toastify';
import { redirect, useLoaderData, useNavigate } from 'react-router-dom';
import FeedbackDistribution from '../../components/res/FeedbackDistribution';
import FeedbackTrend from '../../components/res/FeedbackTrend';
import EnhancedStaffPerformance from '../../components/res/EnhancedStaffPerformanceProps';
import useLocalStorage from '../../components/hooks/UseLocalStorage';
import QuickActions from '../../components/res/QuickActions';



export const loader = async () => {
    try {
        const { data } = await customFetch.get('/dashboard-student/current-user');

        // Check the user role
        if (data && data.user.role === 'user') {  // Adjust 'user' based on your actual role value
            return redirect('/student-dashboard');
        }

        return data; // Return the data if not redirecting
    } catch (error) {
        if (error.response && error.response.status === 403) {
            toast.error("Access Denied, Admin Please Login !!");
            return redirect('/');
        } else {
            toast.error("Please Login !!");
            return redirect('/');
        }
    }
};

const StatCard = ({ icon: Icon, label, value, change }) => (
    <div className="bg-white p-6 rounded-lg shadow-md relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 opacity-10"></div>
        <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
                <p className="text-sm font-medium text-gray-500">{label}</p>
                <h3 className="text-2xl font-bold mt-1">{value}</h3>
            </div>
            <div className="bg-purple-100 p-2 rounded-full">
                <Icon className="h-6 w-6 text-purple-600" />
            </div>
        </div>
        <div className="flex items-center relative z-10">
            <span className={`text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'} flex items-center`}>
                {change >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                {Math.abs(change)}%
            </span>
            <span className="text-sm text-gray-500 ml-2">from last week</span>
        </div>
    </div>
);

const FeedbackItem = ({ id, name,message,category  }) => (
    <motion.li
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-white p-4 rounded-lg shadow-md relative overflow-hidden"
    >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 opacity-5"></div>
        <div className="flex justify-between items-start relative z-10">
            <div>
                <p className="font-semibold"># {name}</p>
                <p className="text-sm text-gray-500">{message}</p>
                <div className="flex items-center mt-2">
                    {/* {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    ))} */}
                </div>
            </div>
            <div className="text-right">
                <span className={`ml-5 px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800`}>
                    {category.substring(0, 6)}..
                </span>
            </div>

        </div>
    </motion.li>
);

export default function AdminDashboardPage() {

    const [data, setData] = useState(null);
    const [feeds, setFeeds] = useState(null);
    const [staffs, setStaffs] = useState(null);
    const [users, setUsers] = useState(null);
    const [departRatings, setDepartRatings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const [activeSection, setActiveSection] = useState('Dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Use localStorage to persist stat card data
    const [prevStats, setPrevStats] = useLocalStorage('adminDashboardStats', {
        feedsTotal: 0,
        staffsTotal: 0,
        usersTotal: 0,
        overallRating: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await customFetch.get('/dashboard-student/current-user');
                const users = await customFetch.get('/dashboard-student/current-user/count');
                const feeds = await customFetch.get('/dashboard-admin/all-feedbacks');
                const staffs = await customFetch.get('/dashboard-head/staff');
                const departRatings = await customFetch.get('/depart-ratings');

                // Update state with fetched data
                setData(data);
                setUsers(users);
                setFeeds(feeds);
                setStaffs(staffs);
                setDepartRatings(departRatings);

                // Update localStorage with the new stats
                setPrevStats({
                    feedsTotal: feeds.data.feedsTotal,
                    staffsTotal: staffs.data.TotalNoStaffs,
                    usersTotal: users.data.userCount,
                    overallRating: departRatings.data.totalRatingsCount
                        ? (departRatings.data.totalRating / departRatings.data.totalRatingsCount).toFixed(1)
                        : "0.0",
                });
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div><LoadingPage /></div>;
    if (error) return <div>Error: {error.message}</div>;
    console.log(data.data.user.role)
    const feedbacks = feeds.data.feeds;
    const feedsTotal = feeds.data.feedsTotal;
    const staffsTotal = staffs.data.TotalNoStaffs;
    const usersTotal = users.data.userCount;
    const overallRating = departRatings.data.totalRatingsCount
        ? (departRatings.data.totalRating / departRatings.data.totalRatingsCount).toFixed(1)
        : "0.0";

    // Calculate percentage changes
    const calculateChange = (current, previous) => {
        if (previous === 0) return 100; // Handle division by zero
        return (((current - previous) / previous) * 100).toFixed(1);
    };

    const feedsChange = calculateChange(feedsTotal, prevStats.feedsTotal);
    const staffsChange = calculateChange(staffsTotal, prevStats.staffsTotal);
    const usersChange = calculateChange(usersTotal, prevStats.usersTotal);
    const ratingChange = calculateChange(overallRating, prevStats.overallRating);
    
 


    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);


    return (
        <div className="flex h-screen bg-gray-100">
            <AdminSidebar/>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white shadow-sm z-10">
                    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                        <div className="flex items-center">
                            <button className="mr-4 md:hidden" onClick={toggleSidebar}>
                                <Menu className="h-6 w-6" />
                            </button>
                            <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                                {activeSection}
                            </h2>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                                <Bell className="h-5 w-5 text-gray-600" />
                            </button>
                            <div className="relative group">
                                <button className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                                    <span className="text-sm font-medium text-white">AD</span>
                                </button>
                                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {data.data.user.role.slice(0, 3).toUpperCase()}
                                </div>

                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
                    <div className="max-w-7xl mx-auto space-y-6">
                        {/* Stats Overview */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <StatCard icon={MessageSquare} label="Total Feedbacks" value={feedsTotal} change={feedsChange} />
                            <StatCard icon={Users} label="Total Staff" value={staffsTotal} change={staffsChange} />
                            <StatCard icon={Star} label="Average Rating" value={overallRating} change={ratingChange} />
                            <StatCard icon={UserPlus} label="Total Users" value={usersTotal} change={usersChange} />
                        </div>

                    

                        {/* Feedback Distribution and Recent Feedbacks */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-lg shadow-md">
                            <FeedbackDistribution feedbacks={feedbacks}/>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold">Recent Feedbacks</h3>
                                    <button onClick={() => navigate('/admin-dashboard/view-feeds')}>
                                        View All
                                    </button>

                                </div>
                                <AnimatePresence>
                                   
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                        >
                                            <ul className="space-y-4">
                                                {feedbacks
                                                    .filter(feedback => feedback.messageType !== 'secret') // Omit feedbacks with messageType 'secret'
                                                    .slice(0, 4) // Get the first 3 feedback items that are not secret
                                                    .map((feedback) => (
                                                        <FeedbackItem key={feedback.id} {...feedback} />
                                                    ))}
                                            </ul>


                                        </motion.div>
                
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Feedback Trend Chart */}
                        <div className="">
                           <FeedbackTrend feedbacks={feedbacks}/>
                        </div>



                        {/* Staff Performance */}
                        {/* <div className="bg-white p-6 rounded-lg shadow-md">
                          <EnhancedStaffPerformance staffData={staffs.data.staffs}/>
                        </div> */}

                        {/* Quick Actions */}
                       <QuickActions/>
                    </div>
                </main>
            </div>
        </div>
    );
}