import React from 'react';

const page = () => {
  return (
    <div className="p-8 bg-dark-100 text-white">
      <h1 className="text-3xl font-bold mb-6">Snacker</h1>
      <nav className=" flex flex-col mb-8">
        <a href="#privacy" className="text-blue-500 hover:underline">Privacy Policy</a>
        <a href="#terms" className="text-blue-500 hover:underline">Terms and Conditions</a>
        <a href="#refund" className="text-blue-500 hover:underline">Refund Policy</a>
        <a href="#contact" className="text-blue-500 hover:underline">Contact Us</a>
      </nav>

      <section id="privacy" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
        <p className="mb-2">1. When you purchase something from our store, we collect personal information such as your name, address, and email address.</p>
        <p className="mb-2">2. We automatically receive your computer’s IP address to provide us with information about your browser and operating system.</p>
        <p className="mb-2">3. With your permission, we may send you emails about our store, new products, and other updates.</p>
        <p className="mb-2">4. We use cookies to maintain your session. These cookies do not personally identify you on other websites.</p>
        <p className="mb-2">5. To protect your personal information, we take reasonable precautions and follow industry best practices to ensure it is not lost, misused, accessed, disclosed, altered, or destroyed.</p>
      </section>

      <section id="terms" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Terms and Conditions</h2>
        <p className="mb-2">1. By using this site, you agree to our terms and conditions.</p>
        <p className="mb-2">2. You must be the age of majority in your state or province to use this site.</p>
        <p className="mb-2">3. We reserve the right to modify these terms at any time. Changes will take effect immediately upon posting on the website.</p>
        <p className="mb-2">4. If our store is acquired or merged, your information may be transferred to the new owners.</p>
        <p className="mb-2">5. We may share your information with third-party service providers to perform services on our behalf, such as payment processing and customer service.</p>
      </section>

      <section id="refund" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Refund Policy</h2>
        <p className="mb-2">We do not provide refunds. In case of any issues, please connect with us using the contact details below.</p>
      </section>

      <section id="contact" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="mb-3">If you have any questions, concerns, or comments about our policies, you can contact us at:</p>
        <p className="">Mail: <a href="mailto:vineethkv7736@gmail.com" className="text-blue-500 hover:underline">vineethkv7736@gmail.com</a></p>
        <p className="mb-3">Phno: : <a href="#" className="text-blue-500 hover:underline">+91 7736384652</a></p>
        <p className="mb-2">Providence college of Engineering, Ala, Chengannur, Alappuzha District 689122, Kerala</p>
      </section>
    </div>
  );
};

export default page;
