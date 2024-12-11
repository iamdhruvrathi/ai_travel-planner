import React from 'react';
import { Link } from 'react-router-dom';

function PlaceCardItem({ place }) {
    if (!place) {
        return <div className="text-gray-500">No data available for this place.</div>;
    }

    return (
        <Link
            to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                place.placeName || 'Unknown Location'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
        >
            <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
                <img
                    src={place.placeImageURL || '/placeholder.jpg'}
                    className="w-[130px] h-[130px] rounded-xl object-cover"
                    alt={place.placeName || 'Place'}
                />
                <div>
                    <h2 className="font-bold text-lg">{place.placeName || 'Unknown Place'}</h2>
                    <p className="text-sm text-gray-400 mb-2">
                        {place.placeDetails || 'No details available.'}
                    </p>
                    <h2 className="text-sm">🕙 {place.time || 'N/A'}</h2>
                    <h2 className="text-sm">⭐ {place.rating || 'Not Rated'}</h2>
                    <h2 className="text-sm">💰 {place.ticketPricing || 'Free'}</h2>
                    <h2 className="text-sm">⏳ {place.duration || 'N/A'}</h2>
                </div>
            </div>
        </Link>
    );
}

export default PlaceCardItem;
