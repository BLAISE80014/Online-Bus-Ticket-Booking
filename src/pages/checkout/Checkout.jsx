import React, { useState } from "react";
import {
  FaArrowRight,
  FaMobile,
  FaCreditCard,
  FaUniversity,
  FaMoneyBill,
  FaShieldAlt,
  FaCheckCircle,
  FaSpinner,
  FaLock,
  FaKey,
  FaEnvelope,
  FaSms,
  FaWhatsapp,
} from "react-icons/fa";
import { useBooking } from "../../context/BookingContext";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { booking, setPassengerInfo, resetBooking } = useBooking();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({});
  const [processing, setProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const [formData, setFormData] = useState({
    fullname: booking.passengerInfo?.fullname || "",
    email: booking.passengerInfo?.email || "",
    phone: booking.passengerInfo?.phone || "",
    altPhone: booking.passengerInfo?.altPhone || "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setPassengerInfo({ [id]: value });
  };

  const handlePaymentDetailsChange = (e) => {
    const { id, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [id]: value }));
  };

  const validatePassengerInfo = () => {
    if (!formData.fullname || !formData.email || !formData.phone) {
      alert("Please fill in all required fields");
      return false;
    }
    if (booking.selectedSeats.length === 0) {
      alert("Please select at least one seat");
      return false;
    }
    if (!booking.from || !booking.to) {
      alert("Please select departure and arrival locations");
      return false;
    }
    return true;
  };

  // Function to send SMS
  const sendSMS = (phoneNumber, message) => {
    console.log(`Sending SMS to ${phoneNumber}: ${message}`);
    // In real app, this would call an SMS API
    alert(`📱 SMS sent to ${phoneNumber}\n\nMessage: ${message}`);
  };

  // Function to send Email
  const sendEmail = (email, subject, message) => {
    console.log(`Sending email to ${email}: ${subject}`);
    // In real app, this would call an email API
    alert(
      `📧 Email sent to ${email}\n\nSubject: ${subject}\n\nMessage: ${message}`,
    );
  };

  // Process Mobile Money Payment with PIN
  const processMobileMoneyPayment = () => {
    if (!paymentDetails.mobileNumber) {
      alert("Please enter your mobile number");
      return false;
    }
    if (!paymentDetails.provider) {
      alert("Please select your mobile money provider");
      return false;
    }
    setShowPinModal(true);
    return true;
  };

  // Verify PIN and complete payment
  const verifyPinAndPay = () => {
    if (pin.length !== 4) {
      setPinError("PIN must be 4 digits");
      return;
    }

    setPinError("");
    setProcessing(true);
    setShowPinModal(false);
    setPaymentStatus("processing");

    const totalAmount = booking.selectedSeats.length * 750;
    const transactionRef = "TXN" + Math.floor(Math.random() * 1000000000);

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      setPaymentComplete(true);
      setTransactionId(transactionRef);
      setPaymentStatus("success");

      // Send SMS confirmation
      const smsMessage = `✅ BUS BOOKING CONFIRMED!\n\nReference: ${transactionRef}\nRoute: ${booking.from} → ${booking.to}\nSeats: ${booking.selectedSeats.join(", ")}\nAmount: Rs. ${totalAmount}\nPayment: Mobile Money\n\nThank you for choosing us!`;
      sendSMS(paymentDetails.mobileNumber, smsMessage);

      // Send WhatsApp message (simulated)
      const whatsappMessage = `*Bus Booking Confirmation* 🚌\n\nReference: ${transactionRef}\nPassenger: ${formData.fullname}\nRoute: ${booking.from} → ${booking.to}\nDate: ${booking.travelDate}\nTime: ${booking.departTime}\nSeats: ${booking.selectedSeats.join(", ")}\nAmount: Rs. ${totalAmount}\n\nThank you for booking with us!`;
      alert(
        `💬 WhatsApp message sent to ${paymentDetails.mobileNumber}\n\n${whatsappMessage}`,
      );

      // Send Email confirmation
      const emailSubject = `Booking Confirmation - ${transactionRef}`;
      const emailMessage = `
Dear ${formData.fullname},

Your bus booking has been confirmed successfully!

Booking Details:
-----------------
Reference Number: ${transactionRef}
Route: ${booking.from} → ${booking.to}
Date: ${booking.travelDate}
Departure Time: ${booking.departTime}
Selected Seats: ${booking.selectedSeats.join(", ")}
Number of Seats: ${booking.selectedSeats.length}
Total Amount: Rs. ${totalAmount}
Payment Method: Mobile Money (${paymentDetails.provider})
Payment Status: ✅ COMPLETED

Passenger Information:
---------------------
Name: ${formData.fullname}
Email: ${formData.email}
Phone: ${formData.phone}

Important Information:
---------------------
- Please arrive at the bus station 30 minutes before departure
- Present this email or your ID for boarding
- Keep your reference number for any inquiries

Thank you for choosing our service!

Best regards,
Bus Booking Team
      `;
      sendEmail(formData.email, emailSubject, emailMessage);

      // Show success message
      setTimeout(() => {
        alert(
          `✅ PAYMENT SUCCESSFUL!\n\nTransaction ID: ${transactionRef}\nAmount: Rs. ${totalAmount}\n\n📱 SMS sent to ${paymentDetails.mobileNumber}\n📧 Email sent to ${formData.email}\n💬 WhatsApp message sent\n\nThank you for booking with us!`,
        );
        resetBooking();
        navigate("/");
      }, 1500);
    }, 3000);
  };

  // Process Card Payment
  const processCardPayment = () => {
    if (
      !paymentDetails.cardNumber ||
      !paymentDetails.expiry ||
      !paymentDetails.cvv
    ) {
      alert("Please enter complete card details");
      return;
    }

    setProcessing(true);
    setPaymentStatus("processing");

    const totalAmount = booking.selectedSeats.length * 750;
    const transactionRef = "TXN" + Math.floor(Math.random() * 1000000000);

    setTimeout(() => {
      setProcessing(false);
      setPaymentComplete(true);
      setTransactionId(transactionRef);
      setPaymentStatus("success");

      // Send SMS
      sendSMS(
        formData.phone,
        `✅ Booking confirmed! Ref: ${transactionRef} Amount: Rs. ${totalAmount}`,
      );

      // Send Email
      sendEmail(
        formData.email,
        "Booking Confirmation",
        `Your booking ${transactionRef} has been confirmed. Route: ${booking.from} → ${booking.to}`,
      );

      alert(
        `✅ Card Payment Successful!\n\nTransaction ID: ${transactionRef}\nAmount: Rs. ${totalAmount}\n\nConfirmation sent to ${formData.email} and ${formData.phone}`,
      );
      resetBooking();
      navigate("/");
    }, 2500);
  };

  // Process Bank Transfer
  const processBankPayment = () => {
    if (!paymentDetails.accountNumber || !paymentDetails.bankName) {
      alert("Please enter bank account details");
      return;
    }

    setProcessing(true);
    setPaymentStatus("processing");

    const totalAmount = booking.selectedSeats.length * 750;
    const transactionRef = "TXN" + Math.floor(Math.random() * 1000000000);

    setTimeout(() => {
      setProcessing(false);
      setPaymentComplete(true);
      setTransactionId(transactionRef);
      setPaymentStatus("success");

      sendEmail(
        formData.email,
        "Booking Confirmation - Bank Transfer",
        `Your booking ${transactionRef} is confirmed. Please complete the bank transfer within 24 hours.`,
      );

      alert(
        `✅ Booking Confirmed!\n\nTransaction ID: ${transactionRef}\nPlease complete the bank transfer within 24 hours.\n\nConfirmation sent to ${formData.email}`,
      );
      resetBooking();
      navigate("/");
    }, 2000);
  };

  // Process Cash Payment
  const processCashPayment = () => {
    setProcessing(true);

    const totalAmount = booking.selectedSeats.length * 750;
    const transactionRef = "TXN" + Math.floor(Math.random() * 1000000000);

    setTimeout(() => {
      setProcessing(false);
      setPaymentComplete(true);
      setTransactionId(transactionRef);

      sendSMS(
        formData.phone,
        `Booking reserved! Ref: ${transactionRef}. Pay Rs. ${totalAmount} cash at departure.`,
      );
      sendEmail(
        formData.email,
        "Booking Reserved - Cash Payment",
        `Your booking ${transactionRef} is reserved. Please pay Rs. ${totalAmount} in cash at the bus station.`,
      );

      alert(
        `✅ Booking Reserved!\n\nReference: ${transactionRef}\nAmount to pay: Rs. ${totalAmount}\n\nPlease pay cash at the bus station before departure.\n\nConfirmation sent to ${formData.email}`,
      );
      resetBooking();
      navigate("/");
    }, 1500);
  };

  const processPayment = () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    switch (paymentMethod) {
      case "mobile":
        processMobileMoneyPayment();
        break;
      case "card":
        processCardPayment();
        break;
      case "bank":
        processBankPayment();
        break;
      case "cash":
        processCashPayment();
        break;
      default:
        alert("Invalid payment method");
    }
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (validatePassengerInfo()) {
        setStep(2);
      }
    }
  };

  const seatPrice = 750;
  const totalAmount = booking.selectedSeats.length * seatPrice;

  const paymentMethods = [
    {
      id: "mobile",
      name: "Mobile Money",
      icon: FaMobile,
      color: "bg-green-500",
      description: "Pay using MTN, Airtel, or Tigo Money",
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: FaCreditCard,
      color: "bg-blue-500",
      description: "Visa, Mastercard, American Express",
    },
    {
      id: "bank",
      name: "Bank Transfer",
      icon: FaUniversity,
      color: "bg-purple-500",
      description: "Direct bank transfer",
    },
    {
      id: "cash",
      name: "Cash on Departure",
      icon: FaMoneyBill,
      color: "bg-orange-500",
      description: "Pay at the bus station",
    },
  ];

  const mobileProviders = [
    { name: "MTN Mobile Money", code: "MTN", prefix: "0788" },
    { name: "Airtel Money", code: "AIRTEL", prefix: "0782" },
    { name: "Tigo Cash", code: "TIGO", prefix: "0783" },
  ];

  return (
    <div className="w-full lg:px-28 md:px-16 sm:px-7 px-4 mt-[13ch] mb-[8ch]">
      {/* Progress Steps */}
      <div className="mb-10">
        <div className="flex items-center justify-center gap-4">
          <div
            className={`flex items-center gap-2 ${step >= 1 ? "text-violet-600" : "text-gray-400"}`}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-violet-600 text-white" : "bg-gray-200 text-gray-500"}`}>
              1
            </div>
            <span>Passenger Info</span>
          </div>
          <div className="w-16 h-[2px] bg-gray-200"></div>
          <div
            className={`flex items-center gap-2 ${step >= 2 ? "text-violet-600" : "text-gray-400"}`}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-violet-600 text-white" : "bg-gray-200 text-gray-500"}`}>
              2
            </div>
            <span>Payment</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-7">
          {step === 1 && (
            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl text-neutral-800 dark:text-neutral-100 font-medium mb-6">
                Passenger Information
              </h2>
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="fullname"
                    className="block mb-2 font-semibold">
                    Fullname <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullname"
                    placeholder="e.g. Jean Paul"
                    value={formData.fullname}
                    onChange={handleChange}
                    className="w-full appearance-none text-neutral-800 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-800 px-4 h-12 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 font-semibold">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="e.g. jean@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full appearance-none text-neutral-800 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-800 px-4 h-12 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                  <small className="block mt-1 text-xs text-neutral-500 flex items-center gap-1">
                    <FaEnvelope className="text-xs" /> You will receive your
                    tickets via this email
                  </small>
                </div>
                <div>
                  <label htmlFor="phone" className="block mb-2 font-semibold">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="e.g. +250 796261912"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full appearance-none text-neutral-800 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-800 px-4 h-12 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                  <small className="block mt-1 text-xs text-neutral-500 flex items-center gap-1">
                    <FaSms className="text-xs" /> SMS confirmation will be sent
                    to this number
                  </small>
                </div>
                <div>
                  <label
                    htmlFor="altPhone"
                    className="block mb-2 font-semibold">
                    Alternative Phone Number (WhatsApp)
                  </label>
                  <input
                    type="tel"
                    id="altPhone"
                    placeholder="e.g. +250 786723675"
                    value={formData.altPhone}
                    onChange={handleChange}
                    className="w-full appearance-none text-neutral-800 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-800 px-4 h-12 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                  <small className="block mt-1 text-xs text-neutral-500 flex items-center gap-1">
                    <FaWhatsapp className="text-xs text-green-600" /> WhatsApp
                    confirmation will be sent here
                  </small>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl text-neutral-800 dark:text-neutral-100 font-medium mb-6">
                Select Payment Method
              </h2>

              {/* Payment Methods */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`flex items-center gap-4 p-4 border-2 rounded-xl transition-all ${
                      paymentMethod === method.id
                        ? "border-violet-500 bg-violet-50 dark:bg-violet-950/20"
                        : "border-neutral-200 dark:border-neutral-700 hover:border-violet-300"
                    }`}>
                    <div
                      className={`${method.color} p-3 rounded-full text-white`}>
                      <method.icon className="text-xl" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-neutral-800 dark:text-neutral-100">
                        {method.name}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {method.description}
                      </p>
                    </div>
                    {paymentMethod === method.id && (
                      <FaCheckCircle className="ml-auto text-violet-600 text-xl" />
                    )}
                  </button>
                ))}
              </div>

              {/* Mobile Money Form */}
              {paymentMethod === "mobile" && (
                <div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-xl p-5 space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <FaMobile className="text-green-600" /> Mobile Money Details
                  </h3>
                  <div>
                    <label className="block text-sm mb-2">
                      Select Provider
                    </label>
                    <select
                      id="provider"
                      onChange={handlePaymentDetailsChange}
                      className="w-full p-3 border rounded-lg bg-white dark:bg-neutral-800">
                      <option value="">
                        Select your mobile money provider
                      </option>
                      {mobileProviders.map((provider) => (
                        <option key={provider.code} value={provider.name}>
                          {provider.name} ({provider.prefix}XXXXXX)
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Mobile Number</label>
                    <input
                      type="tel"
                      id="mobileNumber"
                      placeholder="e.g. 0788 123 456"
                      onChange={handlePaymentDetailsChange}
                      className="w-full p-3 border rounded-lg bg-white dark:bg-neutral-800"
                    />
                    <small className="text-xs text-neutral-500 mt-1 block">
                      You will receive a payment request on this number
                    </small>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
                    <p className="text-sm text-blue-600 dark:text-blue-400 flex items-center gap-2">
                      <FaLock className="text-xs" />
                      You will be prompted to enter your PIN on the next screen
                    </p>
                  </div>
                </div>
              )}

              {/* Card Payment Form */}
              {paymentMethod === "card" && (
                <div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-xl p-5 space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <FaCreditCard className="text-blue-600" /> Card Details
                  </h3>
                  <div>
                    <label className="block text-sm mb-2">Card Number</label>
                    <input
                      type="text"
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      onChange={handlePaymentDetailsChange}
                      className="w-full p-3 border rounded-lg bg-white dark:bg-neutral-800"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2">Expiry Date</label>
                      <input
                        type="text"
                        id="expiry"
                        placeholder="MM/YY"
                        onChange={handlePaymentDetailsChange}
                        className="w-full p-3 border rounded-lg bg-white dark:bg-neutral-800"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">CVV</label>
                      <input
                        type="password"
                        id="cvv"
                        placeholder="123"
                        onChange={handlePaymentDetailsChange}
                        className="w-full p-3 border rounded-lg bg-white dark:bg-neutral-800"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Bank Transfer Form */}
              {paymentMethod === "bank" && (
                <div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-xl p-5 space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <FaUniversity className="text-purple-600" /> Bank Transfer
                    Details
                  </h3>
                  <div>
                    <label className="block text-sm mb-2">Bank Name</label>
                    <select
                      id="bankName"
                      onChange={handlePaymentDetailsChange}
                      className="w-full p-3 border rounded-lg bg-white dark:bg-neutral-800">
                      <option value="">Select your bank</option>
                      <option>Bank of Kigali</option>
                      <option>Equity Bank</option>
                      <option>I&M Bank</option>
                      <option>Access Bank</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Account Number</label>
                    <input
                      type="text"
                      id="accountNumber"
                      placeholder="Enter account number"
                      onChange={handlePaymentDetailsChange}
                      className="w-full p-3 border rounded-lg bg-white dark:bg-neutral-800"
                    />
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-lg">
                    <p className="text-sm text-yellow-600 dark:text-yellow-400">
                      Bank: 0001234567 | Account: 9876543210
                      <br />
                      Reference: BUS{Math.floor(Math.random() * 10000)}
                    </p>
                  </div>
                </div>
              )}

              {/* Cash Payment Form */}
              {paymentMethod === "cash" && (
                <div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-xl p-5 text-center">
                  <FaMoneyBill className="text-4xl text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold">
                    You will pay Rs. {totalAmount} in cash
                  </p>
                  <p className="text-xs text-neutral-500 mt-2">
                    Please arrive 30 minutes before departure at the bus station
                    <br />
                    Present your ID and booking reference to complete payment
                  </p>
                </div>
              )}

              {/* Security Note */}
              <div className="flex items-center gap-2 mt-6 p-3 bg-gray-50 dark:bg-gray-800/30 rounded-lg">
                <FaShieldAlt className="text-green-600" />
                <p className="text-xs text-neutral-500">
                  Your payment is secure and encrypted. We never store your
                  payment details.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-end gap-4">
            {step === 1 && (
              <button
                onClick={handleNextStep}
                className="bg-violet-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-violet-700">
                Continue to Payment <FaArrowRight />
              </button>
            )}
            {step === 2 && (
              <button
                onClick={processPayment}
                disabled={processing}
                className={`bg-violet-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 ${
                  processing
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-violet-700"
                }`}>
                {processing ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    Pay Now <FaArrowRight />
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Booking Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-950/30 dark:to-indigo-950/30 rounded-xl p-6 sticky top-24">
            <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-4">
              Booking Summary
            </h2>

            <div className="space-y-4">
              <div className="pb-3 border-b border-neutral-200 dark:border-neutral-800">
                <p className="text-sm text-neutral-500">Route</p>
                <p className="font-semibold">
                  {booking.from || "?"} → {booking.to || "?"}
                </p>
              </div>

              <div className="pb-3 border-b border-neutral-200 dark:border-neutral-800">
                <p className="text-sm text-neutral-500">Travel Details</p>
                <p className="font-semibold">
                  Date: {booking.travelDate || "Not set"}
                </p>
                <p className="text-sm">
                  Departure: {booking.departTime || "Not set"}
                </p>
              </div>

              <div className="pb-3 border-b border-neutral-200 dark:border-neutral-800">
                <p className="text-sm text-neutral-500">Selected Seats</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {booking.selectedSeats.length > 0 ? (
                    booking.selectedSeats.map((seat) => (
                      <span
                        key={seat}
                        className="bg-violet-100 dark:bg-violet-900/50 text-violet-700 px-2 py-1 rounded text-sm">
                        Seat {seat}
                      </span>
                    ))
                  ) : (
                    <span className="text-red-500 text-sm">
                      No seats selected
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-2">
                <div className="flex justify-between mb-2">
                  <span className="text-neutral-600">Subtotal</span>
                  <span>Rs. {totalAmount}</span>
                </div>
                <div className="flex justify-between pt-2 mt-2 border-t-2 border-violet-600">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-xl text-violet-600">
                    Rs. {totalAmount}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Info Preview */}
            <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <p className="text-xs text-neutral-500 flex items-center gap-1">
                <FaEnvelope className="text-xs" />{" "}
                {formData.email || "Email not set"}
              </p>
              <p className="text-xs text-neutral-500 flex items-center gap-1 mt-1">
                <FaSms className="text-xs" />{" "}
                {formData.phone || "Phone not set"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* PIN Verification Modal */}
      {showPinModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 max-w-md w-full mx-4">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaKey className="text-2xl text-violet-600" />
              </div>
              <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100">
                Enter Your PIN
              </h3>
              <p className="text-sm text-neutral-500 mt-1">
                Enter your {paymentDetails.provider || "Mobile Money"} PIN to
                complete payment
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                4-Digit PIN
              </label>
              <input
                type="password"
                maxLength="4"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full text-center text-2xl tracking-widest p-3 border rounded-lg bg-white dark:bg-neutral-800"
                placeholder="••••"
                autoFocus
              />
              {pinError && (
                <p className="text-red-500 text-xs mt-1">{pinError}</p>
              )}
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-lg mb-4">
              <p className="text-xs text-yellow-600 dark:text-yellow-400 text-center">
                Amount to pay: <strong>Rs. {totalAmount}</strong>
                <br />
                You will receive confirmation via SMS and Email
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowPinModal(false);
                  setPin("");
                  setPinError("");
                }}
                className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50">
                Cancel
              </button>
              <button
                onClick={verifyPinAndPay}
                className="flex-1 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700">
                Pay Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Processing Overlay */}
      {processing && !showPinModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-8 max-w-sm w-full mx-4 text-center">
            <FaSpinner className="text-4xl text-violet-600 animate-spin mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Processing Payment</h3>
            <p className="text-neutral-500 text-sm">
              Please wait while we process your payment...
            </p>
            <p className="text-xs text-neutral-400 mt-3">
              Do not close this window
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
