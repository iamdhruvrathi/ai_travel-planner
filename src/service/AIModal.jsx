import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AT_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '## Las Vegas 3-Day Budget Trip for a Couple (JSON Format)\n\n```json\n{\n  "hotelOptions": [\n    {\n      "hotelName": "The D Las Vegas",\n      "hotelAddress": "301 Fremont Street, Las Vegas, NV 89101",\n      "price": "$50-$100/night",\n      "hotelImageURL": "https://images.trvl-media.com/media/hotels/1000000/90000/89800/89796/7185511c_z.jpg",\n      "geoCoordinates": "36.1699° N, 115.1398° W",\n      "rating": 4.0,\n      "description": "A budget-friendly hotel on Fremont Street with a retro vibe. Features a casino, a rooftop pool, and a lively atmosphere."\n    },\n    {\n      "hotelName": "Golden Nugget Las Vegas",\n      "hotelAddress": "129 E Fremont Street, Las Vegas, NV 89101",\n      "price": "$80-$150/night",\n      "hotelImageURL": "https://images.trvl-media.com/media/hotels/1000000/90000/89800/89796/7185511c_z.jpg",\n      "geoCoordinates": "36.1696° N, 115.1404° W",\n      "rating": 4.5,\n      "description": "A historic hotel with a focus on luxury. Features a renowned shark tank, a casino, and multiple dining options."\n    },\n    {\n      "hotelName": "Circus Circus Hotel & Casino",\n      "hotelAddress": "2880 Las Vegas Blvd S, Las Vegas, NV 89109",\n      "price": "$40-$80/night",\n      "hotelImageURL": "https://images.trvl-media.com/media/hotels/1000000/90000/89800/89796/7185511c_z.jpg",\n      "geoCoordinates": "36.1139° N, 115.1722° W",\n      "rating": 3.5,\n      "description": "A budget-friendly hotel with a circus theme. Features a casino, a midway with carnival games, and multiple restaurants."\n    }\n  ],\n  "itinerary": {\n    "day1": {\n      "name": "Fremont Street Experience",\n      "details": "Explore the lively pedestrian mall with street performers, shops, and the iconic Fremont Street Experience canopy.",\n      "placeImageURL": "https://www.vegasexperience.com/wp-content/uploads/2018/09/FremontStreetExperience-LasVegas.jpg",\n      "geoCoordinates": "36.1699° N, 115.1398° W",\n      "ticketPricing": "Free",\n      "rating": 4.5,\n      "time": "Late afternoon - evening",\n      "duration": "3-4 hours"\n    },\n    "day2": {\n      "name": "Red Rock Canyon National Conservation Area",\n      "details": "Hike through stunning red rock formations, enjoy scenic drives, and capture breathtaking desert landscapes.",\n      "placeImageURL": "https://www.nps.gov/redr/learn/photosmultimedia/red-rock-canyon-web.jpg",\n      "geoCoordinates": "36.1844° N, 115.2410° W",\n      "ticketPricing": "$15 per vehicle",\n      "rating": 4.8,\n      "time": "Morning - early afternoon",\n      "duration": "4-5 hours"\n    },\n    "day3": {\n      "name": "Bellagio Conservatory & Botanical Garden",\n      "details": "Admire the stunning floral displays, themed gardens, and seasonal exhibitions inside the Bellagio.",\n      "placeImageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Bellagio_Conservatory_%28cropped%29.jpg/1280px-Bellagio_Conservatory_%28cropped%29.jpg",\n      "geoCoordinates": "36.1176° N, 115.1721° W",\n      "ticketPricing": "Free",\n      "rating": 4.7,\n      "time": "Afternoon - evening",\n      "duration": "1-2 hours"\n    }\n  },\n  "tips": [\n    "Take advantage of free activities like walking the Strip, enjoying the Bellagio fountains, and visiting the Conservatory.",\n    "Look for discounted show tickets online or through hotel concierge.",\n    "Consider purchasing a discount card for attractions like the High Roller and the Eiffel Tower.",\n    "Pack light and bring a refillable water bottle to save money.",\n    "Eat at off-peak hours and try buffets for affordable meals."\n  ]\n}\n```\n\n**Please note:** Prices and availability can change. This is a suggested itinerary and can be modified based on your interests and preferences. \n',
        },
      ],
    },
  ],
});
