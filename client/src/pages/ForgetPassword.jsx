import React, { useState } from 'react';
import { Mail, ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import customFetch from '../utils/CustomFetch';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await customFetch.post('/redirect/forgot-password', { email });
            setIsLoading(false);
            setIsSubmitted(true);
            // toast.success('Password reset link sent! Please check your email.');
        } catch (error) {
            setIsLoading(false);
            toast.error(error.response?.data?.msg || 'Failed to send password reset link');
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
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Forgot Password?</h2>
                        <p className="text-gray-600 mb-6">Provide the same email you used to log in.</p>  {!isSubmitted ? (
                            <form onSubmit={handleForgotPassword}>
                                <div className="relative">
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-colors pl-12"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                                </div>
                                <button
                                    type="submit"
                                    className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <Loader2 className="animate-spin h-5 w-5" />
                                    ) : (
                                        <>
                                            Reset Password
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </>
                                    )}
                                </button>
                            </form>
                        ) : (
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Mail className="h-8 w-8 text-green-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Check your email</h3>
                                <p className="text-gray-600">
                                    We have sent a password reset link to <strong>{email}</strong>
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
                        <a href="/login" className="text-sm text-purple-600 hover:text-purple-800 transition-colors">
                            Return to login
                        </a>
                    </div>
                </div>
                <div className="mt-8 text-center">
                    <p className="text-sm text-black">
                        Don't have an account?{' '}
                        <a href="/register" className="font-medium hover:underline">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
