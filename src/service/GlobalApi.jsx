import axios from "axios";

const BASE_URL = "https://places.googleapis.com/v1/places:searchText";

export const GetPlaceDetails = async (searchText) => {
  try {
    const response = await axios.post(
      BASE_URL,
      { textQuery: searchText },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
          "X-Goog-FieldMask":
            "places.displayName,places.photos,places.id,places.formattedAddress,places.rating",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("API Error Details:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    return null;
  }
};

export const PHOTO_REF_URL = `https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=800&maxWidthPx=800&key=${
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY
}`;
