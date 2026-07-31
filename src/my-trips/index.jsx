import { auth, db } from "@/service/firebaseConfig.js";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTripCardItem from "./components/UserTripCardItem";
import Footer from "@/view-trip/components/Footer";

function MyTrips() {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser?.uid) {
        navigate("/");
        return;
      }

      GetUserTrips(firebaseUser.uid);
    });

    return () => unsubscribe();
  }, [navigate]);

  const GetUserTrips = async (uid) => {
    try {
      const tripsRef = collection(db, "users", uid, "trips");
      const querySnapshot = await getDocs(tripsRef);

      if (querySnapshot.empty) {
        setUserTrips([]);
      } else {
        const tripData = querySnapshot.docs.map((docSnapshot) => ({
          id: docSnapshot.id,
          ...docSnapshot.data(),
        }));
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
