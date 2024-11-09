// src/components/AdThumbnail.tsx

import React from "react";

type AdProps = {
  brandImage: string;
  adImage: string;
  adName: string;
  adLink: string;
};

const AdThumbnail: React.FC<AdProps> = ({ brandImage, adImage, adName, adLink }) => {
  return (
    <div className="relative flex flex-col items-center justify-center rounded-md 
    md:w-[100%] 
    lg:h-[220px] 
    1950:h-[450px] 
    1980:h-[240px] 
    2020:h-[440px]
    2050:h-[480px]
   
    ">
      <div className="overflow-hidden h-[100%] bg-red-100 bg-opacity-20 w-full object-cover">
        <a href={adLink}>
          <img
            src={adImage}
            alt="Ad"
            className="w-full h-full object-fill"
          />
        </a>
      </div>
      <div className="w-full flex flex-row gap-4 items-center sm:py-3 p-[6px]">
        <div className="sm:w-[35px] w-[30px] h-[30px] flex-shrink-0 sm:h-[35px] ">
          <img
            className="w-full h-full rounded-[50%] object-cover"
            src={brandImage}
            alt="Profile photo"
          />
        </div>
        <div>
          <p className="text-[13px] font-[700] text-gray-200">
            {adName}
          </p>
          <a
            href={adLink}
            className="text-[15px] font-bold text-purple-600"
          >
            Ad
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdThumbnail;



