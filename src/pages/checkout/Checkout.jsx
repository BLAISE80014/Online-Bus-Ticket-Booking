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
  FaEnvelope,
  FaSms,
  FaWhatsapp,
} from "react-icons/fa";
import { useBooking } from "../../context/BookingContext";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { apiRequest } from "../../utils/api";

function Checkout() {
  const { booking, setPassengerInfo, resetBooking } = useBooking();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({});
  const [processing, setProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  const [formData, setFormData] = useState({
    fullname:
      booking.passengerInfo?.fullname ||
      JSON.parse(localStorage.getItem("currentUser") || "null")?.name ||
      "",
    email:
      booking.passengerInfo?.email ||
      JSON.parse(localStorage.getItem("currentUser") || "null")?.email ||
      "",
    phone:
      booking.passengerInfo?.phone ||
      JSON.parse(localStorage.getItem("currentUser") || "null")?.phone ||
      "",
    altPhone: booking.passengerInfo?.altPhone || "",
  });

  const recordBooking = async (transactionRef, amount, status, paymentState) => {
    const bookingId = `BK${Date.now()}`;
    const dateTime = [booking.travelDate, booking.departTime]
      .filter(Boolean)
      .join(" ");
    const bookingRecord = {
      id: bookingId,
      passenger: formData.fullname.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
      routeId: `${booking.from} - ${booking.to}`,
      from: booking.from,
      to: booking.to,
      travelDate: booking.travelDate,
      departTime: booking.departTime,
      dateTime,
      busName: booking.busName || "Bus",
      busId: booking.busId,
      company: booking.busDetails?.company || "",
      busPlate: booking.busDetails?.plate || "",
      seats: [...booking.selectedSeats],
      amount,
      currency: "RWF",
      status,
      paymentId: transactionRef,
      createdAt: new Date().toISOString(),
    };
    const paymentRecord = {
      id: transactionRef,
      bookingId,
      amount,
      status: paymentState,
      method:
        paymentMethod === "mobile"
          ? `Mobile Money (${paymentDetails.provider})`
          : paymentMethod,
      date: new Date().toISOString().split("T")[0],
      passenger: bookingRecord.passenger,
      email: bookingRecord.email,
      currency: "RWF",
    };
    const savedBuses = JSON.parse(localStorage.getItem("buses") || "[]");
    const selectedBus = booking.busDetails;
    let busRecord;
    if (selectedBus?.name) {
      const currentBus = savedBuses.find(
        (bus) =>
          bus.catalogId === selectedBus.id ||
          (selectedBus.plate && bus.plate === selectedBus.plate),
      );
      if (currentBus) {
        busRecord = {
          ...currentBus,
          name: selectedBus.name,
          plate: selectedBus.plate || currentBus.plate || "",
          capacity: selectedBus.passengers || currentBus.capacity || "",
          type: selectedBus.type || currentBus.type || "",
          company: selectedBus.company || currentBus.company || "",
          catalogId: selectedBus.id,
          status: currentBus.status || "Active",
        };
      } else {
        const numericIds = savedBuses
          .map((bus) => Number(bus.id))
          .filter(Number.isFinite);
        busRecord = {
          id: Math.max(1000, ...numericIds) + 1,
          catalogId: selectedBus.id,
          name: selectedBus.name,
          plate: selectedBus.plate || "",
          capacity: selectedBus.passengers || "",
          type: selectedBus.type || "",
          company: selectedBus.company || "",
          status: "Active",
        };
      }
    }

    await apiRequest("/bookings", {
      method: "POST",
      body: {
        booking: bookingRecord,
        payment: paymentRecord,
        bus: busRecord,
      },
    });
  };

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
    if (!booking.from || !booking.to || !booking.travelDate || !booking.departTime) {
      alert("Please select a route, travel date, and departure time.");
      return false;
    }
    if (!booking.busId || !Number.isFinite(Number(booking.busPrice)) || Number(booking.busPrice) <= 0) {
      alert("Select a bus on a route with an administrator-configured fare.");
      return false;
    }
    return true;
  };

  const processPayment = () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }
    if (
      paymentMethod === "mobile" &&
      (!paymentDetails.mobileNumber || !paymentDetails.provider)
    ) {
      alert("Select a mobile money provider and enter your phone number.");
      return;
    }

    setProcessing(true);
    const transactionRef = `TXN${Date.now()}`;
    recordBooking(transactionRef, totalAmount, "Pending Payment", "Pending")
      .then(() => {
        setTransactionId(transactionRef);
        setPaymentComplete(true);
      })
      .catch((requestError) => {
        alert(`Booking could not be saved: ${requestError.message}`);
      })
      .finally(() => setProcessing(false));
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (validatePassengerInfo()) {
        setStep(2);
      }
    }
  };

  const seatPrice = Number(booking.busPrice) || 0;
  const totalAmount = booking.selectedSeats.length * seatPrice;

  const paymentMethods = [
    {
      id: "mobile",
      name: "Mobile Money",
      icon: FaMobile,
      color: "bg-green-500",
      description: "Choose MTN MoMo or Airtel Money",
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: FaCreditCard,
      color: "bg-blue-500",
      description: "Card option (demo only; no card details requested)",
    },
    {
      id: "bank",
      name: "Bank Transfer",
      icon: FaUniversity,
      color: "bg-purple-500",
      description: "Bank option (demo only; no bank details requested)",
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
    { name: "MTN Mobile Money", code: "MTN" },
    { name: "Airtel Money", code: "AIRTEL" },
  ];

  if (paymentComplete) {
    return (
      <div className="w-full max-w-2xl mx-auto lg:px-10 px-4 mt-[13ch] mb-[8ch]">
        <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-neutral-900">
          <FaCheckCircle className="mx-auto mb-4 text-5xl text-green-600" />
          <h1 className="text-center text-3xl font-bold">
            Booking request saved
          </h1>
          <p className="mt-2 text-center text-neutral-500">
            Reference: <strong>{transactionId}</strong>
          </p>
          <dl className="mt-8 grid grid-cols-2 gap-4 border-y py-6">
            <dt>Passenger</dt>
            <dd className="text-right font-medium">{formData.fullname}</dd>
            <dt>Route</dt>
            <dd className="text-right font-medium">
              {booking.from} → {booking.to}
            </dd>
            <dt>Travel</dt>
            <dd className="text-right font-medium">
              {booking.travelDate} · {booking.departTime}
            </dd>
            <dt>Bus</dt>
            <dd className="text-right font-medium">{booking.busName}</dd>
            <dt>Seats</dt>
            <dd className="text-right font-medium">
              {booking.selectedSeats.join(", ")}
            </dd>
            <dt>Total</dt>
            <dd className="text-right font-bold text-violet-600">
              RWF {Number(totalAmount).toLocaleString()}
            </dd>
            <dt>Payment status</dt>
            <dd className="text-right font-semibold text-amber-600">
              Pending — demo payment is not connected
            </dd>
          </dl>
          <p className="mt-5 text-sm text-neutral-500">
            Your seats are reserved. No money was charged. Contact the bus
            operator to complete payment.
          </p>
          <button
            type="button"
            onClick={() => {
              resetBooking();
              navigate("/");
            }}
            className="mt-6 w-full rounded-lg bg-violet-600 px-5 py-3 font-semibold text-white hover:bg-violet-700">
            Back to home
          </button>
        </div>
      </div>
    );
  }

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
            <span>{t("Passenger Info")}</span>
          </div>
          <div className="w-16 h-[2px] bg-gray-200"></div>
          <div
            className={`flex items-center gap-2 ${step >= 2 ? "text-violet-600" : "text-gray-400"}`}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-violet-600 text-white" : "bg-gray-200 text-gray-500"}`}>
              2
            </div>
            <span>{t("Payment")}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-7">
          {step === 1 && (
            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl text-neutral-800 dark:text-neutral-100 font-medium mb-6">
                {t("Passenger Information")}
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
                {t("Select Payment Method")}
              </h2>
              <p className="mb-6 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
                Demo only: MTN MoMo, Airtel Money, card, and bank payments are
                not connected. No payment is requested or charged. Never enter
                a PIN, card number, CVV, or bank credentials here.
              </p>

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
                            {provider.name}
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
                  </div>
                </div>
              )}

              {/* Card Payment Form */}
              {paymentMethod === "card" && (
                <div className="rounded-xl bg-neutral-50 p-5 text-sm text-neutral-600 dark:bg-neutral-800/50 dark:text-neutral-300">
                  Card processing is not connected. Do not enter card details.
                </div>
              )}

              {/* Bank Transfer Form */}
              {paymentMethod === "bank" && (
                <div className="rounded-xl bg-neutral-50 p-5 text-sm text-neutral-600 dark:bg-neutral-800/50 dark:text-neutral-300">
                  Bank transfer is not connected. No bank details are collected
                  or displayed.
                </div>
              )}

              {/* Cash Payment Form */}
              {paymentMethod === "cash" && (
                <div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-xl p-5 text-center">
                  <FaMoneyBill className="text-4xl text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold">
                    Outstanding amount: RWF {Number(totalAmount).toLocaleString()}
                  </p>
                  <p className="text-xs text-neutral-500 mt-2">
                    This demo records your booking as pending; payment is not
                    processed.
                  </p>
                </div>
              )}

              {/* Security Note */}
              <div className="flex items-center gap-2 mt-6 p-3 bg-gray-50 dark:bg-gray-800/30 rounded-lg">
                <FaShieldAlt className="text-green-600" />
                <p className="text-xs text-neutral-500">
                  This demo does not collect card, PIN, or bank credentials.
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
                    Reserve Seats <FaArrowRight />
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
              {t("Booking Summary")}
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
                  <span>RWF {Number(totalAmount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-2 mt-2 border-t-2 border-violet-600">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-xl text-violet-600">
                    RWF {Number(totalAmount).toLocaleString()}
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

      {/* Processing Overlay */}
      {processing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-8 max-w-sm w-full mx-4 text-center">
            <FaSpinner className="text-4xl text-violet-600 animate-spin mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Saving Booking</h3>
            <p className="text-neutral-500 text-sm">
              Please wait while your booking and seat reservations are saved.
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
