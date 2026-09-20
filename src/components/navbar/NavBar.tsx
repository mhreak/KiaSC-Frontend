import React from "react";
import ProfileAvatar from "./ProfileAvatar";

const NavBar = () => {
  return (
    <div className="border-2 border-primary/50 rounded-full my-2 mx-4 p-2 flex flex-1 justify-end">
      <ProfileAvatar />
    </div>
  );
};

export default NavBar;
