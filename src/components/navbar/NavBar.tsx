import ProfileAvatar from "./ProfileAvatar";
import AppBreadcrumb from "../AppBreadcrumb";

const NavBar = () => {
  return (
    <header className="flex flex-row justify-between gap-8 h-fit shrink-0 items-center  rounded-xl px-4 py-3">
      <AppBreadcrumb />
      <ProfileAvatar />
    </header>
  );
};

export default NavBar;
