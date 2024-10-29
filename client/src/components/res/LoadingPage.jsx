import React from 'react';
import { motion } from 'framer-motion';

const LoadingAnimation = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 to-pink-100">
            <motion.div
                className="relative w-32 h-32"
                animate={{
                    rotate: 360
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                {[0, 1, 2].map((index) => (
                    <motion.span
                        key={index}
                        className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-purple-500 rounded-full"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                            duration: 1,
                            delay: index * 0.2,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                    />
                ))}
            </motion.div>
            <motion.h2
                className="mt-8 text-2xl font-bold text-purple-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                Loading...
            </motion.h2>
            <motion.div
                className="mt-4 flex space-x-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
            >
                {[0, 1, 2].map((index) => (
                    <motion.div
                        key={index}
                        className="w-3 h-3 bg-pink-500 rounded-full"
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [1, 0.5, 1]
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: index * 0.2
                        }}
                    />
                ))}
            </motion.div>
        </div>
    );
};

export default LoadingAnimation;