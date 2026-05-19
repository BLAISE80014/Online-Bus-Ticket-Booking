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
  const [bookingReference, setBookingReference] = useState("");

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

  const processPayment = () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    if (paymentMethod === "mobile" && !paymentDetails.mobileNumber) {
      alert("Please enter your mobile number");
      return;
    }
    if (
      paymentMethod === "card" &&
      (!paymentDetails.cardNumber ||
        !paymentDetails.expiry ||
        !paymentDetails.cvv)
    ) {
      alert("Please enter complete card details");
      return;
    }
    if (
      paymentMethod === "bank" &&
      (!paymentDetails.accountNumber || !paymentDetails.bankName)
    ) {
      alert("Please enter bank account details");
      return;
    }

    setProcessing(true);

    setTimeout(() => {
      setProcessing(false);
      const ref = "TXN" + Math.floor(Math.random() * 1000000000);
      setBookingReference(ref);
      alert(
        `✅ Booking Confirmed!\n\nReference: ${ref}\nRoute: ${booking.from} → ${booking.to}\nSeats: ${booking.selectedSeats.join(", ")}\nTotal: Rs. ${booking.selectedSeats.length * 750}\nPayment Method: ${paymentMethod}\n\nThank you for booking with us!`,
      );
      resetBooking();
      navigate("/");
    }, 2000);
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
                  <small className="block mt-1 text-xs text-neutral-500">
                    You will receive your tickets via this email
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
                </div>
                <div>
                  <label
                    htmlFor="altPhone"
                    className="block mb-2 font-semibold">
                    Alternative Phone Number
                  </label>
                  <input
                    type="tel"
                    id="altPhone"
                    placeholder="e.g. +250 786723675"
                    value={formData.altPhone}
                    onChange={handleChange}
                    className="w-full appearance-none text-neutral-800 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-800 px-4 h-12 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl text-neutral-800 dark:text-neutral-100 font-medium mb-6">
                Select Payment Method
              </h2>

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

              {paymentMethod === "mobile" && (
                <div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-xl p-5 space-y-4">
                  <h3 className="font-semibold">Mobile Money Details</h3>
                  <div>
                    <label className="block text-sm mb-2">
                      Select Provider
                    </label>
                    <select className="w-full p-3 border rounded-lg bg-white dark:bg-neutral-800">
                      <option>MTN Mobile Money</option>
                      <option>Airtel Money</option>
                      <option>Tigo Cash</option>
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
                  </div>
                </div>
              )}

              {paymentMethod === "card" && (
                <div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-xl p-5 space-y-4">
                  <h3 className="font-semibold">Card Details</h3>
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

              {paymentMethod === "bank" && (
                <div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-xl p-5 space-y-4">
                  <h3 className="font-semibold">Bank Transfer Details</h3>
                  <div>
                    <label className="block text-sm mb-2">Bank Name</label>
                    <select
                      id="bankName"
                      onChange={handlePaymentDetailsChange}
                      className="w-full p-3 border rounded-lg bg-white dark:bg-neutral-800">
                      <option>Bank of Kigali</option>
                      <option>Equity Bank</option>
                      <option>I&M Bank</option>
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
                </div>
              )}

              {paymentMethod === "cash" && (
                <div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-xl p-5 text-center">
                  <FaMoneyBill className="text-4xl text-green-600 mx-auto mb-2" />
                  <p className="text-sm">
                    You will pay Rs. {totalAmount} in cash at the bus station
                    before departure.
                  </p>
                  <p className="text-xs text-neutral-500 mt-2">
                    Please arrive 30 minutes before departure.
                  </p>
                </div>
              )}

              <div className="flex items-center gap-2 mt-6 p-3 bg-gray-50 dark:bg-gray-800/30 rounded-lg">
                <FaShieldAlt className="text-green-600" />
                <p className="text-xs text-neutral-500">
                  Your payment is secure and encrypted.
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
                    Processing...
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
