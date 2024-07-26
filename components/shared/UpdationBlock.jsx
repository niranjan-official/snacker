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
            <div className="w-full flex justify-center">
                <HiMiniWrenchScrewdriver size={150}/>
            </div>
            <AlertDialogTitle className="text-2xl">
              🛑 Maintenance 🛑
            </AlertDialogTitle>
            <AlertDialogDescription className="text-neutral-200 text-lg">
            The payment section is currently under maintenance and yet to be verified by the college. Please check back later.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UpdationBlock;
