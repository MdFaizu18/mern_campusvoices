import React, { useState } from 'react'
import { Shield, Eye, EyeOff, Lock, Mail, Key, ArrowRight } from 'lucide-react'
import customFetch from '../utils/CustomFetch'
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { Form, redirect } from 'react-router-dom';

export default function AdminLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passKey, setPassKey] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showPassKey, setShowPassKey] = useState(false)

    const currentYear = new Date().getFullYear();

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#F5EFFF] to-[#DCBFFF] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl transform transition-all hover:scale-105 duration-300">
                <div className="text-center">
                    <Shield className="mx-auto h-16 w-16 text-indigo-600" />
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Admin Access</h2>
                    <p className="mt-2 text-sm text-gray-600">Enter your credentials to manage Campus Voices</p>
                </div>
                <Form method="post" className="space-y-6">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="relative">
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <Mail className="absolute top-3 left-3 text-gray-400" size={20} />
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pl-10"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="password" className="sr-only">Password</label>
                            <Lock className="absolute top-3 left-3 text-gray-400" size={20} />
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pl-10"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
                            </button>
                        </div>
                        <div className="relative">
                            <label htmlFor="passkey" className="sr-only">Pass Key</label>
                            <Key className="absolute top-3 left-3 text-gray-400" size={20} />
                            <input
                                id="passkey"
                                name="passkey"
                                type={showPassKey ? 'text' : 'password'}
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pl-10"
                                placeholder="Pass Key"
                                value={passKey}
                                onChange={(e) => setPassKey(e.target.value)}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                                onClick={() => setShowPassKey(!showPassKey)}
                            >
                                {showPassKey ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300 ease-in-out"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <Shield className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                            </span>
                            Access Admin Panel
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                    </div>
                </Form>
                <div className="text-center mt-4">
                    <a href="/admin-dashboard/support" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-300">
                        Forgot your credentials? Contact IT support
                    </a>
                </div>
            </div>
            <div className="mt-8 text-center text-sm text-[#3C3D37]">
                <p>Campus Voices Admin Portal</p>
               

                <p>&copy; {currentYear} All rights reserved</p>
            </div>
        </div>
    )
};


// action for submitting form 
export const action = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const userEmail = data.email;
    try {
        const userDetails = await customFetch.get(
            `/users/dashboard-admin/${userEmail}`
        );
        const userRole = userDetails.data?.user?.role;

        await customFetch.post("/auth/login-admin", data);
        const expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 7); // Set expiration for 7 days from now
        Cookies.set('Admin-tokens', userEmail, { path: '/', expires: expireDate });
        toast.success("Login Successful");
        const adminRoles = ["cseAdmin", "eceAdmin", "eeeAdmin", "mechAdmin"];

        // Check if the userRole is in the adminRoles array
        return redirect(
            adminRoles.includes(userRole) ? "/admin-dashboard" : "/student-dashboard"
        );
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
    }
};