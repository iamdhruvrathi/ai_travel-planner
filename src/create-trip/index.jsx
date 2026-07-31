import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelsList,
} from "../constants/options.jsx";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModal.jsx";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/service/firebaseConfig.js";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Footer from "@/view-trip/components/Footer.jsx";
import SignInDialog from "@/components/custom/SignInDialog";

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");

    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;
      const profile = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.displayName,
        picture: firebaseUser.photoURL,
      };

      localStorage.setItem("user", JSON.stringify(profile));
      setOpenDialog(false);
      await OnGenerateTrip();
    } catch (error) {
      console.error("Google sign-in failed:", error);
      toast.error("Failed to sign in. Please try again.");
      setOpenDialog(true);
    }
  };

  const OnGenerateTrip = async () => {
    if (!auth.currentUser?.uid) {
      setOpenDialog(true);
      return;
    }

    if (!formData?.location || !formData?.budget || !formData?.traveller) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (formData?.noOfDays > 5) {
      toast.error("Trip duration cannot exceed 5 days");
      return;
    }

    if (formData?.noOfDays < 0) {
      toast.error("Enter valid trip duration");
      return;
    }

    setLoading(true);
    try {
      const FINAL_PROMPT = AI_PROMPT.replace(
        "{location}",
        formData?.location?.label,
      )
        .replace("{totalDays}", formData?.noOfDays)
        .replace("{traveller}", formData?.traveller)
        .replace("{budget}", formData?.budget)
        .replace("{totalDays}", formData?.noOfDays);
      const result = await chatSession.sendMessage(FINAL_PROMPT);

      try {
        await SaveAiTrip(result?.response?.text());
        console.log(result?.response?.text());
      } catch (error) {
        toast.error("Failed to save trip data. Please try again.");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const SaveAiTrip = async (TripData) => {
    try {
      const currentUser = auth.currentUser;

      if (!currentUser?.uid) {
        throw new Error("You must be signed in to save a trip.");
      }

      const docId = Date.now().toString();
      const tripDoc = {
        userSelection: formData,
        tripData: JSON.parse(TripData),
        userEmail: currentUser?.email || "",
        userId: currentUser.uid,
        id: docId,
        createdAt: new Date().toISOString(),
      };

      await setDoc(doc(db, "users", currentUser.uid, "trips", docId), tripDoc);
      navigate("/view-trip/" + docId);
    } catch (error) {
      console.error("Error saving trip:", error);
      throw error;
    }
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences🏕️🌴
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is your destination of choice?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
            }}
            placeholder="Enter a destination"
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>
          <Input
            placeholder={"Ex. 3"}
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">What is Your Budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                                    ${
                                      formData?.budget === item.title
                                        ? "shadow-lg border-black"
                                        : ""
                                    }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            Who do you plan on traveling with on your next adventure?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelsList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("traveller", item.people)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                                    ${
                                      formData?.traveller === item.people
                                        ? "shadow-lg border-black"
                                        : ""
                                    }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      {loading ? (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg flex flex-col items-center gap-4">
            <AiOutlineLoading3Quarters className="h-10 w-10 animate-spin text-primary" />
            <p className="text-lg font-medium">AI is generating your trip...</p>
          </div>
        </div>
      ) : (
        <div className="my-10 justify-end flex">
          <Button onClick={OnGenerateTrip}>Generate Trip</Button>
        </div>
      )}
      <SignInDialog
        open={openDialog}
        onLogin={login}
        onClose={() => setOpenDialog(false)}
      />
      <Footer />
    </div>
  );
}

export default CreateTrip;
