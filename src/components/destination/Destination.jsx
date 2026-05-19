import React from "react";
import { useBooking } from "../../context/BookingContext";

function Destination() {
  const { booking, setFrom, setTo } = useBooking();

  const locations = [
    "Kigali",
    "Musanze",
    "Rubavu",
    "Nyagatare",
    "Huye",
    "Muhanga",
    "Rusizi",
    "Kayonza",
    "Rwamagana",
    "Bugesera",
  ];

  return (
    <div className="w-full space-y-4">
      <h2 className="text-xl text-neutral-800 dark:text-neutral-100 font-medium">
        Your Destination
      </h2>
      <div className="w-full grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="from" className="block mb-2 font-semibold">
            From
          </label>
          <select
            id="from"
            name="from"
            value={booking.from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full appearance-none text-neutral-800 dark:text-neutral-100 bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-11 border border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-900">
            <option value="">Select Departure Location</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="to" className="block mb-2 font-semibold">
            To
          </label>
          <select
            id="to"
            name="to"
            value={booking.to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full appearance-none text-neutral-800 dark:text-neutral-100 bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-11 border border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-900">
            <option value="">Select Arrival Location</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
      </div>

      {(booking.from || booking.to) && (
        <div className="w-full flex items-center gap-x-3 text-sm text-neutral-700 dark:text-neutral-200">
          {booking.from && <span>📍 From: {booking.from}</span>}
          {booking.from && booking.to && <span>→</span>}
          {booking.to && <span>📍 To: {booking.to}</span>}
        </div>
      )}
    </div>
  );
}

export default Destination;
