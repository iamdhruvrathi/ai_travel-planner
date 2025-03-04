import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTrip from "./create-trip/index.jsx";
import Header from "./components/custom/Header";
import { Toaster } from "./components/ui/sonner";
import ViewTrip from "./view-trip/[tripId]";
import { GoogleOAuthProvider } from "@react-oauth/google";
import MyTrips from "./my-trips";
import Anlytics from "./Anlytics";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <App />
      </>
    ),
  },
  {
    path: "/create-trip",
    element: (
      <>
        <Header />
        <CreateTrip />
      </>
    ),
  },
  {
    path: "/view-trip/:tripId",
    element: (
      <>
        <Header />
        <ViewTrip />
      </>
    ),
  },
  {
    path: "my-trips",
    element: (
      <>
        <Header />
        <MyTrips />
      </>
    ),
  },
  {
    path: "analytics",
    element: (
      <>
        <Anlytics />
      </>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Toaster />
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
