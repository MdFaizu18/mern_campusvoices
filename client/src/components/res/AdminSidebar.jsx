import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BarChart2, MessageSquare, UserPlus, Bell, Users, Star, PieChart, Settings, Menu, X } from 'lucide-react';
import customFetch from '../../utils/CustomFetch';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
// import LoadingPage from '../res/LoadingPage'

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { name: 'Dashboard', icon: BarChart2, route: '/admin-dashboard' },
        { name: 'View Feedbacks', icon: MessageSquare, route: '/admin-dashboard/view-feeds' },
        { name: 'Add Staff', icon: UserPlus, route: '/admin-dashboard/add-staff' },
        { name: 'Review Staff', icon: Users, route: '/admin-dashboard/review-staff' },
        { name: 'Star Ratings', icon: Star, route: '/admin-dashboard/star-ratings' },
        { name: 'Add Features', icon: Bell, route: '/admin-dashboard/add-feature' },
        { name: 'Logout', icon: PieChart, route: '/admin-dashboard/logout' },
        // { name: 'Settings', icon: Settings, route: '/admin-dashboard/settings' },
    ];

    const isActive = (route) => location.pathname === route;

    const handleItemClick = async (route) => {
        setLoading(true); // Start loading

        if (route === '/admin-dashboard/logout') {
            try {
                await customFetch.get("/auth/logout");
                toast.success("Logout Successful");
                Cookies.remove('tokens', { path: '/' });
                navigate("/login-admin");
            } catch (error) {
                toast.error(error?.response?.data?.msg);
            } finally {
                setLoading(false); // Stop loading after logout attempt
            }
        } else {
            navigate(route);
            setLoading(false); // Stop loading after navigation
        }

        setIsOpen(false); // Close sidebar on mobile after navigation
    };


    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    // Close sidebar when clicking outside on mobile
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (isOpen && !event.target.closest('.sidebar')) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOpen]);

    return (
        <>

            {/* Show LoadingPage if loading */}
            {/* {loading && <LoadingPage />} */}
            {/* Mobile menu button */}
            <button
                className="fixed top-4 left-4 z-50 md:hidden  text-white p-2 rounded-md"
                onClick={toggleSidebar}
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar */}
            <aside
                className={`sidebar fixed md:static top-0 left-0 z-40 w-64 h-screen transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                    } bg-gradient-to-b from-indigo-600 to-purple-500 text-white`}
            >
                <div className="p-5">
                    <h1 className="text-2xl font-bold mb-6">CampusVoices</h1>
                    <nav>
                        <ul className="space-y-2">
                            {menuItems.map((item) => (
                                <li key={item.name}>
                                    <button
                                        onClick={() => handleItemClick(item.route)}
                                        className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${isActive(item.route)
                                                ? 'bg-white bg-opacity-20 text-white'
                                                : 'text-white text-opacity-70 hover:bg-white hover:bg-opacity-10 hover:text-white'
                                            }`}
                                    >
                                        <item.icon className="h-5 w-5" />
                                        <span>{item.name}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}
        </>
    );
};

export default Sidebar;