import React from "react";
import ovabossbanner from "../../../assets/ovabossbanner.jpeg";

const SmallAdsCard = () => {
  return (
    <div className="mt-4">
      <div className="bg-white rounded-lg w-full overflow-hidden">
        <img
          src={ovabossbanner}
          alt="Ovaboss Banner"
          className="w-full h-auto object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default SmallAdsCard;

