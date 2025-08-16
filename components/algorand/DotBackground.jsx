import React, { ReactNode } from "react";

export function DotBackground({ children, shadow }) {
  return (
    <div
      className={`w-full h-full dark:bg-dot-white/[0.3] bg-dot-black/[0.2] relative flex flex-col items-center justify-center`}
    >
      {/* Radial gradient for the container to give a faded look */}
      {shadow && (
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_60%,black)] md:[mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      )}
      {children}
    </div>
  );
}
