import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { GetPlaceDetails } from "@/service/GlobalApi";
import { ShareTripDialog } from "./ShareTripDialog";

const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=" +
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState("/logo.png");

  useEffect(() => {
    if (trip?.userSelection?.location?.label && photoUrl === "/logo.png") {
      GetPlacePhoto();
    }
  }, [trip?.userSelection?.location?.label]);

  const GetPlacePhoto = async () => {
    try {
      const result = await GetPlaceDetails(trip.userSelection.location.label);

      if (result?.places?.[0]?.photos?.[0]?.name) {
        const photoURL = PHOTO_REF_URL.replace(
          "{NAME}",
          result.places[0].photos[0].name
        );
        setPhotoUrl(photoURL);
      }
    } catch (error) {
      console.error("Error fetching place photo:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-20 lg:px-44">
      <img
        src={photoUrl}
        className="w-full object-cover rounded-xl aspect-[16/9]"
        alt="Trip Cover"
      />
      <div className="flex justify-between items-center mt-5">
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.location?.label || "Unknown Location"}
          </h2>
          <div className="flex gap-5 flex-wrap">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              📅 {trip?.userSelection?.noOfDays || "N/A"} Day
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              💰 {trip?.userSelection?.budget || "N/A"} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              🥂 No. Of Travelers: {trip?.userSelection?.traveller || "N/A"}
            </h2>
          </div>
        </div>
        <div className="flex items-center">
          <ShareTripDialog trip={trip} />
        </div>
      </div>
    </div>
  );
}

export default InfoSection;
