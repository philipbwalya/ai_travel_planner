import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import TripHero from "@/components/customs/TripHero";
import HotelList from "@/components/customs/HotelList";

const TripDetails = () => {
  const { trip_id } = useParams(); // Retrieve trip_id from the URL
  const [tripData, setTripData] = useState(null);
  console.log("id:", trip_id);

  useEffect(() => {
    // Fetch trip details from the backend
    const fetchTripDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/trips/${trip_id}`
        );
        if (response.status === 200) {
          setTripData(response.data);
        } else {
          toast("Failed to fetch trip details.", { type: "error" });
        }
      } catch (error) {
        console.error("An error occurred while fetching trip details:", error);
        toast("An error occurred while fetching trip details.", {
          type: "error",
        });
      }
    };

    fetchTripDetails();
  }, [trip_id]);
  console.log(tripData);

  if (!tripData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-5 mt-10 max-w-7xl mx-auto mb-10">
      <TripHero tripData={tripData} />
      <div className="mt-10">
        <h3 className="text-2xl font-semibold pb-5">Hotel Recomendations</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tripData?.trip.hotels?.map((hotel, index) => (
            <HotelList key={index} hotel={hotel} />
          ))}
        </ul>
      </div>

      <div className="mt-10">
        <h3 className="text-2xl font-semibold">Itinerary</h3>
        {tripData?.trip.itinerary &&
          Object.keys(tripData?.trip.itinerary).map((day, index) => (
            <div key={index} className="mt-5">
              <h4 className="text-xl font-semibold">{day}</h4>
              <ul>
                {tripData?.trip.itinerary[day].map((item, idx) => (
                  <li key={idx} className="mt-2">
                    <h5 className="text-lg">{item?.place_name}</h5>
                    <p>{item?.place_details}</p>
                    <p>Time: {item?.time}</p>
                    <p>Ticket Pricing: {item?.ticket_pricing}</p>
                    <p>Time to Travel: {item?.time_to_travel}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TripDetails;
