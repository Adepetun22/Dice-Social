import React from "react";

const HeroSkeleton = () => {
  return (
    <div className="w-full min-h-[75vh] lg:block hidden animate-pulse">
      <div className="grid lg:grid-cols-4 grid-cols-1 h-[60vh] lg:p-12 p-4">
        <div className="col-span-3 h-full">
          <div className="relative overflow-hidden rounded-lg shadow-lg h-[60vh] bg-gray-200">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 border-t-2 border-yellow-500 border-solid rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
        <div className="col-span-1 h-[60vh] pl-4">
          <div className="hidden md:flex md:flex-col md:justify-center w-full h-full space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="w-full h-1/3 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSkeleton;