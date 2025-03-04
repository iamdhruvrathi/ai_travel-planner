import React from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

function Anlytics() {
  return (
    <>
      <SpeedInsights />
      <Analytics />
    </>
  );
}

export default Anlytics;
