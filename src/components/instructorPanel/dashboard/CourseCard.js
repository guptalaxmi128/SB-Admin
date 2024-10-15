import React, { useState } from "react";

const CourseCard = ({ index, courseName,imageUrl,date }) => {
  const [dropdownOpen, setDropdownOpen] = useState(Array(5).fill(false)); // Assuming there are 5 course cards, change the number as needed

  const toggleDropdown = (index) => {
    const updatedDropdownOpen = [...dropdownOpen];
    updatedDropdownOpen[index] = !updatedDropdownOpen[index];
    setDropdownOpen(updatedDropdownOpen);
  };

  return (
    <>
      <div className="flex items-center justify-between  mt-4 hover:bg-blue-50 hover:p-2 rounded cursor-pointer">
        {/* Image */}
      
        <img
          src={`${imageUrl}`}
          alt="Course"
          className="w-16 h-16 rounded-md mr-4"
        />
        {/* Course Name */}
        <div className="flex-grow">
        <h3 className="text-base font-poppins ">{courseName}</h3>
        <p className="text-sm font-poppins">{date}</p>
        </div>
      
        <button className="border-blue-500 border text-blue-500 px-4 py-2 rounded-lg mr-2 font-poppins">View Course</button>
       
        {/* Dropdown Icon */}
        <div className="relative inline-block text-left">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600 cursor-pointer"
            viewBox="0 0 20 20"
            fill="currentColor"
            onClick={() => toggleDropdown(index)}
          >
            <path
              fillRule="evenodd"
              d="M10 12a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M10 2a2 2 0 100 4 2 2 0 000-4zM10 18a2 2 0 100-4 2 2 0 000 4zM10 8a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
       
          {/* Dropdown Content */}
          {dropdownOpen[index] && (
            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <button
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  View More
                </button>
                <button
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Update Data
                </button>
                <button
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  Clear Data
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    
    </>
  );
};

export default CourseCard;
