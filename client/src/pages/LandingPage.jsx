// client/src/pages/LandingPage.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ThumbsUp, Users, Zap, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DialogBox from '../components/res/DailogBox';
import Cookies from 'js-cookie';



const Button = ({ children, className = "", ...props }) => (
    <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`px-6 py-3 font-semibold text-white rounded-full shadow-lg ${className}`}
        style={{ backgroundImage: 'linear-gradient(to right, #4A00E0, #8E2DE2)' }}
        {...props}
    >
        {children}
    </motion.button>
);

const Input = ({ className = "", ...props }) => (
    <input
        className={`px-4 py-3 border-2 border-purple-300 rounded-full focus:outline-none focus:border-purple-500 ${className}`}
        {...props}
    />
);

const FeatureCard = ({ icon: Icon, title, description }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="bg-white p-6 rounded-xl shadow-lg"
    >
        <div className="flex items-center mb-4">
            <div className="p-3 bg-purple-100 rounded-full mr-4">
                <Icon className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className="text-gray-600">{description}</p>
    </motion.div>
);

const StepCard = ({ number, title, description }) => (
    <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-white p-6 rounded-xl shadow-lg"
    >
        <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center text-xl font-bold mr-4">
                {number}
            </div>
            <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className="text-gray-600">{description}</p>
    </motion.div>
);

export default function LandingPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    useEffect(() => {
        // Check if the cookie exists
        const userCookie = Cookies.get('tokens'); // Replace 'token' with the actual cookie name
        if (userCookie) {
            // If the cookie exists, navigate to the /student-dashboard page
            navigate('/student-dashboard');
        }
    }, [navigate]);


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted email:', email);
        setEmail('');
    };

    const handleLoginRegister = () => {
        navigate('/login');
    };

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
            <header className="px-6 py-4 flex items-center justify-between bg-white shadow-md">
                <a className="flex items-center space-x-2" href="#">
                    <MessageSquare className="h-8 w-8 text-purple-600" />
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                        CampusVoices
                    </span>
                </a>
                <nav className="hidden md:flex space-x-6">
                    <a className="text-gray-600 hover:text-purple-600 transition-colors cursor-pointer" onClick={() => scrollToSection('features')}>Features</a>
                    <a className="text-gray-600 hover:text-purple-600 transition-colors cursor-pointer" onClick={() => scrollToSection('how-it-works')}>How It Works</a>
                    <a className="text-gray-600 hover:text-purple-600 transition-colors cursor-pointer"><DialogBox title="Terms & Conditions" /></a>
                </nav>
                <Button className="hidden md:block" onClick={handleLoginRegister}>Login / Register</Button>
            </header>

            <main>
                <section className="py-20 px-6">
                    <div className="max-w-5xl mx-auto text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600"
                        >
                            Revolutionize Your College Feedback
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-xl text-gray-600 mb-8"
                        >
                            CampusVoices: The ultimate platform for students and faculty to share, manage, and act on feedback.
                            Improve your college experience today!
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <Button className="text-lg" onClick={handleLoginRegister}>
                                Enroll Your Voice <ArrowRight className="inline-block ml-2" />
                            </Button>
                        </motion.div>
                    </div>
                </section>

                <motion.section
                    id="features"
                    className="py-20 px-6 bg-white"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                            Key Features
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <FeatureCard
                                icon={MessageSquare}
                                title="Real-time Feedback"
                                description="Submit and receive feedback instantly, fostering quick improvements and communication."
                            />
                            <FeatureCard
                                icon={Users}
                                title="Anonymous Options"
                                description="Provide honest feedback with the option to remain anonymous, encouraging open communication."
                            />
                            <FeatureCard
                                icon={ThumbsUp}
                                title="Analytics Dashboard"
                                description="Visualize feedback trends and insights with our powerful analytics tools."
                            />
                        </div>
                    </div>
                </motion.section>

                <motion.section
                    id="how-it-works"
                    className="py-20 px-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                            How It Works
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <StepCard
                                number="1"
                                title="Sign Up"
                                description="Create your account using your college email address."
                            />
                            <StepCard
                                number="2"
                                title="Submit Feedback"
                                description="Share your thoughts on courses, facilities, or campus life."
                            />
                            <StepCard
                                number="3"
                                title="Track Progress"
                                description="See how your feedback is being addressed and make a difference."
                            />
                        </div>
                    </div>
                </motion.section>

                <section className="py-20 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-6">Ready to Improve Your College Experience?</h2>
                        <p className="text-xl mb-8">
                            Join CampusVoices today and start making a difference in your college community.
                        </p>
                        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
                            <Input
                                className="w-full md:w-96 bg-white text-gray-800"
                                placeholder="Enter your email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <Button type="submit" className="w-full md:w-auto">
                                Get Started Now <Zap className="inline-block ml-2" />
                            </Button>
                        </form>
                    </div>
                </section>
            </main>

            <footer className="bg-white py-8 px-6">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-600 mb-4 md:mb-0">
                        © {new Date().getFullYear()} CampusVoices. All rights reserved.
                    </p>
                    <nav className="flex space-x-6">
                        <a className="text-gray-600 hover:text-purple-600 transition-colors" href="#">Terms</a>
                        <a className="text-gray-600 hover:text-purple-600 transition-colors" href="#">Privacy</a>
                    </nav>
                </div>
            </footer>
        </div>
    );
}