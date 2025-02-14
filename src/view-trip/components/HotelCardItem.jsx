import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetPlaceDetails } from "@/service/GlobalApi";

const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=" +
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

function HotelCardItem({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState("/img_NA.png");

  useEffect(() => {
    if (hotel?.hotelName && photoUrl === "/img_NA.png") {
      GetPlacePhoto();
    }
  }, [hotel?.hotelName]);

  const GetPlacePhoto = async () => {
    try {
      const result = await GetPlaceDetails(hotel.hotelName);

      if (result?.places?.[0]?.photos?.[0]?.name) {
        const photoURL = PHOTO_REF_URL.replace(
          "{NAME}",
          result.places[0].photos[0].name
        );
        setPhotoUrl(photoURL);
      }
    } catch (error) {
      console.error("Error fetching hotel photo:", error);
    }
  };

  if (!hotel) {
    return (
      <div className="text-gray-500">No data available for this place.</div>
    );
  }

  return (
    <Link
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(`${hotel?.hotelName} ${hotel?.hotelAddress}`)
      }
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="hover:scale-105 transition-all cursor-pointer h-full flex flex-col bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md">
        <img
          src={photoUrl}
          alt={hotel?.hotelName || "Hotel"}
          className="rounded-xl w-full h-40 object-cover"
        />
        <div className="my-2 flex flex-col gap-1 ml-2.5">
          <h2 className="font-bold text-lg">{hotel?.hotelName}</h2>
          <h2 className="text-sm text-gray-500">📍 {hotel?.hotelAddress}</h2>
          <h2 className="text-sm">💰 {hotel?.price}</h2>
          <h2 className="text-sm">⭐ {hotel?.rating}</h2>
        </div>
      </div>
    </Link>
  );
}

export default HotelCardItem;
