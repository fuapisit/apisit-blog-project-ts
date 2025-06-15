import { FC } from "react";
import heroImage from "../assets/hero-image.jpg";

export const HeroSection: FC = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center px-6 md:px-12 py-16 gap-10 bg-gradient-to-r from-[#f8f9fa] to-[#e9ecef]">
      
      {/* Title and Subtitle */}
      <div className="text-center md:text-left flex-1 space-y-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
          Stay Informed, Stay Inspired
        </h1>
        <p className="text-gray-600 text-base md:text-lg max-w-md md:max-w-lg mx-auto md:mx-0">
          Discover a world of knowledge at your fingertips. Your daily dose of inspiration and information.
        </p>
      </div>

      {/* Hero Image */}
      <div className="flex justify-center flex-1">
        <img
          src={heroImage}
          alt="Hero"
          className="rounded-xl w-[280px] sm:w-[386px] md:w-[450px] lg:w-[529px] object-cover"
        />
      </div>

      {/* Author Card */}
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg text-center flex-1 max-w-xs md:max-w-sm w-full">
        <p className="text-sm text-red-500 mb-1">- Author</p>
        <p className="font-semibold text-gray-800 text-lg">Thompson P.</p>
        <p className="text-sm md:text-base text-gray-500 mt-2">
          I am a pet enthusiast and freelance writer who specializes in animal behavior and care.
          With a deep love for cats, I enjoy sharing insights on feline companionship and wellness.
          When I’m not writing, I spend time volunteering at my local animal shelter, helping cats find loving homes.
        </p>
      </div>

    </section>
  );
};

export default HeroSection;
