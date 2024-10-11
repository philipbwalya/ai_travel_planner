/* eslint-disable react/prop-types */

import ItineraryDayCard from "./ItineraryDayCard";

const ItineraryCard = ({ tripData, day }) => {
  return (
    <div className="mt-5">
      <h4 className="text-xl font-semibold">{day}</h4>
      <ul>
        {tripData?.trip.itinerary[day].map((item, idx) => (
          <ItineraryDayCard key={idx} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default ItineraryCard;
