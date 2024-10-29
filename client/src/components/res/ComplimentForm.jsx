import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, ChevronRight } from 'lucide-react';
import { toast } from 'react-toastify';
import customFetch from '../../utils/CustomFetch';

const ComplimentRequestForm = ({depart}) => {
    const [staffs, setStaffs] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        staffCode: '',
        department:depart,
        ratings: [
            { quotient: 'Teaching', checked: false },
            { quotient: 'Collaborative', checked: false },
            { quotient: 'Syllabus Completion', checked: false },
            { quotient: 'Communication', checked: false },
            { quotient: 'Out of Knowledge', checked: false },
        ],
        newQuotient: '',
    });

    console.log(staffs,'from compliment')
    useEffect(() => {
        const fetchStaffs = async () => {
            try {
                const data = await customFetch.get('/dashboard-head/staff');
                setStaffs(data.data.staffs);
            } catch (error) {
                console.error('Error fetching staff data:', error);
            }
        };
        fetchStaffs();
    }, []);

    useEffect(() => {
        // Automatically fill in the name when a matching staffCode is found
        if (formData.staffCode) {
            const matchedStaff = staffs.find(
                (staff) => staff.staffCode === formData.staffCode
            );
            if (matchedStaff) {
                setFormData((prev) => ({
                    ...prev,
                    name: `${matchedStaff.firstName} ${matchedStaff.lastName}`
                }));

            } else {
                setFormData((prev) => ({ ...prev, name: '' }));
            }
        }
    }, [formData.staffCode, staffs]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCategoryToggle = (category) => {
        const updatedRatings = formData.ratings.map((rating) =>
            rating.quotient === category ? { ...rating, checked: !rating.checked } : rating
        );
        setFormData({ ...formData, ratings: updatedRatings });
    };

    const handleNewQuotientChange = (event) => {
        setFormData({ ...formData, newQuotient: event.target.value });
    };

    const addQuotient = () => {
        const { newQuotient } = formData;
        if (newQuotient.trim() === '') {
            toast.error('Please enter a new quotient');
            return;
        }
        const newRating = { quotient: newQuotient, checked: false };
        setFormData({
            ...formData,
            ratings: [...formData.ratings, newRating],
            newQuotient: '',
        });
    };

    const handleComplimentSubmit = async (event) => {
        event.preventDefault();
        if (formData.name.trim() === '' || formData.staffCode.trim() === '') {
            toast.error('Please enter name and staff code');
            return;
        }

        const checkedRatings = formData.ratings.filter((rating) => rating.checked);

        if (checkedRatings.length < 5) {
            toast.error('Please select at least 5 compliment categories.');
            return;
        }

        try {
            // Check if the staff with the given staffCode already exists
            const existingStaffResponse = await customFetch.get(`/dashboard-student/ratings?staffCode=${formData.staffCode}`);

            if (existingStaffResponse.data.exists) {
                toast.error('Staff already present with this code.');
                return;
            }

            // If no existing staff, proceed with submission
            await customFetch.post('/dashboard-student/ratings', {
                ...formData,
                ratings: checkedRatings,
            });
            toast.success('Staff ratings added successfully');

            // Reset form fields after successful submission
            setFormData({
                name: '',
                staffCode: '',
                ratings: formData.ratings.map((rating) => ({
                    ...rating,
                    checked: false,
                })),
                newQuotient: '',
            });
        } catch (error) {
            toast.error(error?.response?.data?.msg || 'Insertion failed');
        }
    };


   
    return (
        <motion.div
            className="bg-white rounded-lg shadow-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <motion.h2
                className="text-3xl font-bold mb-6 text-center text-purple-600 flex items-center justify-center"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                <Award className="mr-2 text-pink-500" size={32} />
                Compliment Request
            </motion.h2>
            <form onSubmit={handleComplimentSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <label htmlFor="complimentName" className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            id="complimentName"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border-2 border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                            required
                            readOnly // Make this field read-only since it's auto-filled
                        />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <label htmlFor="complimentStaffCode" className="block text-sm font-medium text-gray-700 mb-1">
                            Staff Code
                        </label>
                        <input
                            type="text"
                            id="complimentStaffCode"
                            name="staffCode"
                            value={formData.staffCode}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border-2 border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                            required
                        />
                    </motion.div>
                </div>
                {/* Rest of the form remains unchanged */}
                <div>
                    <p className="block text-lg font-medium text-gray-700 mb-3">Compliment Categories</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {formData.ratings.map((rating, index) => (
                            <motion.button
                                key={rating.quotient}
                                type="button"
                                onClick={() => handleCategoryToggle(rating.quotient)}
                                className={`flex items-center justify-center p-3 rounded-lg transition-all duration-300 ${rating.checked ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="text-sm">{rating.quotient}</span>
                            </motion.button>
                        ))}
                    </div>
                </div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <label htmlFor="newQuotient" className="block text-sm font-medium text-gray-700 mb-1">
                        New Quotient
                    </label>
                    <div className="flex">
                        <input
                            type="text"
                            id="newQuotient"
                            name="newQuotient"
                            value={formData.newQuotient}
                            onChange={handleNewQuotientChange}
                            className="flex-grow px-4 py-2 border-2 border-purple-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                        />
                        <button
                            type="button"
                            onClick={addQuotient}
                            className="bg-purple-600 text-white px-4 py-2 rounded-r-md hover:bg-purple-700 transition-colors"
                            aria-label="Add to quotient"
                        >
                            +
                        </button>
                    </div>
                </motion.div>
                <motion.button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-4 rounded-md hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Submit Compliment
                    <ChevronRight className="ml-2 w-5 h-5" />
                </motion.button>
            </form>
        </motion.div>
    );
};

export default ComplimentRequestForm;
