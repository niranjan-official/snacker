import React from 'react';

const page = () => {
  return (
    <div className='min-h-screen flex flex-col bg-dark-100 text-white p-8'>
      <h1 className='text-4xl font-bold mb-4'>Privacy Policy</h1>
      <p className='mb-4'>
        Welcome to the privacy policy page for Snacker. Your privacy is critically important to us. We are committed to protecting your personal information and your right to privacy.
      </p>
      <h2 className='text-2xl font-semibold mb-2'>About Snacker</h2>
      <p className='mb-4'>
        Snacker is a vending machine system placed on the campus. Users can place orders and make payments via our dedicated web app. After making a payment, a QR code is generated, which can be scanned on the machine to vend the items.
      </p>
      <h2 className='text-2xl font-semibold mb-2'>Information Collection and Use</h2>
      <p className='mb-4'>
        We collect the names of the users to provide a personalized experience. Additionally, Razorpay may collect your mobile number to verify and process transactions. This information is stored securely and is not shared with any third parties.
      </p>
      <h2 className='text-2xl font-semibold mb-2'>Payments</h2>
      <p className='mb-4'>
        We use Razorpay as our payment gateway to process payments. Razorpay is a secure and trusted payment gateway that ensures the safety and security of your payment information. As part of the payment process, Razorpay may collect your mobile number to verify and process the transaction. We do not store any payment details on our servers. All payment processing is handled securely by Razorpay.
      </p>
      <h2 className='text-2xl font-semibold mb-2'>Refund Policy</h2>
      <p className='mb-4'>
        In the event of a refund, the processing time is typically 4 to 5 business days. We strive to handle all refund requests promptly and efficiently. If you have any issues with a refund, please contact our support team for assistance.
      </p>
      <h2 className='text-2xl font-semibold mb-2'>Data Security</h2>
      <p className='mb-4'>
        We take the security of your data seriously. Your name and any other personal information collected are protected using industry-standard security measures. We do not share your personal data with any third parties.
      </p>
      <h2 className='text-2xl font-semibold mb-2'>Changes to This Privacy Policy</h2>
      <p className='mb-4'>
        We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page. You are advised to review this privacy policy periodically for any changes. Changes to this privacy policy are effective when they are posted on this page.
      </p>
      <h2 className='text-2xl font-semibold mb-2'>Contact Us</h2>
      <p>
        If you have any questions about this privacy policy, please contact us at:
      </p>
      <p className='mb-4'>
        Email: vineethkv7736@gmail.com <br />
        Phone: +91 7736384652 <br />
      </p>
    </div>
  );
}

export default page;
