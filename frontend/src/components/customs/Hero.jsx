import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className=" flex flex-col gap-10 items-center mx-3 sm:mx-4 md:mx-6 lg:mx-auto max-w-7xl">
      <h1 className="font-extrabold text-center text-[40px] lg:text-[60px] text-black mt-16">
        <span className="text-[#f56551]">
          Discover Your Next Adventure with AI:
        </span>{" "}
        Personalized Ititneraries at Your Fingertips
      </h1>
      <p className="text-xl text-gray-500 text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
        voluptates ipsum totam. Ipsa blanditiis
      </p>
      <Link to={"/create-trip"} className="flex items-center justify-center">
        {" "}
        <Button>Get Started, It's Free</Button>
      </Link>
    </div>
  );
};

export default Hero;
