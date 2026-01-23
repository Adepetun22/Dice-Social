import React from "react";
import ovabossads2 from "../../../assets/Ovabossads2.jpeg";

const SmallAdsCard2 = () => {
  return (
    <div className="mt-4 hidden lg:block">
      <div className="bg-white rounded-lg w-full overflow-hidden">
        <img
          src={ovabossads2}
          alt="Ovaboss Ad 2"
          className="w-full h-auto object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default SmallAdsCard2;

