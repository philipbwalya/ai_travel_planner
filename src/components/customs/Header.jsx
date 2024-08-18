import React from "react";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <div className="flex items-center justify-between py-2 px-5 sticky max-w-7xl top-0 mx-auto shadow-sm">
      <img src="/logoipsum-223.svg" alt="" />
      <Button>SignIn</Button>
    </div>
  );
};

export default Header;
