const ProductDetailsSkeleton = () => {
  return (
    <div className="grid lg:grid-cols-4 grid-cols-1 gap-6">
      {/* LEFT: gallery + share */}
      <div className="lg:col-span-3 col-span-4 space-y-6">
        <div className="p-4 rounded-md shadow-md mx-auto flex flex-col md:flex-row gap-6 bg-white relative overflow-hidden">
          {/* shimmer sweep */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer pointer-events-none" />

          {/* Images */}
          <div className="flex flex-col md:w-1/2">
            <div className="w-full mx-auto">
              {/* Main image */}
              <div className="relative">
                <div className="w-full h-[380px] bg-gray-200 rounded-md" />

                {/* Prev/Next round buttons */}
                <div className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-gray-200 rounded-full shadow" />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-gray-200 rounded-full shadow" />
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 mt-4 overflow-auto">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="w-20 h-20 lg:w-24 lg:h-24 bg-gray-200 rounded border" />
                ))}
              </div>
            </div>

            {/* Share */}
            <div className="pt-12">
              <div className="h-3 w-28 bg-gray-200 rounded mb-3" />
              <div className="flex items-start gap-4 py-2">
                <div className="w-9 h-9 bg-gray-200 rounded-full border" />
                <div className="w-9 h-9 bg-gray-200 rounded-full border" />
                <div className="w-9 h-9 bg-gray-200 rounded-full border" />
              </div>
            </div>
          </div>

          {/* RIGHT: details */}
          <div className="md:w-1/2 space-y-4">
            <div className="flex justify-between items-center">
              <div className="h-7 w-3/4 bg-gray-200 rounded" />
              <div className="w-6 h-6 bg-gray-200 rounded-full" />
            </div>

            {/* Business line */}
            <div className="h-4 w-56 bg-gray-200 rounded" />

            {/* Flash Sale card */}
            <div className="border border-orange-200 rounded overflow-hidden">
              <div className="bg-orange-300 p-2 flex justify-between items-center">
                <div className="h-4 w-24 bg-orange-200/70 rounded" />
                <div className="h-4 w-36 bg-orange-200/70 rounded" />
              </div>
              <div className="px-2 py-3 flex items-end gap-2">
                <div className="h-6 w-24 bg-gray-200 rounded" />
                <div className="h-4 w-20 bg-gray-200 rounded" />
                <div className="h-4 w-14 bg-gray-200 rounded" />
              </div>
              <div className="px-2 pb-2">
                <div className="h-3 w-40 bg-gray-200 rounded" />
              </div>
            </div>

            {/* Rating row */}
            <div className="flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-4 h-4 bg-gray-200 rounded" />
              ))}
              <div className="h-3 w-32 bg-gray-200 rounded ml-2" />
            </div>

            {/* …add more bars if your details section has more fields */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
