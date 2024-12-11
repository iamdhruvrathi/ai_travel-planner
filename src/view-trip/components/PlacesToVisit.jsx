import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
    const itinerary = trip?.tripData?.itinerary;

    if (!itinerary || Object.keys(itinerary).length === 0) {
        return (
            <p className="text-center text-gray-500 mt-4">
                No itinerary available for this trip.
            </p>
        );
    }

    return (
        <div className="p-4">
            <h2 className="font-bold text-lg mb-5">Places to Visit</h2>
            <div>
                {Object.keys(itinerary).map((key, index) => (
                    <div key={index} className="mb-8">
                        <h2 className="font-medium text-lg mb-3">
                            {key.match(/day\d+/)
                                ? `DAY ${key.match(/\d+/)[0]}`
                                : key.toUpperCase()}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                            <PlaceCardItem place={itinerary[key]} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PlacesToVisit;
