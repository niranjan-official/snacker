import Tab from "@/components/shared/Tab";
import React from "react";

const layout = ({ children }) => {
  return (
    <div className="flex bg-dark-200 text-white">
      {children}
      <Tab />
    </div>
  );
};

export default layout;
