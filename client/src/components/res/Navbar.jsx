import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {  LogOut, MessageSquare, Menu } from 'lucide-react';
import { Typography } from '@mui/material';
import { useNavigate, Link, redirect } from 'react-router-dom';
import customFetch from '../../utils/CustomFetch';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import ClipLoader from 'react-spinners/ClipLoader';  // Loading spinner

const Navbar = () => {
  const [userName, setUserName] = useState('');
  const [response,setResponse] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const [userId,setUserId] = useState('');
  const navItems = [
    { name: 'Home', path: '/student-dashboard' },
    { name: 'Feeds', path: '/student-dashboard/feeds' },
    { name: 'About', path: '/student-dashboard/about' },
    { name: `${userName}`, path: `/student-dashboard/user-profile/` },
  ];
  const navigate = useNavigate();

  const logout = async () => {
    setLoading(true); // Start loading
    try {
      await customFetch.get("/auth/logout");
      toast.success("Logout Successful");
      Cookies.remove('tokens', { path: '/' }); // Specify the same path as when the cookie was set
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      setLoading(true); // Start loading when fetching user data
      try {
        const response = await customFetch.get("/dashboard-student/current-user");
        setUserName(response.data.user.name); 
        setResponse(response); 
      } catch (error) {
        if (error.response && error.response.status === 403) {
          // throw new Error('Access Denied! You are not authorized to access this page.');
          toast.error("Please Login !!!")
          return redirect('/')
        } else {
          // toast.error("Error occurred while fetching data");
          toast.error("Please Login !!")
          return redirect('/')
        }
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchCurrentUser();
  }, []);

  console.log(response);

  const handleNavClick = (path) => {
    setLoading(true);  // Start loading when a nav item is clicked
    navigate(path);
    setTimeout(() => setLoading(false), 1000); // Simulate loading delay
  };

  return (
    <div>
      {/* Loading Spinner */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-100">
          <ClipLoader color="#6366F1" size={60} /> {/* Adjust size and color as needed */}
        </div>
      )}

      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 120 }}
        className={`bg-white bg-opacity-80 backdrop-blur-md text-indigo-900 p-4 sticky top-0 z-50 shadow-lg ${loading ? 'blur-sm' : ''}`} // Apply blur when loading
      >
        <div className="container mx-auto flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600"
          >
            <a className="flex items-center space-x-2" href="/student-dashboard">
              <MessageSquare className="h-8 w-8 text-purple-600" />
              <span >
                CampusVoices
              </span>
            </a>
          </motion.div>
          <div className="hidden md:flex space-x-6">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <a
                  onClick={() => handleNavClick(item.path)}
                  className="hover:text-purple-600 transition-colors duration-300 cursor-pointer"
                >
                  {item.name}
                </a>
              </motion.div>
            ))}
            <motion.a
              href="/student-dashboard/user-profile"
              className="flex items-center hover:text-purple-600 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
            >
              {/* <span className="mr-2">{userName}</span> */}
            </motion.a>
            <motion.a onClick={logout} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', cursor: 'pointer' }} whileHover={{ color: 'red' }}>
              <LogOut size={18} />
              <Typography>Logout</Typography>
            </motion.a>
          </div>
          <div className="md:hidden">
            <Menu onClick={() => setIsMenuOpen(!isMenuOpen)} className="cursor-pointer" />
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white p-4 shadow-lg"
        >
          {navItems.map((item) => (
            <a
              key={item.name}
              onClick={() => handleNavClick(item.path)}
              className="block py-2 hover:text-purple-600 transition-colors duration-300 cursor-pointer"
            >
              {item.name}
            </a>
          ))}
          <a
            onClick={logout}
            className="block py-2 hover:text-purple-600 transition-colors duration-300 cursor-pointer"
          >
            Logout
          </a>
        </motion.div>
      )}
    </div>
  )
}

export default Navbar;

