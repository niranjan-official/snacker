"use client";
import React, { useEffect, useState, useRef } from "react";
import QRCode from "react-qr-code";
import { toPng } from "html-to-image";
import ViewDetails from "./ViewDetails";

const OrderBlock = ({ id, amount, timeStamp, status, products }) => {
  const [date, setDate] = useState("");
  const qrRef = useRef(null);
  console.log(products);

  useEffect(() => {
    const formattedDate = formatDateToYYYYMMDD(timeStamp);
    setDate(formattedDate);
  }, [timeStamp]);

  function formatDateToYYYYMMDD(date) {
    let newDate = new Date(date.seconds * 1000);
    console.log(newDate);
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, "0");
    const day = String(newDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

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
    <div className="flex flex-col items-center rounded-lg bg-dark-100 p-4 text-neutral-50 shadow-lg">
      <div className="flex items-center gap-4">
        <div ref={qrRef} className="rounded-md bg-white p-2">
          <QRCode size={100} value={id} viewBox={`0 0 256 256`} />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-sm font-bold">
            Order ID: <span className="text-xs text-primary">{id}</span>
          </p>
          <p className="text-sm">Date: {date}</p>
          <p className="text-sm">Amount: ₹ {amount} INR</p>
          <p
            className={`text-sm ${status === "completed" ? "text-green-500" : "text-yellow-500"}`}
          >
            Status: {status}
          </p>
        </div>
      </div>
      <div className="mt-4 flex w-full justify-between">
        <ViewDetails id={id} amount={amount} timeStamp={timeStamp} status={status} products={products} />
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
