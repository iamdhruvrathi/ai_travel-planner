import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { MdOutlineExplore } from "react-icons/md";
import { FaRoute } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import Footer from "@/view-trip/components/Footer";

const Hero = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 max-w-7xl mx-auto mt-6">
        {/* Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-blue-50" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] bg-blue-100 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="flex flex-col items-center gap-6 sm:gap-8 text-center">
          {/* Heading */}
          <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl leading-tight max-w-3xl">
            <span className="text-primary block mb-2">
              Plan Your Trip with AI
            </span>
            <span className="text-gray-800">Smart Travel Made Simple</span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl px-4">
            Let AI create your perfect travel itinerary based on your interests
            and budget.
          </p>

          {/* CTA Button */}
          <Link to="/create-trip">
            <Button
              size="lg"
              className="group bg-primary hover:bg-primary/90 hover:shadow-lg transition-all"
            >
              <MdOutlineExplore className="mr-2 h-5 w-5" />
              Start Planning
            </Button>
          </Link>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-4 w-full px-4">
            {[
              {
                title: "AI-Powered",
                desc: "Smart recommendations for you",
                icon: <MdOutlineExplore className="w-6 h-6 text-primary" />,
              },
              {
                title: "Personalized",
                desc: "Tailored to your preferences",
                icon: <FaRoute className="w-6 h-6 text-blue-600" />,
              },
              {
                title: "Quick & Easy",
                desc: "Complete plans in minutes",
                icon: <IoTimeOutline className="w-6 h-6 text-indigo-600" />,
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <div className="bg-blue-50 rounded-full w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-base sm:text-lg mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Hero;
