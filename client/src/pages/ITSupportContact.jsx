import React from 'react'
import { MessageSquare, Phone, Mail, MapPin, Clock, ExternalLink, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ITSupportContact() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 flex flex-col">
            <header className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <Link to="/login-admin" className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors">
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        Back to Admin Login
                    </Link>
                    <div className="flex items-center space-x-2">
                        <MessageSquare className="h-8 w-8 text-indigo-600" />
                        <span className="text-2xl font-bold text-gray-800">Campus Voices</span>
                    </div>
                </div>
            </header>

            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-8 sm:p-10 sm:pb-6">
                        <h2 className="text-3xl font-extrabold text-white">IT Support Contact</h2>
                        <p className="mt-2 text-xl text-indigo-100">We're here to help you with any technical issues.</p>
                    </div>
                    <div className="px-6 py-8 sm:p-10">
                        <div className="space-y-6">
                            <div className="flex items-start">
                                <Phone className="h-6 w-6 text-indigo-600 mt-1 mr-4" />
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">Phone Support</h3>
                                    <p className="mt-1 text-gray-600">Call us at: <a href="tel:+1234567890" className="text-indigo-600 hover:underline">+91 9345266656</a></p>
                                    <p className="mt-1 text-sm text-gray-500">Available 24/7 for urgent issues</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <Mail className="h-6 w-6 text-indigo-600 mt-1 mr-4" />
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">Email Support</h3>
                                    <p className="mt-1 text-gray-600">Email us at: <a href="mailto:webspydersoffical@gmail.com" className="text-indigo-600 hover:underline">webspydersoffical@gmail.com</a></p>
                                    <p className="mt-1 text-sm text-gray-500">We aim to respond within 24 hours</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <MapPin className="h-6 w-6 text-indigo-600 mt-1 mr-4" />
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">On-Campus Support</h3>
                                    <p className="mt-1 text-gray-600">Visit us at: IT Support Center</p>
                                    <p className="mt-1 text-sm text-gray-500">Walk-ins welcome during business hours</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <Clock className="h-6 w-6 text-indigo-600 mt-1 mr-4" />
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">Support Hours</h3>
                                    <p className="mt-1 text-gray-600">Monday - Friday: 8:00 AM - 8:00 PM</p>
                                    <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                                    <p className="text-gray-600">Sunday: Closed (Phone support available for emergencies)</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900">Frequently Asked Questions</h3>
                            <ul className="mt-4 space-y-4">
                                <li>
                                    <a href="#" className="text-indigo-600 hover:text-indigo-800 flex items-center">
                                        How to reset your password
                                        <ExternalLink className="h-4 w-4 ml-2" />
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-indigo-600 hover:text-indigo-800 flex items-center">
                                        Connecting to campus Wi-Fi
                                        <ExternalLink className="h-4 w-4 ml-2" />
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-indigo-600 hover:text-indigo-800 flex items-center">
                                        Accessing online learning platforms
                                        <ExternalLink className="h-4 w-4 ml-2" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="bg-gray-800 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="md:flex md:items-center md:justify-between">
                        <div className="flex justify-center md:order-2 space-x-6">
                            <a href="#" className="text-gray-400 hover:text-gray-300">
                                Terms of Service
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-300">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-300">
                                Cookie Policy
                            </a>
                        </div>
                        <div className="mt-8 md:mt-0 md:order-1">
                            <p className="text-center text-base text-gray-400">
                                &copy; 2024 Campus Voices. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}