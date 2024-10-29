import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import customFetch from '../utils/CustomFetch';

export default function ResetPassword() {
    const { token } = useParams();
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUserId(decodedToken.id || ''); // Make sure this aligns with your JWT payload
            } catch (error) {
                console.error('Failed to decode token:', error);
                toast.error('Invalid token');
                navigate('/login');
            }
        }
    }, [token, navigate]);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords don't match");
            return;
        }
        setIsLoading(true);
        try {
            await customFetch.patch(`/redirect/reset-password/${token}`, { password }); // Sending token in the URL
            setIsSubmitted(true);
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (error) {
            toast.error(error.response?.data?.msg || 'Failed to reset password');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#D1D6FE] flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                    <div className="relative h-48 bg-purple-600 flex items-center justify-center">
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                        <h1 className="relative text-4xl font-bold text-white text-center z-10">
                            Campus Voices
                        </h1>
                        <div className="absolute bottom-0 left-0 w-full h-16 bg-white" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }}></div>
                    </div>
                    <div className="p-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Reset Your Password</h2>
                        <AnimatePresence>
                            {!isSubmitted ? (
                                <motion.form
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onSubmit={handleResetPassword}
                                >
                                    <div className="space-y-4">
                                        <div className="relative">
                                            <input
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-colors pl-12"
                                                placeholder="New Password"
                                            />
                                            <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-colors pl-12"
                                                placeholder="Confirm New Password"
                                            />
                                            <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                                        </div>
                                    </div>
                                    <motion.button
                                        type="submit"
                                        className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                                        disabled={isLoading || !userId}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {isLoading ? (
                                            <Loader2 className="animate-spin h-5 w-5" />
                                        ) : (
                                            <>
                                                Reset Password
                                                <ArrowRight className="ml-2 h-5 w-5" />
                                            </>
                                        )}
                                    </motion.button>
                                </motion.form>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center"
                                >
                                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Password Reset Successful!</h3>
                                    <p className="text-gray-600">You will be redirected to the login page shortly.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
                <div className="mt-8 text-center">
                    <p className="text-sm text-white">
                        Remember your password?{' '}
                        <a href="/login" className="font-medium hover:underline">
                            Log in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
