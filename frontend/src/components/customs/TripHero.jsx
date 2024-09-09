import React from "react";
import { Button } from "../ui/button";
import { IoIosSend } from "react-icons/io";

const TripHero = ({ tripData }) => {
  return (
    <div className="flex flex-col gap-10">
      <div className="">
        <img
          className="flex justify-center items-center w-full h-96 rounded-2xl object-cover"
          src="https://images.contentstack.io/v3/assets/bltc6ce635bc4868eb2/bltc909e2acdaad5e27/64b0ec0955695c7b3ba95300/PMGM129123103.jpg?width=459&height=417&auto=webp&format=webp&dpr=1&quality=75&fit=crop&resize-filter=bilinear"
          alt="image"
        />
      </div>
      <div className="flex flex-col justify-between">
        <h2 className="text-4xl text-black font-bold">
          {tripData?.trip.trip_name}
        </h2>
        <div className="flex flex-col md:flex-row gap-5 pt-5 w-full items-center">
          <div className="flex flex-col sm:flex-row gap-2 w-full lg:gap-8">
            <div className="flex justify-center items-center rounded-full bg-gray-100 text-gray-600 py-2 px-5">
              No Of Traveler: 5 to 10 People
            </div>
            <div className="flex justify-center items-center rounded-full bg-gray-100 text-gray-600 py-2 px-5">
              Budget:
            </div>
            <div className="flex justify-center items-center rounded-full bg-gray-100 text-gray-600 py-2 px-5">
              Days:{tripData?.trip.no_of_days}
            </div>
          </div>
          <div className="">
            <Button>
              <IoIosSend className="w-10 h-9" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripHero;
