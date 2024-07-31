import React from "react";

const page = () => {
  return (
    <div className="contact-us min-h-screen p-4 md:p-8 bg-dark-100 text-white">
      <h1 className="font-bold text-2xl">Contact Us</h1>

      <p className="mt-3">
        We are here to help and answer any questions you may have. Reach out to
        us and we'll respond as soon as we can.
      </p>

      <h2 className="mt-4 font-bold text-xl">Contact Information</h2>
      <p className="mt-3">
        <strong>Email:</strong> niranjansabarinath1521@gmail.com
      </p>
      <p>
        <strong>Address:</strong>
        <br />
        Providence College of Engineering and Scholl of Business
        <br />
        Ala, Chengannur, Alappuzha District, Kerala
      </p>
      <p>
        <strong>Phone:</strong> +91-7736223205
      </p>

      <h2 className="mt-4 font-bold text-xl">Customer Support Hours</h2>
      <p className="mt-3">Our customer support team is available during the following hours:</p>
      <p>
        Monday - Saturday: 9:00 AM - 4:20 PM
        <br />
        Sunday: Closed
      </p>
    </div>
  );
};

export default page;
