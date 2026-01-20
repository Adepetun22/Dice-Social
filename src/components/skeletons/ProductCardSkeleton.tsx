const ProductCardSkeleton = () => {
  return (
    <div className="flex-1 bg-white rounded-lg p-2 border shadow-lg relative overflow-hidden">
      {/* Shimmer overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />

      {/* Image area */}
      <div className="relative">
        {/* Discount badge placeholder */}
        <div className="absolute top-1 left-2 w-12 h-4 bg-gray-200 rounded-full"></div>
        {/* Heart icon placeholder */}
        <div className="absolute top-1 right-2 w-6 h-6 bg-gray-200 rounded-full"></div>
        {/* Product image placeholder */}
        <div className="w-full h-40 bg-gray-200 rounded mb-2"></div>
      </div>

      {/* Title placeholder */}
      <div className="h-4 bg-gray-200 rounded mb-1 w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>

      {/* Price + Cart button */}
      <div className="flex items-center justify-between w-full mb-2">
        <div className="w-16 h-5 bg-gray-200 rounded"></div>
        <div className="w-10 h-6 bg-gray-200 rounded-full"></div>
      </div>

      {/* Old price */}
      <div className="h-3 bg-gray-200 rounded w-12"></div>
    </div>
  );
};

export default ProductCardSkeleton;
