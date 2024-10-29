import React, { useEffect, useState } from "react";
import {
    Users,
    Star,
    BarChart2,
    ChevronRight,
    X,
    Menu,
    Bell,
    Mail,
    Phone,
    Award,
    Clock,
    Hash,
    User,
} from "lucide-react";
import AdminSidebar from "../../components/res/AdminSidebar";
import customFetch from "../../utils/CustomFetch";
import LoadingPage from "../../components/res/LoadingPage";

const StaffRatingsReview = () => {
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [staffMembers, setStaffMembers] = useState([]);
    const [ratedStaffs, setRatedStaffs] = useState([]);
    const [TopStaff, setTopStaff] = useState([]);
    const [comments, setComments] = useState([]);
    const [totalreview, setTotalReviews] = useState(0);
    const [overallAverage, setOverallAverage] = useState(0);
    const [staffComments, setStaffComments] = useState([]);
    const [departRating, setDepartRatings] = useState(0);
    const [departReview, setDepartReview] = useState(0);
    const [loading, setLoading] = useState(true);
    const [totalRating, setTotalRating] = useState(0);
    const [mail, setMail] = useState("person@gmail.com");
    const [contact, setContact] = useState("1234567890");
    const [exp, setExp] = useState("0");

    useEffect(() => {
        const fetchAllStaff = async () => {
            try {
                const response = await customFetch.get("/dashboard-head/staffs");
                setStaffMembers(response.data.staffs);
            } catch (error) {
                console.error("Error fetching staff:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAllStaff();
    }, []);
    console.log("rated srtafs", ratedStaffs);

    useEffect(() => {
        const fetchTopStaff = async () => {
            try {
                const response = await customFetch.get("/dashboard-student/ratings"); // Fetch data from the URL
                setComments(response.data.rating.comment);
                setRatedStaffs(response.data.rating);
                setStaffComments(response.data.rating); // Store comments in state
                setOverallAverage(response.data.departmentOverallAverage);
                setTotalReviews(response.data.totalReviews);
                setTopStaff(response.data.topFive.slice(0, 5)); // Assuming the response is an array and we take the top 5
            } catch (error) {
                console.error("Error fetching top staff:", error);
            }
        };
        fetchTopStaff();
    }, []);

    useEffect(() => {
        const fetchDepartmentRating = async () => {
            try {
                const response = await customFetch.get("/depart-ratings");
                setDepartReview(response.data.totalRatingsCount);
                setTotalRating(response.data.totalRating); // Store totalRating in state
            } catch (error) {
                console.error("Error fetching:", error);
            }
        };
        fetchDepartmentRating();
    }, []);

    useEffect(() => {
        // New effect to calculate departRatings after departReview is set
        if (departReview > 0) {
            setDepartRatings((totalRating / departReview).toFixed(1));
        }
    }, [departReview, totalRating]);

    const totalStaff = staffMembers.length;

    const openModal = (staff, type) => {
        // Modified openModal function
        setSelectedStaff(staff);
        setIsModalOpen(true);
        setModalType(type); // Added setModalType
        if (type === "comments") {
            const staffData = staffComments.find((item) => item.name === staff.name); // Find comments for the selected staff
            setComments(staffData ? staffData.comment : []); // Set comments for the modal
        }

        // New logic to filter staff based on staffCode
        const filteredStaff = staffMembers.filter(
            (member) => member.staffCode === staff.staffCode
        );

        // Check if filteredStaff has any results before accessing properties
        if (filteredStaff.length > 0) {
            setContact(filteredStaff[0].phoneNumber);
            setMail(filteredStaff[0].email);
            setExp(filteredStaff[0].experience);
        } else {
            // Handle case where no staff is found (optional)
            setContact("");
            setMail("");
            setExp("0");
        }
    };
    if (loading)
        return (
            <div>
                <LoadingPage />
            </div>
        );

    const closeModal = () => {
        setSelectedStaff(null);
        setIsModalOpen(false);
        setModalType(null); // Reset modalType on close
    };

    const StarRating = ({ rating }) => {
        return (
            <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`w-4 h-4 ${star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                    />
                ))}
            </div>
        );
    };

    const getRatingColor = (rating) => {
        if (rating >= 4) return "bg-green-500";
        if (rating >= 3) return "bg-yellow-500";
        return "bg-red-500";
    };

    const totalCount =
        selectedStaff?.ratings?.reduce(
            (acc, rating) => acc + rating.totalCount,
            0
        ) || 0;
    const quotientLength = selectedStaff?.ratings?.length || 1;

    // Calculate the average based on the totalCount divided by the length of the quotient
    const averageCount =
        quotientLength > 0 ? Math.round(totalCount / quotientLength) : 0;

    return (
        <div className="flex h-screen bg-gradient-to-br from-purple-100 to-pink-100">
            {/* Sidebar */}
            <AdminSidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white shadow-sm z-10">
                    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                        <div className="flex items-center">
                            <button className="mr-4 md:hidden">
                                <Menu className="h-6 w-6 text-gray-600" />
                            </button>
                            <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                                Staff Analytics
                            </h2>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                                <Bell className="h-5 w-5 text-gray-600" />
                            </button>
                            <div className="relative group">
                                <button className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                                    <span className="text-sm font-medium text-white">AD</span>
                                </button>
                                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {/* {data.data.user.role.slice(0, 3).toUpperCase()} */}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main content */}
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-7xl mx-auto space-y-6">
                        {/* Breadcrumbs */}
                        {/* Top rated staff */}
                        <div className="bg-white rounded-lg shadow-xl p-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                Top Rated Staff
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                                {TopStaff.map((staff, index) => (
                                    <div
                                        key={staff.id}
                                        className="bg-purple-50 rounded-lg p-4 shadow flex items-center space-x-4"
                                    >
                                        <div className="flex-shrink-0 h-12 w-12">
                                            <div className="h-12 w-12 rounded-full bg-purple-500 flex items-center justify-center">
                                                <span className="text-xl font-medium text-white">
                                                    {staff.name[0]}
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-semibold text-lg">{staff.name}</div>
                                            {/* <div className="text-gray-600">{staff.department}</div> */}
                                            <div className="flex items-center mt-1">
                                                <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                                                <span>{staff.overallAverage}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Stat cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm uppercase text-gray-600">
                                            Total Staff
                                        </p>
                                        <h3 className="text-3xl font-bold text-purple-600">
                                            {totalStaff}
                                        </h3>
                                    </div>
                                    <Users className="h-10 w-10 text-purple-500 opacity-75" />
                                </div>
                            </div>
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm uppercase text-gray-600">
                                            Total Reviews
                                        </p>
                                        <h3 className="text-3xl font-bold text-pink-600">
                                            {totalreview}
                                        </h3>
                                    </div>
                                    <BarChart2 className="h-10 w-10 text-pink-500 opacity-75" />
                                </div>
                            </div>
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm uppercase text-gray-600">
                                            Department Rating
                                        </p>
                                        <h3 className="text-3xl font-bold text-purple-600">
                                            {departRating}
                                            <span className="text-sm font-medium text-gray-400">
                                                {" "}
                                                ( Avg of {departReview} members )
                                            </span>
                                        </h3>
                                    </div>
                                    <Star className="h-10 w-10 text-yellow-400 opacity-75" />
                                </div>
                            </div>
                        </div>

                        {/* Staff ratings list */}
                        <div className="bg-white rounded-lg shadow-xl p-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                Staff Ratings
                            </h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Rating
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Comments
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {ratedStaffs.map((staff) => (
                                            <tr key={staff.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                                                                <span className="text-xl font-medium text-purple-600">
                                                                    {staff.name[0]}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {staff.name}
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                {staff.department}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <StarRating rating={staff.overallAverage} />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <button
                                                        onClick={() => openModal(staff, "comments")}
                                                        className="text-purple-600 hover:text-purple-900"
                                                    >
                                                        View Comments
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <button
                                                        onClick={() => openModal(staff, "details")} // Added type 'details'
                                                        className="text-purple-600 hover:text-purple-900 mr-2"
                                                    >
                                                        View Details
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-xl p-6">
                            <h1 className="text-3xl font-bold text-gray-800">
                                Staff Performance Overview
                            </h1>
                            <p className="text-gray-600 mt-2">
                                Monitor and analyze staff ratings and feedback
                            </p>
                        </div>
                    </div>
                </main>

                {/* Enhanced Modal */}
                {isModalOpen && selectedStaff && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl overflow-hidden">
                            <div className="relative bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
                                <button
                                    onClick={closeModal}
                                    className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                                <h2 className="text-3xl font-bold mb-2">
                                    {selectedStaff.name}
                                </h2>
                                <p className="text-xl">
                                    {modalType === "comments"
                                        ? "Comments"
                                        : selectedStaff.position}
                                </p>
                            </div>
                            {modalType === "comments" ? (
                                <div className="p-6 max-h-[70vh] overflow-y-auto">
                                    {comments
                                        .filter((comment) => comment.trim() !== "")
                                        .map(
                                            (
                                                comment,
                                                index // Filter out empty comments
                                            ) => (
                                                <div
                                                    key={index}
                                                    className="bg-gray-50 rounded-lg p-4 mb-4 shadow flex items-center" // Added flex for alignment
                                                >
                                                    <div className="flex-shrink-0 mr-3">
                                                        {" "}
                                                        {/* Added margin for spacing */}
                                                        <User className="h-6 w-6 text-purple-500" />{" "}
                                                        {/* Profile logo from Lucide React */}
                                                    </div>
                                                    <p className="text-gray-700 mb-2">{comment}</p>
                                                </div>
                                            )
                                        )}
                                </div>
                            ) : (
                                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                            Staff Details
                                        </h3>
                                        <div className="flex items-center space-x-3 text-gray-600">
                                            <Award className="h-5 w-5 text-purple-500" />
                                            <span>{selectedStaff.department}</span>
                                        </div>
                                        <div className="flex items-center space-x-3 text-gray-600">
                                            <Hash className="h-5 w-5 text-purple-500" />
                                            <span>Staff Code: {selectedStaff.staffCode}</span>
                                        </div>
                                        <div className="flex items-center space-x-3 text-gray-600">
                                            <Clock className="h-5 w-5 text-purple-500" />
                                            <span>{exp} years of experience</span>
                                        </div>
                                        <div className="flex items-center space-x-3 text-gray-600">
                                            <Phone className="h-5 w-5 text-purple-500" />
                                            <span>{contact}</span>
                                        </div>
                                        <div className="flex items-center space-x-3 text-gray-600">
                                            <Mail className="h-5 w-5 text-purple-500" />
                                            <span>{mail}</span>
                                        </div>
                                        <div className="mt-6">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-lg font-semibold text-gray-800">
                                                    Overall Rating
                                                </span>
                                                <span className="text-2xl font-bold text-purple-600">
                                                    {selectedStaff.overallAverage}
                                                </span>
                                            </div>
                                            <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                                                <div
                                                    className={`h-full ${getRatingColor(
                                                        selectedStaff.overallAverage
                                                    )}`} // Use selectedStaff.overallAverage for color
                                                    style={{
                                                        width: `${(selectedStaff.overallAverage / 5) * 100
                                                            }%`, // Ensure this uses the correct rating
                                                    }}
                                                ></div>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-1">
                                                Based on {averageCount} ratings{" "}
                                                {/* Displaying the rounded average count */}
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                            Rating Distribution
                                        </h3>
                                        <div className="space-y-6">
                                            {Object.entries(selectedStaff.ratings).map(
                                                (
                                                    [category, { average, quotient }] // Destructure average and quotient
                                                ) => (
                                                    <div key={category}>
                                                        <div className="flex justify-between items-center mb-2">
                                                            <span className="text-sm font-medium text-gray-700 capitalize">
                                                                {quotient} {/* Display the quotient */}
                                                            </span>
                                                            <span className="text-sm font-medium text-gray-700">
                                                                {average.toFixed(1)} / 5{" "}
                                                                {/* Use average directly from destructured object */}
                                                            </span>
                                                        </div>
                                                        <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                                                            <div
                                                                className={`h-full ${getRatingColor(average)}`} // Corrected the space in "h-full"
                                                                style={{
                                                                    width: `${(average / 5) * 100}%`, // Uses average to calculate the percentage width
                                                                }}
                                                            ></div>
                                                        </div>

                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="bg-gray-50 px-6 py-4 flex justify-end">
                                <button
                                    className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition-colors"
                                    onClick={closeModal}
                                >
                                    <span>Close</span>
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
};

export default StaffRatingsReview;



