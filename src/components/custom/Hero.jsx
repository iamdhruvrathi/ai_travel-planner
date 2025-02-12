import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { MdOutlineExplore, MdLocationOn } from "react-icons/md";
import { FaRoute } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";

function Hero() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-orange-100/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        {/* Decorative circles */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-400/10 rounded-full blur-xl" />
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-400/10 rounded-full blur-xl" />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center gap-9 text-center animate-fade-in">
        {/* Main Heading */}
        <h1 className="font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight max-w-4xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400 block mb-2 animate-slide-up">
            Discover Your Next Adventure with AI
          </span>
          <span className="animate-slide-up-delay bg-clip-text text-gray-800">
            Personalized Itineraries at Your Fingertips
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl animate-fade-in-delay">
          Your personal trip planner and travel curator, creating custom
          itineraries tailored to your interests and budget. Let AI transform
          your travel dreams into reality.
        </p>

        {/* CTA Button */}
        <div className="animate-scale-in space-x-4">
          <Link to="/create-trip">
            <Button
              size="lg"
              className="group bg-gradient-to-r from-primary to-orange-400 hover:shadow-lg hover:shadow-orange-400/20 transition-all duration-300"
            >
              <MdOutlineExplore className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              Start Planning Your Trip
            </Button>
          </Link>
        </div>

        {/* Features List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 animate-fade-in-delay w-full">
          {[
            {
              title: "AI-Powered",
              desc: "Smart recommendations based on your preferences",
              icon: <MdOutlineExplore className="w-6 h-6 text-primary" />,
              gradient: "from-primary/10 to-primary/5",
            },
            {
              title: "Personalized",
              desc: "Tailored to your interests and budget",
              icon: <FaRoute className="w-6 h-6 text-purple-600" />,
              gradient: "from-orange-400/10 to-orange-400/5",
            },
            {
              title: "Time-Saving",
              desc: "Complete itineraries in minutes, not hours",
              icon: <IoTimeOutline className="w-6 h-6 text-pink-600" />,
              gradient: "from-primary/10 to-primary/5",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${feature.gradient} backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
            >
              <div className="bg-white/80 rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-4 mt-8 text-sm text-gray-600 animate-fade-in-delay">
          <span className="flex items-center">
            <MdLocationOn className="mr-1" /> 1000+ Destinations
          </span>
          <span>•</span>
          <span>24/7 AI Support</span>
          <span>•</span>
          <span>Instant Planning</span>
        </div>
      </div>
    </div>
  );
}

export default Hero;
