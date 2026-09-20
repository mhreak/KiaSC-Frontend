import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  imageSrc?: string;
  onClick: () => void;
  containerCalassName?: string;
}

const Banner = ({
  imageSrc,
  onClick,
  containerCalassName,
}: Readonly<Props>) => {
  return (
    <div className="flex-center w-full">
      <div
        className={cn("rounded-4xl w-full", containerCalassName)}
        onClick={onClick}
      ></div>
    </div>
  );
};

export default Banner;
