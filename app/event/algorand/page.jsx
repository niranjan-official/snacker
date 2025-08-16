"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const EventPaymentPage = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const baseAmount = 1; // Registration amount
  const platformFee = (baseAmount * 2.36) / 100; // 2.36% platform fee
  const totalAmount = baseAmount + platformFee;

  useEffect(() => {
    if (email) {
      fetchStudentData();
    }
  }, [email]);

  const fetchStudentData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/event/algorand/student?email=${encodeURIComponent(email)}`);
      const data = await response.json();
      
      if (data.success) {
        setStudentData(data.student);
      } else {
        setError(data.error || 'Failed to fetch student data');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!studentData) return;

    setPaymentLoading(true);
    try {
      // Create order
      const orderResponse = await fetch('/api/event/algorand/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: studentData.email,
          name: studentData.name,
          regNo: studentData.regNo,
          hasRegNo: studentData.hasRegNo,
          year: studentData.year,
          batch: studentData.batch,
          foodPreference: studentData.foodPreference,
          amount: totalAmount * 100, // Convert to paise (matching main app pattern)
        }),
      });

      const orderData = await orderResponse.json();
      
      if (!orderData.success) {
        throw new Error(orderData.error || 'Failed to create order');
      }

      // Initialize Razorpay (matching main app pattern)
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY_ID,
        amount: orderData.amount,
        currency: 'INR',
        name: 'Algorand Event Registration',
        description: `Registration for ${studentData.name}`,
        order_id: orderData.orderId,
        notes: {
          email: studentData.email,
          name: studentData.name,
          regNo: studentData.regNo || '',
          hasRegNo: studentData.hasRegNo,
          year: studentData.year,
          batch: studentData.batch,
          foodPreference: studentData.foodPreference,
          eventType: 'algorand',
        },
        handler: function (response) {
          // Payment successful - webhook will handle status update
          alert('Payment successful! Your registration is confirmed.');
          window.location.reload();
        },
        prefill: {
          name: studentData.name,
          email: studentData.email,
        },
        theme: {
          color: '#0D0D0D', // Matching main app theme
        },
        retry: {
          enabled: false, // Matching main app setting
        },
        modal: {
          ondismiss: function() {
            setPaymentLoading(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        alert('Payment failed. Please try again.');
        setPaymentLoading(false);
      });
      rzp.open();
      
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed: ' + error.message);
    } finally {
      setPaymentLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-white animate-spin mx-auto mb-4" />
          <p className="text-white">Loading student information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Error</h1>
          <p className="text-gray-300 mb-4">{error}</p>
          <p className="text-sm text-gray-500">Please check the URL or contact support.</p>
        </div>
      </div>
    );
  }

  if (!studentData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Student Not Found</h1>
          <p className="text-gray-300">No student found with the provided email.</p>
        </div>
      </div>
    );
  }

  if (studentData.payment_status === 'success') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Payment Successful!</h1>
          <p className="text-gray-300 mb-4">Your registration for Algorand event is confirmed.</p>
          <div className="bg-gray-900 p-4 rounded-lg text-left">
            <p className="text-white font-semibold">Registration Details:</p>
            <p className="text-gray-300 text-sm">Name: {studentData.name}</p>
            <p className="text-gray-300 text-sm">Email: {studentData.email}</p>
            {studentData.regNo && <p className="text-gray-300 text-sm">Reg No: {studentData.regNo}</p>}
            <p className="text-gray-300 text-sm">Year: {studentData.year}</p>
            <p className="text-gray-300 text-sm">Batch: {studentData.batch}</p>
            <p className="text-gray-300 text-sm">Food Preference: {studentData.foodPreference}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <motion.h1 
            className="text-4xl font-bold text-center mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Algorand Event Registration
          </motion.h1>
          <motion.p 
            className="text-center text-gray-400 text-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Complete your registration by making the payment
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Student Information */}
          <motion.div 
            className="bg-gray-900 p-6 rounded-lg border border-gray-800"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">Student Information</h2>
            <div className="space-y-3">
              <div>
                <label className="text-gray-400 text-sm">Full Name</label>
                <p className="text-white font-medium">{studentData.name}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Email</label>
                <p className="text-white font-medium">{studentData.email}</p>
              </div>
              {studentData.regNo && (
                <div>
                  <label className="text-gray-400 text-sm">Registration Number</label>
                  <p className="text-white font-medium">{studentData.regNo}</p>
                </div>
              )}
              <div>
                <label className="text-gray-400 text-sm">Year</label>
                <p className="text-white font-medium">{studentData.year}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Batch</label>
                <p className="text-white font-medium">{studentData.batch}</p>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Food Preference</label>
                <p className="text-white font-medium">{studentData.foodPreference}</p>
              </div>
            </div>
          </motion.div>

          {/* Payment Summary */}
          <motion.div 
            className="bg-gray-900 p-6 rounded-lg border border-gray-800"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-green-400">Payment Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Registration Fee</span>
                <span className="text-white">₹{baseAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Platform Fee (2.36%)</span>
                <span className="text-white">₹{platformFee.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-700 pt-3">
                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-white">Total Amount</span>
                  <span className="text-green-400">₹{totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={paymentLoading || studentData.payment_status === 'success'}
              className={`w-full mt-6 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                studentData.payment_status === 'success'
                  ? 'bg-green-600 text-white cursor-not-allowed'
                  : paymentLoading
                  ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-105'
              }`}
            >
              {paymentLoading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Processing...
                </div>
              ) : studentData.payment_status === 'success' ? (
                'Payment Completed'
              ) : (
                'Proceed to Payment'
              )}
            </button>

            {studentData.payment_status === 'pending' && (
              <p className="text-yellow-400 text-sm text-center mt-3">
                Payment Status: Pending
              </p>
            )}
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div 
          className="mt-8 bg-gray-900 p-6 rounded-lg border border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-xl font-semibold mb-3 text-purple-400">Important Information</h3>
          <ul className="text-gray-300 space-y-2 text-sm">
            <li>• Payment is processed securely through Razorpay</li>
            <li>• You will receive a confirmation email after successful payment</li>
            <li>• Please keep your payment receipt for reference</li>
            <li>• For any issues, contact the event organizers</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default EventPaymentPage;