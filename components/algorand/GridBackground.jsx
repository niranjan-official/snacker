import SlowFade from "@/Animations/SlowFade";
import React, { ReactNode } from "react";

export function GridBackground({ children, shadow }) {
    return (
        <SlowFade className="w-full h-full">
            <div
                className={`w-full h-full dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex flex-col items-center justify-center`}
            >
                {/* Radial gradient for the container to give a faded look */}
                {shadow && (
                    <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
                )}
                {children}
            </div>
        </SlowFade>
    );
}
