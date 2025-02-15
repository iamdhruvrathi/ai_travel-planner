import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
  const itinerary = trip?.tripData?.itinerary;

  if (!itinerary || Object.keys(itinerary).length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <p className="text-gray-500">No itinerary available for this trip.</p>
      </div>
    );
  }

  // Sort the keys to ensure days are in order
  const sortedKeys = Object.keys(itinerary).sort((a, b) => {
    const aMatch = a.match(/day(\d+)/i);
    const bMatch = b.match(/day(\d+)/i);

    // If both are days, sort numerically
    if (aMatch && bMatch) {
      return parseInt(aMatch[1]) - parseInt(bMatch[1]);
    }
    // If only a is a day, put it first
    if (aMatch) return -1;
    // If only b is a day, put it first
    if (bMatch) return 1;
    // For non-day keys, maintain alphabetical order
    return a.localeCompare(b);
  });

  return (
    <div className="p-3 sm:p-6 max-w-[1600px] mx-auto">
      <h2 className="font-bold text-xl sm:text-2xl mb-4 sm:mb-8 text-primary">
        Places to Visit
      </h2>
      <div className="space-y-6 sm:space-y-10">
        {sortedKeys.map((key, index) => (
          <div key={index} className="rounded-lg bg-gray-50 p-4 sm:p-6">
            <h3 className="font-semibold text-lg sm:text-xl mb-3 sm:mb-4 text-gray-800">
              {key.match(/day\d+/)
                ? `Day ${key.match(/\d+/)[0]}`
                : key.charAt(0).toUpperCase() + key.slice(1)}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {Array.isArray(itinerary[key]) ? (
                itinerary[key].map((place, idx) => (
                  <PlaceCardItem key={idx} place={place} />
                ))
              ) : (
                <PlaceCardItem place={itinerary[key]} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
