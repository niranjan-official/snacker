import React, { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { FaAnglesRight } from "react-icons/fa6";
import Image from "next/image";
import { FaArrowDownLong } from "react-icons/fa6";

const Disclaimer = () => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const hasSeenDisclaimer = localStorage.getItem("hasSeenPwaDisclaimer");
    if (!hasSeenDisclaimer) {
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    localStorage.setItem("hasSeenPwaDisclaimer", "true");
  };

  const renderContent = () => {
    switch (index) {
      case 0:
        return (
          <div className="flex flex-col font-medium">
            <AlertDialogTitle className="text-center text-xl">
              💡 FEATURE UPDATION 💡
            </AlertDialogTitle>
            <p className="mt-4 text-sm text-neutral-200">
              <span className="text-white">
                Tired of Searching for This Website Every Time? &nbsp;
              </span>
              With our PWA feature, you can easily add this website to your home
              screen for quick access — just like a native app!
            </p>
            <Image
              src={"/images/disclaimer/app.jpg"}
              width={300}
              height={100}
              className="mt-3 h-auto w-full px-6"
            />
            <button
              onClick={() => setIndex(1)}
              className="mt-4 flex justify-center items-center p-2 rounded-[0.4rem] gap-2 border bg-transparent font-semibold active:bg-white/10"
            >
              HOW TO INSTALL <FaAnglesRight size={18} />
            </button>
          </div>
        );
      case 1:
        return (
          <div className="flex flex-col font-medium">
            <AlertDialogTitle className="text-center text-xl">
              How to Install App ?
            </AlertDialogTitle>
            <div className="mt-4 text-start">
              <h4 className="font-semibold">For Android</h4>
              <p className="mt-2 text-sm text-neutral-200">
                Open in Chrome → Tap the 3-dot menu → Select "Install App" or
                "Add to Home screen"
              </p>
            </div>
            <Image
              src={"/images/disclaimer/andriod.jpg"}
              width={300}
              height={100}
              className="mt-3 h-auto w-full px-6"
            />
            <button
              onClick={() => setIndex(2)}
              className="mt-4 flex gap-2 justify-center items-center p-2 rounded-[0.4rem] border bg-transparent font-semibold active:bg-white/10"
            >
              NEXT <FaAnglesRight size={18} />
            </button>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col font-medium">
            <AlertDialogTitle className="text-center text-xl">
              How to Install App ?
            </AlertDialogTitle>
            <div className="mt-4 text-start">
              <h4 className="font-semibold">For iOS</h4>
              <p className="mt-2 text-sm text-neutral-200">
                Open in Safari → Tap the Share button → Select "Add to Home
                Screen"
              </p>
            </div>
            <Image
              src={"/images/disclaimer/ios-1.jpg"}
              width={300}
              height={100}
              className="mt-3 h-auto w-full px-6"
            />
            <span className="flex w-full justify-center">
              <FaArrowDownLong
                size={25}
                className="mb-2 mt-4 text-neutral-300"
              />
            </span>
            <Image
              src={"/images/disclaimer/ios-2.jpeg"}
              width={300}
              height={100}
              className="mt-3 h-auto w-full px-6"
            />
            <button
              onClick={handleClose}
              className="mt-4 flex gap-2 justify-center items-center p-2 rounded-[0.4rem] border bg-transparent font-semibold active:bg-white/10"
            >
              CLOSE <FaAnglesRight size={18} />
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="border-0 bg-dark-100 text-white">
          <AlertDialogHeader>{renderContent()}</AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Disclaimer;
