import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative  min-h-screen w-full bg-gradient-to-r from-[#0a0714] via-[#0e0a27] to-[#0a0714]">
      {/* gradient bg */}

      <div className="absolute z-0 w-[30%] h-[25%] top-20 right-20 bg-gradient-to-br blur-3xl from-[#0a0714] via-[#221942] to-[#0a0714]" />
      <div className="absolute z-0 w-[40%] h-[35%] bottom-20 left-20 bg-gradient-to-br blur-3xl from-[#0a0714] via-[#261c4b] to-[#0a0714]" />
      <div className="flex flex-col gap-20 items-center mx-3 sm:mx-4 md:mx-6 lg:mx-auto max-w-7xl bg-gradient-to-r from-[#0a0714] via-[#0e0a27] to-[#0a0714]  py-16 rounded-md z-50">
        {/* Main Heading */}
        <h1 className="font-semibold text-center text-[30px] lg:text-[50px] text-transparent bg-clip-text bg-gradient-to-r from-[#0c9dd9] to-[#662e93] mt-8 z-10">
          AI TRIP PLANNER
        </h1>

        {/* Description */}
        <p className="text-xl text-[#828294] text-center max-w-2xl z-10">
          Experience the future of travel planning with cutting-edge AI. Get
          custom itineraries, explore new destinations, and enjoy stress-free
          trips tailored just for you!
        </p>

        {/* Call to Action */}
        <Link
          to={"/create-trip"}
          className="flex items-center justify-center z-10"
        >
          <Button className="px-6 py-3 bg-[#0e042e] text-[#9c9696] text-xl rounded-full border border-[#901ed3] shadow-lg hover:shadow-2xl transition-all animate-bounce h-14">
            Start Your Journey Now, It&apos;s Free
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
