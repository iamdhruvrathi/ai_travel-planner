import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
    const itinerary = trip?.tripData?.itinerary;

    return (
        <div className="p-4">
            <h2 className="font-bold text-lg mb-5">Places to Visit</h2>

            <div>
                {itinerary?.map((day, index) => (
                    <div key={index} className="mb-8">
                        <h2 className="font-medium text-lg mb-3">{`DAY ${index + 1}`}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                            {Object.values(day).map((place, idx) => (
                                <div key={idx} className='my-3'>
                                    <PlaceCardItem place={place} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PlacesToVisit;
