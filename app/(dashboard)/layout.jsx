import Tab from "@/components/Tab";
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
