import { useEffect, useState } from "react";
// import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "@/components/ui/input";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelsList,
} from "@/constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/services/AIModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateTrip = () => {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handlechange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    // console.log(formData);
  }, [formData]);

  const navigate = useNavigate();

  var tester =
    !formData.budget ||
    !formData.traveler ||
    !formData.location ||
    !formData.noOfDays;

  const generateTrip = async () => {
    if (tester) {
      toast("Please fill in all the fields.", {
        type: "error",
      });
      return;
    }
    setLoading(true);
    toast("Please wait while AI generates your trip!", {
      type: "success",
    });
    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData.location)
      .replace("{noOfDays}", formData.noOfDays)
      .replace("{traveler}", formData.traveler)
      .replace("{budget}", formData.budget)
      .replace("{noOfDays}", formData.noOfDays);
    // console.log(FINAL_PROMPT);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const tripData = result?.response?.text();
      const parsedTripData = JSON.parse(tripData);

      // Send the trip data to Node.js backend
      const createTripResponse = await axios.post(
        "http://localhost:3000/api/trips/",
        {
          trip_name: `Trip to ${formData?.location}`,
          traveler: formData?.traveler,
          budget: formData?.budget,
          location: formData?.location,
          no_of_days: formData?.noOfDays,
          hotels: parsedTripData?.hotels,
          itinerary: parsedTripData?.itinerary,
        }
      );
      if (createTripResponse.status === 201) {
        // After success creation
        const { trip_id } = createTripResponse.data;
        console.log("Trip ID:", trip_id);
        toast("Trip generated successfully!", {
          type: "success",
        });
        // Redirect to the trip details page
        setLoading(false);
        navigate(`/trip-details/${trip_id}`);
      }

      // console.log("hotels:", parsedTripData.hotels);
      // console.log("itinerary:", parsedTripData.itinerary);
    } catch (error) {
      console.error("An error occurred while generating the trip:", error);
      toast("Failed to generate and save the trip.", {
        type: "error",
      });
      setLoading(false);
    }
  };

  return (
    <div className="px-5 mt-10 flex flex-col items-cente justify-center max-w-7xl mx-auto mb-10">
      <h2 className="text-3xl font-bold">Tell us your travel preferences</h2>
      <p className="text-gray-500 text-xl">
        Just provide us with your basic information,and our ai will do the
        rest..
      </p>
      <div className="mt-20 flex flex-col gap-10">
        <div className="">
          <h2 className="text-xl my-3 font-semibold">
            What is the destination of your choice?
          </h2>
          {/* <GooglePlacesAutocomplete apiKey="AIzaSyBwBtLd6NZNRQaayKJwfV6B1UfJpPK3Oqo" /> */}
          <Input
            type="text"
            placeholder="Eg: London"
            id="location"
            onChange={(e) => handlechange("location", e.target.value)}
          />
        </div>
        <div className="min-w-full">
          <h2 className="text-xl my-3 font-semibold">
            What is the days of your choice?
          </h2>
          <Input
            className="w-full"
            type="number"
            placeholder="Eg: 2"
            id="days"
            onChange={(e) => handlechange("noOfDays", e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col mt-10 w-full">
        <h2 className="text-xl my-3 flex justify-start font-semibold">
          What is Your budget?
        </h2>
        <p className="">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
          inventore
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 mt-10 justify-items-center items-center">
          {SelectBudgetOptions.map((item, index) => (
            <div
              className={`border border-gray-100 px-5 py-4 md:px-10 rounded-md shadow-md hover:shadow-2xl cursor-pointer w-[100%] ${
                formData?.budget === item.title && "bg-gray-100"
              }`}
              key={index}
              onClick={(e) => handlechange("budget", item.title)}
            >
              <h2 className="text-4xl flex justify-center pb-4">{item.icon}</h2>
              <h2 className="font-bold text-lg flex justify-center">
                {item.title}
              </h2>
              <h2 className="text-sm text-gray-500 flex justify-center">
                {item.desc}
              </h2>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col mt-10 w-full">
        <h2 className="text-xl my-3 flex justify-start font-semibold">
          Who do you plan to travel with on your next trip?
        </h2>
        <p className="">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
          inventore
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 mt-10 justify-items-center items-center">
          {SelectTravelsList.map((item, index) => (
            <div
              className={`border border-gray-100 px-5 py-4 md:px-10 rounded-md shadow-md hover:shadow-2xl cursor-pointer w-[100%] ${
                formData?.traveler === item.people && "bg-gray-100"
              }`}
              key={index}
              onClick={(e) => handlechange("traveler", item.people)}
            >
              <h2 className="text-4xl flex justify-center pb-4">{item.icon}</h2>
              <h2 className="font-bold text-lg flex justify-center">
                {item.title}
              </h2>
              <h2 className="text-sm text-gray-500 flex justify-center">
                {item.desc}
              </h2>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end my-5 mx-5">
        <Button onClick={generateTrip}>
          {loading ? (
            <AiOutlineLoading3Quarters className="w-7 h-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>
    </div>
  );
};

export default CreateTrip;
