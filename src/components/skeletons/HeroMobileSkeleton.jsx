import React from "react";

const HeroMobileSkeleton = () => {
  return (
    <div className="w-full lg:hidden block px-4 py-8 animate-pulse">
      {/* Main hero image */}
      <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
      
      {/* Responsive grid of sidebar images */}
      <div className="grid grid-cols-3 gap-2">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="w-full h-24 bg-gray-200 rounded-lg"></div>
        ))}
      </div>
    </div>
  );
};

export default HeroMobileSkeleton;