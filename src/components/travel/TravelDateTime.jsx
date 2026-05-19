import React from "react";
import { useBooking } from "../../context/BookingContext";

function TravelDateTime() {
  const { booking, setTravelDate, setTravelTime } = useBooking();

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split("T")[0];
  // Get date 3 months from now
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateStr = maxDate.toISOString().split("T")[0];

  return (
    <div className="w-full space-y-4">
      <h2 className="text-xl text-neutral-800 dark:text-neutral-100 font-medium">
        Choose Travel Date & Time
      </h2>

      <div className="w-full grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="travelDate" className="block mb-2 font-semibold">
            Travel Date
          </label>
          <input
            type="date"
            id="travelDate"
            name="travelDate"
            value={booking.travelDate}
            min={today}
            max={maxDateStr}
            onChange={(e) => setTravelDate(e.target.value)}
            className="w-full appearance-none text-neutral-800 dark:text-neutral-100 bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-11 border border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-900"
          />
        </div>

        <div>
          <label htmlFor="travelTime" className="block mb-2 font-semibold">
            Travel Time
          </label>
          <input
            type="time"
            id="travelTime"
            name="travelTime"
            value={booking.travelTime}
            onChange={(e) => setTravelTime(e.target.value)}
            className="w-full appearance-none text-neutral-800 dark:text-neutral-100 bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-11 border border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-900"
          />
        </div>
      </div>

      {(booking.travelDate || booking.travelTime) && (
        <div className="w-full text-sm text-neutral-700 dark:text-neutral-200">
          {booking.travelDate ? (
            <span>
              📅 {new Date(booking.travelDate).toLocaleDateString("en-GB")}
            </span>
          ) : null}
          {booking.travelTime ? (
            <span className="ml-4">⏰ {booking.travelTime}</span>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default TravelDateTime;
