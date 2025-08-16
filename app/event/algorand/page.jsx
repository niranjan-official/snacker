"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  AlertCircle,
  Loader2,
  CreditCard,
  User,
  Calendar,
} from "lucide-react";
import { Spotlight } from "@/components/algorand/spotlight-new";
import { DotBackground } from "@/components/algorand/DotBackground";
import LoadingScreen from "@/components/algorand/LoadingScreen";

const EventPaymentPage = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const baseAmount = 1;
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
      const response = await fetch(
        `/api/event/algorand/student?email=${encodeURIComponent(email)}`,
      );
      const data = await response.json();

      if (data.success) {
        setStudentData(data.student);
      } else {
        setError(data.error || "Failed to fetch student data");
      }
    } catch (err) {
      setError("Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!studentData) return;

    setPaymentLoading(true);
    try {
      const orderResponse = await fetch("/api/event/algorand/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
        throw new Error(orderData.error || "Failed to create order");
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY_ID,
        amount: orderData.amount,
        currency: "INR",
        name: "Algorand Event Registration",
        description: `Registration for ${studentData.name}`,
        order_id: orderData.orderId,
        notes: {
          email: studentData.email,
          name: studentData.name,
          regNo: studentData.regNo || "",
          hasRegNo: studentData.hasRegNo,
          year: studentData.year,
          batch: studentData.batch,
          foodPreference: studentData.foodPreference,
          eventType: "algorand",
        },
        handler: function (response) {
          alert("Payment successful! Your registration is confirmed.");
          window.location.reload();
        },
        prefill: {
          name: studentData.name,
          email: studentData.email,
        },
        theme: {
          color: "#0D0D0D",
        },
        retry: {
          enabled: false,
        },
        modal: {
          ondismiss: function () {
            setPaymentLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        alert("Payment failed. Please try again.");
        setPaymentLoading(false);
      });
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed: " + error.message);
    } finally {
      setPaymentLoading(false);
    }
  };

  if (loading) {
    return <LoadingScreen onLoadingComplete={() => setLoading(false)} />;
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md text-center"
        >
          <div className="relative mb-6">
            <AlertCircle className="mx-auto h-16 w-16 text-red-400" />
            <div className="absolute inset-0 rounded-full bg-red-400/20 blur-xl" />
          </div>
          <h1 className="mb-3 text-2xl font-bold text-white">Error</h1>
          <p className="mb-6 text-white/60">{error}</p>
          <p className="text-sm text-white/40">
            Please check the URL or contact support.
          </p>
        </motion.div>
      </div>
    );
  }

  if (!studentData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md text-center"
        >
          <div className="relative mb-6">
            <AlertCircle className="mx-auto h-16 w-16 text-yellow-400" />
            <div className="absolute inset-0 rounded-full bg-yellow-400/20 blur-xl" />
          </div>
          <h1 className="mb-3 text-2xl font-bold text-white">
            Student Not Found
          </h1>
          <p className="text-white/60">
            No student found with the provided email.
          </p>
        </motion.div>
      </div>
    );
  }

  if (studentData.payment_status === "success") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black p-6 overflow-hidden">
        <DotBackground shadow>
          <Spotlight className="max-sm:hidden" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 max-w-md text-center"
          >
            <div className="relative mb-8">
              <CheckCircle className="mx-auto h-20 w-20 text-green-400" />
              <div className="absolute inset-0 rounded-full bg-green-400/20 blur-2xl" />
            </div>
            <h1 className="mb-4 bg-gradient-to-b from-white to-white/60 bg-clip-text text-3xl font-bold text-transparent">
              Payment Successful!
            </h1>
            <p className="mb-8 text-white/60">
              Your registration for Algorand event is confirmed.
            </p>

                         <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm text-left"
             >
               <h3 className="mb-6 flex items-center gap-2 font-semibold text-white">
                 <User className="h-5 w-5" />
                 Registration Details
               </h3>
               <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm text-white/60">Full Name</label>
                    <p className="font-medium text-white">{studentData.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-white/60">Email</label>
                    <p className="truncate font-medium text-white">
                      {studentData.email}
                    </p>
                  </div>
                </div>

                {studentData.regNo && (
                  <div>
                    <label className="text-sm text-white/60">
                      Registration Number
                    </label>
                    <p className="font-medium text-white">
                      {studentData.regNo}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-white/60">Year</label>
                    <p className="font-medium text-white">{studentData.year}</p>
                  </div>
                  <div>
                    <label className="text-sm text-white/60">Batch</label>
                    <p className="font-medium uppercase text-white">
                      {studentData.batch}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-white/60">
                    Food Preference
                  </label>
                  <p className="font-medium text-white">
                    {studentData.foodPreference}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </DotBackground>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden bg-black text-white">
      <DotBackground shadow>
        <Spotlight className="max-sm:hidden" />

        <div className="relative z-10 flex min-h-screen items-center justify-center p-6">
                     <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="w-full max-w-2xl"
           >
             {/* Payment Summary Card */}
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
             >
               <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-white">
                 <CreditCard className="h-5 w-5" />
                 Payment Summary
               </h2>

               <div className="mb-8 space-y-4">
                 <div className="flex items-center justify-between">
                   <span className="text-white/60">Registration Fee</span>
                   <span className="text-white">₹{baseAmount.toFixed(2)}</span>
                 </div>
                 <div className="flex items-center justify-between">
                   <span className="text-white/60">Platform Fee (2.36%)</span>
                   <span className="text-white">₹{platformFee.toFixed(2)}</span>
                 </div>
                 <div className="border-t border-white/10 pt-4">
                   <div className="flex items-center justify-between text-lg font-semibold">
                     <span className="text-white">Total Amount</span>
                     <span className="text-green-400">
                       ₹{totalAmount.toFixed(2)}
                     </span>
                   </div>
                 </div>
               </div>

               <motion.button
                 onClick={handlePayment}
                 disabled={
                   paymentLoading || studentData.payment_status === "success"
                 }
                 whileHover={{ scale: 1.02 }}
                 whileTap={{ scale: 0.98 }}
                 className={`w-full rounded-xl px-6 py-4 font-semibold transition-all duration-200 ${
                   studentData.payment_status === "success"
                     ? "cursor-not-allowed border border-green-400/20 bg-green-600/20 text-green-400"
                     : paymentLoading
                       ? "cursor-not-allowed bg-white/10 text-white/60"
                       : "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:from-blue-700 hover:to-purple-700 hover:shadow-xl"
                 }`}
               >
                 {paymentLoading ? (
                   <div className="flex items-center justify-center gap-2">
                     <Loader2 className="h-5 w-5 animate-spin" />
                     Processing...
                   </div>
                 ) : studentData.payment_status === "success" ? (
                   "Payment Completed"
                 ) : (
                   <div className="flex items-center justify-center gap-2">
                     <CreditCard className="h-5 w-5" />
                     Proceed to Payment
                   </div>
                 )}
               </motion.button>
             </motion.div>

             {/* Student Information Card */}
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 }}
               className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
             >
               <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-white">
                 <User className="h-5 w-5" />
                 Student Information
               </h2>
               <div className="space-y-3">
                 <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                   <div>
                     <label className="text-sm text-white/60">Full Name</label>
                     <p className="font-medium text-white">{studentData.name}</p>
                   </div>
                   <div>
                     <label className="text-sm text-white/60">Email</label>
                     <p className="font-medium text-white truncate" title={studentData.email}>
                       {studentData.email}
                     </p>
                   </div>
                 </div>

                 {studentData.regNo && (
                   <div>
                     <label className="text-sm text-white/60">
                       Registration Number
                     </label>
                     <p className="font-medium text-white">
                       {studentData.regNo}
                     </p>
                   </div>
                 )}

                 <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="text-sm text-white/60">Year</label>
                     <p className="font-medium text-white">{studentData.year}</p>
                   </div>
                   <div>
                     <label className="text-sm text-white/60">Batch</label>
                     <p className="font-medium uppercase text-white">
                       {studentData.batch}
                     </p>
                   </div>
                 </div>

                 <div>
                   <label className="text-sm text-white/60">
                     Food Preference
                   </label>
                   <p className="font-medium text-white">
                     {studentData.foodPreference}
                   </p>
                 </div>
               </div>
                           </motion.div>
            </motion.div>
          </div>
        </DotBackground>
      </div>
    );
  };

  export default EventPaymentPage;
