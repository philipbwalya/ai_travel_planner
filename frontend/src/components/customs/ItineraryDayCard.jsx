/* eslint-disable react/prop-types */

const ItineraryDayCard = ({ item }) => {
  return (
    <li className="mt-2">
      <h5 className="text-lg">{item?.place_name}</h5>
      <p>{item?.place_details}</p>
      <p>Time: {item?.time}</p>
      <p>Ticket Pricing: {item?.ticket_pricing}</p>
      <p>Time to Travel: {item?.time_to_travel}</p>
    </li>
  );
};

export default ItineraryDayCard;
