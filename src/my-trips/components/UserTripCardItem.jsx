import React, { useEffect, useState } from "react";
import { GetPlaceDetails } from "@/service/GlobalApi";
import { Link } from "react-router-dom";

const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=" +
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

function UserTripCardItem({ trip }) {
  const [photoUrl, setPhotoUrl] = useState("/img_NA.png");

  useEffect(() => {
    if (trip?.userSelection?.location?.label && photoUrl === "/img_NA.png") {
      GetPlacePhoto();
    }
  }, [trip?.userSelection?.location?.label]);

  const GetPlacePhoto = async () => {
    try {
      const result = await GetPlaceDetails(
        trip?.userSelection?.location?.label
      );

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

  return (
    <Link to={"/view-trip/" + trip?.id}>
      <div className="hover:scale-105 transition-all cursor-pointer h-full flex flex-col bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md">
        <img
          src={photoUrl}
          className="rounded-xl w-full h-40 object-cover"
          alt={trip?.userSelection?.location?.label || "Trip"}
        />
        <div className="my-2 flex flex-col gap-1 ml-2.5">
          <h2 className="font-bold text-lg line-clamp-1">
            {trip?.userSelection?.location?.label || "Unknown Location"}
          </h2>
          <h2 className="text-sm text-gray-500 line-clamp-2">
            {trip?.userSelection?.noOfDays || "?"} days trip with{" "}
            {trip?.userSelection?.budget || "?"} budget
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;
