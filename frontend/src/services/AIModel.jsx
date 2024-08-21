/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export async function run() {
  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
      {
        role: "user",
        parts: [
          {
            text: "Generate Travel Plan for location: Las Vegas, for 3 Days for Couple with a Cheap budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time t travel each of the location for 3 days with each day plan with best time to visit in JSON format.\n\n",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: '```json\n{\n  "hotel_options": [\n    {\n      "hotelName": "The D Las Vegas",\n      "hotelAddress": "301 Fremont Street, Las Vegas, NV 89101",\n      "price": "$50-$80 per night",\n      "hotelImageUrl": "https://www.theDlasvegas.com/media/images/hotel-exterior.jpg",\n      "geoCoordinates": "36.1699, -115.1423",\n      "rating": "3.5 stars",\n      "description": "A budget-friendly hotel located in the heart of Fremont Street Experience, offering a casino, restaurants, and a lively atmosphere."\n    },\n    {\n      "hotelName": "The Golden Nugget",\n      "hotelAddress": "129 E Fremont Street, Las Vegas, NV 89101",\n      "price": "$70-$120 per night",\n      "hotelImageUrl": "https://www.goldennugget.com/las-vegas/media/images/hotel-exterior.jpg",\n      "geoCoordinates": "36.1693, -115.1435",\n      "rating": "4 stars",\n      "description": "A historic hotel with a luxurious casino, a shark tank, and various dining options."\n    },\n    {\n      "hotelName": "Circus Circus Hotel & Casino",\n      "hotelAddress": "2880 S Las Vegas Blvd, Las Vegas, NV 89109",\n      "price": "$40-$60 per night",\n      "hotelImageUrl": "https://www.circuscircus.com/media/images/hotel-exterior.jpg",\n      "geoCoordinates": "36.1107, -115.1726",\n      "rating": "3 stars",\n      "description": "A family-friendly hotel known for its circus-themed attractions, including a midway with rides and games."\n    },\n    {\n      "hotelName": "The Strat Hotel, Casino & SkyPod",\n      "hotelAddress": "2000 S Las Vegas Blvd, Las Vegas, NV 89104",\n      "price": "$60-$100 per night",\n      "hotelImageUrl": "https://www.thestrat.com/media/images/hotel-exterior.jpg",\n      "geoCoordinates": "36.1211, -115.1687",\n      "rating": "3.5 stars",\n      "description": "A hotel with an observation deck offering panoramic city views, a casino, restaurants, and a variety of entertainment options."\n    }\n  ],\n  "itinerary": {\n    "day1": {\n      "time": "Morning (9:00 AM - 12:00 PM)",\n      "placeName": "Fremont Street Experience",\n      "placeDetails": "A pedestrian-friendly street with a vibrant atmosphere, featuring live entertainment, shops, restaurants, and the famous canopy of lights.",\n      "placeImageUrl": "https://www.fremontstreetexperience.com/media/images/fremont-street-experience.jpg",\n      "geoCoordinates": "36.1698, -115.1427",\n      "ticketPricing": "Free",\n      "timeToTravel": "2-3 hours"\n    },\n    {\n      "time": "Afternoon (12:00 PM - 3:00 PM)",\n      "placeName": "Pinball Hall of Fame",\n      "placeDetails": "A museum dedicated to pinball machines, featuring over 200 classic and modern pinball games.",\n      "placeImageUrl": "https://www.pinballhalloffame.org/media/images/pinball-hall-of-fame.jpg",\n      "geoCoordinates": "36.1350, -115.1691",\n      "ticketPricing": "$12 per person",\n      "timeToTravel": "1-2 hours"\n    },\n    {\n      "time": "Evening (6:00 PM - 9:00 PM)",\n      "placeName": "The LINQ Promenade",\n      "placeDetails": "An outdoor shopping and dining destination with a high roller observation wheel, restaurants, bars, and live entertainment.",\n      "placeImageUrl": "https://www.caesars.com/linq/media/images/linq-promenade.jpg",\n      "geoCoordinates": "36.1250, -115.1700",\n      "ticketPricing": "Free",\n      "timeToTravel": "2-3 hours"\n    },\n    "day2": {\n      "time": "Morning (9:00 AM - 12:00 PM)",\n      "placeName": "Hoover Dam",\n      "placeDetails": "A massive concrete arch-gravity dam on the Colorado River, offering tours and breathtaking views.",\n      "placeImageUrl": "https://www.nps.gov/hoov/learn/nature/hooverdam.htm",\n      "geoCoordinates": "36.0058, -114.9197",\n      "ticketPricing": "$30 per person",\n      "timeToTravel": "3-4 hours (including travel time)"\n    },\n    {\n      "time": "Afternoon (12:00 PM - 3:00 PM)",\n      "placeName": "Bellagio Conservatory & Botanical Garden",\n      "placeDetails": "A stunning botanical garden inside the Bellagio Hotel, featuring elaborate floral displays and themed exhibits.",\n      "placeImageUrl": "https://www.bellagio.com/media/images/conservatory-botanical-garden.jpg",\n      "geoCoordinates": "36.1146, -115.1724",\n      "ticketPricing": "Free",\n      "timeToTravel": "1-2 hours"\n    },\n    {\n      "time": "Evening (7:00 PM - 10:00 PM)",\n      "placeName": "Free Show on the Strip",\n      "placeDetails": "Various hotels on the Las Vegas Strip offer free shows, such as the Bellagio Fountains, the Wynn Lake of Dreams, or the Mirage Volcano.",\n      "placeImageUrl": "https://www.bellagio.com/media/images/fountains-show.jpg",\n      "geoCoordinates": "Various",\n      "ticketPricing": "Free",\n      "timeToTravel": "1-2 hours"\n    },\n    "day3": {\n      "time": "Morning (9:00 AM - 12:00 PM)",\n      "placeName": "Neon Museum",\n      "placeDetails": "A museum showcasing vintage neon signs from Las Vegas\'s history, offering tours and exhibits.",\n      "placeImageUrl": "https://www.neonmuseum.org/media/images/neon-museum.jpg",\n      "geoCoordinates": "36.1670, -115.1350",\n      "ticketPricing": "$20 per person",\n      "timeToTravel": "1-2 hours"\n    },\n    {\n      "time": "Afternoon (12:00 PM - 3:00 PM)",\n      "placeName": "The Mob Museum",\n      "placeDetails": "A museum dedicated to organized crime and the history of the Mafia in Las Vegas and the United States.",\n      "placeImageUrl": "https://www.themobmuseum.org/media/images/mob-museum.jpg",\n      "geoCoordinates": "36.1700, -115.1450",\n      "ticketPricing": "$25 per person",\n      "timeToTravel": "2-3 hours"\n    },\n    {\n      "time": "Evening (6:00 PM - 9:00 PM)",\n      "placeName": "Dinner at a local restaurant on Fremont Street",\n      "placeDetails": "Enjoy a casual dinner at a restaurant with live music or street performers.",\n      "placeImageUrl": "https://www.fremontstreetexperience.com/media/images/fremont-street-experience.jpg",\n      "geoCoordinates": "36.1698, -115.1427",\n      "ticketPricing": "Varies",\n      "timeToTravel": "2-3 hours"\n    }\n  }\n}\n```\n\n**Notes:**\n\n* This itinerary is just a suggestion, you can customize it based on your interests and preferences.\n* The hotel prices are approximate and may vary depending on the season and availability.\n* You can find cheaper dining options at food trucks, buffets, or casual restaurants.\n* Many attractions in Las Vegas offer free admission during certain hours or days, so be sure to check their websites for deals.\n* Consider purchasing a Las Vegas Strip Pass or a Go City Card for discounted access to multiple attractions.\n* Public transportation is available in Las Vegas, but consider walking or taking a taxi for shorter distances, especially on the Strip.\n* Be sure to drink plenty of water, especially during the summer months, as Las Vegas can be very hot.\n* Remember to gamble responsibly and set a budget before you start.\n\n**Have a fun and memorable trip to Las Vegas!** \n',
          },
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage(
    "Generate Travel Plan for location:  Las Vegas, for -3 Days for 2 traveller(s) with a Moderate budget, Give me an option list of Hotels with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time to travel each of the location for -3 days with each day plan with best time to visit in JSON format."
  );
  console.log(result.response.text());
}

run();
