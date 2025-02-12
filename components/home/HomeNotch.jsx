import React from "react";
import UserProfileButton from "./UserProfileButton";
import { HiViewGrid } from "react-icons/hi";
import CreditButton from "./CreditButton";

const HomeNotch = ({ username, id }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <HiViewGrid
          size={30}
          className="rounded-md bg-dark-100 p-1 text-primary"
        />
        <UserProfileButton />
      </div>
      <div className="mt-6 flex w-full items-center justify-between">
        <p>
          Hi{" "}
          <span className="capitalize">
            {username}
            <span className="text-xl">🩷</span>
          </span>
        </p>
        <CreditButton userId={id} />
      </div>
    </>
  );
};

export default HomeNotch;
