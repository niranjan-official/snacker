import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { HiMiniWrenchScrewdriver } from "react-icons/hi2";

const UpdationBlock = ({ onUpdation }) => {
  return (
    <div>
      <AlertDialog open={onUpdation}>
        <AlertDialogContent className="border-0 bg-dark-100 text-white">
          <AlertDialogHeader>
            <div className="flex w-full justify-center">
              <HiMiniWrenchScrewdriver size={150} />
            </div>
            <AlertDialogTitle className="text-2xl">
              🛑 Maintenance 🛑
            </AlertDialogTitle>
            <AlertDialogDescription className="text-lg text-neutral-200">
              The payment section is currently under maintenance. Please check back later.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UpdationBlock;
