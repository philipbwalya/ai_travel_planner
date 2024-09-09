import React from "react";

const HotelList = ({ hotel }) => {
  return (
    <li>
      <div className="flex flex-col">
        <img
          src="https://images.contentstack.io/v3/assets/bltc6ce635bc4868eb2/bltc909e2acdaad5e27/64b0ec0955695c7b3ba95300/PMGM129123103.jpg?width=459&height=417&auto=webp&format=webp&dpr=1&quality=75&fit=crop&resize-filter=bilinear"
          alt={hotel.hotel_name}
          className="rounded-lg w-full h-48"
        />
        <div className=""></div>
      </div>
    </li>
  );
};

export default HotelList;
