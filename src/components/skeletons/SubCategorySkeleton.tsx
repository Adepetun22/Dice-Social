const SubCategorySkeleton = () => {
  return (
    <div className="flex flex-col items-center text-center p-2 bg-[#faf9f9] rounded relative overflow-hidden">
      {/* Shimmer overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />

      {/* Thumbnail placeholder */}
      <div className="w-24 h-24 bg-gray-200 rounded mb-2"></div>

      {/* Title placeholder */}
      <div className="w-20 h-4 bg-gray-200 rounded"></div>
    </div>
  );
};

export default SubCategorySkeleton;
