import React, { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { useBooking } from "../../context/BookingContext";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { booking, setPassengerInfo, resetBooking } = useBooking();
  const navigate = useNavigate();

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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.fullname || !formData.email || !formData.phone) {
      alert("Please fill in all required fields");
      return;
    }

    if (booking.selectedSeats.length === 0) {
      alert("Please select at least one seat");
      return;
    }

    if (!booking.from || !booking.to) {
      alert("Please select departure and arrival locations");
      return;
    }

    // Process payment (simulation)
    alert(
      `Booking confirmed!\n\nRoute: ${booking.from} → ${booking.to}\nSeats: ${booking.selectedSeats.join(", ")}\nTotal: Rs. ${booking.selectedSeats.length * 750}\n\nThank you for booking with us!`,
    );

    resetBooking();
    navigate("/");
  };

  const seatPrice = 750;
  const totalAmount = booking.selectedSeats.length * seatPrice;

  return (
    <div className="w-full lg:px-28 md:px-16 sm:px-7 px-4 mt-[13ch] mb-[8ch] space-y-10">
      <div className="grid grid-cols-5 gap-16 items-start">
        <div className="col-span-3 space-y-7 pr-20">
          <h2 className="text-xl text-neutral-800 dark:text-neutral-100 font-medium">
            Passenger Information
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="fullname" className="block mb-2 font-semibold">
                Fullname <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullname"
                placeholder="e.g. Jean Paul"
                value={formData.fullname}
                onChange={handleChange}
                required
                className="w-full appearance-none text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 inline-block bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-12 border border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-900"
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
                required
                className="w-full appearance-none text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 inline-block bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-12 border border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-900"
              />
              <small className="block mt-1 text-xs text-neutral-500 dark:text-neutral-600 font-normal">
                You will get your tickets via this email address.
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
                required
                className="w-full appearance-none text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 inline-block bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-12 border border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-900"
              />
            </div>
            <div>
              <label htmlFor="altPhone" className="block mb-2 font-semibold">
                Alternative Phone Number
              </label>
              <input
                type="tel"
                id="altPhone"
                placeholder="e.g. +250 786723675"
                value={formData.altPhone}
                onChange={handleChange}
                className="w-full appearance-none text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 inline-block bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-12 border border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-900"
              />
            </div>
          </form>
        </div>

        <div className="col-span-2 space-y-8">
          <div className="bg-neutral-200/50 dark:bg-neutral-900/70 rounded-md py-5 px-7">
            <h2 className="text-xl text-center text-neutral-800 dark:text-neutral-100 font-medium border-b-2 border-neutral-200 dark:border-neutral-800/40 pb-3 mb-4">
              Your Booking Status
            </h2>
            <div className="space-y-8 pb-3">
              <div className="space-y-4">
                <h6 className="text-base text-neutral-700 dark:text-neutral-200 font-medium">
                  Your Destination
                </h6>
                <div className="w-full flex items-center gap-x-3">
                  <div className="w-fit text-base font-medium">
                    From:{" "}
                    <span className="ml-1.5 font-normal">
                      {booking.from || "Not selected"}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="w-full h-[1px] border border-dashed border-neutral-400 dark:border-neutral-700/80"></div>
                  </div>
                  <div className="w-fit text-base font-medium">
                    To:{" "}
                    <span className="ml-1.5 font-normal">
                      {booking.to || "Not selected"}
                    </span>
                  </div>
                </div>

                <div className="w-full flex items-center gap-x-3">
                  <div className="w-fit text-base font-medium">
                    Travel Date:{" "}
                    <span className="ml-1.5 font-normal">
                      {booking.travelDate || "Not selected"}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="w-full h-[1px] border border-dashed border-neutral-400 dark:border-neutral-700/80"></div>
                  </div>
                  <div className="w-fit text-base font-medium">
                    Depart at:{" "}
                    <span className="ml-1.5 font-normal">
                      {booking.departTime || "Not selected"}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="w-full flex items-center justify-between">
                    <h6 className="text-base text-neutral-700 dark:text-neutral-200 font-medium">
                      Selected Seats
                    </h6>
                    <h6 className="text-base text-neutral-700 dark:text-neutral-200 font-medium">
                      {booking.selectedSeats.length > 0
                        ? booking.selectedSeats.join(", ")
                        : "None"}
                    </h6>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="w-full flex items-center justify-between">
                    <h6 className="text-base text-neutral-700 dark:text-neutral-200 font-medium">
                      Total Amount
                    </h6>
                    <h6 className="text-base text-violet-600 dark:text-violet-400 font-bold">
                      Rs. {totalAmount}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="px-8 h-12 bg-violet-600 text-neutral-50 text-base font-normal rounded-md flex items-center justify-center gap-x-2 hover:bg-violet-700 transition-colors">
          Process to Pay <FaArrowRightLong />
        </button>
      </div>
    </div>
  );
}

export default Checkout;
