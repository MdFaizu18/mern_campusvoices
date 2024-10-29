import React from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquare } from 'lucide-react';
import { TrendingUp , Users, Zap, ChevronRight } from 'lucide-react';
import Navbar from '../components/res/Navbar';
import DialogBox from '../components/res/DailogBox';
import clgImg from '../assets/images/clgimg01.png'
import customFetch from '../utils/CustomFetch';
import { toast } from 'react-toastify';
import { redirect } from 'react-router-dom';

const FeatureCard = ({ icon: Icon, title, description }) => (
    <motion.div
        className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center"
        whileHover={{ y: -5, boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.3)' }}
    >
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-full mb-4">
            <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </motion.div>
);

const AnimatedSection = ({ children }) => (
    <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16"
    >
        {children}
    </motion.section>
);

export const loader = async () => {
    try {
        const data = await customFetch.get('/dashboard-student/current-user');
        return data;
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
    }
}


export default function AboutPage() {

    return (
        <div>
           {/* Navbar  */}
           <Navbar/>


        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <AnimatedSection>
                    <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">
                        About CampusVoices
                    </h1>
                    <p className="text-xl text-center text-gray-600 mb-8">
                        Empowering students to shape their educational experience
                    </p>
                </AnimatedSection>

                <AnimatedSection>
                    <div className="bg-white rounded-xl shadow-2xl overflow-hidden mb-16">
                        <div className="md:flex">
                            <div className="md:flex-shrink-0">
                                <img
                                    className="h-48 w-full object-cover md:w-58"
                                    src={clgImg}
                                    style={{height:'220px'}}
                                    alt="Students collaborating"
                                />
                            </div>
                            <div className="p-8">
                                    <div className="uppercase tracking-wide text-sm text-[#4338CA] font-semibold">Our Mission</div>
                                <p className="mt-2 text-gray-600">
                                    CampusVoices is dedicated to creating a dynamic and responsive educational environment by amplifying student voices.
                                    We believe that by facilitating open communication between students, faculty, and administration, we can
                                    continuously improve the quality of education and campus life.
                                </p>
                                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white " style={{cursor:'pointer',marginTop:'10px',width:'fit-content',padding:'5px 10px',borderRadius:'20px'}}>
                                    <DialogBox title="Terms & Conditions"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                <AnimatedSection>
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Key Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={MessageSquare}
                            title="Real-time Feedback"
                            description="Share your thoughts and experiences instantly, allowing for quick improvements."
                        />
                        <FeatureCard
                            icon={Star}
                            title="Department Ratings"
                            description="Rate your departments and faculties to help maintain high educational standards."
                        />
                        <FeatureCard
                            icon={TrendingUp}
                            title="Trend Analysis"
                            description="Visualize feedback trends to understand the evolving needs of the student body."
                        />
                        <FeatureCard
                            icon={Users}
                            title="Community Engagement"
                            description="Foster a sense of community by participating in campus-wide discussions."
                        />
                        <FeatureCard
                            icon={Zap}
                            title="Quick Actions"
                            description="See immediate responses to urgent issues raised by students."
                        />
                    </div>
                </AnimatedSection>

                <AnimatedSection>
                    <div className="bg-gradient-to-r from-blue-600 to-white-600 rounded-xl shadow-2xl text-white p-8 mb-16">
                        <h2 className="text-3xl font-bold mb-4">How It Works</h2>
                        <ol className="space-y-4">
                            {[
                                "Log in to your CampusVoices account",
                                "Choose a feedback category or department to rate",
                                "Share your thoughts or provide ratings",
                                "Your feedback is anonymously submitted to relevant departments",
                                "Track the impact of your feedback through our updates section"
                            ].map((step, index) => (
                                <li key={index} className="flex items-center">
                                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold mr-3">
                                        {index + 1}
                                    </span>
                                    {step}
                                </li>
                            ))}
                        </ol>
                    </div>
                </AnimatedSection>

                <AnimatedSection>
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Make a Difference?</h2>
                        <p className="text-xl text-gray-600 mb-8">
                            Join CampusVoices today and start shaping the future of your educational experience.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center mx-auto"
                        >
                            Get Started
                            <ChevronRight className="ml-2 w-5 h-5" />
                        </motion.button>
                    </div>
                </AnimatedSection>

                  
            </div>
        </div>
            {/* Footer */}
            <motion.footer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.01, delay: 0.01 }}
                className="bg-indigo-900 text-white py-8"
            >
                <div className="container mx-auto px-4 text-center">
                    <p>&copy; 2024 Campus Voices. All rights reserved.</p>
                    <div className="mt-4 flex justify-center space-x-4">
                        <a href="#" className="hover:text-purple-400 transition-colors duration-300">Privacy Policy</a>
                        <a href="#" className="hover:text-purple-400 transition-colors duration-300"><DialogBox title="Terms & Conditions" /></a>
                        <a href="#" className="hover:text-purple-400 transition-colors duration-300">Contact Us</a>
                    </div>
                </div>
            </motion.footer>
        </div>        
    );
}