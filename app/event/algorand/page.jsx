"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Loader2, CreditCard, User, Calendar } from 'lucide-react';
import { Spotlight } from '@/components/algorand/spotlight-new';
import { DotBackground } from '@/components/algorand/DotBackground';
import LoadingScreen from '@/components/algorand/LoadingScreen';

const EventPaymentPage = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const baseAmount = 50;
  const platformFee = (baseAmount * 2.36) / 100;
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
          amount: totalAmount * 100,
        }),
      });

      const orderData = await orderResponse.json();
      
      if (!orderData.success) {
        throw new Error(orderData.error || 'Failed to create order');
      }

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
          alert('Payment successful! Your registration is confirmed.');
          window.location.reload();
        },
        prefill: {
          name: studentData.name,
          email: studentData.email,
        },
        theme: {
          color: '#0D0D0D',
        },
        retry: {
          enabled: false,
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
      <LoadingScreen onLoadingComplete={() => setLoading(false)} />
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="relative mb-6">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto" />
            <div className="absolute inset-0 bg-red-400/20 rounded-full blur-xl" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">Error</h1>
          <p className="text-white/60 mb-6">{error}</p>
          <p className="text-sm text-white/40">Please check the URL or contact support.</p>
        </motion.div>
      </div>
    );
  }

  if (!studentData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="relative mb-6">
            <AlertCircle className="w-16 h-16 text-yellow-400 mx-auto" />
            <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-xl" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">Student Not Found</h1>
          <p className="text-white/60">No student found with the provided email.</p>
        </motion.div>
      </div>
    );
  }

  if (studentData.payment_status === 'success') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <DotBackground shadow>
          <Spotlight className="max-sm:hidden" />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md relative z-10"
          >
            <div className="relative mb-8">
              <CheckCircle className="w-20 h-20 text-green-400 mx-auto" />
              <div className="absolute inset-0 bg-green-400/20 rounded-full blur-2xl" />
            </div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-4">
              Payment Successful!
            </h1>
            <p className="text-white/60 mb-8">Your registration for Algorand event is confirmed.</p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-left"
            >
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <User className="w-4 h-4" />
                Registration Details
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60">Name:</span>
                  <span className="text-white">{studentData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Email:</span>
                  <span className="text-white truncate">{studentData.email}</span>
                </div>
                {studentData.regNo && (
                  <div className="flex justify-between">
                    <span className="text-white/60">Reg No:</span>
                    <span className="text-white">{studentData.regNo}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-white/60">Year:</span>
                  <span className="text-white">{studentData.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Batch:</span>
                  <span className="text-white">{studentData.batch}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Food:</span>
                  <span className="text-white">{studentData.foodPreference}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </DotBackground>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <DotBackground shadow>
        <Spotlight className="max-sm:hidden" />
        
        <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl"
          >
            {/* Student Information Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-6"
            >
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <User className="w-5 h-5" />
                Student Information
              </h2>
                             <div className="space-y-3">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                   <div>
                     <label className="text-white/60 text-sm">Full Name</label>
                     <p className="text-white font-medium">{studentData.name}</p>
                   </div>
                   <div>
                     <label className="text-white/60 text-sm">Email</label>
                     <p className="text-white font-medium">{studentData.email}</p>
                   </div>
                 </div>
                 
                 {studentData.regNo && (
                   <div>
                     <label className="text-white/60 text-sm">Registration Number</label>
                     <p className="text-white font-medium">{studentData.regNo}</p>
                   </div>
                 )}
                 
                 <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="text-white/60 text-sm">Year</label>
                     <p className="text-white font-medium">{studentData.year}</p>
                   </div>
                   <div>
                     <label className="text-white/60 text-sm">Batch</label>
                     <p className="text-white font-medium uppercase">{studentData.batch}</p>
                   </div>
                 </div>
                 
                 <div>
                   <label className="text-white/60 text-sm">Food Preference</label>
                   <p className="text-white font-medium">{studentData.foodPreference}</p>
                 </div>
               </div>
            </motion.div>

            {/* Payment Summary Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
            >
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Summary
              </h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Registration Fee</span>
                  <span className="text-white">₹{baseAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Platform Fee (2.36%)</span>
                  <span className="text-white">₹{platformFee.toFixed(2)}</span>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span className="text-white">Total Amount</span>
                    <span className="text-green-400">₹{totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <motion.button
                onClick={handlePayment}
                disabled={paymentLoading || studentData.payment_status === 'success'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 ${
                  studentData.payment_status === 'success'
                    ? 'bg-green-600/20 text-green-400 cursor-not-allowed border border-green-400/20'
                    : paymentLoading
                    ? 'bg-white/10 text-white/60 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                }`}
              >
                {paymentLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </div>
                ) : studentData.payment_status === 'success' ? (
                  'Payment Completed'
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Proceed to Payment
                  </div>
                )}
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </DotBackground>
    </div>
  );
};

export default EventPaymentPage;