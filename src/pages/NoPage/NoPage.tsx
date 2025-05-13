import React from 'react'
import { Link } from 'react-router-dom'
import { HomeIcon } from '@heroicons/react/24/outline'

function NoPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
            <div className="max-w-2xl w-full text-center space-y-8">
                <div className="space-y-4">
                    <h1 className="text-9xl font-bold text-indigo-600 animate-pulse">404</h1>
                    <h2 className="text-3xl font-semibold text-gray-800">Page Not Found</h2>
                    <p className="text-lg text-gray-600 max-w-md mx-auto">
                        Oops! The page you're looking for doesn't exist or has been moved.
                    </p>
                </div>
                
                <Link 
                    to="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                    <HomeIcon className="w-5 h-5" />
                    <span>Back to Home</span>
                </Link>
            </div>
        </div>
    )
}

export default NoPage

