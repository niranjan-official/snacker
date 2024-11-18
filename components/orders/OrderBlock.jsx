"use client";
import React, { useEffect, useState, useRef } from "react";
import QRCode from "react-qr-code";
import { toPng } from "html-to-image";
import ViewDetails from "./ViewDetails";
import { GoClockFill } from "react-icons/go";
import { FaCalendarAlt } from "react-icons/fa";
import { formatDateToYYYYMMDD, formatTimeTo12Hour } from "@/helpers/GetOrders";

const OrderBlock = ({ id, amount, timeStamp, status, products }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const qrRef = useRef(null);

  useEffect(() => {
    const formattedDate = formatDateToYYYYMMDD(timeStamp);
    const formattedTime = formatTimeTo12Hour(timeStamp);
    setDate(formattedDate);
    setTime(formattedTime);
  }, [timeStamp]);

  const handleDownloadQR = () => {
    if (qrRef.current === null) {
      return;
    }

    toPng(qrRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `qr-code-${id}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("Failed to download QR code image", err);
      });
  };

  return (
    <div className="flex flex-col max-w-full items-center rounded-lg bg-dark-100 p-4 text-neutral-50 shadow-lg">
      <div className="flex w-full items-center md:justify-center gap-4">
        <div ref={qrRef} className="rounded-md bg-white p-2">
          <QRCode size={100} value={id} viewBox={`0 0 256 256`} />
        </div>
        <div className="flex flex-col gap-2 justify-center">
          <p className="text-sm flex items-center gap-2">
            <FaCalendarAlt size={18} /> {date}
          </p>
          <p className="text-sm flex items-center gap-2">
            <GoClockFill size={18} /> {time}
          </p>
          <p className="text-sm flex items-center gap-2">
            Amount: ₹{amount}
          </p>
          <p
            className={`text-sm border rounded-[0.5rem] p-1 px-3 ${status === "completed" ? "text-green-500 border-green-500" : "text-yellow-500 border-yellow-500"}`}
          >
            Order {status}
          </p>
        </div>
      </div>
      <div className="mt-4 flex w-full justify-center sm:gap-4 max-sm:justify-between">
        <ViewDetails
          id={id}
          amount={amount}
          timeStamp={timeStamp}
          status={status}
          products={products}
        />
        <button
          className="rounded-lg bg-green-500 px-4 py-2 font-semibold text-neutral-50 hover:bg-green-400"
          onClick={handleDownloadQR}
        >
          Download QR
        </button>
      </div>
    </div>
  );
};

export default OrderBlock;
