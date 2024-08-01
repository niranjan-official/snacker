import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen bg-dark-100 p-8 text-white">
      <h1 className="mb-6 text-3xl font-bold">Snacker</h1>
      <nav className="mb-8 flex flex-col gap-2">
        <div className="flex w-full flex-col gap-2">
          <hr />
          <Link href="/terms/privacy" className="text-blue-500 hover:underline">
            • Privacy Policy
          </Link>
        </div>
        <div className="flex w-full flex-col gap-2">
          <hr />
          <Link
            href="/terms/conditions"
            className="text-blue-500 hover:underline"
          >
            • Terms and Conditions
          </Link>
        </div>
        <div className="flex w-full flex-col gap-2">
          <hr />
          <Link href="/terms/refund" className="text-blue-500 hover:underline">
            • Refund Policy
          </Link>
        </div>
        <div className="flex w-full flex-col gap-2">
          <hr />
          <Link href="/terms/shipping" className="text-blue-500 hover:underline">
            • Shipping and Delivery
          </Link>
        </div>
        <div className="flex w-full flex-col gap-2">
          <hr />
          <Link href="/terms/contact" className="text-blue-500 hover:underline">
            • Contact Us
          </Link>
        </div>
        <hr />
      </nav>
    </div>
  );
};

export default page;
