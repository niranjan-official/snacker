import React from "react";
import QRCode from "react-qr-code";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ViewDetails = ({ id, amount, timeStamp, status, products }) => {
  function formatDateTime(date) {
    let newDate = new Date(date.seconds * 1000);
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, "0");
    const day = String(newDate.getDate()).padStart(2, "0");
    const hours = String(newDate.getHours()).padStart(2, "0");
    const minutes = String(newDate.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  const formattedDate = formatDateTime(timeStamp);

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <button className="rounded-lg bg-blue-500 px-4 py-2 font-semibold text-neutral-50 hover:bg-blue-400">
            View Details
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-lg rounded-lg border-0 bg-dark-100 p-6 text-neutral-50 shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              Order Details
            </DialogTitle>
            <DialogDescription className="mt-2 text-sm text-neutral-300">
              Here are the details of your order.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex flex-col items-center gap-4">
            <div className="rounded-md bg-white p-2">
              <QRCode size={180} value={id} viewBox={`0 0 256 256`} />
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm font-bold">
                Order ID: <span className="text-xs text-primary">{id}</span>
              </p>
              <p className="text-sm">Date: {formattedDate}</p>
              <p className="text-sm">Amount: ₹ {amount} INR</p>
              <p
                className={`text-sm ${status === "completed" ? "text-green-500" : "text-yellow-500"}`}
              >
                Status: {status}
              </p>
            </div>
            <div className="mt-4 w-full">
              <h3 className="text-md font-semibold">Products</h3>
              <ul className="mt-2 space-y-2">
                {products.map((product, index) => (
                  <li key={index} className="flex justify-between text-sm">
                    <span>
                      {product?.name} ( {product?.subtitle} )
                    </span>
                    <span>
                      {product?.count} x ₹{product?.price}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 border-t border-neutral-700 pt-2 text-right">
                <p className="text-sm font-bold">Total: ₹ {amount} INR</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewDetails;
