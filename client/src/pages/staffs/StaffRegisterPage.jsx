'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Lock, Mail, User, Phone, Briefcase, Key } from 'lucide-react'
import { Form, redirect } from 'react-router-dom'
import customFetch from '../../utils/CustomFetch'
import { toast } from 'react-toastify'

export default function StaffRegistrationPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        department: '',
        experience: '',
        departmentCode: '',
        staffCode: '',
        email: '',
        password: '',
        phoneNumber: '',
        jobPosition: '',
    })
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prevData => ({ ...prevData, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')

        if (Object.values(formData).some(value => value === '')) {
            setError('Please fill in all fields')
            return
        }

        // Here you would typically make an API call to register the user
        console.log('Registration attempt', formData)
        // For demonstration purposes, we'll just log the attempt
        alert('Registration attempt made. Check console for details.')
    }

    const departments = ['CSE', 'ECE', 'EEE', 'MECH', 'AIML', 'IT', 'BME']
    const jobPositions = ['Assistant Professor', 'Assistant HOD', 'Lecturer', 'Administrative Staff']

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-4xl"
            >
                <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Staff Registration</h2>
                 <Form method='post' className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                            First Name
                        </label>
                        <div className="relative">
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter your first name"
                                required
                            />
                            <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                        </label>
                        <div className="relative">
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter your last name"
                                required
                            />
                            <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                            Department
                        </label>
                        <div className="relative">
                            <select
                                id="department"
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                                required
                            >
                                <option value="">Select department</option>
                                {departments.map((dept) => (
                                    <option key={dept} value={dept}>{dept}</option>
                                ))}
                            </select>
                            <Briefcase className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                            Experience (years)
                        </label>
                        <div className="relative">
                            <input
                                id="experience"
                                name="experience"
                                type="number"
                                value={formData.experience}
                                onChange={handleChange}
                                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Years of experience"
                                required
                            />
                            <Briefcase className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="departmentCode" className="block text-sm font-medium text-gray-700 mb-1">
                            Department Code
                        </label>
                        <div className="relative">
                            <input
                                id="departmentCode"
                                name="departmentCode"
                                type="text"
                                value={formData.departmentCode}
                                onChange={handleChange}
                                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter department code"
                                required
                            />
                            <Key className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="staffCode" className="block text-sm font-medium text-gray-700 mb-1">
                            Staff Code
                        </label>
                        <div className="relative">
                            <input
                                id="staffCode"
                                name="staffCode"
                                type="text"
                                value={formData.staffCode}
                                onChange={handleChange}
                                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter staff code"
                                required
                            />
                            <Key className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <div className="relative">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
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
                                value={formData.password}
                                onChange={handleChange}
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
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                        </label>
                        <div className="relative">
                            <input
                                id="phoneNumber"
                                name="phoneNumber"
                                type="tel"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter your phone number"
                                required
                            />
                            <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="jobPosition" className="block text-sm font-medium text-gray-700 mb-1">
                            Job Position
                        </label>
                        <div className="relative">
                            <select
                                id="jobPosition"
                                name="jobPosition"
                                value={formData.jobPosition}
                                onChange={handleChange}
                                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
                                required
                            >
                                <option value="">Select job position</option>
                                {jobPositions.map((position) => (
                                    <option key={position} value={position}>{position}</option>
                                ))}
                            </select>
                            <Briefcase className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        {error && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-red-500 text-sm mt-2"
                            >
                                {error}
                            </motion.p>
                        )}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="w-full py-2 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
                        >
                            Register
                        </motion.button>
                    </div>
                </Form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account? <a href="/login" className="text-indigo-600 hover:text-indigo-500">Login here</a>
                </p>
            </motion.div>
        </div>
    )
}

// action for submitting register form 
export const action = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
        await customFetch.post("/auth/register-staff", data);
        toast.success("Registration Successful");
        return redirect("/Login-staff");
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
    }
};