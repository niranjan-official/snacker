import Tab from "@/components/shared/Tab";
import React, { Suspense } from "react";
import Loading from "./loading";
import { Toaster } from "@/components/ui/sonner"

const layout = ({ children }) => {
  return (
    <div className="flex bg-dark-200 text-white">
      <Suspense fallback={<Loading />}>{children}</Suspense>
      <Tab />
      <Toaster />
    </div>
  );
};

export default layout;
