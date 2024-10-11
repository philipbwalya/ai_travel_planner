import { Button } from "../ui/button";

const Header = () => {
  return (
    <div className="sticky w-full top-0 z-20  shadow-sm bg-[#0a0714]">
      <div className="flex items-center justify-between py-2 px-5 max-w-6xl mx-auto">
        <img src="/logoipsum-223.svg" alt="" />
        <Button className="px-6 py-1 bg-[#0e042e] text-[#ffffff] text-xl rounded-full border border-[#7418aa] shadow-lg hover:shadow-2xl transition-all animate-pulse">
          Sign In
        </Button>
      </div>
    </div>
  );
};

export default Header;
