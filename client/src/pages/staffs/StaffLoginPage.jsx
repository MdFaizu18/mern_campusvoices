import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, Key,ArrowRight } from 'lucide-react';
import { Form, useNavigate, useNavigation } from 'react-router-dom';
import customFetch from '../../utils/CustomFetch';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const StaffLoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passkey, setPasskey] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            // Form data
            const data = { email, password, passkey };

            // Attempt to log in
            const loginResponse = await customFetch.post("/auth/login-staff", data);
            const userDetails = await customFetch.get(`/users/dashboard-admin/${email}`);
            const userRole = userDetails.data?.user?.role;

            // Set cookie for 7 days
            const expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 7);
            Cookies.set('tokens-staff', email, { path: '/', expires: expireDate });

            // Verify if the cookie was set
            if (!Cookies.get('tokens-staff')) {
                toast.error("This site requires cookies to function properly. Please enable cookies in your browser settings.");
                return;
            }

            // Show success and redirect based on user role
            toast.success("Login Successful");
            navigate(userRole === "staff" ? "/staff-dashboard" : "/student-dashboard");
        } catch (error) {
            setError(error?.response?.data?.msg || "An error occurred. Please try again.");
            toast.error(error?.response?.data?.msg || "An error occurred. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md"
            >
                <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Staff Login</h2>
                <Form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <div className="relative">
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter your email"
                                required
                            />
                            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pl-10 pr-10 py-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter your password"
                                required
                            />
                            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="passkey" className="block text-sm font-medium text-gray-700 mb-1">
                            Passkey
                        </label>
                        <div className="relative">
                            <input
                                id="passkey"
                                name="passkey"
                                type="password"
                                value={passkey}
                                onChange={(e) => setPasskey(e.target.value)}
                                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter your passkey"
                                required
                            />
                            <Key className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                    {error && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-500 text-sm mt-2"
                        >
                            {error}
                        </motion.p>
                    )}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md shadow-md hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transform transition-all duration-300 ease-in-out hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Logging In...
                            </span>
                        ) : (
                            <>
                                Log In
                                <ArrowRight className="inline-block ml-2" size={20} />
                            </>
                        )}
                    </button>

                </Form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account? <a href="/register-staff" className="text-indigo-600 hover:text-indigo-500">Register here</a>
                </p>
            </motion.div>
        </div>
    );
};

export default StaffLoginPage;
