export const SelectTravelsList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A sole traveler in Exploration",
    icon: "👤",
    people: "1",
  },
  {
    id: 2,
    title: "Couple",
    desc: "A couple in Exploration",
    icon: "👨‍👩‍👧‍👦",
    people: "2",
  },
  {
    id: 3,
    title: "Family",
    desc: "A group of Family in Exploration",
    icon: "👨‍👩‍👦",
    people: "3 to 5 people",
  },
  {
    id: 4,
    title: "Group",
    desc: "A group of Group in Exploration",
    icon: "👨‍👩‍👦",
    people: "5+ people",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay conveniently",
    icon: "💰",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Stay moderately",
    icon: "💰",
  },
  {
    id: 3,
    title: "Expensive",
    desc: "Stay in luxury",
    icon: "✈️",
  },
  {
    id: 4,
    title: "Luxury",
    desc: "Stay in luxury",
    icon: "💰",
  },
];

export const AI_PROMPT = `Generate Travel Plan for location: {location}, for {noOfDays} Days for {traveler} traveller(s) with a {budget} budget, Give me an option list of Hotels with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time to travel each of the location for {noOfDays} days with each day plan with best time to visit in JSON format.Here is just an example of the format, {
  "hotels": [
    {},{},{},{}...
  ],
  "itinerary": {
    "day1": [{},{},{}],
    "day2": [{},{},{}]
    ...
  }
}`;
