import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, Calendar, SortDesc, SortAsc } from 'lucide-react';

const StickySearchFilter = ({
    searchTerm,
    setSearchTerm,
    filterDepartment,
    setFilterDepartment,
    dateRange,
    setShowDatePicker,
    setDatePickerType,
    sortOrder,
    setSortOrder,
}) => {
    const [isSticky, setIsSticky] = useState(false);
    const [activeTab, setActiveTab] = useState('normal');
    const filterRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (filterRef.current) {
                const filterRect = filterRef.current.getBoundingClientRect();
                setIsSticky(filterRect.top <= 0);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const filterContent = (
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            {/* Filter Inputs */}
            <div className="flex flex-wrap items-center gap-4 w-full">
                <div className="relative flex-grow">
                    <input
                        type="text"
                        placeholder="Search feedbacks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>

                <div className="relative flex-grow">
                    <select
                        value={filterDepartment}
                        onChange={(e) => setFilterDepartment(e.target.value)}
                        className="appearance-none w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="All">All Years</option>
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                        <option value="4th Year">4th Year</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
                <div className="relative flex-grow">
                    <button
                        onClick={() => {
                            setShowDatePicker(true);
                            setDatePickerType('from');
                        }}
                        className="px-4 py-2 w-full border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <Calendar className="inline-block mr-2 h-4 w-4" />
                        {dateRange.from ? dateRange.from.toLocaleDateString() : 'From'}
                    </button>
                </div>
                <div className="relative flex-grow">
                    <button
                        onClick={() => {
                            setShowDatePicker(true);
                            setDatePickerType('to');
                        }}
                        className="px-4 py-2 w-full border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <Calendar className="inline-block mr-2 h-4 w-4" />
                        {dateRange.to ? dateRange.to.toLocaleDateString() : 'To'}
                    </button>
                </div>
                <button
                    onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
                    className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                    {sortOrder === 'newest' ? <SortDesc className="h-5 w-5" /> : <SortAsc className="h-5 w-5" />}
                </button>
            </div>

            {/* Tabs */}
            <div className="mb-6 w-full">
                <div className="flex space-x-1">
                    {['normal', 'personal'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-2 px-4 text-sm font-medium rounded-t-lg ${activeTab === tab
                                ? 'bg-white text-purple-600 border-t border-l border-r border-gray-200'
                                : 'bg-gray-100 text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <>
            <div ref={filterRef} className="bg-white rounded-lg shadow-lg p-6 mb-8">
                {filterContent}
            </div>
            {isSticky && (
                <div
                    className="fixed top-0 left-0 right-0 z-10 bg-white shadow-lg p-6 transition-all duration-300 ease-in-out"
                    style={{ width: filterRef.current?.offsetWidth }}
                >
                    {filterContent}
                </div>
            )}
        </>
    );
};

export default StickySearchFilter;
