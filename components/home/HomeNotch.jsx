import React from "react";
import UserProfileButton from "./UserProfileButton";
import { HiViewGrid } from "react-icons/hi";
import CreditButton from "./CreditButton";
import InstallPWA from "../shared/InstallPWA";

const HomeNotch = ({ username, id }) => {

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HiViewGrid
            size={30}
            className="rounded-md bg-dark-100 p-1 text-primary"
          />
          <InstallPWA variant="banner" />
        </div>
        <UserProfileButton />
      </div>
      <div className="mt-6 flex w-full items-center justify-between">
        <p>
          Hi{" "}
          <span className="capitalize">
            {username}
            <span className="text-xl">👋</span>
          </span>
        </p>
        <CreditButton userId={id} />
      </div>
    </>
  );
};

export default HomeNotch;
