import { auth, db } from "@/service/firebaseConfig.js";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import PlacesToVisit from "../components/PlacesToVisit";
import Footer from "../components/Footer";

function Viewtrip() {
  const navigate = useNavigate();
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser?.uid) {
        navigate("/");
        return;
      }

      tripId && GetTripData(firebaseUser.uid);
    });

    return () => unsubscribe();
  }, [tripId, navigate]);

  const GetTripData = async (uid) => {
    const docRef = doc(db, "users", uid, "trips", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setTrip(docSnap.data());
    } else {
      toast.error("No trip found.");
    }
  };
  return (
    <div>
      {/* Information Section */}
      <InfoSection trip={trip} />

      {/* Recommended Hotels  */}
      <Hotels trip={trip} />

      {/* Daily Plan */}
      <PlacesToVisit trip={trip} />

      {/* Footer */}
      <Footer trip={trip} />
    </div>
  );
}

export default Viewtrip;
