import React from "react";
import { Link } from "react-router-dom";
//import Hero from "../components/Hero";

export default function Home() {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-between px-4 md:px-8">
      {/* Main Content */}
      

      {/* Footer */}
      <footer className="w-full text-center py-6 bg-gray-100 mt-10">
        <p className="text-gray-600">
          &copy; 2024 YourApp. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
