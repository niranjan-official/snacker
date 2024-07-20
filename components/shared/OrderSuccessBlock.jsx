import React, { useEffect, useState } from "react";
import { PiSealCheckFill } from "react-icons/pi";
import QRCode from "react-qr-code";
import { VscLoading } from "react-icons/vsc";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

const OrderSuccessBlock = ({ open, setOpen, QR, data }) => {
  const [date, setDate] = useState("");
  const Router = useRouter();

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = formatDateToYYYYMMDD(currentDate);
    setDate(formattedDate);
  }, []);

  function formatDateToYYYYMMDD(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="rounded-lg border-0 bg-dark-100 text-neutral-50 shadow-lg">
        <AlertDialogHeader className="flex flex-col items-center">
          <div className="mb-2 flex items-center">
            <span className="text-green-500">
              <PiSealCheckFill size={24} />
            </span>
            <AlertDialogTitle className="ml-2 font-medium">
              Order is successful
            </AlertDialogTitle>
          </div>
          <div className="flex flex-col items-center justify-center py-4">
            {!QR ? (
              <Skeleton className="h-[180px] w-[180px] rounded-xl" />
            ) : (
              <div className="flex flex-col items-center">
                <QRCode
                  size={200}
                  style={{ height: "auto", maxWidth: "100%", width: "auto" }}
                  value={QR}
                  viewBox={`0 0 256 256`}
                  className="rounded-md bg-white p-4"
                />
                <p className="mt-2">{QR}</p>
              </div>
            )}
            {!data?.amount ? (
              <VscLoading
                size={30}
                className="mt-5 animate-spin text-dark-200/70"
              />
            ) : (
              <div>
                {/* <p className="mt-2 text-xs text-neutral-300">
                  You can view the QR later in the{" "}
                  <span className="italic">History</span> tab
                </p> */}
                <div className="mt-4 text-center text-sm text-neutral-400">
                  <p>
                    <span className="text-4xl font-bold text-neutral-100">
                      ₹{data.amount}
                    </span>
                  </p>
                  <p>
                    Date:{" "}
                    <span className="font-bold text-neutral-100">{date}</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-col items-center">
          <div className="flex justify-center gap-2">
            <AlertDialogAction
              onClick={() => Router.push("/")}
              disabled={!data?.amount}
              className="rounded-md bg-green-500 px-4 py-2 font-semibold text-neutral-50 shadow hover:bg-green-400"
            >
              Continue to Home
            </AlertDialogAction>
            <AlertDialogAction
              onClick={() => Router.push("/history")}
              disabled={!data?.amount}
              className="rounded-md bg-blue-500 px-4 py-2 font-semibold text-neutral-50 shadow hover:bg-blue-400"
            >
              View Order
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OrderSuccessBlock;
