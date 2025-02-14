import { db } from "@/service/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTripCardItem from "./components/UserTripCardItem";
import Footer from "@/view-trip/components/Footer";

function MyTrips() {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      console.warn("User not found in localStorage. Redirecting...");
      navigate("/");
      return;
    }

    const user = JSON.parse(storedUser);
    console.log("User from Local Storage:", user);

    if (!user?.email) {
      console.error("User email is missing. Redirecting...");
      navigate("/");
      return;
    }

    try {
      const q = query(
        collection(db, "AITrips"),
        where("userEmail", "==", user.email)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No trips found for this user.");
        setUserTrips([]); // Clear trips state
      } else {
        const tripData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched Trips:", tripData);
        setUserTrips(tripData);
      }
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="sm:px-10 md:px-36 lg:px-56 xl:px-72 px-5 mt-10 flex-grow">
        <h2 className="text-3xl font-bold">My Trips</h2>
        <div className="grid grid-cols-2 mt-10 md:grid-cols-3 gap-5">
          {userTrips.length > 0 ? (
            userTrips.map((trip) => (
              <UserTripCardItem key={trip.id} trip={trip} />
            ))
          ) : (
            <p className="text-gray-500">No trips found.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MyTrips;
