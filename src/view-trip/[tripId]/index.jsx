import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import PlacesToVisit from "../components/PlacesToVisit";
import Footer from "../components/Footer";

function Viewtrip() {
  const navigate = useNavigate();
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/");
      return;
    }
    tripId && GetTripData();
  }, [tripId, navigate]);

  const GetTripData = async () => {
    const docRef = doc(db, "AITrips", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document:", docSnap.data());
      setTrip(docSnap.data());
    } else {
      console.log("No Such Document");
      toast("No trip Found!");
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
