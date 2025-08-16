/**
 * Test utility for Algorand Event Integration
 * This file helps verify the setup and can be used for testing
 * 
 * Simplified approach: Only updates payment status, no additional collections
 */

// Test student data structure
export const testStudentData = {
  name: "Test Student",
  email: "test@example.com",
  hasRegNo: "true",
  regNo: "2024CS001",
  year: "2nd Year",
  batch: "CS-A",
  foodPreference: "Vegetarian",
  payment_status: "pending",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// Test order data structure (simplified - no Firestore storage)
export const testOrderData = {
  email: "test@example.com",
  name: "Test Student",
  regNo: "2024CS001",
  hasRegNo: "true",
  year: "2nd Year",
  batch: "CS-A",
  foodPreference: "Vegetarian",
  amount: 5120, // 51.20 in paise (50 + 2.36% fee)
};

// Payment calculation helper
export const calculatePayment = (baseAmount = 50) => {
  const platformFee = (baseAmount * 2.36) / 100;
  const totalAmount = baseAmount + platformFee;
  const totalInPaise = Math.round(totalAmount * 100);
  
  return {
    baseAmount,
    platformFee: parseFloat(platformFee.toFixed(2)),
    totalAmount: parseFloat(totalAmount.toFixed(2)),
    totalInPaise,
  };
};

// Collection names used by the event system (simplified)
export const EVENT_COLLECTIONS = {
  STUDENTS: "algorand-students",
  // No additional collections needed - only payment status updates
};

// API endpoints
export const EVENT_API_ENDPOINTS = {
  STUDENT: "/api/event/algorand/student",
  CREATE_ORDER: "/api/event/algorand/create-order",
  WEBHOOK: "/api/event/algorand/webhook",
};

// Test URL generator
export const generateTestUrl = (email = "test@example.com") => {
  return `/event/algorand?email=${encodeURIComponent(email)}`;
};

// Validation helpers
export const validateStudentData = (data) => {
  const required = ['name', 'email', 'hasRegNo', 'year', 'batch', 'foodPreference'];
  const missing = required.filter(field => !data[field]);
  
  if (missing.length > 0) {
    return {
      isValid: false,
      missing: missing,
      message: `Missing required fields: ${missing.join(', ')}`
    };
  }
  
  return { isValid: true };
};

export const validatePaymentData = (data) => {
  const required = ['email', 'name', 'amount'];
  const missing = required.filter(field => !data[field]);
  
  if (missing.length > 0) {
    return {
      isValid: false,
      missing: missing,
      message: `Missing required fields: ${missing.join(', ')}`
    };
  }
  
  if (data.amount <= 0) {
    return {
      isValid: false,
      message: 'Amount must be greater than 0'
    };
  }
  
  return { isValid: true };
};

// Environment variable check
export const checkEnvironmentVariables = () => {
  const required = [
    'NEXT_PUBLIC_RAZORPAY_API_KEY_ID',
    'RAZORPAY_API_KEY_SECRET'
  ];
  
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    return {
      isValid: false,
      missing: missing,
      message: `Missing environment variables: ${missing.join(', ')}`
    };
  }
  
  return { isValid: true };
};

// Simplified flow description
export const getSimplifiedFlow = () => {
  return {
    description: "Simplified Algorand Event Payment Flow",
    steps: [
      "1. Student visits payment page with email parameter",
      "2. System fetches student data from algorand-students collection",
      "3. Frontend creates Razorpay order via create-order API",
      "4. Razorpay processes payment and calls webhook",
      "5. Webhook updates student's payment_status to 'success'",
      "6. No additional collections created - only status update"
    ],
    collections: {
      used: ["algorand-students"],
      notCreated: ["algorand-orders", "algorand-payments", "algorand-errors"]
    }
  };
};

// Console logging for debugging
export const logEventInfo = (message, data = null) => {
  console.log(`🎉 [ALGORAND EVENT] ${message}`, data || '');
};

export const logEventError = (message, error = null) => {
  console.error(`❌ [ALGORAND EVENT] ${message}`, error || '');
};

export const logEventSuccess = (message, data = null) => {
  console.log(`✅ [ALGORAND EVENT] ${message}`, data || '');
};
