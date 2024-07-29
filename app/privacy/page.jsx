import React from 'react';

const page = () => {
  return (
    <div className='min-h-screen flex flex-col bg-dark-100 text-white p-8'>
      <h1 className='text-4xl font-bold mb-4'>Privacy Policy</h1>
      <p className='mb-4'>
        Welcome to the privacy policy page for Snacker. Your privacy is critically important to us. We are committed to protecting your personal information and your right to privacy.
      </p>
      <h2 className='text-2xl font-semibold mb-2'>Information Collection and Use</h2>
      <p className='mb-4'>
        We collect the names of the users to provide a personalized experience. Additionally, Razorpay may collect your mobile number to verify and process transactions. This information is stored securely and is not shared with any third parties.
      </p>
      <h2 className='text-2xl font-semibold mb-2'>Payments</h2>
      <p className='mb-4'>
        We use Razorpay as our payment gateway to process payments. Razorpay is a secure and trusted payment gateway that ensures the safety and security of your payment information. As part of the payment process, Razorpay may collect your mobile number to verify and process the transaction. We do not store any payment details on our servers. All payment processing is handled securely by Razorpay.
      </p>

      <h1 className='text-4xl font-bold mt-8 mb-4'>Terms and Conditions</h1>
      <p className='mb-4'>
        By using Snacker, you agree to abide by our terms and conditions. We reserve the right to update these terms at any time. It is your responsibility to review these terms periodically for any changes.
      </p>
      
      <h1 className='text-4xl font-bold mt-8 mb-4'>Refund Policy</h1>
      <p className='mb-4'>
        No refunds are allowed. If you encounter any issues, please contact our support team for assistance.
      </p>

      <h1 className='text-4xl font-bold mt-8 mb-4'>Contact Details</h1>
      <p>
        If you have any questions about our privacy policy, terms and conditions, or refund policy, please contact us at:
      </p>
      <p className='mb-4'>
        Email: vineethkv7736@gmail.com <br />
        Phone: +91 7736384652 <br />
        Address: Providence college of engineering, Ala, Chengannur, Alappuzha District 689122, Kerala 
      </p>
    </div>
  );
}

export default page;
