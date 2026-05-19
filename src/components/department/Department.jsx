import React, { useState } from "react";
import { useBooking } from "../../context/BookingContext";

function Department() {
  const { booking, setDepartTime } = useBooking();
  const [departBus, setDepartBus] = useState(booking.departTime || "");

  const handleDepartBusChange = (e) => {
    const value = e.target.value;
    setDepartBus(value);
    setDepartTime(value);
  };

  return (
    <div className="w-full space-y-4">
      <h2 className="text-xl text-neutral-800 dark:text-neutral-100 font-medium">
        Choose Departure Time
      </h2>
      <div className="w-full">
        <label htmlFor="departbus" className="block mb-2 font-semibold">
          Depart Time
        </label>
        <select
          id="departbus"
          name="departbus"
          value={departBus}
          onChange={handleDepartBusChange}
          className="w-full appearance-none text-neutral-800 dark:text-neutral-100 bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-11 border border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-900">
          <option value="">Select a Time</option>
          <option value="04:00 AM">04:00 AM</option>
          <option value="06:00 AM">06:00 AM</option>
          <option value="08:00 AM">08:00 AM</option>
          <option value="10:00 AM">10:00 AM</option>
          <option value="12:00 PM">12:00 PM</option>
          <option value="02:00 PM">02:00 PM</option>
          <option value="04:00 PM">04:00 PM</option>
          <option value="06:00 PM">06:00 PM</option>
          <option value="08:00 PM">08:00 PM</option>
          <option value="10:00 PM">10:00 PM</option>
        </select>
      </div>

      {departBus && (
        <div className="w-full text-sm text-neutral-700 dark:text-neutral-200">
          ⏰ Bus departs at: <span className="font-medium">{departBus}</span>
        </div>
      )}
    </div>
  );
}

export default Department;
