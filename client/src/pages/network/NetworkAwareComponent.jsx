import React from 'react';
import { motion } from 'framer-motion';
import { useNetworkStatus } from './NetworkStatusProvider';
import { MessageSquare, Wifi, WifiOff } from 'lucide-react';

const NetworkAwareComponent = ({ children }) => {
    const { isNetworkSlow, isLoading } = useNetworkStatus();

    const bubbleVariants = {
        start: { scale: 0.8, opacity: 0.5 },
        end: { scale: 1.2, opacity: 1 },
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-100 to-pink-100">
                <motion.div
                    className="text-center"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <motion.div
                        className="flex justify-center mb-6"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full">
                            <MessageSquare className="h-12 w-12 text-white" />
                        </div>
                    </motion.div>
                    <motion.h2
                        className="text-3xl font-bold text-gray-800 mb-4"
                        variants={itemVariants}
                    >
                        Campus Voices
                    </motion.h2>
                    <motion.p
                        className="text-xl text-gray-600 mb-8"
                        variants={itemVariants}
                    >
                        Loading your academic world...
                    </motion.p>
                    <div className="flex justify-center space-x-2">
                        {[0, 1, 2].map((index) => (
                            <motion.div
                                key={index}
                                className="w-4 h-4 bg-blue-600 rounded-full"
                                variants={bubbleVariants}
                                animate="end"
                                transition={{
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    duration: 0.8,
                                    delay: index * 0.2,
                                }}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        );
    }

    // if (isNetworkSlow) {
    //     return (
    //         <div className="flex items-center justify-center h-screen bg-gradient-to-br from-yellow-100 to-orange-100">
    //             <motion.div
    //                 className="text-center p-8 bg-white rounded-lg shadow-xl"
    //                 initial={{ scale: 0.8, opacity: 0 }}
    //                 animate={{ scale: 1, opacity: 1 }}
    //                 transition={{ duration: 0.5 }}
    //             >
    //                 <motion.div
    //                     className="flex justify-center mb-6"
    //                     animate={{ rotate: [0, 10, -10, 10, 0] }}
    //                     transition={{ duration: 2, repeat: Infinity }}
    //                 >
    //                     <div className="bg-yellow-400 p-3 rounded-full">
    //                         <WifiOff className="h-12 w-12 text-white" />
    //                     </div>
    //                 </motion.div>
    //                 <motion.h2
    //                     className="text-2xl font-bold text-gray-800 mb-4"
    //                     initial={{ y: 20, opacity: 0 }}
    //                     animate={{ y: 0, opacity: 1 }}
    //                     transition={{ delay: 0.2 }}
    //                 >
    //                     Slow Network Detected
    //                 </motion.h2>
    //                 <motion.p
    //                     className="text-lg text-gray-600 mb-6"
    //                     initial={{ y: 20, opacity: 0 }}
    //                     animate={{ y: 0, opacity: 1 }}
    //                     transition={{ delay: 0.4 }}
    //                 >
    //                     Your connection to Campus Voices is currently slow.
    //                     <br />
    //                     Don't worry, we're still loading your content!
    //                 </motion.p>
    //                 <motion.div
    //                     className="w-full bg-gray-200 rounded-full h-2.5 mb-4 overflow-hidden"
    //                     initial={{ width: 0 }}
    //                     animate={{ width: "100%" }}
    //                     transition={{ duration: 2, repeat: Infinity }}
    //                 >
    //                     <motion.div
    //                         className="bg-yellow-400 h-2.5 rounded-full"
    //                         initial={{ width: "0%" }}
    //                         animate={{ width: "100%" }}
    //                         transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    //                     />
    //                 </motion.div>
    //                 <motion.p
    //                     className="text-sm text-gray-500"
    //                     initial={{ opacity: 0 }}
    //                     animate={{ opacity: 1 }}
    //                     transition={{ delay: 0.6 }}
    //                 >
    //                     Tip: Try moving to an area with better signal
    //                 </motion.p>
    //             </motion.div>
    //         </div>
    //     );
    // }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {children}
        </motion.div>
    );
};

export default NetworkAwareComponent;