import React from "react";

const page = () => {
  return (
    <div className="shipping-and-delivery min-h-screen bg-dark-100 text-white p-4 md:p-8">
      <h1 className="text-2xl font-bold">Shipping and Delivery</h1>

      <p className="mt-3">
        At Snacker, we believe in instant gratification! Since our system is
        designed for vending machines, we do not offer traditional shipping
        services.
      </p>

      <h2 className="text-xl font-bold mt-4">How It Works</h2>
      <p>
        Our vending machines are strategically placed on campus for easy access.
        Here's how you can get your items:
      </p>
      <ol>
        <li>Browse and select the items you wish to purchase via our app.</li>
        <li>Make the payment using our secure online payment gateway.</li>
        <li>Once the payment is confirmed, a QR code will be generated.</li>
        <li>
          Scan the QR code at the vending machine to dispense your items
          instantly.
        </li>
      </ol>

      <h2 className="text-xl font-bold mt-4">Benefits</h2>
      <ul>
        <li>No waiting time - get your items immediately after payment.</li>
        <li>Convenient locations across campus.</li>
        <li>Easy and secure payment process.</li>
      </ul>

      <h2 className="text-xl font-bold mt-4">Contact Us</h2>
      <p>
        If you encounter any issues or have questions about our vending system,
        please contact our support team:
      </p>
      <p>
        <strong>Email:</strong> niranjansabarinath1521@gmail.com
      </p>
      <p>
        <strong>Phone:</strong> +91-7736223205
      </p>
    </div>
  );
};

export default page;
