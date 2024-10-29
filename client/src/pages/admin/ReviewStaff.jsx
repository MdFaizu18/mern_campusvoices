import React, { useEffect, useState } from 'react'
import {
    ChevronDown,
    ChevronUp,
    Edit,
    Trash2,
    Menu,
    Bell,
    Copy // Import the Copy icon
} from 'lucide-react';
import AdminSidebar from '../../components/res/AdminSidebar'
import { useNavigate } from 'react-router-dom';
import customFetch from '../../utils/CustomFetch';
import { toast } from 'react-toastify';
import LoadingPage from '../../components/res/LoadingPage'
import CreativeStaffCard from '../../components/res/StaffsCardRatings';

export default function ReviewStaff() {
    const [searchTerm, setSearchTerm] = useState('');
    const [staffs, setStaffs] = useState([]);
    const [totalStaffs, setTotalStaffs] = useState(0);
    const [sortColumn, setSortColumn] = useState('name');
    const [sortDirection, setSortDirection] = useState('asc');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const data = await customFetch.get('/dashboard-head/staff');
                setStaffs(data.data.staffs);
                setTotalStaffs(data.data.TotalNoStaffs);
            } catch (error) {
                if (error.response && error.response.status === 403) {
                    toast.error("Please Login !!");
                    navigate('/login-admin');
                } else {
                    toast.error("An error occurred. Please try again.");
                    navigate('/');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchFeedbacks();
    }, [navigate]);

    console.log(staffs);

    if (loading) return <div><LoadingPage /></div>;

    const handleSort = (column) => {
        if (column === sortColumn) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const sortedStaff = [...staffs].sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    const filteredStaff = sortedStaff.filter((staff) =>
        (staff.firstName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (staff.jobPosition?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (staff.email?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    );

    const handleEditClick = (id) => {
        navigate(`/admin-dashboard/review-staff/${id}`);
    };

    const handleCopy = (staffCode) => {
        navigator.clipboard.writeText(staffCode)
            .then(() => {
                toast.success('Staff code copied to clipboard!');
            })
            .catch((error) => {
                toast.error('Failed to copy staff code.');
                console.error('Error copying text: ', error);
            });
    };

    const handleDelete = async (id) => {
        try {
            const confirmed = window.confirm('Are you sure you want to delete this staff member?');
            if (!confirmed) return; // If the user clicks "Cancel", exit the function

            await customFetch.delete(`dashboard-head/staff/${id}`);

            setStaffs(filteredStaff.filter((staff) => staff.id !== id));
            toast.success('Staff member deleted successfully!');
            window.location.reload();
        } catch (error) {
            console.error('Error deleting staff member:', error);
            toast.error('Failed to delete the staff member. Please try again.');
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <AdminSidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow-sm z-10">
                    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                        <div className="flex items-center">
                            <button className="mr-4 md:hidden">
                                <Menu className="h-6 w-6" />
                            </button>
                            <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                                Staff Management
                            </h2>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                                <Bell className="h-5 w-5 text-gray-600" />
                            </button>
                            <div className="relative">
                                <button className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                                    <span className="text-sm font-medium text-white">HOD</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto bg-gradient-to-br from-white-100 to-pink-100 py-6">
                    <div className="max-w-7l mx-5">
                        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
                            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                                <h3 className="text-2xl font-semibold text-gray-800 mb-4 md:mb-0">
                                    Total Staff: {totalStaffs}
                                </h3>
                                <div className="w-full md:w-64">
                                    <input
                                        type="text"
                                        placeholder="Search staff..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th onClick={() => handleSort('name')} className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider cursor-pointer">
                                                Name {sortColumn === 'name' && (sortDirection === 'asc' ? <ChevronUp className="inline w-4 h-4" /> : <ChevronDown className="inline w-4 h-4" />)}
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Position</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Staff Id</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Experience</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Email</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">Mobile No</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-900 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredStaff.map((staff) => (
                                            <tr key={staff.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {staff.firstName} {staff.lastName}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{staff.jobPosition}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex items-center">
                                                    {staff.staffCode}
                                                    <button onClick={() => handleCopy(staff.staffCode)} className="ml-2 focus:outline-none">
                                                        <Copy className="w-4 h-4 text-gray-500 hover:text-gray-700 transition duration-200" />
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{staff.experience} Years</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{staff.email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{staff.phoneNumber}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button
                                                        className="text-indigo-600 hover:text-indigo-900 mr-2"
                                                        onClick={() => handleEditClick(staff._id)}
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        className="text-red-600 hover:text-red-900"
                                                        onClick={() => handleDelete(staff._id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <CreativeStaffCard />
                </main>
            </div>
        </div>
    )
}
