import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Image src={"/loading.svg"} width={70} height={70} />
    </div>
  );
};

export default Loading;
