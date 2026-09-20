import React from "react";

interface RequiredLabelProps {
  children: React.ReactNode;
}

const RequiredLabel: React.FC<RequiredLabelProps> = ({ children }) => {
  return (
    <span>
      <span className="text-rose-500">*</span>
      {children}
    </span>
  );
};

export default RequiredLabel;
