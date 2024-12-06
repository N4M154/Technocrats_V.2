import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-white text-teal-700  w-full">
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/home">
            <img src="/Logo.png" width={100} height={80} alt="Logo" />
          </Link>
        </div>

        {/* Navbar */}
        <nav className="hidden md:flex space-x-8">
          {currentUser && (
            <Link
              to="/community"
              className="text-teal-700 hover:text-teal-500 transition duration-300 font-semibold mt-2"
            >
              Community
            </Link>
          )}
          {currentUser && (
            
              <Link
                to="/analytics"
                
                className="text-teal-700 hover:text-teal-500 transition duration-300 font-semibold mt-2"
              >
                Analytics
              </Link>
              
            
          )}
          
          {currentUser && (
            <Link
              to="/about"
              className="text-teal-700 hover:text-teal-500 transition duration-300 font-semibold mt-2"
            >
              About
            </Link>
          )}
          <Link to="/profile" className="flex items-center space-x-2 font-bold">
            {currentUser ? (
              <img
                src={currentUser.profilePicture}
                alt="profile"
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <span className="text-teal-700 hover:text-teal-500 transition duration-300">
                Sign In
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-teal-500 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
