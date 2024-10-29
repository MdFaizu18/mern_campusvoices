import { useState, useRef } from 'react';
import { Camera, MessageCircle, X } from 'lucide-react'; // Assuming these icons are being used

const ProfileComponent = ({ user, profileImage, handleImageUpload, triggerFileInput, loading }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const fileInputRef = useRef(null);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="relative mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 transform -skew-y-6 sm:skew-y-0 sm:rotate-6 sm:rounded-3xl"></div>
            <div className="relative bg-white shadow-lg sm:rounded-3xl p-8">
                <div className="flex flex-col sm:flex-row items-center">
                    <div className="relative mb-4 sm:mb-0 sm:mr-6">
                        <img
                            src={profileImage}
                            alt="Profile"
                            className="w-32 h-32 rounded-full border-4 border-indigo-300 object-cover cursor-pointer"
                            onClick={openModal} // Open modal on click
                        />
                        <button
                            className="absolute bottom-0 right-0 bg-indigo-500 text-white p-2 rounded-full hover:bg-indigo-600 transition-colors"
                            onClick={triggerFileInput}
                        >
                            <Camera size={20} />
                        </button>
                        {loading && (
                            <div className="flex items-center justify-center mt-4">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                                <span className="ml-2 text-blue-500">Uploading...</span>
                            </div>
                        )}
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            className="hidden"
                            accept="image/*"
                        />
                    </div>
                    <div className="text-center sm:text-left">
                        <h1 className="text-4xl font-bold text-gray-800">{user.name}</h1>
                        <p className="text-xl text-indigo-600">{user.department}</p>
                        <div className="flex items-center justify-center sm:justify-start mt-2 text-gray-600">
                            <MessageCircle size={16} className="mr-1" />
                            <span>{user.location}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for displaying the image */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div
                        className="relative bg-white p-4 rounded-lg shadow-lg transform -translate-y-1/2"
                        style={{
                            marginTop: 'var(--modal-margin-top)',
                        }}
                    >
                        <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                            onClick={closeModal}
                        >
                            <X size={24} />
                        </button>
                        <img
                            src={profileImage}
                            alt="Profile"
                            className="max-w-full max-h-[80vh] rounded-lg"
                        />
                    </div>
                </div>
            )}

        </div>
    );
};

export default ProfileComponent;
