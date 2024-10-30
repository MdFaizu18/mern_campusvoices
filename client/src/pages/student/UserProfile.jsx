import React, { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  Edit,
  Lock,
  Mail,
  Phone,
  User,
  MessageCircle,MessageCircle,
  Star,
  Eye,
  EyeOff,
  Book,
  Calendar,
  MapPin,
} from "lucide-react";
import Navbar from "../../components/res/Navbar";
import customFetch from "../../utils/CustomFetch";
import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import ProfileComponent from "../../components/res/ProfileComponent"; // Import ProfileComponent

const ProfileSection = ({ title, children }) => (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-2xl shadow-lg p-6 mb-6 transform hover:scale-105 transition-transform duration-300"
  >
    <h2 className="text-2xl font-bold mb-4 text-indigo-700">{title}</h2>
    {children}
  </motion.section>
);

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className={${color} p-4 rounded-xl flex items-center space-x-4}>
    <div className="bg-white p-3 rounded-full">
      <Icon size={24} className={${color.replace("bg-", "text-")}} />
    </div>
    <div>
      <p className="text-sm font-medium text-indigo-100">{label}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  </div>
);

export const loader = async () => {
  try {
    const data = await customFetch.get("/dashboard-student/current-user");
    const stats = await customFetch.get("/dashboard-student/feedbacks");
    return { data, stats };
  } catch (error) {
    if (error.response && error.response.status === 403) {
      toast.error("Please Login !!");
      return redirect("/");
    } else {
      toast.error("Error occurred while fetching data");
      return redirect("/");
    }
  }
};

export default function UserProfile() {
  const { data, stats } = useLoaderData();
  const userData = data.data.user;
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(
    userData.profileImage || "/placeholder.svg?height=128&width=128"
  );

  const user = {
    name: userData.name,
    email: userData.email,
    phone: userData.mobileNo,
    department: userData.department,
    location: "Please Upload image below than 5 MB",
    feedsSent: stats.data.feedsTotal,
    averageRating: 4.8,
    enrollmentDate: " ",
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Please upload an image smaller than 5 MB");
        return;
      }
      const formData = new FormData();
      formData.append("profileImage", file);
      setLoading(true); // Start the loading state

      try {
        const response = await customFetch.patch(
          /dashboard-student/current-user/update/${userData._id},
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data.updatedUser.profileImage) {
          setProfileImage(response.data.updatedUser.profileImage); // Update the profile image state
          toast.success("Profile image updated successfully");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to update profile image");
      } finally {
        setLoading(false); // Stop the loading state
      }
    }
  };

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = useCallback(async () => {
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields");
      return;
    }

    try {
      const response = await customFetch.patch(
        /dashboard-student/current-user/${userData._id},
        {
          oldPassword: currentPassword,
          newPassword: newPassword,
          password: confirmPassword,
        }
      );

      if (response.data.message) {
        toast.success(response.data.message);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while changing password";
      toast.error(errorMessage);
    }
  }, [currentPassword, newPassword, confirmPassword, userData._id]);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <ProfileComponent
            user={user}
            profileImage={profileImage}
            handleImageUpload={handleImageUpload}
            loading={loading}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <StatCard
              icon={MessageCircle}
              label="Feeds Sent"
              value={user.feedsSent}
              color="bg-indigo-600"
            />
            <StatCard
              icon={Star}
              label="Average Rating"
              value={${user.averageRating} /5}
              color="bg-purple-600"
            />
          </div>

          <ProfileSection title="Personal Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                    <User size={20} />
                  </span>
                  <input
                    type="text"
                    value={user.name}
                    readOnly={!isEditing}
                    className="flex-1 block w-full px-2 py-2 rounded-none rounded-r-md sm:text-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                    <Mail size={20} />
                  </span>
                  <input
                    type="email"
                    value={user.email}
                    readOnly={!isEditing}
                    className="flex-1 block w-full px-2 py-2 rounded-none rounded-r-md sm:text-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                    <Phone size={20} />
                  </span>
                  <input
                    type="tel"
                    value={user.phone}
                    readOnly={!isEditing}
                    className="flex-1 block w-full px-2 py-2 rounded-none rounded-r-md sm:text-sm border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
              >
                {isEditing ? "Save" : "Edit"}{" "}
                <Edit size={16} className="ml-2" />
              </button>
            </div>
          </ProfileSection>

          <ProfileSection title="Change Password">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="current-password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Current Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="current-password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="block w-full px-2 py-2 pr-10 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <div>
                <label
                  htmlFor="new-password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  New Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="new-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="block w-full px-2 py-2 pr-10 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter new password"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Confirm New Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full px-2 py-2 pr-10 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handlePasswordChange}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300"
                >
                  Change Password <Lock size={16} className="ml-2" />
                </button>
              </div>
            </div>
          </ProfileSection>
        </div>
      </div>
    </div>
  );
}
