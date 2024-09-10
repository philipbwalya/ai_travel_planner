import React from "react";

const HotelList = ({ hotel }) => {
  return (
    <li>
      <div className="flex flex-col gap-2 shadow-md rounded-lg">
        <img
          src="https://images.contentstack.io/v3/assets/bltc6ce635bc4868eb2/bltc909e2acdaad5e27/64b0ec0955695c7b3ba95300/PMGM129123103.jpg?width=459&height=417&auto=webp&format=webp&dpr=1&quality=75&fit=crop&resize-filter=bilinear"
          alt={hotel.hotel_name}
          className="rounded-t-lg w-full h-48 bg-gray-400"
        />
        <div className="flex flex-col items-start justify-center gap-1 pl-2 pb-2">
          <h2 className="text-xl font-semibold pb-2">
            Bellagio Fountains Show
          </h2>
          <p className="text-gray-400">
            📌 3355 Las Vegas Blvd S, Las Vegas, NV 89109
          </p>
          <h4 className="">💰 $100-$180 per night</h4>
          <span className="">⭐ 4 stars</span>
        </div>
      </div>
    </li>
  );
};

export default HotelList;
