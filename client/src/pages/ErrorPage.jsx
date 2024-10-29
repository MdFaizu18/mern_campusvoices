import React from 'react'
import { Link } from 'react-router-dom'; // Correct import statement
import { Home, RefreshCw } from 'lucide-react'

export default function ErrorPage() {
    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 text-center">
                <div
                    className="relative mx-auto w-64 h-64 rotate-12 transform transition-transform hover:rotate-0 duration-500"
                    style={{
                        background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath fill-rule='evenodd' d='M11 0l5 20H6l5-20zm42 31a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM0 72h40v4H0v-4zm0-8h31v4H0v-4zm20-16h20v4H20v-4zM0 56h40v4H0v-4zm63-25a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM53 41a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-30 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-28-8a5 5 0 0 0-10 0h10zm10 0a5 5 0 0 1-10 0h10zM56 5a5 5 0 0 0-10 0h10zm10 0a5 5 0 0 1-10 0h10zm-3 46a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM21 0l5 20H16l5-20zm43 64v-4h-4v4h-4v4h4v4h4v-4h4v-4h-4zM36 13h4v4h-4v-4zm4 4h4v4h-4v-4zm-4 4h4v4h-4v-4zm8-8h4v4h-4v-4z'/%3E%3C/g%3E%3C/svg%3E")`,
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    }}
                >
                    <div className="absolute inset-0 flex items-center justify-center text-white text-9xl font-bold transform -rotate-12 transition-transform duration-500 hover:rotate-0">
                        404
                    </div>
                </div>
                <h2 className="mt-6 text-4xl font-extrabold text-white drop-shadow-lg">
                    Oops! Page Not Found
                </h2>
                <p className="mt-2 text-lg text-white drop-shadow-md">
                    The page you're looking for seems to have wandered off. Let's get you back on track!
                </p>
                <div className="mt-8 space-y-4">
                    <Link href="/" className="inline-flex items-center justify-center w-full px-5 py-3 text-base font-medium text-black bg-white border border-transparent rounded-md hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                        <Home className="w-5 h-5 mr-2" />
                        Return Home
                    </Link>
                    <button
                        onClick={() => window.location.reload()}
                        className="inline-flex items-center justify-center w-full px-5 py-3 text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 border border-transparent rounded-md hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                    >
                        <RefreshCw className="w-5 h-5 mr-2" />
                        Refresh Page
                    </button>
                </div>
            </div>
        </div>
    )
}